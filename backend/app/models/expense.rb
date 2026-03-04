class Expense < ApplicationRecord
  belongs_to :category

  validate :expense_date_cannot_be_in_the_future

  validates :date, presence: true

  private

  def expense_date_cannot_be_in_the_future
    if date.present? && date > Date.today
      errors.add(:date, "can't be in the future")
    end
  end
end
