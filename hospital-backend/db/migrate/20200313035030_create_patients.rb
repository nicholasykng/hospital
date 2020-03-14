class CreatePatients < ActiveRecord::Migration[6.0]
  def change
    create_table :patients do |t|
      t.string :name
      t.string :sex
      t.string :gender
      t.integer :age
      t.string :date_of_birth
      t.timestamps
    end
  end
end
