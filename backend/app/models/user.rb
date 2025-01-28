class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  include DeviseTokenAuth::Concerns::User

  # バリデーション
  validates :role, presence: true, inclusion: { in: %w[admin user] }

  # スコープ
  scope :admins, -> { where(role: 'admin') }
  scope :general_users, -> { where(role: 'user') }

  # 管理者判定メソッド
  def admin?
    role == 'admin'
  end
end