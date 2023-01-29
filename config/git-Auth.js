const passport = require('passport');
const User = require('../models/user');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
  clientID: "adf1e4d400016ca3563c",
  clientSecret: "4c27ad0a2d3e38dbd395e97c1ec5f3d74be1182e",
  callbackURL: "http://localhost:8000/user/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  console.log(profile)
  const email = `${profile.username}@gmail.com`;
  User.findOne({ email: email}, (err, user) => {
    console.log("findOne")
    if(err){
      console.log("google",err);
    }
    if(!user){
      User.create({
          email: email ,
          password: '123',
          name: profile.username
      });
      console.log("created github")
      return done(null, user);
  }
    return done(err, user);
})
}));

// Client ID
// adf1e4d400016ca3563c
// Client secrets
// You need a client secret to authenticate as the application to the API.