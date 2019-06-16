var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var passport = require('passport');
var Customer = require('../../models/customer');
var Order = require('../../models/order');
var Menu = require('../../models/menu');
const crypto = require('crypto');
var mail = require('../../nodeMailerWithTemp');
var ObjectId = require('mongodb').ObjectID;
var bcrypt   = require('bcrypt-nodejs');
var twiliocall = require('../../twilioAction')
const VoiceResponse = require('twilio').twiml.VoiceResponse;
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

/*router.get('/voice-call', (req, res) => {
    console.log('voice-calling... ')
    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new VoiceResponse();
    twiml.say({ voice: 'alice' }, 'Hello! I am calling from Hertz Corporation which is located at Ontorio, Canada. May I please speak to Claire Lieu please?');
   
    // Render the response as XML
    res.set('Content-Type', 'text/xml');
    res.status(200).send(twiml.toString());
});

router.get('/testcall', (req, res) => {
    twiliocall.callToCaterer(req.query.orderID, req.query.catererName, function(err, call) {
        if (err) {
            return res.status(500).send({ error: err })
        }
        else {
            res.status(200).send(call);
        }
    });
});*/

router.post('/voice', (request, response) => {

    var orderID = request.query.orderID
	
	var parentOrderSpeech = decodeURIComponent(request.query.parentOrderSpeech)
	var parentOrderSpeechEncoded = encodeURIComponent(parentOrderSpeech)
	
	var childOrderItemSpeech = decodeURIComponent(request.query.childOrderItemSpeech)
	var childOrderItemSpeechEncoded = encodeURIComponent(childOrderItemSpeech)

    const twiml = new VoiceResponse();
  
    /** helper function to set up a <Gather> */
    function gather() {
		
      const gatherNode = twiml.gather({ numDigits: 1 });

	  gatherNode.say(parentOrderSpeech);
  
      // If the user doesn't enter input, loop
      twiml.redirect("/twilio/voice?orderID=" + orderID + "&parentOrderSpeech=" + parentOrderSpeechEncoded + "&childOrderItemSpeech=" + childOrderItemSpeechEncoded);
    }
	
	function gather2() {
     
	  const gatherNode = twiml.gather({ numDigits: 1, action: "https://foodiebee.eu/twilio/voice2?orderID=" + orderID + "&parentOrderSpeech=" + parentOrderSpeechEncoded + "&childOrderItemSpeech=" + childOrderItemSpeechEncoded });

	  gatherNode.say(childOrderItemSpeech);
  
      // If the user doesn't enter input, loop
      twiml.redirect("/twilio/voice2?orderID=" + orderID + "&parentOrderSpeech=" + parentOrderSpeechEncoded + "&childOrderItemSpeech=" + childOrderItemSpeechEncoded);
    }
  
    // If the user entered digits, process their request
    if (request.body.Digits) {
      switch (request.body.Digits) {
        case '1':
            gather2();
		    break;
        case '2':
            twiml.say('You have rejected the order. An email notification will be sent to you and customer shortly. Thank you for using FoodieBee and have a nice day!');
            break;
        default:
            twiml.redirect("/twilio/voice?orderID=" + orderID + "&parentOrderSpeech=" + parentOrderSpeechEncoded + "&childOrderItemSpeech=" + childOrderItemSpeechEncoded );
            break;
      }
    } else {
      // If no input was sent, use the <Gather> verb to collect user input
      gather();
    }
  
    // Render the response as XML in reply to the webhook request
    response.type('text/xml');
    response.send(twiml.toString());
});


router.post('/voice2', (request, response) => {

    console.log("VOICE2")

    var orderID = request.query.orderID
		
	var parentOrderSpeech = decodeURIComponent(request.query.parentOrderSpeech)
	var parentOrderSpeechEncoded = encodeURIComponent(parentOrderSpeech)
	
	var childOrderItemSpeech = decodeURIComponent(request.query.childOrderItemSpeech)
	var childOrderItemSpeechEncoded = encodeURIComponent(childOrderItemSpeech)
	 
    const twiml = new VoiceResponse();
  
    /** helper function to set up a <Gather> */
	
    // If the user entered digits, process their request
    if (request.body.Digits) {
      switch (request.body.Digits) {
        case '1':
            twiml.say('You have accepted the order. An email notification will be sent to you and customer shortly. Thank you for using FoodieBee and have a nice day!');
            console.log("VOICE2 ORDER ACCEPTED!!!")
            acceptOrderAction(orderID, function(err, doc) {
                if (err) {
                    console.log("VOICE2 ORDER ACCEPTED ERR= ", err)
                }
                else {
                    console.log("VOICE2 ORDER ACCEPTED = ", doc)
                }
            });
		    break;
        case '2':
            twiml.say('You have rejected the order. An email notification will be sent to you and customer shortly. Thank you for using FoodieBee and have a nice day!');
            console.log("VOICE2 ORDER REJECTED!!!")
            rejectOrderAction(orderID, function(err, doc) {
                if (err) {
                    console.log("VOICE2 ORDER REJECTED ERR= ", err)
                }
                else {
                    console.log("VOICE2 ORDER REJECTED = ", doc)
                }
            });
            break;
        default:
            twiml.redirect("/twilio/voice?orderID=" + orderID + "&parentOrderSpeech=" + parentOrderSpeechEncoded + "&childOrderItemSpeech=" + childOrderItemSpeechEncoded );
            break;
      }
    } 


    // Render the response as XML in reply to the webhook request
    response.type('text/xml');
    response.send(twiml.toString());
});


