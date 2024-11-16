class Api::V1::DashboardController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    Rails.logger.info "Current user: #{current_api_v1_user.inspect}"
    if current_api_v1_user
      Rails.logger.info "User is logged in: #{current_api_v1_user.email}"
      render json: { message: "Welcome to your dashboard!", user: current_api_v1_user.email }
    else
      Rails.logger.warn "Unauthorized access attempt."
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
