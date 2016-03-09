var fs = require('fs');   
var BaseController = require("./Base"),
View = require("../views/Base"),
model = new (require("../models/ContentModel"));
module.exports = BaseController.extend(
		{
			name:"Campaign",
			content:null,
			run:function(req,res,next)
            {
                		
            },
            manageCampaign:function(req,res,next)
            {
               res.render('campaign');  		
            },
		}
	);