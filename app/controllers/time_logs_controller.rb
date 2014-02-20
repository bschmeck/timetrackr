class TimeLogsController < ApplicationController
  before_filter :authenticate_user!, except: [:create]

  def index
    @current_task = "Email Triage"
    @tasks = [Task.new(name: "Task One"), Task.new(name: "Task Two"), Task.new(name: "Task Three"), Task.new(name: "Task Four")]
  end

  def create
    render json: {error: "User must be logged in."}, status: 401 and return unless current_user

    time_log = current_user.time_logs.create(started_at: Time.now)
    render json: { log_id: time_log.id }
  end
end
