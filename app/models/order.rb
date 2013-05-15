class Order < ActiveRecord::Base
  attr_accessible :color, :height, :height_fraction, :user_id, :width, :width_fraction
end
