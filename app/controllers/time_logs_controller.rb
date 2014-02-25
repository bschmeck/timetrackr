class TimeLogsController < ApplicationController
  before_filter :authenticate_user!, except: [:create, :finish]
  before_filter :json_user_required, only: [:create, :finish]

  def index
    @current_log = current_user.time_logs.active.first
    @tasks = current_user.tasks
  end

  def create
    time_log = current_user.time_logs.create()
    time_log.start
    render json: { log_id: time_log.id }
  end

  def finish
    time_log = TimeLog.find(params[:id])
    render json: {error: "User does not own TimeLog #{params[:id]}."}, status: 401 and return unless current_user.id == time_log.user_id

    time_log.finish
    render json: { message: "Success." }
  end
end
