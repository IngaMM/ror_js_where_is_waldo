class AddPictureIdToCharacter < ActiveRecord::Migration[5.2]
  def change
    add_column :characters, :picture_id, :integer
  end
end
