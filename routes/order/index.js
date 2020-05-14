var express = require('express');
var router = express.Router();
var Order = require('../../models/order');
var Customer = require('../../models/customer');
var Caterer = require('../../models/caterer');
var ObjectId = require('mongodb').ObjectID;
var passport = require('passport');
var moment = require('moment');
var mail = require('../../nodeMailerWithTemp');
require('dotenv').config();

router.get('/getorder', passport.authenticate('jwt', {session: false}),  (req, res) => {

    const { user } = req;
    var userID = user.customerID

    var matchquery =  {};
    matchquery.customerID = new ObjectId(userID)

    if (typeof req.query.lteDate !== 'undefined' && typeof req.query.gteDate !== 'undefined') {
		var gteDate = moment(req.query.gteDate, 'DD MMM, YYYY').toDate()
		var lteDate = moment(req.query.lteDate, 'DD MMM, YYYY').add(1, 'days').toDate()
        matchquery.createdAt = {$gte: new Date(gteDate.toISOString()),$lte: new Date(lteDate.toISOString())}
    }
	
    /*Order.find(matchquery).sort({createdAt: -1}).exec((err,doc) => {
        if (err) return res.status(500).send({ error: err });
        return res.status(200).json(doc);
    });*/

	Order.aggregate([ 
        {$match: matchquery},
        {$lookup: {
            from: "customer", 
            localField: "customerID", 
            foreignField: "_id", 
            as: "customerDetails" }
        },
        { $sort : { createdAt : -1 } }
      ], (err,doc) => {
         if (err) return res.status(500).send({ error: err });
         return res.status(200).json(doc);
      });
});

router.put('/updateorder', passport.authenticate('jwt', {session: false}), (req, res) => {

    const { user } = req;
    var userID = user.customerID

    var matchquery;
    matchquery = {customerID: new ObjectId(userID)}

    if (typeof req.query._id === 'undefined') {
        matchquery._id = new ObjectId()
    }
    else {
        matchquery._id = new ObjectId(req.query._id)
    }
   
    var updateData = req.body

    console.log(updateData)

    Order.findOneAndUpdate(matchquery, {$set: updateData}, {runValidators: true}, (err, doc) => {
        if (err) {
            console.log(err)
            return res.status(500).send({ error: err });
        }
        else {
            res.status(201).json(doc);
        }
    });
});


router.post('/addorder', passport.authenticate('jwt', {session: false}), (req, res) => {

    const { user } = req;
    var userID = user.customerID

    var updateData = req.body

    console.log(updateData)

    var newOrder = new Order(updateData);
    newOrder.customerID = userID
    newOrder.save(function(err, doc, numAffected) {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: err });
        }
        else {
           
            var orderID = doc._id
            var catererID = doc.catererID

            updateCustomerStatus(userID, function(err, customerdoc) {
                if (err) {
                    console.log("updateCustomerStatus ERR= ", err)
                    return res.status(500).send({ error: err });
                }
                else {
                    console.log("updateCustomerStatus = ", customerdoc)
                    var customerEmail = customerdoc.customerEmail

                    getOrder(orderID, function(err, orderdetails) {
   
                        var catererEmail = orderdetails[0].catererDetails[0].catererEmail
                        var catererName = orderdetails[0].catererDetails[0].catererName
                        mail.sendCustomerOrderEmail('/templates/customer_order/email.html', orderdetails[0], catererName, customerEmail);
                        mail.sendCatererOrderEmail('/templates/caterer_order/email.html', orderdetails[0], catererEmail);
                       
                    }); 
                }
            });
        }
         
    });
});


var updateCustomerStatus = function (userID, callback) {

    Customer.find({_id: new ObjectId(userID)}, (err, customer) => {
                    
        if (err) {
            console.log(err)
            callback(err)
        }
        else {
            // update the customer
            if (customer.length > 0) {
                console.log('customer = ', customer[0])
                console.log('customer customerOrderCount= ', customer[0].customerOrderCount)
                var updatebody = {
                    customerOrderCount: customer[0].customerOrderCount + 1,
                    status: customer[0].customerOrderCount === 0 ? "new" : "recurring",
                    statusUpdated: Date.now()
                }
        
                Customer.findOneAndUpdate({_id: new ObjectId(userID)}, {$set: updatebody}, (err, updatedcustomer) => {
                    if (err) {
                        console.log(err)
                        callback(err)
                    }
                    else {
                        console.log(updatedcustomer)
                        callback(null, updatedcustomer)
                    }
                });
            }
            else {
                callback("doc not found")
            }
        }
    }); 

};

var getOrder = function(orderID, callback) {
    var matchquery = {};

    if (typeof orderID !== 'undefined') {
        matchquery._id = new ObjectId(orderID)
    }

	Order.aggregate([ 
        {$match: matchquery},
        {$lookup: {
            from: "customer", 
            localField: "customerID", 
            foreignField: "_id", 
            as: "customerDetails" }
        },
		{$lookup: {
            from: "caterer", 
            localField: "catererID", 
            foreignField: "_id", 
            as: "catererDetails" }
        },
        { $sort : { createdAt : -1 } }
      ], (err,doc) => {
         if (err) {
            callback (err)
         }
         else {
            callback (null, doc)
         }
      });
};


module.exports = router;
