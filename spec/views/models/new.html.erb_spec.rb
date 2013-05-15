require 'spec_helper'

describe "models/new" do
  before(:each) do
    assign(:model, stub_model(Model,
      :Order => "MyString",
      :color => "MyString",
      :height => 1,
      :height_fraction => 1.5,
      :width => 1,
      :width_fraction => 1.5,
      :user_id => 1
    ).as_new_record)
  end

  it "renders new model form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", models_path, "post" do
      assert_select "input#model_Order[name=?]", "model[Order]"
      assert_select "input#model_color[name=?]", "model[color]"
      assert_select "input#model_height[name=?]", "model[height]"
      assert_select "input#model_height_fraction[name=?]", "model[height_fraction]"
      assert_select "input#model_width[name=?]", "model[width]"
      assert_select "input#model_width_fraction[name=?]", "model[width_fraction]"
      assert_select "input#model_user_id[name=?]", "model[user_id]"
    end
  end
end
