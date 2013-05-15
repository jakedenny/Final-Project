require 'spec_helper'

describe "orders/new" do
  before(:each) do
    assign(:order, stub_model(Order,
      :color => "MyString",
      :height => 1,
      :height_fraction => 1.5,
      :width => 1,
      :width_fraction => 1.5,
      :user_id => 1
    ).as_new_record)
  end

  it "renders new order form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", orders_path, "post" do
      assert_select "input#order_color[name=?]", "order[color]"
      assert_select "input#order_height[name=?]", "order[height]"
      assert_select "input#order_height_fraction[name=?]", "order[height_fraction]"
      assert_select "input#order_width[name=?]", "order[width]"
      assert_select "input#order_width_fraction[name=?]", "order[width_fraction]"
      assert_select "input#order_user_id[name=?]", "order[user_id]"
    end
  end
end
