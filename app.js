
/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'), 
	path = require('path'),
	config = require('./config')(),
	app = express(),
	MongoClient = require('mongodb').MongoClient,
	Users = require('./controllers/Users'),
	Campaign = require('./controllers/Campaign');
//	partials = require('hogan-express-partials');

// all environments
// app.set('port', process.env.PORT || 3000);
app.engine('hjs', require('hogan-express'));
app.enable('view cache');
app.configure(function(){
app.set('partials',{header:"header",footer:"footer"});	
app.set('views', __dirname + '/templates');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('talent-scope-site'));
app.use(express.session());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
//app.use("/static",express.static(path.join(__dirname, '/public/')));
});
// development only
if ('development' == app.get('env')) {
  	app.use(express.errorHandler());
}

MongoClient.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/talentScope', function(err, db) {
	if(err) {
		console.log('Sorry, there is no mongo db server running.	');
	} else {
		var attachDB = function(req, res, next) {
			req.db = db;
			next();
		};
	
		app.all('/',attachDB, function(req, res, next) {
			Users.run(req, res, next);
		});	
        app.all('/logout', attachDB, function(req, res, next){
			Users.logout(req, res, next);
		});
        app.get('/manageCampaign',attachDB,function(req,res,next){
            Campaign.manageCampaign(req, res, next);
        });
        
		http.createServer(app).listen(config.port, function() {
		  	console.log(
		  		'Successfully connected to mongodb://' + config.mongo.host + ':' + config.mongo.port,
		  		'\nExpress server listening on port ' + config.port
		  	);
		});
	}
});