var Trackr; if (!Trackr) Trackr = {};

Trackr.LogEntry = function (id, time_log) {
    this.id = id;
    this.finish_url = time_log.task_finish_url.replace("/:entry_id/", id);
};

Trackr.LogEntry.prototype.finish = function() {
    var me = this;
    $.ajax({url: this.finish_url, type: "POST"}).done(function(data){
        alert("finished working on task");
    });
};
