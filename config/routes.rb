Timetrackr::Application.routes.draw do
  devise_for :users
  devise_scope :user do
    get "/login" => "devise/sessions#new", as: :login
    get "/logout" => "devise/sessions#destroy", as: :logout
    get "/signup" => "devise/registrations#new", as: :signup
    get "/forgot" => "devise/passwords#new", :as => :forgot
    get "/reset" => "devise/passwords#edit", :as => :reset
  end

  get '/' => "time_logs#index", as: :root

  resources :time_logs, only: [:create, :index] do
    member do
      post 'finish'
    end
    resources :log_entries, only: [:create] do
      member do
        post 'finish'
      end
    end
  end
  resources :tasks, only: [:create, :index]
end
