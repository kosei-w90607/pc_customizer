class Configuration < ApplicationRecord
  belongs_to :user # optional: false がデフォルト

  has_many :configuration_parts, dependent: :destroy
  has_many :parts, through: :configuration_parts

  # バリデーション
  validates :name, presence: true, uniqueness: true, length: { maximum: 1000 }
  validates :budget, presence: true, format: { with: /\A\d+w(?:-plus)?\z/, message: "は正しい形式で入力してください（例: '10w', '15w-plus'）" }
  validates :cost, presence: true, numericality: { greater_than_or_equal_to: 0, message: "は0以上の数値でなければなりません" }
  validates :configuration_type, presence: true, inclusion: { in: %w[ビジネス ゲーミング クリエイティブ] }

end
