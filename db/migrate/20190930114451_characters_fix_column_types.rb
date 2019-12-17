class CharactersFixColumnTypes < ActiveRecord::Migration[5.2]
  def change
    change_column :characters, :offsetX, :integer
    change_column :characters, :offsetY, :integer
  end
end
