var exports = module.exports = {};

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


exports.showColumns = function(){
  demoji_db.query('SHOW COLUMNS FROM users', function(err, rows, fields){ 
    
    for(var i=0; i<rows.length; i++) {
      console.log(rows[i].Field);
    }
  });
}


exports.addUser = function(username, gender, race, sexual_orientation, income, age, religion, city) {
  demoji_db.query('INSERT INTO users (username, gender, race, sexual_orientation, income, age, religion, city)'+
  'VALUES ('+username+', '+gender+', '+race+', '+sexual_orientation+', '+income+', '+age+', '+religion+', '+city+')', function(err, rows, fields){

    if(err){
      console.log(err);
      return;
    }

    console.log('addUser');

  });
}

exports.insertImageData = function(url) {
  demoji_db.query('INSERT INTO pictures (url)'+
  'VALUES ('+url+')', function(err, rows, fields){

    if(err){
      console.log(err);
      return;
    }

    console.log('insertImageData');

  });
}

exports.insertReaction = function(userId, imageId, reaction) {

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

    console.log('insertReaction');
  });
}

exports.getRelevantPicData = function(imageId,demoData,reactionData) {
	demoji_db.query('SELECT reactions.image_id, users.id,users.username, reactions.reaction, users.city, users.sexual_orientation, users.race,users.age, users.gender, users.income, users.religion FROM reactions INNER JOIN users ON reactions.user_id = users.id WHERE image_id='+imageId, function(err, rows, fields) {
    
    if(err){
      console.log(err);
    }

    if (demoData != "'age'") {
        var demographic = demoData.substring(1, demoData.length-1);
    }

    var reaction = reactionData.substring(1, reactionData.length-1);

    var data = {  
                 "gender":{  
                    "male":0,
                    "female":0,
                    "trans_male":0,
                    "trans_female":0,
                    "nonbinary":0
                 },
                 "race":{  
                    "black":0,
                    "hispanic":0,
                    "asian":0,
                    "white":0
                 },
                 "sexual_orientation":{  
                    "straight":0,
                    "gay":0,
                    "other":0
                 },
                 "income":0,
                 "age":0,
                 "religion":0,
                 "city":0
              }

    for(var i=0; i<rows.length; i++) {

      if (data.gender[rows[i].gender]) {
        data.gender[rows[i].gender]++;
      }

      /*
    	if (demographic == rows[i].gender) {
    		count++;
    	} else if (demographic == rows[i].age) {
    		count++;
    	} else if (demographic == rows[i].race) {
    		count++;
    	} else if (demographic == rows[i].sexual_orientation) {
    		count++;
    	} else if (demographic == rows[i].religion) {
    		count++;
    	} else if (demographic == rows[i].city) {
    		count++;
    	} else if (demographic == rows[i].income) {
    		count++;
    	}
      */


    
    }

    console.log(data);
    
    //console.log(demoData + " " + count + " " + reaction);

    console.log('getRelevantPicData');
});

}


/*
demoji_db.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
*/
