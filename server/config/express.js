var express = require('express'),
    stylus = require('stylus'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config){
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');
    app.use(cookieParser());
    app.use(bodyParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({secret: 'crypto key'}));
    app.use(stylus.middleware(
        {
            src: config.rootPath  + '/public',
            compile: function(str, path){
                return stylus(str).set('filename', path);
            }
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));
};