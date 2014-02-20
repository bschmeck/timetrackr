class TimeLogsController < ApplicationController
  before_filter :authenticate_user!, except: [:create, :finish]

  def index
    @current_task = "Email Triage"
    @tasks = [Task.new(name: "Task One"), Task.new(name: "Task Two"), Task.new(name: "Task Three"), Task.new(name: "Task Four")]
  end

  def create
    render json: {error: "User must be logged in."}, status: 401 and return unless current_user

    time_log = current_user.time_logs.create()
    time_log.start
    render json: { log_id: time_log.id }
  end

  def finish
    render json: {error: "User must be logged in."}, status: 401 and return unless current_user

    time_log = TimeLog.find(params[:id])
    render json: {error: "User does not own TimeLog #{params[:id]}."}, status: 401 and return unless current_user.id == time_log.user_id

    time_log.finish
    render json: { message: "Success." }
  end
end
