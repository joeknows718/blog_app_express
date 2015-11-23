var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Idea = new Schema({
	title: String,
	body: String,
	date: {type: Date, default: Date.now }
})


mongoose.model('ideas', Idea);

mongoose.connect('mongodb://localhost/blog-project');

