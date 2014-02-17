Timetrackr::Application.routes.draw do
  devise_for :users
  devise_scope :user do
    get "/login" => "devise/sessions#new", as: :login
    get "/logout" => "devise/sessions#destroy", as: :logout
    get "/signup" => "devise/registrations#new", as: :signup
    get "/forgot" => "devise/passwords#new", :as => :forgot
    get "/reset" => "devise/passwords#edit", :as => :reset
  end
end
