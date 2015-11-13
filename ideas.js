var ideas = [
	{'id':1, 'title':'My first idea', 'body':'This is a description', 'published':'11/05/2015'},
	{'id':2, 'title':'My second idea', 'body':'This is a description', 'published':'11/05/2015'},
	{'id':3, 'title':'My third idea', 'body':'This is a description', 'published':'11/05/2015'},
	{'id':4, 'title':'My fourth idea', 'body':'This is a description', 'published':'11/05/2015'},
	{'id':5, 'title':'My fifth idea', 'body':'This is a description', 'published':'11/05/2015'}];


exports.getIdeas = function(){
	return ideas;
}

exports.getOneIdea = function(id){
	for(var i = 0; i < ideas.length; i++){
		if( ideas[i].id == id){
			return ideas[i]; 
		};
	};
}