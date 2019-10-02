var express = require('express');
var router = express.Router();
var DailyMenu = require('../../models/dailyMenu');
var Company = require('../../models/company');
var CatererPublished = require('../../models/catererPublished');
var LunchMenuPublished = require('../../models/lunchMenuPublished');
var ObjectId = require('mongodb').ObjectID;
var passport = require('passport');
var moment = require('moment');

router.get('/getDailyMenu', (req, res) => {
	
	var matchquery = {};
	
    if (typeof req.query.date !== 'undefined') {
        matchquery = {date: req.query.date}
    }
	
	if (typeof req.query.companyID !== 'undefined') {
		Company.findOne({_id: req.query.companyID}, (company_err, company_doc) => {
			if (company_err) {
				return res.status(500).send({ error: company_err });
			}
			else {

				var companyDistrict = company_doc.companyDistrict

				DailyMenu.findOne(matchquery, (err, doc) => {
					if (err) {
						return res.status(500).send({ error: err });
					}
					else if (doc === null) {
						return res.status(500).send({ error: "doc null" });
					}
					else {
						for(var i = 0; i < doc.caterers.length;i++){
							if (doc.caterers[i].district == companyDistrict) {
								var returndoc = {}
								var catererID = doc.caterers[i].catererID
								findCatererDetails(catererID, function(err, caterers_details) {
									if (err) {
										return res.status(500).send({ error: err });
									}
									else {
										findLunchMenuPublished(catererID, function(err, lunch_details) {
											if (err) {
												return res.status(500).send({ error: err });
											}
											else {
												returndoc.catererDetails = caterers_details
                                                returndoc.menuitems = lunch_details
                                                console.log(returndoc)
												return res.status(201).json([returndoc]);
											}
										});
									}
								});
								break;
							}
							else if (doc.caterers[i].district !== companyDistrict && i == doc.caterers.length - 1) {
								return res.status(500).send({ error: "Doc not found" });
							}
						}

					}
				});
			}
		});
    }
})

/*router.get('/getDailyMenu', (req, res) => {
	var matchquery = {};

    if (typeof req.query.date !== 'undefined') {
        matchquery = {date: req.query.date}
    }

    console.log(matchquery)
	
	DailyMenu.aggregate([ 
       {$match: matchquery},
	   {$unwind: "$caterers"},
       {$lookup: {
           from: "catererPublished", 
           localField: "caterers", 
           foreignField: "_id", 
           as: "catererDetails" }
       }, 
	   {$group: {
           _id: "$_id", 
		   createdAt: { $first: "$createdAt"},
		   updatedAt: { $first: "$updatedAt"},
		   date: { $first: "$date"},
		   menuitems: { $first: "$menuitems"},
           caterers: { $push: "$caterers"}, 
		   catererDetails: { $addToSet: "$catererDetails" },
	   }},
	   {$unwind: "$menuitems"},
	   {$lookup: {
           from: "lunchMenuPublished", 
           localField: "menuitems", 
           foreignField: "_id", 
           as: "menuDetails" }
       },
	   {$group: {
           _id: "$_id", 
		   createdAt: { $first: "$createdAt"},
		   updatedAt: { $first: "$updatedAt"},
		   date: { $first: "$date"},
		   menuitems: { $push: "$menuitems"},
		   menuDetails: { $addToSet: "$menuDetails"},
           caterers: { $first: "$caterers"}, 
		   catererDetails: { $first: "$catererDetails"},
	   }},
     ], (err,doc) => {
		if (err) return res.status(500).send({ error: err });
		res.status(200).json(doc);
	 });
});*/

router.put('/updateDailyMenu', (req, res) => {

    var matchquery;
    if (typeof req.query._id === 'undefined') {
        matchquery= {_id: new ObjectId()}
    }
    else {
        matchquery = {_id: new ObjectId(req.query._id)}
    }
   
    var updateData = req.body

    DailyMenu.findOneAndUpdate(matchquery, {$set: updateData}, {upsert: true, new: true, runValidators: true}, (err, doc) => {
        if (err) return res.status(500).send({ error: err });
        return res.status(201).json(doc);
    });
});

var findCatererDetails = function(catererID, callback) {
	
	var matchquery = {};
	
    if (typeof catererID !== 'undefined') {
        matchquery = {_id: catererID}
    }
	
	CatererPublished.findOne(matchquery, (err, doc) => {
		if (err) {
			callback (err)
		}
		else {
			callback (null, doc)   
		}
	});
}

var findLunchMenuPublished = function(catererID, callback) {
	
	var matchquery = {};
	
    if (typeof catererID !== 'undefined') {
        matchquery = {catererID: catererID}
    }
	
	LunchMenuPublished.find(matchquery, (err, doc) => {
		if (err) {
			callback (err)
		}
		else {
			callback (null, doc)   
		}
	});
}

module.exports = router;