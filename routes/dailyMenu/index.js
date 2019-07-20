var express = require('express');
var router = express.Router();
var DailyMenu = require('../../models/dailyMenu');
var ObjectId = require('mongodb').ObjectID;
var passport = require('passport');
var moment = require('moment');

router.get('/getDailyMenu', (req, res) => {
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
           from: "menuPublished", 
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
});

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

 
module.exports = router;