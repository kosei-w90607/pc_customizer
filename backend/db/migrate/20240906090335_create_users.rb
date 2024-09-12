class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string   :email,              null: false, comment: 'メールアドレス'
      t.string   :encrypted_password, null: false, comment: 'パスワード'
      t.string   :reset_password_token,            comment: 'パスワード再設定用トークン'
      t.datetime :reset_password_sent_at,          comment: 'パスワード再設定送信日時'
      t.string   :name,               null: false, comment: '氏名'

      t.timestamps

      t.index :email, unique: true
      t.index :reset_password_token, unique: true
    end
  end
end

