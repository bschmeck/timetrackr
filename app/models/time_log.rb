class TimeLog < ActiveRecord::Base
  has_many :log_entries

  scope :started, where("started_at IS NOT NULL")
  scope :active, started.where(finished_at: nil)
  scope :finished, where("finished_at IS NOT NULL")


  def start
    update_attributes(started_at: Time.now)
  end

  def finish
    update_attributes(finished_at: Time.now)
  end
end
