var mongoose = require('mongoose'),
    user = require('../models/User'),
    movie = require('../models/Movie');


module.exports = function(config){
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.once('open', function(err){
        if(err){
            console.log(err);
            console.log(err);
            return;
        }

        console.log('Database is running...');
    });

    db.on('error', function(err){
        console.log(err);
    });

    user.seedInitialUsers();
    movie.seedInitialMovies();
};
