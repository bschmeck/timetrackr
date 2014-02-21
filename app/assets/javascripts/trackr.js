var Trackr; if (!Trackr) Trackr = {};

Trackr.init = function() {
    var me = this;

    this.config = {};
    this.$start_button = $("#btn_start");
    this.$finish_button = $("#btn_finish");
    this.$new_task_name = $("#txt_new_task");
    this.$new_task_button = $("#btn_new_task");

    this.$start_button.click(function(){ me.start_log(); });
	this.$finish_button.click(function(){ me.finish_log(); });

    this.$new_task_name.keyup(function(){
        var disabled = "disabled";
        if (me.$new_task_name.val()[0])
            disabled = false;
        me.$new_task_button.attr("disabled", disabled);
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
    this.time_log.finish();

    this.$start_button.show();
    this.$finish_button.hide();
};
