

module.exports.landingPage = (req, res)=>{
    if (req.isAuthenticated()) {
        return res.render('home');
    }
    return res.render('landingPage');
}

