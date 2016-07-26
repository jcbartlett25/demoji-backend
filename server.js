var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var db = require('./sql');
require('./routes')(app);

app.get('/', function(req, res) {
  res.send('Ahhhh I see you made it to the backend of the sentimoji application');
  res.end();
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// user reaction endpoint
app.post('/newReaction', function (req, res) {

    var pic = req.body.pic;
    var user = req.body.user;
    var reaction = req.body.reaction;

    if (pic && user && reaction) {

        db.newReaction(user, pic, reaction, function(status) {
            res.status(status);
            res.send("REACT");
            res.end();
        });
    }
    else {

        res.status(400).send({ error: "cmon fam, your request wasn't formatted properly try again" });
        res.end();
    }  
});

// user creation endpoint
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

        db.createUser(username, gender, race, sexual_orientation, income, age, religion, city, function(status) {
            res.status(status).send("we made a connection ;)");
            res.end();
        });
    }
    else {

        res.status(400).send({ error: "cmon fam, your request wasn't formatted properly try again" }); 
        res.end();
    } 
});

// media creation endpoint
app.post('/newMedia', function (req, res) {

    var url = req.body.url;

    if (url) {

        db.newMediaData(url, function(status) {

            res.status(status).send("we made a connection ;)");
            res.end(); 
        });
        
    }
    else {

        res.status(400).send({ error: "cmon fam, your request wasn't formatted properly try again" }); 
        res.end();
    } 
});

// Data viewing endpoint
// For this one, the url should look like hostname?mediaid=1
app.get('/getRelevantMediaData', function (req, res) {

    var mediaId = req.query.mediaid;

    if (mediaId) {

        db.getRelevantMediaData(picId, function(data) {

            if (data == 503) {
                res.status(503);
                res.send("we made a connection ;)");
                res.end();
                return;
            }
            res.send(data);
            res.end(); 
        });       
    }
    else {

        res.status(400).send({ error: "cmon fam, your request wasn't formatted properly try again" }); 
        res.end();
    }    
});

app.get('/testingUserColumn', function(req, res) {
    db.showColumns();
    res.send('check the console for success');
    res.end();
});

//db.insertReaction('7', '4', '"angry"');
//db.addUser('"josh"', '"male"', '"black"', '"heterosexual"', '"$100,000+"', '"20-24"', '"christian"', '"ATL"')
//db.insertImageData("'imthecoolest.org'", "'yfygiuf6ftyguytgfy'");
app.listen(3001);

console.log('Listening on port 3001...');
