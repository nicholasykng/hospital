class CreateVisits < ActiveRecord::Migration[6.0]
  def change
    create_table :visits do |t|
      t.belongs_to :patient
      t.string :title
      t.string :date_of_visit
      t.string :doctor
      t.string :description
      t.timestamps
    end
  end
end
