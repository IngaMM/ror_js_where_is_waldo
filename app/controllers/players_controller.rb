class PlayersController < ApplicationController
  def new
    @player = Player.new
  end

  def create
    @player = Player.new(player_params)
    @player.save
    redirect_to players_path()
  end


  def index
    @players = Player.all.order('players.score DESC')
  end

  private
    def player_params
      params.require(:player).permit(:name, :score)
    end

end
