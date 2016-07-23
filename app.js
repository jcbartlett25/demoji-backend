var express = require('express');
var app = express();


app.get('/', function(req, res) {
  res.send('Hello Seattle\n');
});

app.get('/api/', function(req, res) {

});

app.listen(3001);

console.log('Listening on port 3001...');