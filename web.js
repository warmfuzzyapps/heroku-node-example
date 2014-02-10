// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

var exercises = require('./exercises.json');

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
    var shuffled = shuffle(exercises);
    var workout = {
        n: 'Random Workout',
        c: shuffled[0],
        d: shuffled[1],
        h: shuffled[2],
        s: shuffled[3],
        j: shuffled[4]
    };

    var query = querystring.stringify(workout);

    logfmt.log(workout);

    res.redirect('http://ripdeckapp.com/workout/?'+query);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});

/*
 * Fisher–Yates shuffle
 * http://bost.ocks.org/mike/shuffle/
 * http://en.wikipedia.org/wiki/Fisher–Yates_shuffle
 */
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

