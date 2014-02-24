var Trackr; if (!Trackr) Trackr = {};

Trackr.Task = function(name, id) {
    this.id = id;
    this.name = name;
};

Trackr.Task.create = function(name, callback) {
    $.ajax({url: Trackr.config["task_create_url"], type: "POST"}).done(function(data){
        task = new Trackr.Task(data["task_id"], data["task_name"]);
        callback(task);
    });
};
