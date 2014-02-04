'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};


/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};


/**
 * Send All Users
 */
exports.all = function(req, res) {
    var userMap = {};
    User.find({}, function (err, users) {
        users.forEach(function(user) {
            userMap[user._id] = user;
        });
        res.jsonp(userMap || null);
    });
};


/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};