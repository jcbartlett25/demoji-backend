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

exports.insertImageData = function(url, flickrId) {
  demoji_db.query('INSERT INTO pictures1 (url, flickr_id)'+
  'VALUES ('+url+', '+flickrId+')', function(err, rows, fields){

    if(err && err.errno == 1062){
      console.log('duplicate');
      return;
    }
    else if(err){
      console.log(err);
      return;
    }

    console.log('insertImageData');

  });
}

exports.insertReaction = function(userId, flickrId, reaction) {

  var reactionColumn = reaction.substring(1, reaction.length-1);

  demoji_db.query('INSERT INTO reactions1 (user_id, image_id, reaction)'+
  'VALUES ('+userId+', '+flickrId+', '+reaction+')', function(err, rows, fields){

    if(err){
      console.log(err);
      return;
    }

  });

  /*
  demoji_db.query('IF EXISTS (SELECT * FROM reactions WHERE user_id ='+userId+' AND image_id = '+imageId+') BEGIN UPDATE reactions SET reaction = '+reaction+' WHERE user_id ='+userId+' AND image_id = '+imageId+' END ELSE BEGIN INSERT INTO reactions (user_id, image_id, reaction)'+
  'VALUES ('+userId+', '+imageId+', '+reaction+')', function(err, rows, fields){

    if(err){
      console.log(err);
      return;
    }

    console.log('insertReaction');
  }
  */

  demoji_db.query('UPDATE pictures1 SET '+reactionColumn+' = '+reactionColumn+' + 1 WHERE image_id = '+flickrId, function(err, rows, fields) {

    if(err){
      console.log(err);
      return;
    }

    console.log('insertReaction');
  });
}

exports.getRelevantPicData = function(imageId, callback) {
	demoji_db.query('SELECT reactions1.image_id, users.id,users.username, reactions1.reaction, users.city, users.sexual_orientation, users.race,users.age, users.gender, users.income, users.religion FROM reactions1 INNER JOIN users ON reactions1.user_id = users.id WHERE image_id='+imageId, function(err, rows, fields) {
    
    if(err){
      console.log(err);
    }

    var data = newPicData();

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

      if (data.age[rows[i].age] != null) {
        data.age[rows[i].age][rows[i].reaction]++;
      }
    }

    console.log(data);
    console.log('getRelevantPicData');
    
    callback(data);
    return data;
  });

}

var newPicData = function() {
  return {  
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
      "10-20":{  
         "happy":0,
         "sad":0,
         "annoyed":0,
         "love":0,
         "angry":0,
         "laughing":0
      },
      "20-30":{  
         "happy":0,
         "sad":0,
         "annoyed":0,
         "love":0,
         "angry":0,
         "laughing":0
      },
      "30-40":{  
         "happy":0,
         "sad":0,
         "annoyed":0,
         "love":0,
         "angry":0,
         "laughing":0
      },
      "40-50":{  
         "happy":0,
         "sad":0,
         "annoyed":0,
         "love":0,
         "angry":0,
         "laughing":0
      },
      "50+":{  
         "happy":0,
         "sad":0,
         "annoyed":0,
         "love":0,
         "angry":0,
         "laughing":0
      }
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
  };
}


/*
demoji_db.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
*/
