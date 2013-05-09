FinalProject::Application.routes.draw do

  get "users/new"
  get "users/create"
  get "sessions/new"
  get "sessions/create"
  get "sessions/destroy"

  get "log_out" => "sessions#destroy", :as => "log_out"
  get "log_in" => "sessions#new", :as => "log_in"
  get "sign_up" => "users#new", :as => "sign_up"

  get "account" => "static_pages#account", :as => "account"
  get "cart" => "static_pages#cart", :as => "cart"

  root :to => "static_pages#index"
  
  get "choose" => "static_pages#choose", :as => "choose"
  get "measure" => "static_pages#measure", :as => "measure"
  get "order" => "static_pages#order", :as => "order"
  get "install" => "static_pages#install", :as => "install"

  resources :users
  resources :sessions

end
