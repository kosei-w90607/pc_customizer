class Part < ApplicationRecord
  belongs_to :category

  has_many :configuration_parts, dependent: :destroy
  has_many :configurations, through: :configuration_parts

  # バリデーション
  validates :name, presence: true, uniqueness: { scope: :category_id }
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
