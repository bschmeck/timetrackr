var Trackr; if (!Trackr) Trackr = {};

Trackr.Task = function(name, id) {
    this.id = id;
    this.name = name;
};

Trackr.Task.create = function(name, callback) {
    var payload = {name: name};
    $.ajax({url: Trackr.config["task_create_url"], type: "POST", data: payload}).done(function(data){
        task = new Trackr.Task(data["task_name"], data["task_id"]);
        callback(task);
    });
};
