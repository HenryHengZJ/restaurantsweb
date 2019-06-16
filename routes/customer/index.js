var express = require('express');
var router = express.Router();
var Customer = require('../../models/customer');
var ObjectId = require('mongodb').ObjectID;
var passport = require('passport');

router.get('/getcustomerprofile', passport.authenticate('jwt', {session: false}), (req, res) => {

    const { user } = req;
    var userID = user.customerID

    var matchquery;
    matchquery = {_id: new ObjectId(userID)}

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

router.put('/updatecustomerpassword', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { user } = req;
    var userID = user.customerID

    var matchquery;
    matchquery = {_id: new ObjectId(userID)}
    
    var updateData = req.body
    var originalpassword = updateData.originalpassword
    var newpassword = updateData.newpassword

    Customer.findOne(matchquery, function(err, customer) {
        // if there are any errors, return the error
        if (err) return res.status(500).send({ error: err });
        // if no customer is found, return the message
        if (!customer) return res.status(404).send({ error: err });
        // check customer's password
        if (customer.validPassword(originalpassword))
        {
            customer.update({
                customerPassword: customer.generateHash(newpassword)
            }).then(() => res.status(201).json(customer));
        }
        else {
            return res.status(401).send({ error: 'invalid password' });
        } 
    });
});

module.exports = router;