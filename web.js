// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

var exercises = [
    'Push-ups',
    'Sit-ups',
    'Jumping Jacks',
    'Mountain Climbers',
    'Burpees',
    'Pull-ups',
    'Squats',
    'Bicycle Crunches',
    'Tricep Dips',
    'Leg Lifts',
];

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
    var shuffled = shuffle(exercises);
    var clubs = shuffled[0];
    var diamonds = shuffled[1];
    var hearts = shuffled[2];
    var spades = shuffled[3];
    var joker = shuffled[4];
    var name = 'Random Workout';
    var query = 
        '?n=' + name + 
        '&c=' + clubs + 
        '&d=' + diamonds + 
        '&h=' + hearts + 
        '&s=' + spades + 
        '&j=' + joker;
    res.redirect('http://ripdeckapp.com/workout/'+query);
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

