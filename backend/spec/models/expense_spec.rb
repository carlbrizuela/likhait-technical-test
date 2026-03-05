require 'rails_helper'

RSpec.describe Expense, type: :model do
  let!(:transport_category) { Category.create!(name: "Transport", id: 1) }
  let(:valid_params) do
  {
    description: "Bus",
    amount: 50,
    category_id: transport_category.id,
    date: Date.today
  }
  end

  context "validations" do
    it "is valid with amount, description, category and date parameters" do
      expense = Expense.new(valid_params)
      expect(expense).to be_valid
    end

    it "is invalid without amount" do
      expense = Expense.new(valid_params.merge(amount: ""))
      expect(expense).to be_invalid
      expect(expense.errors[:amount]).to include("can't be blank")
    end

    it "is invalid if amount is zero" do
      expense = Expense.new(valid_params.merge(amount: 0))
      expect(expense).to be_invalid
      expect(expense.errors[:amount]).to include("must be greater than 0")
    end

    it "is invalid if amount is less than zero" do
      expense = Expense.new(valid_params.merge(amount: -50))
      expect(expense).to be_invalid
      expect(expense.errors[:amount]).to include("must be greater than 0")
    end

    it "is invalid without description" do
      expense = Expense.new(valid_params.merge(description: ""))
      expect(expense).to be_invalid
      expect(expense.errors[:description]).to include("can't be blank")
    end
  end
end
