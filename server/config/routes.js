var passport = require('passport'),
    auth = require('./auth');

module.exports = function(app){
    app.get('/partials/:partialDir/:partialName', function(req, res){
        res.render('../../public/app/' + req.params.partialDir + '/' +  req.params.partialName)
    });
    app.post('/login',auth.login);

    app.post('/logout', auth.logout);

    app.get('*', function(req, res){
        res.render('index');
    });
};