class AddRoleToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :role, :string, default: "user", null: false, comment: "ユーザーの役割 (admin, userなど)"
  end
end
