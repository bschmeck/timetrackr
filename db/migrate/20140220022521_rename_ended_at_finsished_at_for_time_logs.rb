class RenameEndedAtFinsishedAtForTimeLogs < ActiveRecord::Migration
  def change
    rename_column :time_logs, :ended_at, :finished_at
  end
end
