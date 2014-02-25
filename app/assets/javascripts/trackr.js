var Trackr; if (!Trackr) Trackr = {};

Trackr.init = function() {
    var me = this;

    this.config = {};
    this.tasks = [];

    this.$start_button = $("#btn_start");
    this.$finish_button = $("#btn_finish");
    this.$new_task_name = $("#txt_new_task");
    this.$new_task_button = $("#btn_new_task");
    this.$task_list = $("#task_list");

    this.$start_button.click(function(){ me.start_log(); });
	this.$finish_button.click(function(){ me.finish_log(); });

    this.$new_task_name.keyup(function(){
        var disabled = "disabled";
        if (me.time_log && me.$new_task_name.val()[0])
            disabled = false;
        me.$new_task_button.attr("disabled", disabled);
    });
    this.$new_task_button.click(function(){
        var task = Trackr.Task.create(me.$new_task_name.val(), function(task) {
            me.add_task(task);
            me.time_log.start_task(task);
        });
    });
};

Trackr.start_log = function() {
    this.time_log = new Trackr.TimeLog();
    this.time_log.start();

    this.$start_button.hide();
    this.$finish_button.show();
};

Trackr.start_existing_log = function(id) {
    this.time_log = new Trackr.TimeLog();
    this.time_log.id = id;
    this.time_log.start();

    this.$start_button.hide();
    this.$finish_button.show();
};

Trackr.finish_log = function() {
    var me = this;
    this.$finish_button.attr("disabled", "disabled");
    this.time_log.finish(function() {
        me.time_log = null;

        me.$start_button.show();
        me.$finish_button.hide();
        me.$finish_button.attr("disabled", false);
    });
};

Trackr.add_task = function(task) {
    var me = this;
    this.tasks.push(task);
    var elt = $("<li>", {
        id: "task_" + task.id
    }).text(task.name);
    elt.click(function(){ me.time_log.start_task(task); });
    this.$task_list.append(elt);
};
