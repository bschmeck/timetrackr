var Trackr; if (!Trackr) Trackr = {};

Trackr.TimeLog = function () {
    this.id = 0;
};

Trackr.TimeLog.prototype.start = function() {
    if (this.id > 0) {
        this.finish_url = Trackr.config["log_finish_url"].replace("/:log_id/", "/" + this.id + "/");
        return;
    };
    var me = this;
    $.ajax({url: Trackr.config["log_start_url"], type: "POST"}).done(function(data){
        me.id = data["log_id"];
        me.finish_url = Trackr.config["log_finish_url"].replace("/:log_id/", "/" + me.id + "/");
    });
};

Trackr.TimeLog.prototype.finish = function(callback) {
    var me = this;
    $.ajax({url: this.finish_url, type: "POST"}).done(function(data){
        alert("finished working");
        callback();
    });
};

Trackr.TimeLog.prototype.start_task = function(task, callback) {};
