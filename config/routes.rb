FinalProject::Application.routes.draw do

  root :to => "static_pages#welcome"
  #get "/" => "static_pages#welcome"

  post "create" => "static_pages#create"

  #No route matches {:action=>"create", :controller=>"static_pages"}

end
