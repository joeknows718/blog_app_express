var express = require('express');
var ideaEngine = require('../ideas');
var nodemailer = require('nodemailer');
var routes = express.Router(); 


routes.get('/', function(req, res){
	res.render('index', { title : 'My Ideas', ideas : ideaEngine.getIdeas()});
});

routes.get('/about', function(req, res){
	res.render('about', {title:'About', description:'This is a page about me!'});
});

routes.get('/article/:id', function(req, res){
	var idea = ideaEngine.getOneIdea(req.params.id);
	res.render('article', {title: idea.title, idea:idea});
});

routes.get('/contact', function(req, res){
	res.render('contact', {title:'Contact Us', page:'contact'});
});

routes.post('/contact', function(req, res){
	var mailOpts;
	var smtpTrans;

	//set up mail transport server with Gmail Create an app specific pw 

	smtpTrans = nodemailer.createTransport('SMTP', {
		service : 'Gmail',
		auth: {
			user: "joeknows718@gmail.com",
			pass: "wwjfggpadvbnqwpq"
		}
	});

	// Mail message setup

	mailOpts = {
		from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab data from the req body object 
		to: 'joeknows718@gmai.com',
		subject: 'Website Contact form New Contact',
		text: req.body.message,
		html: '<p>' + req.body.message +'</p>'
	};
	// send the mail with a conf message or alt an error message if it dun send

	smtpTrans.sendMail(mailOpts, function(error, response){

		if(error){
			console.log(error);
			res.render('contact', { title: 'Contact Us', 
									msg: 'Error occured, your message was not sent',
									err: true, 
									page: 'contact'
								})
			

		} else {
			console.log('Email sent')
			res.render('contact', {title: 'Contact Us',
								   message: 'Message sent! Thanks!',
								   err: false,
								   page: 'contact'
								});
		}
	});

});


module.exports = routes; 

