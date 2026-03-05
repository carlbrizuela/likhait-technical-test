require 'rails_helper'

RSpec.describe Category, type: :model do
  context "validations" do
    it "is valid with category name" do
      category = Category.new(name: "Leisure")
      expect(category).to be_valid
    end

    it "is invalid without category name" do
      category = Category.new(name: "")
      expect(category).to be_invalid
    end

    it "is invalid if not unique" do
      Category.create!(name: "Leisure")
      category = Category.new(name: "Leisure")
      expect(category).to be_invalid
      expect(category.errors[:name]).to include("Category already exists")
    end
  end
end
