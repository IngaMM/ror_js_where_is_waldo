class CreateCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :characters do |t|
      t.string :name
      t.float :xCoord
      t.float :yCoord

      t.timestamps
    end
  end
end
