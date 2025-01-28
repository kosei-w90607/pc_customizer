# app/controllers/api/configurations_controller.rb
class Api::V1::ConfigurationsController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_configuration, only: [:show, :update, :destroy]
  # before_action :authorize_user!, only: [:update, :destroy]
  def index
    @configurations = ::Configuration.all
    render json: @configurations
  end

  def show
    @configuration = ::Configuration.find(params[:id])

    if @configuration
      render json: @configuration.as_json(
        include: {
          configuration_parts: {
            include: :part
          }
        }
      )
    else
      render json: { error: '構成が見つかりません。' }, status: :not_found
    end
  end

  def create
    @configuration = ::Configuration.new(configuration_params)
    if @configuration.save
      render json: { status: 'Success', data: @configuration }, status: :created
    else
      render json: { status: 'Error', errors: @configuration.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @configuration = ::Configuration.find(params[:id])
    if @configuration.update(configuration_params)
      render json: @configuration
    else
      render json: @configuration.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @configuration = ::Configuration.find(params[:id])
    @configuration.destroy
  end

  private

  def set_configuration
    @configuration = ::Configuration.find(params[:id])
  end

  def authorize_user!
    unless @configuration.user_id == current_user.id
      render json: { error: '権限がありません' }, status: :forbidden
    end
  end

  def configuration_params
    params.require(:configuration).permit(:name, :budget, :cost, :configuration_type, :user_id, :image, :memo, :is_preset)
  end
end
