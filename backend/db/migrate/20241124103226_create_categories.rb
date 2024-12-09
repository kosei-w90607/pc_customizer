class CreateCategories < ActiveRecord::Migration[7.1]
  def change
    create_table :categories do |t|
      # カテゴリーの名前
      t.string :name, null: false, comment: "カテゴリーの名前"

      t.timestamps
    end

    # カテゴリー名の一意性を確保
    add_index :categories, :name, unique: true, name: "index_categories_on_name"
  end
end
