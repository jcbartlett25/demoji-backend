var exports = module.exports = {};

var mysql = require('mysql');

var demoji_db = mysql.createConnection({
  host     : '159.203.240.126',
  user     : 'remote',
  password : 'hack2040',
  database : 'demoji'
});

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

exports.insertMediaData = function(url) {
  demoji_db.query('INSERT INTO media (url)'+
  'VALUES ('+url+')', function(err, rows, fields){

    if(err && err.errno == 1062){
      console.log('duplicate');
      return;
    }
    else if(err){
      console.log(err);
      return;
    }

    console.log('insertMediaData');

  });
}

// TODO: Update a reaction if it exists in the table
exports.insertReaction = function(userId, itemId, reaction) {

  var reactionColumn = reaction.substring(1, reaction.length-1);

  demoji_db.query('INSERT INTO reactions (user_id, item_id, reaction)'+
  'VALUES ('+userId+', '+itemId+', '+reaction+')', function(err, rows, fields){

    if(err){
      console.log(err);
      return;
    }

  });

  demoji_db.query('UPDATE media SET '+reactionColumn+' = '+reactionColumn+' + 1 WHERE item_id = '+itemId, function(err, rows, fields) {

    if(err){
      console.log(err);
      return;
    }

    console.log('insertReaction');
  });
}

exports.getRelevantMediaData = function(itemId, callback) {
	demoji_db.query('SELECT reactions.item_id, users.id, users.username, reactions.reaction, users.city, users.sexual_orientation, users.race,users.age, users.gender, users.income, users.religion FROM reactions INNER JOIN users ON reactions.user_id = users.id WHERE item_id='+itemId, function(err, rows, fields) {
    
    if(err){
      console.log(err);
    }

    var data = newMediaData();

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
    console.log('getRelevantMediaData');
    
    callback(data);
    return data;
  });

}

var newMediaData = function() {
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
