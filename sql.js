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

    console.log('yay');

  });
}

exports.insertImageData = function(url) {
  demoji_db.query('INSERT INTO pictures (url)'+
  'VALUES ('+url+')', function(err, rows, fields){

    if(err){
      console.log(err);
      return;
    }

    console.log('wowzers');

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

    console.log('updated');
  });
}

exports.getRelevantPicData = function(imageId,demoData) {
	demoji_db.query('SELECT reactions.image_id, users.id,users.username, reactions.reaction, users.city, users.sexual_orientation, users.race,users.age, users.gender, users.income, users.religion FROM reactions INNER JOIN users ON reactions.user_id = users.id WHERE image_id='+imageId, function(err, rows, fields) {
    if(err){
      console.log(err);
      return;
    }

    demographicImageDataMapping(demoData);
    console.log('sweet');
});

}

var demographicImageData = function(demoData) {
switch (demoData) {
    case users.["gender"].ToString():
        demoji_db.query('SELECT reactions.image_id, users.id,users.username, reactions.reaction, users.city, users.sexual_orientation, users.race,users.age, users.gender, users.income, users.religion FROM reactions INNER JOIN users ON reactions.user_id = users.id WHERE image_id='+imageId, function(err, rows, fields) {
    	if(err){
      	console.log(err);
      	return;
    	};
        break;
    case users.["age"]:
        demoji_db.query('SELECT reactions.image_id, users.id,users.username, reactions.reaction, users.city, users.sexual_orientation, users.race,users.age, users.gender, users.income, users.religion FROM reactions INNER JOIN users ON reactions.user_id = users.id WHERE image_id='+imageId, function(err, rows, fields) {
    	if(err){
      	console.log(err);
      	return;
    	};
        break;
    case users.["race"].ToString():
        demoji_db.query('SELECT reactions.image_id, users.id,users.username, reactions.reaction, users.city, users.sexual_orientation, users.race,users.age, users.gender, users.income, users.religion FROM reactions INNER JOIN users ON reactions.user_id = users.id WHERE image_id='+imageId, function(err, rows, fields) {
    if(err){
      console.log(err);
      return;
    }
      break;
    case users.["religion"].ToString():
       demoji_db.query('SELECT reactions.image_id, users.id,users.username, reactions.reaction, users.city, users.sexual_orientation, users.race,users.age, users.gender, users.income, users.religion FROM reactions INNER JOIN users ON reactions.user_id = users.id WHERE image_id='+imageId, function(err, rows, fields) {
    if(err){
      console.log(err);
      return;
    }
        break;
    case users.["sexual_orientation"].ToString():
      demoji_db.query('SELECT reactions.image_id, users.id,users.username, reactions.reaction, users.city, users.sexual_orientation, users.race,users.age, users.gender, users.income, users.religion FROM reactions INNER JOIN users ON reactions.user_id = users.id WHERE image_id='+imageId, function(err, rows, fields) {
    if(err){
      console.log(err);
      return;
    }
        break;
    case  users.["city"].ToString():
        demoji_db.query('SELECT reactions.image_id, users.id,users.username, reactions.reaction, users.city, users.sexual_orientation, users.race,users.age, users.gender, users.income, users.religion FROM reactions INNER JOIN users ON reactions.user_id = users.id WHERE image_id='+imageId, function(err, rows, fields) {
    if(err){
      console.log(err);
      return;
    }
    case  users.["income"].ToString():
        demoji_db.query('SELECT reactions.image_id, users.id,users.username, reactions.reaction, users.city, users.sexual_orientation, users.race,users.age, users.gender, users.income, users.religion FROM reactions INNER JOIN users ON reactions.user_id = users.id WHERE image_id='+imageId, function(err, rows, fields) {
    if(err){
      console.log(err);
      return;
    }
}




	console.log("lolol");
}

/*
demoji_db.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
*/
