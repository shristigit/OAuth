const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport= require('passport');
 
const app = express(); //create express application
//setup view engine
app.set('view engine','ejs');

app.use(cookieSession ({            //2.encrypt cookie and send it to browser,age in ms
    maxAge : 24 *60 * 60 *1000 ,
    keys : [keys.session.cookieKey]
}));

//initialise passsport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI ,() => {
    console.log('connected to mongodb');
});


app.use('/auth',authRoutes);
 app.use('/profile',profileRoutes);     //?use

//create home routes
app.get('/' , (req,res) => {
    res.render('login');
});

app.listen(5000,() => {
    console.log('app now listening for requests on port 5000');
});