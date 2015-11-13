var express = require('express'); //loads express functions & makes them available  for your app 
var hbs = require('hbs'); 
var routes = require('./routes/routes');
var ideaEngine = ('./ideas');

var app = express(); // initialize express 

app.set('view engine', 'html');//use html 
app.engine('html', hbs.__express); //use html as if they were hbs files
app.use(express.static('static'));//tells app where to look for statuc files

app.use('/', routes); 

app.use(function(req, res, next){
	res.status(404);
	res.render('404', {title: 'This page is not found.'});
});

//500 error handler 
app.use(function(err, req, res, next){
	res.status(500);
	res.render('500', {title: 'Internal Error'});
});


app.listen(3000); 
console.log('Node running on port 3000')

module.exports = app; 



