var Trackr; if (!Trackr) Trackr = {};

Trackr.TimeLog = function (creation, completion) {
    this.creation = creation;
    this.completion = completion;
};

Trackr.TimeLog.prototype.start = function() {
    var me = this;
    $.ajax({url: this.creation, type: "POST"}).done(function(data){
        me.id = data["log_id"];
    });
};
