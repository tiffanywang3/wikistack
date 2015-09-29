var express = require('express')
var router = express.Router()

module.exports = router;


router.get('/', function(req, res, next) {
  //res.redirect('/');
  res.send('got to GET /wiki/');
});

router.post('/add', function(req, res, next) {
  console.log(req.body);
  //var title = req.body.title;

  res.json(req.body);
  //res.render('index', {title: title});
});

router.get('/add', function(req, res, next) {
  // res.send('got to GET /wiki/add');
  res.render('addpage');
});

