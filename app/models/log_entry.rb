class LogEntry < ActiveRecord::Base
  belongs_to :time_log
  belongs_to :task
end
