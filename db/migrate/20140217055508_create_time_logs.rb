class CreateTimeLogs < ActiveRecord::Migration
  def change
    create_table :time_logs do |t|
      t.datetime :started_at
      t.datetime :ended_at
      t.integer :user_id
      t.timestamps
    end
  end
end
