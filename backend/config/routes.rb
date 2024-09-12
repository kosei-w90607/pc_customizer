Rails.application.routes.draw do
  namespace :api do
    get 'top', to: 'top#index'
  end
end
