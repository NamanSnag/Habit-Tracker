const express = require('express');
const passport = require('passport');
const {createUser, SignIn, SignUp, createSession, signOut, home} = require('../controllers/User_Controller');

const routes = express.Router();

// create user 
routes.post('/create', createUser);
routes.post('/session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signIn'}) ,createSession)
routes.get('/signIn', SignIn);
routes.get('/signUp', SignUp);
routes.get('/sign-out', signOut);
routes.get('/home', home);
routes.get('/oauth/google', passport.authenticate('google',
    {scope: ['profile', 'email']}
));
routes.get('/oauth/google/callback', passport.authenticate('google',
    {failureRedirect: '/user/signIn', successRedirect: '/user/home'}
));

routes.get('/auth/github',passport.authenticate('github', { scope: [ 'user:email' ] }));

routes.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/user/signIn', successRedirect: '/user/home'}));

module.exports = routes;