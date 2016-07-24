var express = require('express');
var app = express();
var db = require('./sql');
require('./routes')(app);

app.get('/', function(req, res) {
  res.send('Hello Seattle\n');
});
db.showColumns();
db.getRelevantPicData('4','male');
app.listen(3001);

console.log('Listening on port 3001...');
