require 'rails_helper'

RSpec.describe Expense, type: :model do
  let!(:transport_category) { Category.create!(name: "Transport", id: 1) }

  context "date validations" do
    it "is valid using today's date" do
      expense = Expense.new(description: "Bus", amount: 50, category_id: transport_category.id, date: Date.today)
      expect(expense).to be_valid
    end

    it "is invalid if empty" do
      expense = Expense.new(description: "Bus", amount: 50, category_id: transport_category.id, date: "")
      expect(expense).to be_invalid
    end

    it "is invalid using future date" do
      expense = Expense.new(description: "Bus", amount: 50, category_id: transport_category.id, date: Date.tomorrow)
      expect(expense).to be_invalid
      expect(expense.errors[:date]).to include("can't be in the future")
    end
  end
end
