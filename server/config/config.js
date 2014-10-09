var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/moviesdatabase',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:parola@ds063769.mongolab.com:63769/teamparadisedatabase',
        port: process.env.PORT || 3030
    }
};