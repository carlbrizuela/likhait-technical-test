class Api::CategoriesController < ApplicationController
  rescue_from ActiveRecord::RecordNotUnique, with: :record_not_unique

  def index
    categories = Category.order(:name)
    render json: categories
  end

  def create
    category = Category.new(category_params)

    if category.save
      render json: {name: category.name}, status: :created
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end

  def record_not_unique
    render json: { errors: ["Category already exists"] }, status: :unprocessable_entity
  end
end
