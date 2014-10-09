var mongoose = require('mongoose'),
    passport = require('passport'),
    crypto = require('crypto'),
    LocalPassport = require('passport-local');

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

    var userSchema = mongoose.Schema({
        username: String,
        firstName: String,
        lastName: String,
        salt: String,
        hashPass: String
    });

    userSchema.method({
        authenticate: function(password){
            if(generateHashPassword(this.salt, password)=== this.hashPass){
                return true;
            }
            else {
                return false;
            }
        }
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(err){
            console.log('Cannot find users ' + err);
        }

        if(collection.length === 0){
            var salt;
            var hashedPwd;

            salt = generateSalt();
            hashedPwd = generateHashedPassword(salt, 'FirstTest');

            User.create({
                username: 'Test',
                firstName: 'FirstTest',
                lastName: 'LastTest',
                salt: salt,
                hashPass: hashedPwd
            });

            salt = generateSalt();
            hashedPwd = generateHashedPassword(salt, 'FirstTest2');

            User.create({
                username: 'Test2',
                firstName: 'FirstTest2',
                lastName: 'LastTest2',
                salt: salt,
                hashPass: hashedPwd
            });

            console.log('Users added');
        }

    });

    passport.use(new LocalPassport(function(username, password, done){
        User.findOne({ username: username }).exec(function(err, user){
            if(err){
                console.log('Error loading user: ' + err);
                return;
            }

            if(user){
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    }));

    passport.serializeUser(function(user, done){
        if(user){
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done){
        User.findOne({ _id:  id }).exec(function(err, user){
            if(user){
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
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

};

function generateSalt(){
    return crypto.randomBytes(128).toString('base64');
}

function generateHashedPassword(salt, pwd){
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}