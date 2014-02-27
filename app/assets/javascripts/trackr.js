var Trackr; if (!Trackr) Trackr = {};

Trackr.init = function() {
    var me = this;

    this.config = {};
    this.tasks = ko.observableArray([]);
    this.timeLog = ko.observable();

    this.$startButton = $("#btn_start");
    this.$finishButton = $("#btn_finish");
    this.$newTaskName = $("#txt_new_task");
    this.$newTaskButton = $("#btn_new_task");
    
    this.$startButton.click(function(){ me.startLog(); });
	this.$finishButton.click(function(){ me.finishLog(); });

    this.$newTaskName.keyup(function(){
        var disabled = "disabled";
        if (me.timeLog() && me.$newTaskName.val()[0])
            disabled = false;
        me.$newTaskButton.attr("disabled", disabled);
    });
    this.$newTaskButton.click(function(){
        var task = Trackr.Task.create(me.$newTaskName.val(), function(task) {
            me.addTask(task);
            me.timeLog().startTask(task);
        });
    });

    this.currentTaskName = ko.computed(function() {
        if (this.timeLog()) {
            return this.timeLog().currentTaskName();
        }
        return "--";
    }, this);

    this.queuedTasks = ko.computed(function() {
        if (this.timeLog()) {
            return this.timeLog().taskQueue();
        }
        return [];
    }, this);
};

Trackr.startLog = function() {
    this.timeLog(new Trackr.TimeLog());
    this.timeLog().start();

    this.$startButton.hide();
    this.$finishButton.show();
};

Trackr.startExistingLog = function(id) {
    this.timeLog(new Trackr.TimeLog());
    this.timeLog().id = id;
    this.timeLog().start();

    this.$startButton.hide();
    this.$finishButton.show();
};

Trackr.finishLog = function() {
    var me = this;
    this.$finishButton.attr("disabled", "disabled");
    this.timeLog().finish(function() {
        me.timeLog(null);

        me.$startButton.show();
        me.$finishButton.hide();
        me.$finishButton.attr("disabled", false);
    });
};

Trackr.addTask = function(task) {
    this.tasks.push(task);
};
