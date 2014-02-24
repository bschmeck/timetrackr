class TasksController < ApplicationController
  before_filter :json_user_required, only: [:create, :index]

  def index
    render json: current_user.tasks.map{|task| { task_id: task.id, task_name: task.name} }
  end

  def create
    name = params[:name]
    render json: { error: "Cannot create task with blank name."}, status: 400 and return if name.blank?

    task = current_user.tasks.create(name: name)
    render json: { task_id: task.id, task_name: task.name }
  end
end
