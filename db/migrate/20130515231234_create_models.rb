class CreateModels < ActiveRecord::Migration
  def change
    create_table :models do |t|
      t.string :Order
      t.string :color
      t.integer :height
      t.float :height_fraction
      t.integer :width
      t.float :width_fraction
      t.integer :user_id

      t.timestamps
    end
  end
end
