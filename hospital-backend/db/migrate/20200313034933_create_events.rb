class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :title
      t.string :date_of_visit
      t.string :doctor
      t.string :description
      t.belongs_to :patient

      t.timestamps
    end
  end
end
