FinalProject::Application.routes.draw do

  get "users/new"

  get "users/create"

  get "sessions/new"

  get "sessions/create"

  get "sessions/destroy"

  get "log_out" => "sessions#destroy", :as => "log_out"
  get "log_in" => "sessions#new", :as => "log_in"
  get "sign_up" => "users#new", :as => "sign_up"
  root :to => "users#new"
  resources :users
  resources :sessions

end
