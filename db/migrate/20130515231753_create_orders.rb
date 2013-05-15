class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
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
