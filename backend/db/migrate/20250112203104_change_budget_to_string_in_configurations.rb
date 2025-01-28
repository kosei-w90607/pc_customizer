class ChangeBudgetToStringInConfigurations < ActiveRecord::Migration[7.1]
  def up
    change_column :configurations, :budget, :string, null: false, limit: 20
  end

  def down
    change_column :configurations, :budget, :decimal, precision: 15, scale: 2, null: false
  end
end
