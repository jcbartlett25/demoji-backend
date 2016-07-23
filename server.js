var express = require('express');
var mysql = require('mysql');
var app = express();


// First you need to create a connection to the db
var demoji_db = mysql.createConnection({
  host: "localhost",
  user: "Kofi",
  password: "jay",
  database: "sitepoint"
});

demoji_db .connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

demoji_db.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});

app.get('/api/', function(req, res) {
    res.send('hello from the api');
    res.send(404, 'No musicians here');
});

require('./routes')(app);	
app.listen(3001);

console.log('Listening on port 3001...');
