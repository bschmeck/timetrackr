class ApplicationController < ActionController::Base
  protect_from_forgery

  def json_user_required
    render json: {error: "User must be logged in."}, status: 401 unless current_user
  end
end
