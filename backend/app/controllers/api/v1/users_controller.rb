class Api::V1::UsersController < ApplicationController
  def new
    # 新規登録ページの表示など
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: { message: '登録成功', user: @user }, status: :ok
    else
      render json: { message: '登録失敗', errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end

