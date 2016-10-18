'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var User = require('../api/users/user.model');


app.use(require('./logging.middleware'));
app.use(require('./request-state.middleware'));
app.use(require('./statics.middleware'));



// Session must be placed before the routes
app.use(session({
  secret: 'thisisasecret'
}));

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
  console.log("req.session right before ", req.session);


  // req.session.destroy();
  next();
  console.log("***** req.session after ", req.session);
  // res.sendStatus(204);
});


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
