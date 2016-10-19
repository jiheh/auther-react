'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../api/users/user.model');


app.use(require('./logging.middleware'));
app.use(require('./request-state.middleware'));
app.use(require('./statics.middleware'));



// Session must be placed before the routes
app.use(session({
  secret: 'thisisasecret'
}));

// Must come after express session middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use(function (req, res, next) {
//   console.log('session', req.session);
//   next();
// });

app.post('/login', function(req, res, next) {
  User.findOne({
    where: req.body
  }).
  then( function (user) {
    // console.log("**** user ****", user);
    if (user) {
      req.session.userId = user.id;
      console.log("req.session after SQL", req.session);
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }

  })
  .catch(next);
});

app.get("/logout", function(req, res, next){
  // console.log("req.session right before ", req.session);

  req.session.destroy();
  res.sendStatus(204);
  console.log(req.session)
});


// Google authentication and login 
app.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/', // or wherever
    failureRedirect : '/' // or wherever
  })
);

passport.use(
  new GoogleStrategy({
    clientID: '203101702207-h84lfkh2lpcgt90r28em0dlq513rlub6.apps.googleusercontent.com',
    clientSecret: 'B2T5tVd0VITOoRUBNyFPCOK',
    callbackURL: 'http://localhost:8080'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    console.log('---', 'in verification callback', profile, '---');
    done();
  })
);


/////

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
