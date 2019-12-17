Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'
  get 'playscreen', :to => 'playscreen#index'
  resources :players,    only: [:index, :create]
end
