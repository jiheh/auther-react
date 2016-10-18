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

app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

app.use('/login', function(req, res, next) {
	
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
