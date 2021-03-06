"use strict";
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
module.exports = function (assignmentModel, projectModel) {
    passport.use('assignment', new LocalStrategy(assignmentStrategy));
    passport.use('project', new LocalStrategy(projectStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var api = {
        getPassport: getPassport
    };
    return api;
    function assignmentStrategy(username, password, done) {
        assignmentModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        console.log("I am here");
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function projectStrategy(username, password, done) {
        projectModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        console.log("I am here");
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }
    function serializeUser(user, done) {
        done(null, user);
    }
    function deserializeUser(user, done) {
        if(user.type === 'assignment'){
            assignmentModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        console.log("desiaralize assigment user");
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );

        }else if (user.type === 'project'){
            projectModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        console.log("desiaralize project user");
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }

    }
    function getPassport() {
        return passport;
    }
};