
// respond with json data when a GET request is made with user id for '/stackoverflow' and user name for '/github'
var express = require('express');
var request = require('request');
var querystring = require('querystring');
var http = require('http');
var app = express();
var r = request.defaults({'proxy':'http://goaproxy.persistent.co.in:8080'});
app.get('/gitdata', function (req, res) {
    
    var user_id = req.param('id');
    var options = {
       url: 'https://api.github.com/users/'+user_id,
        headers: {
        'User-Agent': 'rajat161293'
        }
     };
	
	r.get(options,function(){}).pipe(res);//returns the response from github
});
	
	
app.get('/stackoverflowdata', function (req, res) {

    var user_id = req.param('id');     
	var options = {
       url: 'https://api.stackexchange.com/2.2/users/'+user_id+'/top-tags?site=stackoverflow',
         
     };
	
	r.get(options,function(){}).pipe(res);//returns the response from stackoverflow
}); 	
 

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


  
