require('dotenv').config();
var express = require('express')
var path = require('path');
var ejsLayouts = require('express-ejs-layouts');
var multer = require('multer');
var upload = multer({dest: './uploads/'});
var cloudinary = require('cloudinary');
var app = express();
var port = process.env.PORT || 2000;

app.set('view engine', 'ejs');
app.use(ejsLayouts);

var images = [];

app.get('/', function(req, res) {
	console.log('get route hit');
	res.render('index', {arr: images, cloudinary: cloudinary});
});	

app.get('/upload', function(req, res) {
	console.log('upload route hit');
	res.render('upload');
});

app.post('/upload', upload.single('myFile'), function(req, res) {
	console.log('POST - upload hit');
	cloudinary.uploader.upload(req.file.path, function(result) {
		images.push(result.public_id);
		res.redirect('/');
	});
});

app.listen(port, function() {
	console.log('Sever is running on port ' + port);
});