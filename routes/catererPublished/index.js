var express = require('express');
var router = express.Router();
var Caterer = require('../../models/catererPublished');
var ObjectId = require('mongodb').ObjectID;
var passport = require('passport');

router.get('/getcaterer', (req, res) => {

    var matchquery = {};
	var pricerange = {};
	
	console.log(req.query.occasion)
	console.log(req.query.cuisine)

	if (typeof req.query.location !== 'undefined') 
	{
		//matchquery.catererCounty = req.query.location
		//console.log('matchquery 1 = ', JSON.stringify(matchquery))
	}
	
	if (typeof req.query.occasion !== 'undefined') 
	{
		matchquery.catererOccasion = { $in: req.query.occasion }
		console.log('matchquery 2 = ', JSON.stringify(matchquery))
	}
	
	if (typeof req.query.cuisine !== 'undefined')
	{
		matchquery.catererCuisine = { $in: req.query.cuisine }
		console.log('matchquery 3 = ', JSON.stringify(matchquery))
	}
	
	if (typeof req.query.price_lte !== 'undefined')
	{
		pricerange.$lte = req.query.price_lte
		matchquery.minimumspend = pricerange
	}
	
	if (typeof req.query.price_gt !== 'undefined')
	{
		pricerange.$gt = req.query.price_gt
		matchquery.minimumspend = pricerange
	}
	
	if (typeof req.query.dietaryconcern !== 'undefined')
	{
		//matchquery.dietaryconcern = req.query.dietaryconcern
	}

	if (typeof req.query.date !== 'undefined' && typeof req.query.time !== 'undefined')
	{
		var reqdate = req.query.date.split(",")[0]
		console.log(reqdate)
		matchquery.deliveryhours = {$elemMatch:{timerange: { $gte: parseInt(req.query.time), $lte: parseInt(req.query.time) }, day: reqdate }}
	}
	
	if (typeof req.query.longitude !== 'undefined' && typeof req.query.latitude !== 'undefined')
	{
		matchquery.location = { $nearSphere: { $geometry: { type: "Point", coordinates: [ parseFloat(req.query.latitude), parseFloat(req.query.longitude) ] }, $maxDistance: 12000 } }
	}
	
	if (typeof req.query.catererName !== 'undefined')
	{
		matchquery.catererName = {$regex: req.query.catererName,$options:'i'}
	}

    console.log('matchquery 4 = ', JSON.stringify(matchquery))
	
	Caterer.find( matchquery , (err,doc) => {
        if (err) return res.status(500).send({ error: err });
		if (doc === null) return res.status(404).send({ error: 'doc not found' });
        return res.status(200).json(doc);
    });
}); 

router.get('/getcatererprofile/:_id', (req, res) => {

    var matchquery = {};
	
	if (typeof req.params._id !== 'undefined')
		matchquery._id = new ObjectId(req.params._id)

	console.log(req.params._id)
	console.log(JSON.stringify(matchquery))
	
    Caterer.find(matchquery, (err,doc) => {
        if (err) return res.status(500).send({ error: err });
		if (doc === null) return res.status(404).send({ error: 'doc not found' });
        return res.status(200).json(doc);
    });
}); 

module.exports = router;