var express = require('express');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose')
var Ideas = mongoose.model('ideas')
var adminUser = mongoose.model('adminUser');
var bcrypt = require('bcrypt-nodejs');

var routes = express.Router(); 

function sessionCheck(req, res, next){
	if(req.session.user){
		next();
	} else {
		res.redirect('/login');
	};
};


routes.get('/', function(req, res){
	Ideas.find(function(err, ideas){
		res.render('index', { title : 'My Ideas', ideas: ideas, user: req.session.user});
	}).sort({date: -1});
});

routes.get('/article/add', sessionCheck, function(req, res){
	res.render('add', {title : 'Add an idea!', user: req.session.user});
});

routes.post('/article/add', sessionCheck, function(req, res){
	new Ideas({
		title: req.body.title,
		body: req.body.body
	}).save(function(err, idea){
		console.log(idea);
		res.redirect('/');
	})
})

routes.get('/about', function(req, res){
	res.render('about', {title:'About', description:'This is a page about me!' , user: req.session.user});
});

routes.get('/article/:id', function(req, res){
	Ideas.findById(req.params.id, function(err, idea){
		console.log(idea);
		res.render('article', {title: idea.title, idea:idea, user: req.session.user});
	});
	
});

routes.get('/article/:id/edit', sessionCheck, function(req, res){
	Ideas.findById(req.params.id, function(err, idea){
		console.log(idea);
		res.render('edit', {title: idea.title, idea:idea, user: req.session.user});
	});
});

routes.post('/article/:id/save', sessionCheck, function(req, res){
	Ideas.update({ _id: req.params.id }, {
		title: req.body.title,
		body: req.body.body,
	}, function(error, idea){
		console.log(idea);
		res.redirect('/article/' + req.params.id)
	});
});

routes.get('/article/:id/delete', sessionCheck, function(req, res){
	Ideas.remove({ _id: req.params.id }, function(err){
		res.redirect('/')
	});
});


routes.get('/contact', function(req, res){
	res.render('contact', {title:'Contact Us', page:'contact', user: req.session.user});
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

routes.get('/add-user', function(req, res){
	res.render('add-user', { title: 'Add a User', user: req.session.user});
})

routes.post('/add-user', function(req, res){
	var salt, hash, password;

	password = req.body.password;
	salt = bcrypt.genSaltSync(10);
	hash = bcrypt.hashSync(password, salt);

	new adminUser({
		username: req.body.username,
		password: hash
	}).save(function(err){
		res.redirect('/');
	});
});

routes.get('/login', function(req, res){
	res.render('login', {title:'Login', user: req.session.user});
});

routes.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	adminUser.findOne({
		username: username
	}, function(err, data){
		if(err | data === null){
			return response.send(401, "User doesn't exist");
		} else {
			var usr = data;

			if(username == usr.username && bcrypt.compareSync(password, usr.password)) {
				req.session.regenerate(function(){
					req.session.user = username;
					return res.redirect('/');
				});
			} else {
				return res.send(401, "Bad Username or Password");
			}
		}
	});
});


routes.get('/logout', sessionCheck, function(req, res) {
	req.session.destroy(function(){
		return res.redirect('/');
	})
})


module.exports = routes; 

