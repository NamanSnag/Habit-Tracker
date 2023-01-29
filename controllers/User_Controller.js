const User = require('../models/user');
const Habit = require('../models/habit');

module.exports.createUser = async (req, res) => {
    try {
        if(req.body.password != req.body.Confirm_password){
            console.log("password is wrong")
            return res.redirect('back');
        }
        const user = await User.findOne({email: req.body.email});
        if(!user){
            const {email , password, name} = req.body;
            User.create({
                email:email,
                password:password,
                name:name
            });
            req.flash('success', 'Post deleted successful!');
        }
        req.flash('error', 'alredy SignUp');
        return res.redirect('signIn');
    } catch (error) {
        console.log(error);
    }
}

// create session
module.exports.createSession = async (req, res) => {
    req.flash('success','Sign In Success');
    return res.redirect('/user/home')
}

module.exports.SignIn = (req, res)=>{
    
    if (req.isAuthenticated()) {
        return res.redirect('/user/home');
    }
    return res.render('Sign-In');
}

module.exports.SignUp = (req, res)=>{
    if (req.isAuthenticated()) {
        return res.redirect('/user/signIn');
    }
    return res.render('Sign-Up');
}

// sign out
module.exports.signOut = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}

// home page
module.exports.home = async (req, res) => {
    if (req.isAuthenticated()) {
        let habits = await Habit.find({ user : req.user.id});
        const currentDate = new Date().toDateString();
        habits.forEach(habit => {
            let found = false;
            habit.tracking.forEach(track => {
                if(track.date === currentDate) {
                found = true;
            }
        });
        if(!found) {
            habit.tracking.push({date: currentDate, status: "none"});
            habit.save();
        }
        });
        habits = await Habit.find({ user : req.user.id});
        const currentTracking = habits.map(habit => {
            return habit.tracking.filter(track => track.date === currentDate);
        }); 
        return res.render('home',{
        habits : habits,
        });
    }
    return res.render('landingPage');
};