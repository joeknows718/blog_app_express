var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Idea = new Schema({
	title: String,
	body: String,
	date: {type: Date, default: Date.now }
});

var adminUser = new Schema({
	username: String,
	password: String
});


mongoose.model('ideas', Idea);
mongoose.model('adminUser', adminUser);

mongoose.connect('mongodb://localhost/blog-project');

