var mongoose = require('mongoose');
var db 		 = require('../db');
var post = mongoose.model('post');
var commentss = mongoose.model('comment');
var date 	 = new Date();

exports.post_view = function(req, res){
	id = req.params.id;

	post.find({'_id': id}, function(err, post){
      if(post){
      	commentss.find({'postid': id}, function(err, comment){
      		if(comment){
      			res.render('post_view', {title:t, post:post, comment:comment, admin:req.session.admin})
      		}else{
      			res.render('post_view', {title:t, post:post, comment:null, admin:req.session.admin})
      		}
      	});
        
      }else{
        res.render('post_view', {title:t, post:null, comment:null, admin:req.session.admin})
      }
    });
}
exports.post_view_post_handler = function(req, res){
	id = req.params.id;
	name = req.body.name;
	comment = req.body.comment;
	console.log(name + ' said ' + comment);
	console.log(id);


	//specific time
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var seconds = date.getSeconds();
	  //date
	  var month = date.getMonth() + 1;
	  var year = date.getFullYear();
	  var day = date.getDate();


	  //organize time so it looks nice
	  var time = month + '/' + day + '/' + year + ' at ' + hours + ':' + minutes + ':' + seconds;


	  //Submitting to database
	  var newComment = commentss({
	  	postid: id,
	    name: name,
	    comment: comment,
	    date: time
	  });
	  newComment.save();

	  //redirecting to homepage
	  res.redirect('/post/' + id);
}