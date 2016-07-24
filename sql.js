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

exports.getRelevantPicData = function(imageId, callback) {
	demoji_db.query('SELECT reactions.image_id, users.id,users.username, reactions.reaction, users.city, users.sexual_orientation, users.race,users.age, users.gender, users.income, users.religion FROM reactions INNER JOIN users ON reactions.user_id = users.id WHERE image_id='+imageId, function(err, rows, fields) {
    
    if(err){
      console.log(err);
    }

    var data = {  
                 "gender":{  
                    "male":{  
                       "happy":0,
                       "sad":0,
                       "annoyed":0,
                       "love":0,
                       "angry":0,
                       "laughing":0
                    },
                    "female":{  
                       "happy":0,
                       "sad":0,
                       "annoyed":0,
                       "love":0,
                       "angry":0,
                       "laughing":0
                    },
                    "trans_male":{  
                       "happy":0,
                       "sad":0,
                       "annoyed":0,
                       "love":0,
                       "angry":0,
                       "laughing":0
                    },
                    "trans_female":{  
                       "happy":0,
                       "sad":0,
                       "annoyed":0,
                       "love":0,
                       "angry":0,
                       "laughing":0
                    },
                    "nonbinary":{  
                       "happy":0,
                       "sad":0,
                       "annoyed":0,
                       "love":0,
                       "angry":0,
                       "laughing":0
                    }
                 },
                 "race":{  
                    "black":{  
                       "happy":0,
                       "sad":0,
                       "annoyed":0,
                       "love":0,
                       "angry":0,
                       "laughing":0
                    },
                    "hispanic":{  
                       "happy":0,
                       "sad":0,
                       "annoyed":0,
                       "love":0,
                       "angry":0,
                       "laughing":0
                    },
                    "asian":{  
                       "happy":0,
                       "sad":0,
                       "annoyed":0,
                       "love":0,
                       "angry":0,
                       "laughing":0
                    },
                    "white":{  
                       "happy":0,
                       "sad":0,
                       "annoyed":0,
                       "love":0,
                       "angry":0,
                       "laughing":0
                    }
                 },
                 "sexual_orientation":{  
                    "straight":{  
                       "happy":0,
                       "sad":0,
                       "annoyed":0,
                       "love":0,
                       "angry":0,
                       "laughing":0
                    },
                    "gay":{  
                       "happy":0,
                       "sad":0,
                       "annoyed":0,
                       "love":0,
                       "angry":0,
                       "laughing":0
                    },
                    "other":{  
                       "happy":0,
                       "sad":0,
                       "annoyed":0,
                       "love":0,
                       "angry":0,
                       "laughing":0
                    }
                 },
                 "income":{  
                    "happy":0,
                    "sad":0,
                    "annoyed":0,
                    "love":0,
                    "angry":0,
                    "laughing":0
                 },
                 "age":{  
                    "happy":0,
                    "sad":0,
                    "annoyed":0,
                    "love":0,
                    "angry":0,
                    "laughing":0
                 },
                 "religion":{  
                    "happy":0,
                    "sad":0,
                    "annoyed":0,
                    "love":0,
                    "angry":0,
                    "laughing":0
                 },
                 "city":{  
                    "happy":0,
                    "sad":0,
                    "annoyed":0,
                    "love":0,
                    "angry":0,
                    "laughing":0
                 }
              }

    for(var i=0; i<rows.length; i++) {

      if (data.gender[rows[i].gender] != null) {
        data.gender[rows[i].gender][rows[i].reaction]++;
      }

      if (data.race[rows[i].race] != null) {
        data.race[rows[i].race][rows[i].reaction]++;
      }

      if (data.sexual_orientation[rows[i].sexual_orientation] != null) {
        data.sexual_orientation[rows[i].sexual_orientation][rows[i].reaction]++;
      }

      //data.income[rows[i].income][reaction]++;
      //data.age[rows[i].age][reaction]++;
      //data.religion[rows[i].religion][reaction]++;
      //data.city[rows[i].city][reaction]++;

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
    console.log('getRelevantPicData');
    
    callback(data);
    //console.log(demoData + " " + count + " " + reaction);
    return data;
});

}


/*
demoji_db.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
*/
