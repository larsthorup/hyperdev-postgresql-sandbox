// server.js
// where your node app starts

// init project
var express = require('express');
var pgp = require('pg-promise')();
console.log('process.env.DBCONNECTION', process.env.DBCONNECTION)
var db = pgp(process.env.DBCONNECTION);

var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

function onGetDreams (request, response) {
  db.query('select * from dream').then(function (data) {
    var dreams = data.map(function (row) {
      return row.title;
    });
    response.send(dreams);
  });
}

app.get("/dreams", onGetDreams);

function onDreamPosted (request, response) {
  var dream = request.query.dream;
  db.query(`insert into dream (title) values ('${dream}')`);
  response.sendStatus(200);
}

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", onDreamPosted);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function onDeleteDream (request, response) {
  var dream = request.query.dream;
  db.query(`delete from dream where title = '${dream}'`)
  response.sendStatus(200);
}

app.delete("/dreams", onDeleteDream)
