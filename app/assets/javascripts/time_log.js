var Trackr; if (!Trackr) Trackr = {};

Trackr.TimeLog = function (id, creation, completion) {
    if (id > 0)
        this.id = id;
    this.creation = creation;
    this.completion = completion;
};

Trackr.TimeLog.prototype.start = function() {
    var me = this;
    $.ajax({url: this.creation, type: "POST"}).done(function(data){
        me.id = data["log_id"];
    });
};

Trackr.TimeLog.prototype.finish = function() {
    var me = this;
    var url = this.completion.replace("/:id/", "/" + this.id + "/");
    $.ajax({url: url, type: "POST"}).done(function(data){
        alert("finished working");
    });
};
