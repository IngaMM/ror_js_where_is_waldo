class CharactersFixColumnNames < ActiveRecord::Migration[5.2]
  def change
    rename_column :characters, :xCoord, :offsetX
    rename_column :characters, :yCoord, :offsetY
  end
end
