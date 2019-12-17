class PlayscreenController < ApplicationController
  def index
    @pictureId = params[:pic_id]
    @picture = Picture.find(@pictureId)
    @characters = @picture.characters
  end
end
