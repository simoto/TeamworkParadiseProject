var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    name: { type: String, require: '{PATH} is required', unique: true },
    year: { type: Date, require: '{PATH} is required' },
    rating: { type: Number, require: '{PATH} is required' },
    tags: [String]
});

var Movie = mongoose.model('Movie', movieSchema);

module.exports.seedInitialMovies = function() {
    Movie.find({}).exec(function(err, collection){
        if(err){
            console.log('Cannot find movies ' + err);
        }

        if(collection.length === 0){
             Movie.create({
                name: ' The Shawshank Redemption',
                year: '1/2/1994',
                rating: 9.2,
                 tags: ['Crime', 'Drama']
            });

            Movie.create({
                name: 'The Godfather',
                year: new Date('1/2/1972'),
                rating: 9.2,
                tags: ['Crime' , 'Drama']
            });


            Movie.create({
                name: 'The Dark Knight',
                year: new Date('1/2/2008'),
                rating: 8.9,
                tags: ['Action', 'Adventure']
            });

            Movie.create({
                name: 'Pulp Fiction',
                year: new Date('1/2/1994'),
                rating: 8.9,
                tags: ['Crime', 'Drama', 'Thriller']
            });

            console.log('Movies added');
        }
    });
};