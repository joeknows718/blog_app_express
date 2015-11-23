var db = require('./database');
var express = require('express');
var app = express(); //loads express functions & makes them available  for your app 
var hbs = require('hbs'); 
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');
var routes = require('./routes/routes');
var ideaEngine = require('./ideas');


 // initialize express 

app.set('view engine', 'html');//use html 
app.engine('html', hbs.__express); //use html as if they were hbs files
app.use(express.static('static'));//tells app where to look for statuc files



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', routes); 

app.use(function(req, res, next){
	res.status(404);
	res.render('404', {title: 'This page is not found.'});
});

//500 error handler 
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500', {title: 'Internal Error'});
});


app.listen(3000); 
console.log('Node running on port 3000')

module.exports = app; 



