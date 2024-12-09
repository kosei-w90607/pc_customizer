# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_11_30_084740) do
  create_table "categories", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false, comment: "カテゴリーの名前"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true
  end

  create_table "configuration_parts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "configuration_id", null: false, comment: "構成IDへの外部キー"
    t.bigint "part_id", null: false, comment: "パーツIDへの外部キー"
    t.integer "quantity", default: 1, null: false, comment: "パーツの数量"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["configuration_id", "part_id"], name: "index_configuration_parts_on_configuration_id_and_part_id", unique: true
    t.index ["configuration_id"], name: "index_configuration_parts_on_configuration_id"
    t.index ["part_id"], name: "index_configuration_parts_on_part_id"
  end

  create_table "configurations", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false, comment: "構成の名前"
    t.string "image", comment: "構成の画像"
    t.decimal "cost", precision: 10, scale: 2, null: false, comment: "構成の総コスト"
    t.text "memo", comment: "メモや注記"
    t.string "budget", null: false, comment: "予算"
    t.string "configuration_type", null: false, comment: "構成のタイプ"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_preset", default: false, null: false, comment: "設定がプリセットかどうかを示すフラグ"
    t.bigint "user_id", comment: "関連付けられたユーザー"
    t.index ["budget"], name: "index_configurations_on_budget"
    t.index ["configuration_type"], name: "index_configurations_on_configuration_type"
    t.index ["name"], name: "index_configurations_on_name", unique: true
    t.index ["user_id"], name: "index_configurations_on_user_id"
  end

  create_table "parts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "category_id", null: false, comment: "カテゴリーIDへの外部キー"
    t.string "name", null: false, comment: "パーツの名前"
    t.text "description", comment: "パーツの説明"
    t.decimal "price", precision: 10, scale: 2, null: false, comment: "パーツの価格（単価）"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id", "name"], name: "index_parts_on_category_id_and_name", unique: true
    t.index ["category_id"], name: "index_parts_on_category_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "provider", default: "email", null: false, comment: "認証プロバイダー"
    t.string "uid", default: "", null: false, comment: "ユーザーの一意な識別子"
    t.string "encrypted_password", default: "", null: false, comment: "暗号化されたパスワード"
    t.string "reset_password_token", comment: "パスワードリセット用のトークン"
    t.datetime "reset_password_sent_at", comment: "パスワードリセットトークンの送信日時"
    t.boolean "allow_password_change", default: false, comment: "パスワード変更の許可フラグ"
    t.datetime "remember_created_at", comment: "記憶トークンの生成日時"
    t.string "confirmation_token", comment: "確認用トークン"
    t.datetime "confirmed_at", comment: "確認完了日時"
    t.datetime "confirmation_sent_at", comment: "確認メール送信日時"
    t.string "unconfirmed_email", comment: "未確認の新しいメールアドレス"
    t.string "name", comment: "ユーザーの名前"
    t.string "email", comment: "ユーザーのメールアドレス"
    t.text "tokens", comment: "認証トークン"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, comment: "確認トークンの一意制約インデックス"
    t.index ["email"], name: "index_users_on_email", unique: true, comment: "メールアドレスの一意制約インデックス"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, comment: "パスワードリセットトークンの一意制約インデックス"
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, comment: "UIDとプロバイダーの複合一意制約インデックス"
  end

  add_foreign_key "configuration_parts", "configurations", on_delete: :cascade
  add_foreign_key "configuration_parts", "parts"
  add_foreign_key "configurations", "users"
  add_foreign_key "parts", "categories"
end
