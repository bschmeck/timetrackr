var Trackr; if (!Trackr) Trackr = {};

Trackr.config = {};

Trackr.start_log = function() {
    this.time_log = new Trackr.TimeLog();
    this.time_log.start();
};

Trackr.start_existing_log = function(id) {
    this.time_log = new Trackr.TimeLog();
    this.time_log.id = id;
    this.time_log.start();
};
