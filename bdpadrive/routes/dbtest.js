var express = require('express');
var router = express.Router();
var connection = require('../configs/mysqldb');

router.get('/', function (req, res, next) {
  res.render('dbtest', { title: 'Database Test', userData: null });
});

router.get('/Submit', function (req, res, next) {
  var sql = 'SELECT * FROM users';
  connection.query(sql, function (err, data, fields) {
    if (err) {
      throw err;
    } else {
      res.render('dbtest', { title: 'Database Test', userData: data });
    }
  });
});

module.exports = router;
