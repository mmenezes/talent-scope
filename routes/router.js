var app=require('../app');
app.route('/route/hi').get(function(req,res,next){
	console.log('in hi')
		res.send("hello");


});
app.route('/route/bye').get(function(req,res,next){
	console.log('in bye')
		res.send("bye");


});
module.exports=app.route;
