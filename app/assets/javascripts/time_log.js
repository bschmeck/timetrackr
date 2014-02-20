function start_log() {
    $.ajax({url: "time_logs", type: "POST"}).done(function(data){
        alert(data["log_id"]);
    });
}
