var express = require('express');
var router = express.Router();
var LunchMenu = require('../../models/lunchMenuPublished');
var ObjectId = require('mongodb').ObjectID;
var passport = require('passport');
var moment = require('moment');

router.put('/updateLunchMenuPublished', (req, res) => {

    var matchquery;
    if (typeof req.query._id === 'undefined') {
        matchquery= {_id: new ObjectId()}
    }
    else {
        matchquery = {_id: new ObjectId(req.query._id)}
    }
   
    var updateData = req.body

    LunchMenu.findOneAndUpdate(matchquery, {$set: updateData}, {upsert: true, new: true, runValidators: true}, (err, doc) => {
        if (err) return res.status(500).send({ error: err });
        return res.status(201).json(doc);
    });
});

 
module.exports = router;