var express = require('express');
var ideaEngine = require('../ideas');

var routes = express.Router(); 

routes.get('/', function(req, res){
	res.render('index', { title : 'My Ideas', ideas : ideaEngine.getIdeas()});
})

routes.get('/about', function(req, res){
	res.render('about', {title:'About', description:'This is a page about me!'});
})

routes.get('/article/:id', function(req, res){
	var idea = ideaEngine.getOneIdea(req.params.id);
	res.render('article', {title: idea.title, idea:idea});
})


module.exports = routes; 

