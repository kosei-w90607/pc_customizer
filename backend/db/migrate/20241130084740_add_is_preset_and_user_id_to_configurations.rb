class AddIsPresetAndUserIdToConfigurations < ActiveRecord::Migration[7.1]
  def change
    add_column :configurations, :is_preset, :boolean, default: false, null: false, comment: "設定がプリセットかどうかを示すフラグ"
    add_reference :configurations, :user, foreign_key: true, null: true, comment: "関連付けられたユーザー"
  end
end
