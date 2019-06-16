var express = require('express');
var router = express.Router();
var Cart = require('../../models/cart');
var Cart = require('../../models/cart');
var ObjectId = require('mongodb').ObjectID;
var passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/getcart', passport.authenticate('jwt', {session: false}), (req, res) => {

    const { user } = req;
    var userID = user.customerID

    var matchquery={customerID: new ObjectId(userID)};

    if (typeof req.query.catererID !== 'undefined') {
        matchquery.catererID = new ObjectId(req.query.catererID)
    }

    if (typeof req.query._id !== 'undefined') {
        matchquery._id = new ObjectId(req.query._id)
    }

	/*Cart.aggregate([ 
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
     });*/
     console.log(matchquery)
     Cart.find(matchquery, (err, doc) => {
        if (err) return res.status(500).send({ error: err });
        if (doc === null) return res.status(404).send({ error: 'doc not found' });
        console.log(doc)
        return res.status(200).json(doc);
    });

});

router.put('/updatecart', passport.authenticate('jwt', {session: false}), (req, res) => {
	
	const { user } = req;
    var userID = user.customerID

    console.log('userID 1 = ',   userID)
    
    if (typeof userID === 'undefined') {
        findUserID(req.cookies['jwt'], function(data){
            /* This data stack 1  */
            userID = data
        });
    }

    console.log('userID 2= ', userID)

    if (typeof userID === 'undefined') {
        return res.status(500).send({ error: "user not found" });
    }
    else {

        var matchquery={};
        if (typeof req.query._id === 'undefined') {
            matchquery= {_id: new ObjectId(), customerID: new ObjectId(userID)}
        }
        else {
            matchquery = {_id: new ObjectId(req.query._id), customerID: new ObjectId(userID)}
        }
    
        console.log(matchquery)
        
        var updateData = req.body
        updateData.customerID = new ObjectId(userID)

        Cart.findOneAndUpdate(matchquery, {$set: updateData}, {upsert:true, new: true, runValidators: true, setDefaultsOnInsert: true}, (err, doc) => {
            if (err) return res.status(500).send({ error: err });
            return res.status(201).json(doc);
        });

    }
    
});

router.delete('/deletecart', passport.authenticate('jwt', {session: false}), (req, res) => {
	
	const { user } = req;
    var userID = user.customerID

    var matchquery = {};
    if (typeof req.query._id !== 'undefined') {
        matchquery= {_id: new ObjectId(req.query._id), customerID: new ObjectId(userID)}
    }

    Cart.remove(matchquery, (err, doc) => {
        if (err) return res.status(500).send({ error: err });
        return res.status(200).json(doc);
    });
});


function findUserID(token, callback) {
	jwt.verify(token, process.env.jwtSecretKey, function(err, decoded) {
        console.log('JWT DECODED = ', decoded.customerID) // bar
        if (err) {
            console.log('JWT err = ') 
            callback(undefined);
        }
        else {
            console.log('JWT customerID = ') 
            var customerID = decoded.customerID
            callback(customerID);
        }
    });
}

module.exports = router;