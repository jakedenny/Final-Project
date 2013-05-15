require 'spec_helper'

describe "models/show" do
  before(:each) do
    @model = assign(:model, stub_model(Model,
      :Order => "Order",
      :color => "Color",
      :height => 1,
      :height_fraction => 1.5,
      :width => 2,
      :width_fraction => 1.5,
      :user_id => 3
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Order/)
    rendered.should match(/Color/)
    rendered.should match(/1/)
    rendered.should match(/1.5/)
    rendered.should match(/2/)
    rendered.should match(/1.5/)
    rendered.should match(/3/)
  end
end
