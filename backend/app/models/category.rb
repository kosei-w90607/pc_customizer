class Category < ApplicationRecord
  # 自己参照アソシエーション
  belongs_to :parent, class_name: 'Category', optional: true
  has_many :children, class_name: 'Category', foreign_key: 'parent_id', dependent: :destroy

  # 他のモデルとの関連付け
  # パーツ
  has_many :parts, dependent: :destroy

  # バリデーション
  validates :name, presence: true, uniqueness: true
  validates :description, length: { maximum: 1000 } # 必要に応じて制限を設定

  private

  def prevent_circular_reference
    if parent_id.present?
      if id.present? && parent_id == id
        errors.add(:parent_id, "cannot be the same as the category itself")
      elsif parent.present? && parent.ancestors.include?(self)
        errors.add(:parent_id, "cannot be a descendant of the category")
      end
    end
  end

  # # 仮想的に祖先を取得するメソッドを定義（必要に応じて）
  # def ancestors
  #   current = parent
  #   ancestor_list = []
  #   while current
  #     ancestor_list << current
  #     current = current.parent
  #   end
  #   ancestor_list
  # end
end
