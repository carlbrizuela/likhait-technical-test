require 'rails_helper'

RSpec.describe "Api::Categories", type: :request do
  describe "GET /api/categories" do
    let!(:food) { Category.create!(name: "Food") }
    let!(:transport) { Category.create!(name: "Transport") }
    let!(:supplies) { Category.create!(name: "Supplies") }

    it "returns all categories" do
      get "/api/categories"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
      expect(json.map { |c| c["name"] }).to include("Food", "Transport", "Supplies")
    end

    it "returns categories sorted by id" do
      get "/api/categories"

      json = JSON.parse(response.body)
      expect(json.map { |c| c["name"] }).to eq([ "Food", "Transport", "Supplies" ])
    end
  end

  describe "POST /api/categories" do
    context "with valid parameters" do
      it "creates a new category" do
        post "/api/categories", params: { category: { name: "Health" } }

        expect(response).to have_http_status(:created)
        json = JSON.parse(response.body)
        expect(json["name"]).to eq("Health")
        expect(Category.exists?(name: "Health")).to be_truthy
      end
    end

    context "with invalid paramaters" do
      it "returns vaildation error if empty string" do
        post "/api/categories", params: { category: { name: "" } }

        expect(response).to have_http_status(:unprocessable_content)
        json = JSON.parse(response.body)
        expect(json["errors"]["name"]).to include("can't be blank")
      end

      it "returns record not unique error if duplicate" do
        Category.create!(name: "Leisure")
        post "/api/categories", params: { category: { name: "Leisure" } }

        expect(response).to have_http_status(:unprocessable_content)
        json = JSON.parse(response.body)
        expect(json["errors"]["name"]).to include("Category already exists")
      end
    end
  end
end
