class CreateInvoice < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.string :color
      t.integer :size

      t.timestamps
    end
  end
end
