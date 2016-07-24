var mysql      = require('mysql');
// First you need to create a connection to the db
var demoji_db = mysql.createConnection({
  host     : '159.203.240.126',
  user     : 'remote',
  password : 'hack2040',
  database : 'sys'
});

/*
demoji_db.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established we got db up');
});
*/


var showColumns = function(){
  demoji_db.query('SHOW COLUMNS FROM pictures', function(err, rows, fields){ 
    
    for(var i=0; i<rows.length; i++) {
      console.log(rows[i].Field);
    }
  });
}


var addUser = function(username, gender, race, sexual_orientation, income, age, religion, city) {
  demoji_db.query('INSERT INTO users (username, gender, race, sexual_orientation, income, age, religion, city)'+
  'VALUES ('+username+', '+gender+', '+race+', '+sexual_orientation+', '+income+', '+age+', '+religion+', '+city+')', function(err, rows, fields){

    if(err){
      console.log(err);
      return;
    }

    console.log('yay');

  });
}

var insertImageData = function(url) {
  demoji_db.query('INSERT INTO pictures (url)'+
  'VALUES ('+url+')', function(err, rows, fields){

    if(err){
      console.log(err);
      return;
    }

    console.log('wowzers');

  });
}

var insertReaction = function(userId, imageId, reaction) {

  var reactionColumn = reaction.substring(1, reaction.length-1);

  demoji_db.query('INSERT INTO reactions (user_id, image_id, reaction)'+
  'VALUES ('+userId+', '+imageId+', '+reaction+')', function(err, rows, fields){

    if(err){
      console.log(err);
      return;
    }

    console.log('coolio');

  });



  demoji_db.query('UPDATE pictures SET '+reactionColumn+' = '+reactionColumn+' + 1 WHERE image_id = '+imageId, function(err, rows, fields) {

    if(err){
      console.log(err);
      return;
    }

    console.log('updated');
  });
}

insertReaction('3', '1', '"laughing"');

//insertImageData('"kofi@gamil.com"');
//addUser('"fredrick"', '"male"', '"black"', '"straight"', '"3983873942883"', '20', '"christian"', '"Accra"');

demoji_db.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