var acceptOrderAction = function(orderID, callback) {
	
    var matchquery = {};

    if (typeof orderID !== 'undefined') {
        matchquery._id = new ObjectId(orderID)
    }
    var updateData = {
        orderStatus: "accepted",
        paymentStatus: "succeeded"
    }

    Order.findOneAndUpdate(matchquery, {$set: updateData}, {returnOriginal: false, runValidators: true}, (err, doc) => {
        if (err) {
            callback (err)
         }
         else {
            var paymentIntentID = doc.paymentIntentID
            console.log('paymentIntentID = ', paymentIntentID)
            stripe.paymentIntents.confirm(paymentIntentID, function(err, intent) {
                if (err) {
                    callback (err)
                 }
                 else {

                    var arrayOfMenuID = []
                    var orderitems = doc.orderItem
                    for(var i = 0; i < orderitems.length; i++){
                        arrayOfMenuID.push(orderitems[i].menuID)
                    }

                    //var arrayOfMenuID = [new ObjectId("5cc81203cdded1249f96d277"), new ObjectId("5cc81269cdded1249f96d27c")]
	
                    var menumatchquery = {_id: { $in: arrayOfMenuID}}
                
                    var bulkMenu = Menu.collection.initializeOrderedBulkOp();
                    bulkMenu.find(menumatchquery).update({$inc: {soldamount:1}});
                    bulkMenu.execute((err, menudoc) => {
                        if (err) {
                            callback (err)
                         }
                         else {
                            getOrder(orderID, function(err, orderdoc) {
                                if (err) {
                                    callback (err)
                                }
                                else {
                                    if (orderdoc.length > 0) {
                                        var orderdetails = orderdoc[0]
                                        var customerEmail = orderdoc[0].customerDetails[0].customerEmail
                                        var catererEmail = orderdoc[0].catererDetails[0].catererEmail
                                        var catererName = orderdoc[0].catererDetails[0].catererName
                                        mail.sendCustomerOrderEmail('/templates/customer_order/email.html', orderdetails, catererName, customerEmail);
                                        mail.sendCatererOrderEmail('/templates/caterer_order/email.html', orderdetails, catererEmail);
                                        callback (null, orderdoc)   
                                    }
                                    else {
                                        callback ("doc not found")   
                                    } 
                                }
                            })
                         }
                    });
                 }
            });
         }
    });
}

var rejectOrderAction = function(orderID, callback) {
	
    var matchquery = {};

    if (typeof orderID !== 'undefined') {
        matchquery._id = new ObjectId(orderID)
    }
    var updateData = {
        orderStatus: "rejected",
        paymentStatus: "incomplete"
    }

    Order.findOneAndUpdate(matchquery, {$set: updateData}, {returnOriginal: false, runValidators: true}, (err, doc) => {
        if (err) {
            callback (err)
         }
         else {
            getOrder(orderID, function(err, orderdoc) {
                if (err) {
                    callback (err)
                }
                else {
                    if (orderdoc.length > 0) {
                        var orderdetails = orderdoc[0]
                        var customerEmail = orderdoc[0].customerDetails[0].customerEmail
                        var catererEmail = orderdoc[0].catererDetails[0].catererEmail
                        var catererName = orderdoc[0].catererDetails[0].catererName
                        mail.sendCustomerOrderEmail('/templates/customer_order/email.html', orderdetails, catererName, customerEmail);
                        mail.sendCatererOrderEmail('/templates/caterer_order/email.html', orderdetails, catererEmail);
                        callback (null, orderdoc)   
                    }
                    else {
                        callback ("doc not found")   
                    } 
                }
            })
         }
    });
}

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