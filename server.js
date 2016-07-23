var express = require('express');
var mysql = require('mysql');
var app = express();
//hi

app.get('/', function(req, res) {
  res.send('Hello Seattle\n');
});

app.get('/api/', function(req, res) {
    res.send('hello from the api');
});

app.listen(3001);

console.log('Listening on port 3001...');
