class DeviseTokenAuthCreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table(:users) do |t|
      ## Required
      t.string   :provider,               null: false, default: "email", comment: "認証プロバイダー"
      t.string   :uid,                    null: false, default: "",      comment: "ユーザーの一意な識別子"

      ## Database authenticatable
      t.string   :encrypted_password,     null: false, default: "",      comment: "暗号化されたパスワード"

      ## Recoverable
      t.string   :reset_password_token,                              comment: "パスワードリセット用のトークン"
      t.datetime :reset_password_sent_at,                            comment: "パスワードリセットトークンの送信日時"
      t.boolean  :allow_password_change, default: false,             comment: "パスワード変更の許可フラグ"

      ## Rememberable
      t.datetime :remember_created_at,                               comment: "記憶トークンの生成日時"

      ## Confirmable
      t.string   :confirmation_token,                                comment: "確認用トークン"
      t.datetime :confirmed_at,                                      comment: "確認完了日時"
      t.datetime :confirmation_sent_at,                              comment: "確認メール送信日時"
      t.string   :unconfirmed_email,                                 comment: "未確認の新しいメールアドレス" # Only if using reconfirmable

      ## Lockable
      # t.integer  :failed_attempts,       default: 0, null: false   comment: "ログイン失敗回数" # Only if lock strategy is :failed_attempts
      # t.string   :unlock_token,                                    comment: "アカウントロック解除用のトークン" # Only if unlock strategy is :email or :both
      # t.datetime :locked_at,                                       comment: "アカウントロックの日時"

      ## User Info
      t.string   :name,                                             comment: "ユーザーの名前"
      t.string   :email,                                            comment: "ユーザーのメールアドレス"

      ## Tokens
      t.text     :tokens,                                           comment: "認証トークン"

      t.timestamps
    end

    add_index :users, :email,                unique: true,          comment: "メールアドレスの一意制約インデックス"
    add_index :users, [:uid, :provider],     unique: true,          comment: "UIDとプロバイダーの複合一意制約インデックス"
    add_index :users, :reset_password_token, unique: true,          comment: "パスワードリセットトークンの一意制約インデックス"
    add_index :users, :confirmation_token,   unique: true,          comment: "確認トークンの一意制約インデックス"
    # add_index :users, :unlock_token,         unique: true          comment: "アカウントロック解除トークンの一意制約インデックス"
  end
end
