'use strict';

// User routes use users controller
var users = require('../controllers/users');

module.exports = function(app, passport) {

    app.get('/signout', users.signout);
    app.get('/users/me', users.me);
    app.get('/users', users.all);
    // Setting the oxygen openid route
    app.get('/auth/openid', passport.authenticate('openid', {
        failureRedirect: '/'
    }));

    app.get('/auth/openid/callback', passport.authenticate('openid', {
        failureRedirect: '/'
    }), users.authCallback);

};
