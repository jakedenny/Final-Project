class Model < ActiveRecord::Base
  attr_accessible :Order, :color, :height, :height_fraction, :user_id, :width, :width_fraction
end
