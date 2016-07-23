module.exports = function(app){
    var musicians = require('./controllers/demoji_control');
    app.get('/demoji', musicians.findAll);
    app.get('/demoji/:id', musicians.findById);
    app.post('/demoji', musicians.add);
    app.put('/demoji/:id', musicians.update);
    app.delete('/demoji/:id', musicians.delete);
}
