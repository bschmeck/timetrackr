class TimeLog < ActiveRecord::Base
  def start
    update_attributes(started_at: Time.now)
  end

  def finish
    update_attributes(finished_at: Time.now)
  end
end
