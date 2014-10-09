var auth = require('./auth'),
    controllers = require('../controllers/index');

module.exports = function(app){

    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);
    app.get('/api/movies',controllers.movies.getAllMovies);
    app.get('/api/movies/:id',controllers.movies.getMovieById);
    app.get('/partials/:partialDir/:partialName', function(req, res){
        res.render('../../public/app/' + req.params.partialDir + '/' +  req.params.partialName)
    });
    app.post('/login',auth.login);
    app.post('/logout', auth.logout);
    app.get('/api/*', function(req, res){
        res.status(404);
        res.end();
    })
    app.get('*', function(req, res){
        res.render('index', { currentUser: req.user });
    });
};
