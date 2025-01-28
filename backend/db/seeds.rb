# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# db/seeds.rb

puts "Starting Seeding..."

ActiveRecord::Base.transaction do
  begin
    # ---------------------------------------------------
    # ユーザーの作成
    # ---------------------------------------------------
    puts "Creating Users..."

    # 既存のデータをクリア（必要に応じてコメントアウト）
    # User.destroy_all

    # 既存のユーザー作成部分（ユーザーが既に作成されている場合はスキップしてください）
    admin_user = User.find_or_create_by!(email: "admin@example.com") do |user|
      user.name = "管理者"
      user.password = "password"
      user.password_confirmation = "password"
      user.confirmed_at = Time.current
      user.provider = "email"
      user.uid = "admin@example.com"
      user.role = "admin"
    end

    # 一般ユーザーの作成
    users = (1..10).map do |i|
      User.find_or_create_by!(email: "user#{i}@example.com") do |user|
        user.name = "ユーザー#{i}"
        user.password = "password"
        user.password_confirmation = "password"
        user.confirmed_at = Time.current
        user.provider = "email"
        user.uid = "user#{i}@example.com"
        user.role = "user" # 明示的に設定（デフォルトが"user"なので省略可能）
      end
    end

    puts "Users created successfully."

    # ---------------------------------------------------
    # カテゴリーの作成
    # ---------------------------------------------------
    puts "Creating Categories..."

    # 既存のデータをクリア（必要に応じてコメントアウト）
    # Category.destroy_all

    categories = [
        {
          name: "OS",
          description: <<~TEXT
            Proエディションには、Homeエディションの機能に加え、
            個人利用向けに更に強化されたセキュリティ機能と
            リモートデスクトップやOSの仮想化などビジネス向けの機能が多数搭載されています。
          TEXT
        },
        {
          name: "CPU",
          subcategories: [
            {
              name: "Intel Core",
              description: "Intel Core の各モデル（i5, i7, i9）"
            },
            {
              name: "Ryzen",
              description: "AMD Ryzen の各モデル（Ryzen 5, Ryzen 7, Ryzen 9）"
            }
          ],
          description: <<~TEXT
            パソコンの性能の中心となる「CPU」。
            性能が高い上位モデルだと動画編集、写真現像、DTM、イラスト制作、
            大量のExcelマクロ計算など、通常では重たい作業も快適に行うことができます。
          TEXT
        },
        {
          name: "CPUクーラー",
          description: <<~TEXT
            CPUクーラーはCPUから出る熱を冷却するPCパーツであり、
            主に空冷CPUクーラーと水冷CPUクーラーがあります。
            一般的に水冷CPUクーラーの方が冷却効率が高く、
            ゲームや動画編集など高負荷の作業をされる方におすすめです。
          TEXT
        },
        {
          name: "GPU",
          subcategories: [
            {
              name: "30xx_series",
              description: "3000代のシリーズ、普通はこれで足りる"
            },
            {
              name: "40xx_series",
              description: "4000代のシリーズ、最新のゲームの推奨スペックがこの水準を求め始めている"
            }
          ],
          description: <<~TEXT
            グラフィックボードは、ゲームや動画編集、
            3Dモデリングなどのグラフィック処理を担当する重要なパーツです。
            用途に応じて最適なモデルを選択してください。
          TEXT
        },
        {
          name: "マザーボード（Motherboard）",
          description: <<~TEXT
            マザーボードはPCの各コンポーネントを接続し、
            データのやり取りを行う重要な役割を持つパーツです。
            チップセットやフォームファクターにより、対応するCPUや拡張性が異なります。
          TEXT
        },
        {
          name: "メインメモリ（RAM）",
          description: <<~TEXT
            メインメモリ（RAM）は、PCがデータを一時的に保存し、
            迅速にアクセスするための重要なパーツです。
            容量や速度、タイミングによって性能が異なります。
          TEXT
        },
        {
          name: "ストレージ",
          subcategories: [
            {
              name: "SSD",
              description: "読み書き共に早いが、高い"
            },
            {
              name: "HDD",
              description: "大容量で安価だが、速さはそこまでではない"
            }
          ],
          description: <<~TEXT
            ストレージは、データを長期的に保存するためのパーツです。
            SSDは高速な読み書きが可能で、HDDは大容量を比較的安価に提供します。
            用途に応じて最適なストレージを選択してください。
          TEXT
        },
        {
          name: "電源ユニット（Power Supply Unit, PSU）",
          description: <<~TEXT
            電源ユニットは、PC全体に安定した電力を供給するためのパーツです。
            ワット数や80 PLUS認証の有無、ケーブルの種類などを考慮して選択してください。
          TEXT
        },
        {
          name: "PCケース（Case）",
          description: <<~TEXT
            PCケースは、内部パーツを収納し、冷却やケーブル管理をサポートする役割を持ちます。
            デザインやサイズ、拡張性、冷却性能などを考慮して選択してください。
          TEXT
        },
        {
          name: "追加冷却（Additional Cooling）",
          description: <<~TEXT
            追加の冷却ファンや水冷システムを導入することで、
            PCの温度管理を向上させ、安定した動作を維持します。
            特に高負荷の作業やオーバークロックを行う際に効果的です。
          TEXT
        },
        {
          name: "光学ドライブ（Optical Drive）",
          description: <<~TEXT
            必要に応じてCD/DVD/Blu-rayなどの光学メディアを読み書きするためのドライブです。
            最近のPCではあまり使用されませんが、特定の用途に必要な場合に選択してください。
          TEXT
        },
    ]

    categories.each do |category_data|
      if category_data[:subcategories]
        # 親カテゴリを検索または新規初期化
        parent_category = Category.find_or_initialize_by(name: category_data[:name])
        parent_category.description = category_data[:description]
        parent_category.save!

        # 各サブカテゴリを検索または新規初期化し、親IDを設定
        category_data[:subcategories].each do |subcategory_data|
          subcategory = Category.find_or_initialize_by(
            name: subcategory_data[:name],
            parent_id: parent_category.id
          )
          subcategory.description = subcategory_data[:description]
          subcategory.save!
        end
      else
        # サブカテゴリがない場合は親カテゴリを検索または新規初期化
        category = Category.find_or_initialize_by(name: category_data[:name])
        category.description = category_data[:description]
        category.save!
      end
    end

    puts "Categories created successfully."

    # ---------------------------------------------------
    # パーツの作成
    # ---------------------------------------------------
    puts "Creating Parts..."

    # 既存のデータをクリア（必要に応じてコメントアウト）
    # Part.destroy_all

    parts = [
      # OSカテゴリのパーツ
      { name: "Windows11 Home", price: 10000.00, category: "OS" },
      { name: "Windows11 Pro", price: 20000.00, category: "OS" },

      # CPUカテゴリのパーツ
      { name: "Intel Core i5", price: 20000.00, category: "Intel Core" },
      { name: "Intel Core i7", price: 40000.00, category: "Intel Core" },
      { name: "Intel Core i9", price: 50000.00, category: "Intel Core" },
      { name: "AMD Ryzen 5", price: 20000.00, category: "Ryzen" },
      { name: "AMD Ryzen 7", price: 30000.00, category: "Ryzen" },
      { name: "AMD Ryzen 9", price: 40000.00, category: "Ryzen" },

      # CPUクーラーカテゴリのパーツ
      { name: "空冷", price: 3000.00, category: "CPUクーラー" },
      { name: "水冷", price: 4000.00, category: "CPUクーラー" },

      # GPUカテゴリーのパーツ
      { name: "NVIDIA RTX 3060", price: 40000.00, category: "30xx_series" },
      { name: "NVIDIA RTX 3070", price: 50000.00, category: "30xx_series" },
      { name: "NVIDIA RTX 4060", price: 60000.00, category: "40xx_series" },
      { name: "NVIDIA RTX 4070", price: 70000.00, category: "40xx_series" },

      # マザーボードカテゴリーのパーツ
      { name: "ASRock A320M-HDV R4.0", price: 9000.00, category: "マザーボード（Motherboard）" },
      { name: "MSI A320M-A PRO", price: 10000.00, category: "マザーボード（Motherboard）" },
      { name: "ASRock B660M Pro RS", price: 15000.00, category: "マザーボード（Motherboard）" },
      { name: "MSI MPG B550 Gaming Edge", price: 20000.00, category: "マザーボード（Motherboard）" },
      { name: "Gigabyte X570 AORUS Elite", price: 25000.00, category: "マザーボード（Motherboard）" },
      { name: "ASUS ROG Strix Z690-A", price: 35000.00, category: "マザーボード（Motherboard）" },

      # メインメモリカテゴリーのパーツ
      { name: "8GB DDR4 3200MHz", price: 5000.00, category: "メインメモリ" },
      { name: "16GB DDR4 3200MHz", price: 10000.00, category: "メインメモリ" },
      { name: "32GB DDR4 3600MHz", price: 20000.00, category: "メインメモリ" },
      { name: "16GB DDR5 5200MHz", price: 15000.00, category: "メインメモリ" },
      { name: "32GB DDR5 6000MHz", price: 30000.00, category: "メインメモリ" },

      # ストレージカテゴリーのパーツ
      { name: "Samsung 970 EVO Plus 500GB (NVMe)", price: 12000.00, category: "SSD" },
      { name: "Western Digital Blue 1TB (SATA)", price: 8000.00, category: "SSD" },
      { name: "Crucial MX500 2TB (SATA)", price: 20000.00, category: "SSD" },
      { name: "Samsung 980 PRO 1TB (NVMe)", price: 18000.00, category: "SSD" },
      { name: "Seagate BarraCuda 2TB", price: 7000.00, category: "HDD" },
      { name: "Western Digital Black 4TB", price: 14000.00, category: "HDD" },
      { name: "Toshiba X300 6TB", price: 16000.00, category: "HDD" },

      # 電源ユニットカテゴリーのパーツ
      { name: "Corsair RM750x 750W 80 PLUS Gold", price: 12000.00, category: "電源ユニット（Power Supply Unit, PSU）" },
      { name: "Seasonic Focus GX-650 650W 80 PLUS Gold", price: 10000.00, category: "電源ユニット（Power Supply Unit, PSU）" },
      { name: "EVGA SuperNOVA 850 G5 850W 80 PLUS Gold", price: 15000.00, category: "電源ユニット（Power Supply Unit, PSU）" },
      { name: "Cooler Master MWE Gold 550W 80 PLUS Gold", price: 8000.00, category: "電源ユニット（Power Supply Unit, PSU）" },

      # PCケースカテゴリーのパーツ
      { name: "NZXT H510", price: 10000.00, category: "PCケース（Case）" },
      { name: "Corsair 4000D Airflow", price: 12000.00, category: "PCケース（Case）" },
      { name: "Fractal Design Meshify C", price: 11000.00, category: "PCケース（Case）" },
      { name: "Cooler Master MasterBox NR600", price: 9000.00, category: "PCケース（Case）" },

      # 追加冷却カテゴリーのパーツ
      { name: "Noctua NF-P12 redux-1700 PWM (120mm)", price: 3000.00, category: "追加冷却（Additional Cooling）" },
      { name: "Corsair LL120 RGB (120mm)", price: 4500.00, category: "追加冷却（Additional Cooling）" },
      { name: "NZXT Kraken X63 Liquid Cooler (280mm)", price: 15000.00, category: "追加冷却（Additional Cooling）" },
      { name: "Cooler Master Hyper 212 RGB", price: 5000.00, category: "追加冷却（Additional Cooling）" },

      # 光学ドライブカテゴリーのパーツ
      { name: "ASUS DRW-24D5MT (DVD Burner)", price: 4000.00, category: "光学ドライブ（Optical Drive）" },
      { name: "LG WH12NS40 (Blu-ray Burner)", price: 7000.00, category: "光学ドライブ（Optical Drive）" },
      { name: "Pioneer BDR-209DBK (BD/DVD Burner)", price: 15000.00, category: "光学ドライブ（Optical Drive）" }
    ]

    categories = {
      "OS" => Category.find_or_create_by!(name: "OS"),
      "Intel Core" => Category.find_or_create_by!(name: "Intel Core"),
      "Ryzen" => Category.find_or_create_by!(name: "Ryzen"),
      "CPUクーラー" => Category.find_or_create_by!(name: "CPUクーラー"),
      "30xx_series" => Category.find_or_create_by!(name: "30xx_series"),
      "40xx_series" => Category.find_or_create_by!(name: "40xx_series"),
      "マザーボード（Motherboard）" => Category.find_or_create_by!(name: "マザーボード（Motherboard）"),
      "メインメモリ" => Category.find_or_create_by!(name: "メインメモリ"),
      "SSD" => Category.find_or_create_by!(name: "SSD"),
      "HDD" => Category.find_or_create_by!(name: "HDD"),
      "電源ユニット（Power Supply Unit, PSU）" => Category.find_or_create_by!(name: "電源ユニット（Power Supply Unit, PSU）"),
      "PCケース（Case）" => Category.find_or_create_by!(name: "PCケース（Case）"),
      "追加冷却（Additional Cooling）" => Category.find_or_create_by!(name: "追加冷却（Additional Cooling）"),
      "光学ドライブ（Optical Drive）" => Category.find_or_create_by!(name: "光学ドライブ（Optical Drive）")
    }

    # パーツの作成
    parts.each do |part_data|
      begin
        # カテゴリーの取得
        category = categories[part_data[:category]]

        if category.nil?
          puts "Warning: Category '#{part_data[:category]}' not found for part '#{part_data[:name]}'. Skipping."
          next
        end

        # パーツの作成
        Part.create!(
          name: part_data[:name],
          price: part_data[:price],
          category: category
        )

        puts "Created Part: #{part_data[:name]}"

      rescue ActiveRecord::RecordInvalid => e
        puts "Error creating part '#{part_data[:name]}': #{e.message}"
        raise ActiveRecord::Rollback
      end
    end

    puts "Parts created successfully."

    # ---------------------------------------------------
    # 構成の作成
    # ---------------------------------------------------
    puts "Creating Configurations..."

    # 既存のデータをクリア（必要に応じてコメントアウト）
    # Configuration.destroy_all
    # ConfigurationPart.destroy_all

    # db/seeds.rb

    # カテゴリごとのパーツを取得
    os_parts = Part.joins(:category).where(categories: { name: "OS" })
    cpu_parts = Part.joins(:category).where(categories: { name: ["Intel Core", "Ryzen"] })
    cpu_cooler_parts = Part.joins(:category).where(categories: { name: "CPUクーラー" })
    gpu_parts = Part.joins(:category).where(categories: { name: ["30xx_series", "40xx_series"] })
    motherboard_parts = Part.joins(:category).where(categories: { name: "マザーボード（Motherboard）" })
    memory_parts = Part.joins(:category).where(categories: { name: "メインメモリ" })
    storage_parts = Part.joins(:category).where(categories: { name: ["SSD", "HDD"] })
    psu_parts = Part.joins(:category).where(categories: { name: "電源ユニット（Power Supply Unit, PSU）" })
    pc_case_parts = Part.joins(:category).where(categories: { name: "PCケース（Case）" })
    additional_cooling_parts = Part.joins(:category).where(categories: { name: "追加冷却（Additional Cooling）" })
    optical_drive_parts = Part.joins(:category).where(categories: { name: "光学ドライブ（Optical Drive）" })

    # 必須パーツが存在するかチェック
    # 必須カテゴリと対応するパーツ変数のマッピング
    required_categories = {
      "OS" => "os_parts",
      "Intel Core" => "cpu_parts",
      "Ryzen" => "cpu_parts",
      "CPUクーラー" => "cpu_cooler_parts",
      "30xx_series" => "gpu_parts",
      "40xx_series" => "gpu_parts",
      "マザーボード（Motherboard）" => "motherboard_parts",
      "メインメモリ" => "memory_parts",
      "SSD" => "storage_parts",
      "HDD" => "storage_parts",
      "電源ユニット（Power Supply Unit, PSU）" => "psu_parts",
      "PCケース（Case）" => "pc_case_parts"
    }

    # 必須パーツが存在するかチェック
    required_categories.each do |category_name, variable_name|
      # 文字列から変数を参照
      parts = binding.local_variable_get(variable_name.to_sym)
      if parts.empty?
        raise "エラー: 必須カテゴリ '#{category_name}' に対応するパーツが1つも存在しません。スクリプトを停止します。"
      end
    end

    # ビジネス構成用に必須パーツの最低価格合計を確認
    # 関数として定義し、type に応じて動的に計算
    calculate_minimum_cost = lambda do |type|
      min_cost = os_parts.minimum(:price) +
                cpu_parts.minimum(:price) +
                cpu_cooler_parts.minimum(:price)

      unless type == 'ビジネス'
        if gpu_parts.minimum(:price)
          min_cost += gpu_parts.minimum(:price)
        else
          raise "エラー: GPUカテゴリにパーツが存在しません。"
        end
      end

      min_cost += motherboard_parts.minimum(:price) +
                  memory_parts.minimum(:price) +
                  storage_parts.minimum(:price) +
                  psu_parts.minimum(:price) +
                  pc_case_parts.minimum(:price)

      min_cost
    end

    # 予算を決定するヘルパー関数（Procとして定義）
    determine_budget = lambda do |cost|
      return '25w-plus' if cost >= 250_000
      return '20w-plus' if cost >= 200_000
      return '15w-plus' if cost >= 150_000
      return '10w-plus' if cost >= 100_000
      return '10w'
    end

    # 構成のタイプに基づいて予算を決定する関数（Procとして定義）
    assign_budget = lambda do |configuration_type, cost|
      if configuration_type == 'ビジネス'
        '10w'
      else
        determine_budget.call(cost)
      end
    end

    # パーツをランダムに選択するヘルパー関数（Procとして定義）
    select_parts = lambda do |type|
      selected_parts = []

      # 必須パーツを選択（事前チェックで存在が保証されている）
      selected_parts << os_parts.sample
      selected_parts << cpu_parts.sample
      selected_parts << cpu_cooler_parts.sample

      # 「ビジネス」以外の場合にGPUを選択
      unless type == 'ビジネス'
        if gpu_parts.exists?
          selected_parts << gpu_parts.sample
        else
          raise "エラー: GPUカテゴリにパーツが存在しません。"
        end
      end

      selected_parts << motherboard_parts.sample
      selected_parts << memory_parts.sample
      selected_parts << storage_parts.sample
      selected_parts << psu_parts.sample
      selected_parts << pc_case_parts.sample

      # 追加冷却の有無をランダムに決定
      if [true, false].sample && additional_cooling_parts.exists?
        selected_parts << additional_cooling_parts.sample
      end

      # 光学ドライブの有無をランダムに決定
      if [true, false].sample && optical_drive_parts.exists?
        selected_parts << optical_drive_parts.sample
      end

      selected_parts
    end

    # プリセット構成を作成するヘルパー関数（Procとして定義）
    create_preset_configurations = lambda do |admin_user, type, count|
      # ビジネス構成の場合は最低価格チェック
      if type == 'ビジネス'
        minimum_cost = calculate_minimum_cost.call(type)
        if minimum_cost > 100_000
          raise "エラー: ビジネス構成の必要最低価格の合計 (#{minimum_cost}円) が100,000円を超えています。ビジネス構成を作成できません。"
        end
      end

      count.times do |i|
        parts = select_parts.call(type)
        total_cost = parts.sum(&:price)

        # ビジネスの場合は予算を固定
        if type == 'ビジネス'
          budget = '10w'
          if total_cost <= 100_000
            break
          else
            puts "ビジネス構成試行#{i + 1}: コスト=#{total_cost}円 (予算=10w)"
          end
        else
          budget = determine_budget.call(total_cost)
          puts "Configuration Type: #{type}, Total Cost: #{total_cost}, Budget: #{budget}"
        end

        # 試行回数の管理（無限ループ防止）
        max_attempts = 100
        @attempt ||= 0
        @attempt += 1
        if @attempt > max_attempts
          raise "エラー: プリセット#{type}#{i + 1}の作成に失敗しました。"
        end

        Configuration.create!(
          name: "プリセット#{type}#{i + 1}",
          image: "preset_#{type}_#{i + 1}.jpg",
          cost: total_cost,
          memo: "プリセット構成#{type}#{i + 1}",
          budget: budget,
          configuration_type: type,
          is_preset: true,
          user_id: admin_user.id
        ).tap do |config|
          parts.each do |part|
            ConfigurationPart.create!(
              configuration: config,
              part: part,
              quantity: 1
            )
          end
        end
      end
    end

    # プリセットのタイプと予算帯のリスト
    configuration_types = ['ビジネス', 'ゲーミング', 'クリエイティブ']
    budget_list = ['25w-plus', '20w-plus', '15w-plus', '10w-plus', '10w']

    # 各タイプごとに3つのプリセットを作成
    configuration_types.each do |type|
      create_preset_configurations.call(admin_user, type, 3)
    end

    # 各構成タイプごとに各予算帯で3つのプリセットを作成
    configuration_types.each do |type|
      # ビジネスタイプの場合は予算帯を'10w'に固定
      if type == 'ビジネス'
        create_preset_configurations.call(admin_user, type, '10w', 3)
      else
        # ビジネス以外のタイプでは予算帯に基づいてプリセットを作成
        budget_list.each do |budget|
          create_preset_configurations.call(admin_user, type, budget, 3)
        end
      end
    end

    # 追加: 一般ユーザー向けの構成を作成する場合
    # 以下はオプションです。必要に応じて有効にしてください。

    CONFIGURATIONS_PER_USER = 5 # 希望の数に変更

    users.each do |user|
      CONFIGURATIONS_PER_USER.times do |i|
        type = configuration_types.sample

        parts = select_parts.call(type)
        total_cost = parts.sum(&:price)
        budget = assign_budget.call(type, total_cost)

        # ビジネス構成の場合、予算が '10w' に固定
        if budget == '10w'
          type = 'ビジネス'
          # もう一度パーツを選択し、コストを確認
          max_attempts = 100
          attempt = 0
          while total_cost > 100_000 && attempt < max_attempts
            parts = select_parts.call(type)
            total_cost = parts.sum(&:price)
            attempt += 1
            puts "試行#{attempt}: コスト=#{total_cost}円"
          end

          if total_cost > 100_000
            raise "エラー: ビジネス構成 (プリセット#{type}#{i + 1}) のコストが100,000円以下になるパーツの組み合わせが見つかりませんでした。"
          end
        end

        # 再度予算を割り当てる（特にビジネス以外の場合）
        budget = assign_budget.call(type, total_cost) unless type == 'ビジネス'

        puts "Configuration Type: #{type}, Total Cost: #{total_cost}, Budget: #{budget}"

        Configuration.create!(
          name: "ユーザー構成#{user.id}-#{i + 1}",
          image: "user_#{user.id}_config_#{i + 1}.jpg",
          cost: total_cost,
          memo: "ユーザー#{user.id}の構成#{i + 1}",
          budget: budget,
          configuration_type: type,
          is_preset: false,
          user_id: user.id
        ).tap do |config|
          parts.each do |part|
            ConfigurationPart.create!(
              configuration: config,
              part: part,
              quantity: 1
            )
          end
        end
      end
    end

    puts "ConfigurationParts created successfully."

    puts "Seeding completed successfully!"

  rescue => e
    # トランザクション内で発生した全ての例外をキャッチ
    puts "An error occurred during seeding: #{e.message}"
    raise ActiveRecord::Rollback
  end
end
