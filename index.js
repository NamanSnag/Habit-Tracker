const express = require('express');
require('dotenv').config()
const port = process.env.PORT || 7000;
const path = require('path');
const app = express();
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const GoogleStrategy = require('./config/google-Auth');
const GitHubStrategy = require('./config/git-Auth');
const cors = require('cors');

// cors
app.use(cors());

// view engine
app.set('view engine', 'ejs');
app.set('views', './views')

// urlencoded add to extract data from
app.use(express.urlencoded());

// style sheet middleware sass
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
  src: './asset/scss',
  dest: './asset/css',
  debug: false,
  outputStyle: 'extended',
  prefix:  '/css' 
}));

// css files
app.use(express.static(path.join(__dirname, 'asset')));

// layouts
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// flash message
const flash = require('connect-flash');
const flashMiddleware = require('./config/flash') 

// cookies
app.use(cookieParser());

// passport middleware
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
  name : 'habitas',
  secret :'BabaJiBooti',
  resave : false,
  saveUninitialized : false,
  cookie : {
    maxAge : 1000 * 60 * 600,
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/habbit',
    autoRemove: 'disabled'
},(error)=>{
    if(error){
        console.log(error+"mongo store");
    }
    console.log("mongo store saved");
  })
})
);

// passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);

// flash
app.use(flash());

app.use(flashMiddleware.setFlash);

// routes
app.use('/', require('./routes'));


app.listen(port,(err) => {
    if(err){
        console.log("error occure during listning to servar"+err);
    }
    console.log("server running on port", port);
})