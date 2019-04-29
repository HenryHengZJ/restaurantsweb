var express = require('express');
var router = express.Router();
var Cart = require('../../models/cart');
var ObjectId = require('mongodb').ObjectID;
var passport = require('passport');

router.get('/getcart', passport.authenticate('jwt', {session: false}), (req, res) => {

    const { user } = req;
    var userID = user.customerID

    var matchquery={};
    matchquery = {customerID: new ObjectId(userID)}

	Cart.aggregate([ 
       {$match: matchquery},
       {$lookup: {
           from: "menuPublished", 
           localField: "menuID", 
           foreignField: "_id", 
           as: "menuDetails" }
       }
     ], (err,doc) => {
		if (err) return res.status(500).send({ error: err });
		res.status(200).json(doc);
	 });
});

router.put('/updatecart', passport.authenticate('jwt', {session: false}), (req, res) => {
	
	const { user } = req;
    var userID = user.customerID

    var matchquery={};
    if (typeof req.query._id === 'undefined') {
        matchquery= {_id: new ObjectId(), customerID: new ObjectId(userID)}
    }
    else {
        matchquery = {_id: new ObjectId(req.query._id), customerID: new ObjectId(userID)}
    }
   
    var updateData = req.body

    Cart.findOneAndUpdate(matchquery, {$set: updateData}, {upsert:true, new: true, runValidators: true, setDefaultsOnInsert: true}, (err, doc) => {
        if (err) return res.status(500).send({ error: err });
        return res.status(201).json(doc);
    });
});

router.delete('/deletecart', passport.authenticate('jwt', {session: false}), (req, res) => {
	
	const { user } = req;
    var userID = user.customerID

    var matchquery = {};
    if (typeof req.query._id !== 'undefined') {
        matchquery= {_id: new ObjectId(req.query._id), customerID: new ObjectId(userID)}
    }

    var updateData = req.body

    Cart.remove(matchquery, (err, doc) => {
        if (err) return res.status(500).send({ error: err });
        return res.status(200).json(doc);
    });
});

module.exports = router;