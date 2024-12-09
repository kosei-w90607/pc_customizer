class CreateParts < ActiveRecord::Migration[7.1]
  def change
    create_table :parts do |t|
      # 関連するカテゴリーのID
      t.references :category, null: false, foreign_key: true, comment: "カテゴリーIDへの外部キー"
      # パーツの名前
      t.string :name, null: false, comment: "パーツの名前"
      # パーツの詳細説明
      t.text :description, comment: "パーツの説明"
      # パーツの価格（単価）
      t.decimal :price, precision: 10, scale: 2, null: false, comment: "パーツの価格（単価）"

      t.timestamps
    end

    # カテゴリーIDとパーツ名の組み合わせを一意にすることで、同一カテゴリー内での重複を防止
    add_index :parts, [:category_id, :name], unique: true, name: "index_parts_on_category_id_and_name"
  end
end
