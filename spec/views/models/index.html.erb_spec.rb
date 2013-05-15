require 'spec_helper'

describe "models/index" do
  before(:each) do
    assign(:models, [
      stub_model(Model,
        :Order => "Order",
        :color => "Color",
        :height => 1,
        :height_fraction => 1.5,
        :width => 2,
        :width_fraction => 1.5,
        :user_id => 3
      ),
      stub_model(Model,
        :Order => "Order",
        :color => "Color",
        :height => 1,
        :height_fraction => 1.5,
        :width => 2,
        :width_fraction => 1.5,
        :user_id => 3
      )
    ])
  end

  it "renders a list of models" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Order".to_s, :count => 2
    assert_select "tr>td", :text => "Color".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => 1.5.to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 1.5.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
  end
end
