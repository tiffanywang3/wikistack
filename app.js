var express = require('express')
var app = express()
var fs = require('fs')
var mime = require('mime')
var bodyParser = require('body-parser')
var wikiRouter = require('./routes/wiki.js')

var swig = require('swig')
app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('vews', process.cwd() + '/views')
swig.setDefaults({cache: false});

//On making a GET for '/', for now just serve up a simple index.html file.




// logging middleware: can use morgan
app.use(function (req, res, next) {
	res.on('finish', function () {
		console.log(req.method, req.path, res.statusCode);
	});
	next();
});

// static file middleware : can use express.static
app.use(function(req, res, next) {
  var mimeType = mime.lookup(req.path)
  fs.readFile('./public/' + req.path, function(err, fileBuffer) {
    if(err) return next()
    res.header('Content-Type', mimeType)
    res.send(fileBuffer)
  })
})

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/wiki', wikiRouter);











app.listen(3000)