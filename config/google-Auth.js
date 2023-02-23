const passport = require('passport');
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '15125111223-sfkga9fgt6c7cpvn3d23tjnbdv5pi40k.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_AUTH_KEY,
    callbackURL: "http://localhost:8000/user/oauth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ email: profile.emails[0].value }, (err, user) => {
      if(err){
        console.log("google",err);
      } 
      if(!user){
        User.create({
            email: profile.emails[0].value ,
            password: '123',
            name: profile._json.name
        });
        return cb(null, user);
    }
      return cb(err, user);
    });
  }
));

// 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
// 15125111223-sfkga9fgt6c7cpvn3d23tjnbdv5pi40k.apps.googleusercontent.com
// http://localhost:8000/user/oauth/google/callback