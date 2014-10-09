var Movie = require('mongoose').model('Movie');

module.exports = {
    getAllMovies: function(req, res, next){
        Movie.find({}, function(err, collection){
            if(err){
                console.log('Movies could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    getMovieById: function(req, res, next){
        Movie.findeOne({ _id: req.params.id }).exec(function(err, movie){
            if(err){
                console.log('Movies could not be loaded: ' + err);
            }

            res.send(movie);
        })
    }
}