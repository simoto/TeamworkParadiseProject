var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3030;
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/server/views');
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: function(str, path){
            return stylus(str).set('filename', path);
        }
    }
));

app.use(express.static(__dirname + '/public'));

if(env == "development"){
    mongoose.connect('mongodb://localhost:27017/moviesdatabase');
}
else {
    mongoose.connect('mongodb://admin:parola@ds063769.mongolab.com:63769/teamparadisedatabase');
}

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

var movieSchema = mongoose.Schema({
    name: String,
    year: Number
});

var Movie = mongoose.model('Movie', movieSchema);

//Movie.remove({}).exec(function(err){
//    if(err){
  //      console.log('Movies could not be cleared');
//    }

//    console.log('Movies deleted');
//});

//Movie.create({ name: "The thing", year: 1978 })
   // .then(function(model) {

      //  console.log(model)
//});

app.get('/partials/:partialName', function(req, res){
    res.render('partials/' + req.params.partialName)
});
app.get('*', function(req, res){
    res.render('index');
});

app.listen(port);
console.log('Server running on port: ' + port)