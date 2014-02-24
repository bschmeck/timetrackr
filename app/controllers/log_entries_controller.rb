class LogEntriesController < ApplicationController
  before_filter :json_user_required, only: [:create]

  def create
    time_log = TimeLog.find(params[:time_log_id])
    render json: {error: "User does not own TimeLog #{params[:time_log_id]}."}, status: 401 and return unless current_user.id == time_log.user_id

    task = Task.find(params[:task_id])
    render json: {error: "User does not own Task #{params[:task_id]}."}, status: 401 and return unless current_user.id == task.user_id

    entry = time_log.log_entries.create(task: task, started_at: Time.now)
    render json: { entry_id: entry.id }
  end
end
