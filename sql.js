var exports = module.exports = {};

var mysql = require('mysql');

var demoji_db = mysql.createConnection({
  host     : '159.203.240.126',
  user     : 'remote',
  password : 'hack2040',
  database : 'demoji'
});

/**
 * Used to see the columns in a table
 * @param {String} column name
 * @return {null} nothing
 */
exports.showColumns = function(){
  demoji_db.query('SHOW COLUMNS FROM users', function(err, rows, fields){ 
    
    for(var i=0; i<rows.length; i++) {
      console.log(rows[i].Field);
    }
  });
}

/**
 * Creates a new user with all of their demographics
 * @param {Strings} Self explanatory
 * @return status code
 */
exports.createUser = function(username, gender, race, sexual_orientation, income, age, religion, city, callback) {
  demoji_db.query('INSERT INTO users (username, gender, race, sexual_orientation, income, age, religion, city)'+
  'VALUES ('+username+', '+gender+', '+race+', '+sexual_orientation+', '+income+', '+age+', '+religion+', '+city+')', function(err, rows, fields){

    var status;

    if(err){
      console.log(err);
      status = 503;
    }

    console.log('addUser');
    status = 200;
    callback(status);
    return status;
  });
}

/**
 * Creates a new media item in the database
 * @param {Strings} url of the media item
 * @return status code
 */
exports.newMediaData = function(url, callback) {
  demoji_db.query('INSERT INTO media (url)'+
  'VALUES ('+url+')', function(err, rows, fields){

    var status;

    if(err && err.errno == 1062){
      console.log('duplicate');
      status = 502;
    }
    else if(err){
      console.log(err);
      status = 503;
    }
    else {
      status = 200;
    }

    console.log('insertMediaData');
    
    callback(status);
    return status;
  });
}

// TODO: Update a reaction if it exists in the table
/**
 * Creates a new reaction in the database
 * @param {String} id of the user
 * @param {String} id of the item
 * @param {String} user's reaction
 * @return status code
 */
exports.newReaction = function(userId, itemId, reaction, callback) {

  var reactionColumn = reaction.substring(1, reaction.length-1);

  demoji_db.query('INSERT INTO reactions (user_id, item_id, reaction)'+
  'VALUES ('+userId+', '+itemId+', '+reaction+')', function(err, rows, fields){

    var status;

    if(err){
      console.log(err);
      status = 503;
    }

  });

  demoji_db.query('UPDATE media SET '+reactionColumn+' = '+reactionColumn+' + 1 WHERE item_id = '+itemId, function(err, rows, fields) {

    if(err){
      console.log(err);
      status = 503;
    }
    else {
      status = 200;
    }

    console.log('insertReaction');
    callback(status);
    return status;
  });
}

/**
 * Gets all the reaction data for a given media item
 * @param {String} id of the item
 * @param {String} callback function
 * @return status code
 */
exports.getRelevantMediaData = function(itemId, callback) {
	demoji_db.query('SELECT reactions.item_id, users.id, users.username, reactions.reaction, users.city, users.sexual_orientation, users.race,users.age, users.gender, users.income, users.religion FROM reactions INNER JOIN users ON reactions.user_id = users.id WHERE item_id='+itemId, function(err, rows, fields) {
    
    if(err){
      console.log(err);
      return 503;
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
