class AddDescriptionToCategories < ActiveRecord::Migration[7.1]
  def change
    add_column :categories, :description, :string, comment: "カテゴリーの説明"
  end
end
