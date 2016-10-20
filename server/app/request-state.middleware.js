'use strict'; 

// Same thing as body-parser but should use body-parser instead because this will allow for injections, so it's not secure i.e. see line 14, which  uses eval.. DANGEROUS!

var router = require('express').Router();

router.use(function (req, res, next) {
  var bodyString = '';
  req.on('data', function (chunk) {
    bodyString += chunk;
  });
  req.on('end', function () {
    bodyString = bodyString || '{}';
    req.body = eval('(' + bodyString + ')');
    next();
  });
});

module.exports = router;
