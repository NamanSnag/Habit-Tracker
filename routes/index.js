const express = require('express');
const { landingPage } = require('../controllers/Home_Controller');
const {addHabit, removeHabit, details, updateStatus} = require('../controllers/Habit_Controller');
const routes = express.Router();

routes.get('/', landingPage);

// user routes link
routes.use('/user', require('./user'));

routes.post('/addHabit',addHabit);

routes.get('/delete/:id', removeHabit);

routes.get('/details/:id', details);

routes.post("/update/:habitId/:id", updateStatus);

module.exports = routes;