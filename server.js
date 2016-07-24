var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var db = require('./sql');
require('./routes')(app);

app.get('/', function(req, res) {
  res.send('Hello Seattle\n');
  res.end();
});

//db.showColumns();
//db.getRelevantPicData('4','male');


/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
  extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post('/insertReaction', function (req, res) {

    var pic = req.body.pic;
    var user = req.body.user;
    var reaction = req.body.reaction;

    if (pic && user && reaction) {

        db.insertReaction(user, pic, reaction);
        res.send(true);
        res.end();
    }
    else {

        res.send(false); 
        res.end();
    }  
});

app.post('/createUser', function (req, res) {

    var username = req.body.username;
    var gender = req.body.gender;
    var race = req.body.race;
    var sexual_orientation = req.body.sexual_orientation;
    var income = req.body.income;
    var age = req.body.age;
    var religion = req.body.religion;
    var city = req.body.city;

    console.log(req.body);

    if (username && gender && race && sexual_orientation && income && age && religion && city) {

        db.addUser(username, gender, race, sexual_orientation, income, age, religion, city);
        res.send(true);
        res.end();
    }
    else {

        res.send(false); 
        res.end();
    } 
});

app.post('/newImage', function (req, res) {

    var url = req.body.url;

    if (url) {

        db.insertImageData(url);
        res.send(true);
        res.end();
    }
    else {

        res.send(false); 
        res.end();
    } 
});

// For this one, the url should look like hostname?picid=1
app.get('/getRelevantPicData', function (req, res) {

    var picId = req.query.picid;

    if (picId) {

        db.getRelevantPicData(picId);
        res.send(true);
        res.end();
    }
    else {

        res.send(false); 
        res.end();
    }    
});

//db.insertReaction('7', '4', '"angry"');


app.listen(3001);

console.log('Listening on port 3001...');
