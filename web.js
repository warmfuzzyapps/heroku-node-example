// web.js
var express = require("express"),
    logfmt = require("logfmt"),
    querystring = require('querystring'),
    exercises = require('./exercises.json'),
    port = Number(process.env.PORT || 5000),
    app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
    var shuffled = shuffle(exercises),
        workout = {
            n: 'Random Workout',
            c: shuffled[0],
            d: shuffled[1],
            h: shuffled[2],
            s: shuffled[3],
            j: shuffled[4]
        },
        query = querystring.stringify(workout);

    logfmt.log(workout);

    res.redirect('http://ripdeckapp.com/workout/?'+query);
});

app.listen(port, function() {
    console.log("Listening on " + port);
});

/*
 * Fisher–Yates shuffle
 * http://bost.ocks.org/mike/shuffle/
 * http://en.wikipedia.org/wiki/Fisher–Yates_shuffle
 */
function shuffle(array) {
  var m = array.length, 
      t, 
      i;

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

