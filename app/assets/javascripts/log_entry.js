var Trackr; if (!Trackr) Trackr = {};

Trackr.LogEntry = function (id, timeLog) {
    this.id = id;
    this.finishUrl = timeLog.taskFinishUrl.replace("/:entry_id/", id);
};

Trackr.LogEntry.prototype.finish = function() {
    var me = this;
    $.ajax({url: this.finishUrl, type: "POST"}).done(function(data){
        alert("finished working on task");
    });
};
