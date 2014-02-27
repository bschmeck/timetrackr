var Trackr; if (!Trackr) Trackr = {};

Trackr.TimeLog = function () {
    this.id = 0;
    this.current_task = ko.observable();
    this.task_queue = ko.observableArray([]);
    
    this.current_task_name = ko.computed(function() {
        if (this.current_task()) {
            return this.current_task().name;
        }
        return "--";
    }, this);
};

Trackr.TimeLog.prototype.start = function() {
    if (this.id > 0) {
        this.config_urls();
        return;
    };
    var me = this;
    $.ajax({url: Trackr.config["log_start_url"], type: "POST"}).done(function(data){
        me.id = data["log_id"];
        me.config_urls();
    });
};

Trackr.TimeLog.prototype.config_urls = function() {
    this.finish_url = Trackr.config["log_finish_url"].replace("/:log_id/", "/" + this.id + "/");
    this.task_start_url = Trackr.config["task_start_url"].replace("/:log_id/", "/" + this.id + "/");
    this.task_finish_url = Trackr.config["task_finish_url"].replace("/:log_id/", "/" + this.id + "/");
};

Trackr.TimeLog.prototype.finish = function(callback) {
    var me = this;
    $.ajax({url: this.finish_url, type: "POST"}).done(function(data){
        alert("finished working");
        callback();
    });
};

Trackr.TimeLog.prototype.start_task = function(task, callback) {
    var me = this;
    var payload = {task_id: task.id};
    $.ajax({url: this.task_start_url, type: "POST", data: payload}).done(function(data){
        me.current_task(task);
        me.entry = new Trackr.LogEntry(data.entry_id, me);
        me.task_finish_url = me.task_finish_url.replace("/:entry_id/", "/" + me.entry.id + "/");
        if (callback)
            callback();
    });
};

Trackr.TimeLog.prototype.enqueue_task = function(task) {
    this.task_queue.unshift(task);
};

Trackr.TimeLog.prototype.dequeue_task = function() {
    return this.task_queue.shift();
};
