var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    firstName: { type: String, require: '{PATH} is required' },
    lastName: { type: String, require: '{PATH} is required' },
    salt: String,
    hashPass: String,
    roles: [String]
});

userSchema.method({
    authenticate: function(password){
        if(encryption.generateHashedPassword(this.salt, password)=== this.hashPass){
            return true;
        }
        else {
            return false;
        }
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function() {
    User.find({}).exec(function(err, collection){
        if(err){
            console.log('Cannot find users ' + err);
        }

        if(collection.length === 0){
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'FirstTest');

            User.create({
                username: 'Test',
                firstName: 'FirstTest',
                lastName: 'LastTest',
                salt: salt,
                hashPass: hashedPwd
            });

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'FirstTest2');

            User.create({
                username: 'Test2',
                firstName: 'FirstTest2',
                lastName: 'LastTest2',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['admin']
            });

            console.log('Users added');
        }
    });
};

