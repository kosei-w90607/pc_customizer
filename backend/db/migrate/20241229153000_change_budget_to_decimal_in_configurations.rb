class ChangeBudgetToDecimalInConfigurations < ActiveRecord::Migration[7.1]
  def up
    change_column :configurations, :budget, :decimal, precision: 15, scale: 2, null: false, comment: '予算'
  end

  def down
    change_column :configurations, :budget, :string, null: false, comment: '予算'
  end
end
