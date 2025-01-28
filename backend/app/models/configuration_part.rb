class ConfigurationPart < ApplicationRecord
  belongs_to :configuration
  belongs_to :part

  # バリデーション
  validates :quantity, presence: true, numericality: { only_integer: true, greater_than: 0 }

  # 一意性のバリデーションはマイグレーションで設定済み
end
