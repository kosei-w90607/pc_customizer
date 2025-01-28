# app/controllers/categories_controller.rb
class Api::V1::CategoriesController < ApplicationController
  def index
    @categories = Category.includes(:children).where(parent_id: nil)
    render json: @categories.as_json(include: :children)
  end

  def show
    @category = Category.find(params[:id])
    render json: @category.as_json(include: { children: {}, parts: {} })
  end
end
