const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
      usernameField: 'email',
      passReqToCallback: true
  }
  ,function(req ,email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { 
          return done(err); 
        }
        if (!user || password != user.password) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  })

  passport.deserializeUser((user, done) => {
    User.findById(user, function (err, user) {
        if(err){
            return done(err);
        } 
        done(null, user);
    })
  })

  passport.checkAuthentication = (req, res, next) => {
    if(req.isAuthenticated()){
      return next();
    }
    console.log('chek autho false');
    res.redirect('/user/sign-in');
  }

  passport.setAuthentication = (req, res, next) => {
      if(req.isAuthenticated()){
        res.locals.user = req.user;
      }
      next();
  }

  module.exports = passport;