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
		matchquery.catererCounty = req.query.location
		console.log('matchquery 1 = ', JSON.stringify(matchquery))
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
	
	if (typeof req.query.price_lt !== 'undefined')
	{
		pricerange.$lt = req.query.price_lt
		matchquery.minimumspend = pricerange
	}
	
	if (typeof req.query.price_gte !== 'undefined')
	{
		pricerange.$gte = req.query.price_gte
		matchquery.minimumspend = pricerange
	}
	
	if (typeof req.query.dietaryconcern !== 'undefined')
	{
		//matchquery.dietaryconcern = req.query.dietaryconcern
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