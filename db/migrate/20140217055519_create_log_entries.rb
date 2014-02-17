class CreateLogEntries < ActiveRecord::Migration
  def change
    create_table :log_entries do |t|
      t.datetime :started_at
      t.datetime :ended_at
      t.integer :time_log_id
      t.integer :task_id, null: false
      t.timestamps
    end
  end
end
