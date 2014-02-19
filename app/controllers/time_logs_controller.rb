class TimeLogsController < ApplicationController
  before_filter :authenticate_user!

  def index
    @current_task = "Email Triage"
    @tasks = [Task.new(name: "Task One"), Task.new(name: "Task Two"), Task.new(name: "Task Three"), Task.new(name: "Task Four")]
  end
end
