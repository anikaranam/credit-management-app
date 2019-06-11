var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Year is ' + req.query.year);
});

module.exports = router;