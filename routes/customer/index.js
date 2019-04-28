var express = require('express');
var router = express.Router();
var Customer = require('../../models/customer');
var ObjectId = require('mongodb').ObjectID;
var passport = require('passport');

router.get('/getcustomerprofile/:_id', (req, res) => {

    var matchquery = {};
	
	if (typeof req.params._id !== 'undefined')
		matchquery._id = new ObjectId(req.params._id)

    Customer.find(matchquery, (err,doc) => {
        if (err) return res.status(500).send({ error: err });
		if (doc === null) return res.status(404).send({ error: 'doc not found' });
        return res.status(200).json(doc);
    });
}); 

router.put('/updatecustomerprofile', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { user } = req;
    var userID = user.customerID

    var matchquery;
    matchquery = {_id: new ObjectId(userID)}
    
    var updateData = req.body

    Customer.findOneAndUpdate(matchquery, {$set: updateData}, {runValidators: true}, (err, doc) => {
        if (err) return res.status(500).send({ error: err });
        return res.status(201).json(doc);
    });
});


module.exports = router;