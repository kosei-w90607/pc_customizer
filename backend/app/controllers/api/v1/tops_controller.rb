class Api::V1::TopsController < ApplicationController
  def index
    render json: { status: 200, message: 'Welcome to the Top Page' }
  end

  def api_index
    render json: { message: "Welcome to the Top Page!" }
  end
end
