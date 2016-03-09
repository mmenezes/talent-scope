var fs = require('fs');   
var BaseController = require("./Base"),
View = require("../views/Base"),
model = new (require("../models/ContentModel"));
module.exports = BaseController.extend(
		{
			name:"Users",
            username: "admin",
	        password: "admin",
			content:null,
			run:function(req,res,next)
            {
                var self = this;
                if(this.authorize(req)) {
                    model.setDB(req.db);
                    req.session.talentScope = true;
                    req.session.save();
                    var v = new View(res, 'dashboard');
                     v.render({
                        title: 'Dashboard'
                    });
                    
                } else {
                    res.render('login');
                }		
            },
            authorize: function(req) {
                return (
                    req.session && 
                    req.session.talentScope && 
                    req.session.talentScope === true
                ) || (
                    req.body && 
                    req.body.username === this.username && 
                    req.body.password === this.password
                );
            },
                login:function()
            {

            },
			logout:function(req,res,next)
			{   /**destroy session**/ 
                req.session.destroy();
				/**logout user**/
                res.redirect('/');
			}
		}
	);