// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
    var name = 'Random Workout';
    var query = '?n=' + name;
    res.redirect('http://ripdeckapp.com/workout/'+query);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});
