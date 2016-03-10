
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
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var path = require('path');
//	partials = require('hogan-express-partials');

// all environments
// app.set('port', process.env.PORT || 3000);
module.exports=app;
var router=require('./routes/router');
app.engine('hjs', require('hogan-express'));
app.enable('view cache');

app.set('partials',{header:"header",footer:"footer"});
app.set('views', __dirname + '/templates');
app.set('view engine', 'hjs');
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'secretKey', cookie: {maxAge: 60000 * 60}, saveUninitialized: true, resave: true}));

MongoClient.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/talentScope', function(err, db) {
	if(err) {
		console.log('Sorry, there is no mongo db server running.	');
	} else {
		var attachDB = function(req, res, next) {
			req.db = db;
			next();
		};
app.use('/route',router);

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
