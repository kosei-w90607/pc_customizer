class CreateConfigurationParts < ActiveRecord::Migration[7.1]
  def change
    create_table :configuration_parts do |t|
      # 関連する構成のID
      t.references :configuration, null: false, foreign_key: { on_delete: :cascade }, comment: "構成IDへの外部キー"
      # 関連するパーツのID
      t.references :part, null: false, foreign_key: { on_delete: :restrict }, comment: "パーツIDへの外部キー"
      # パーツの数量
      t.integer :quantity, null: false, default: 1, comment: "パーツの数量"

      t.timestamps
    end

    # 構成IDとパーツIDの組み合わせを一意にすることで、同一構成内でのパーツの重複を防止
    add_index :configuration_parts, [:configuration_id, :part_id], unique: true, name: "index_configuration_parts_on_configuration_id_and_part_id"
  end
end
