'use strict';

var mongoose = require('mongoose'),
    OpenIDStrategy = require('passport-openid').Strategy,
    User = mongoose.model('User'),
    config = require('./config');


module.exports = function(passport) {
    
    // Serialize the user id to push into the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize the user object based on a pre-serialized token
    // which is the user id
    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }, function(err, user) {
            done(err, user);
        });
    });


    // Use oxygen strategy
    passport.use(new OpenIDStrategy({
        returnURL: 'http://ace-online.autodesk.com:3000/auth/openid/callback',
        realm: 'http://ace-online.autodesk.com:3000',
        profile: true
      },
      function(identifier, profile, done) {
        debugger;
            User.findOne({
                'username': profile.userid
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails.value,
                        username: profile.userid,
                        provider: 'Autodesk',
                        lastLogin: new Date(),
                        isAdmin: false
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                        user.lastLogin = new Date();
                        debugger;
                        user.save(function (err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });   
                }
            });
      }
    ));

};