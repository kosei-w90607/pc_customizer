class ChangeDescriptionToTextInCategories < ActiveRecord::Migration[7.1]
  def up
    change_column :categories, :description, :text, comment: 'カテゴリーの説明'
  end

  def down
    change_column :categories, :description, :string, limit: 255, comment: 'カテゴリーの説明'
  end
end
