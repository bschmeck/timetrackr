var Trackr; if (!Trackr) Trackr = {};

Trackr.TimeLog = function () {
    this.id = 0;
    this.currentTask = ko.observable();
    this.taskQueue = ko.observableArray([]);
    
    this.currentTaskName = ko.computed(function() {
        if (this.currentTask()) {
            return this.currentTask().name;
        }
        return "--";
    }, this);
};

Trackr.TimeLog.prototype.start = function() {
    if (this.id > 0) {
        this.configUrls();
        return;
    };
    var me = this;
    $.ajax({url: Trackr.config["logStartUrl"], type: "POST"}).done(function(data){
        me.id = data["log_id"];
        me.configUrls();
    });
};

Trackr.TimeLog.prototype.configUrls = function() {
    this.finishUrl = Trackr.config["logFinishUrl"].replace("/:log_id/", "/" + this.id + "/");
    this.taskStartUrl = Trackr.config["taskStartUrl"].replace("/:log_id/", "/" + this.id + "/");
    this.taskFinishUrl = Trackr.config["taskFinishUrl"].replace("/:log_id/", "/" + this.id + "/");
};

Trackr.TimeLog.prototype.finish = function(callback) {
    var me = this;
    $.ajax({url: this.finishUrl, type: "POST"}).done(function(data){
        alert("finished working");
        callback();
    });
};

Trackr.TimeLog.prototype.startTask = function(task, callback) {
    var me = this;
    var payload = {task_id: task.id};
    $.ajax({url: this.taskStartUrl, type: "POST", data: payload}).done(function(data){
        me.currentTask(task);
        me.entry = new Trackr.LogEntry(data.entry_id, me);
        me.taskFinishUrl = me.taskFinishUrl.replace("/:entry_id/", "/" + me.entry.id + "/");
        if (callback)
            callback();
    });
};

Trackr.TimeLog.prototype.enqueueTask = function(task) {
    this.taskQueue.unshift(task);
};

Trackr.TimeLog.prototype.dequeueTask = function() {
    return this.taskQueue.shift();
};
