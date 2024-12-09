class CreateConfigurations < ActiveRecord::Migration[7.1]
  def change
    create_table :configurations do |t|
      # 構成の名前
      t.string :name, null: false, comment: "構成の名前"
      # 構成イメージ（画像のURLやパス）
      t.string :image, comment: "構成の画像"
      # 構成の総コスト
      t.decimal :cost, precision: 10, scale: 2, null: false, comment: "構成の総コスト"
      # 構成に関するメモや注記
      t.text :memo, comment: "メモや注記"
      # 構成の予算
      t.string :budget, null: false, comment: "予算"
      # 構成のタイプ（例: desktop, laptop など）
      t.string :configuration_type, null: false, comment: "構成のタイプ"

      t.timestamps
    end

    # 構成名の一意性を確保
    add_index :configurations, :name, unique: true, name: "index_configurations_on_name"

    # よく使用されるフィルタリングカラムにインデックスを追加
    add_index :configurations, :budget, name: "index_configurations_on_budget"
    add_index :configurations, :configuration_type, name: "index_configurations_on_configuration_type"
  end
end
