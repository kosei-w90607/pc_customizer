module Api
  class TopController < ApplicationController
    def index
      render json: { status: 200, message: 'Welcome to the Top Page' }
    end
  end
end
