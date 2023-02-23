const passport = require('passport');
const User = require('../models/user');
const GitHubStrategy = require('passport-github2').Strategy;

// github login strategy
passport.use(new GitHubStrategy({
  clientID: "adf1e4d400016ca3563c",
  clientSecret: process.env.GIT_AUTH_KEY,
  callbackURL: "http://localhost:8000/user/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  const email = `${profile.username}@gmail.com`;
  User.findOne({ email: email}, (err, user) => {
    if(err){
      console.log("google",err);
    }
    if(!user){
      User.create({
          email: email ,
          password: '123',
          name: profile.username
      });
      return done(null, user);
  }
    return done(err, user);
})
}));

// Client ID
// adf1e4d400016ca3563c
// Client secrets
// You need a client secret to authenticate as the application to the API.