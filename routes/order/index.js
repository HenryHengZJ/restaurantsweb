var express = require('express');
var router = express.Router();
var Order = require('../../models/order');
var Customer = require('../../models/customer');
var Caterer = require('../../models/caterer');
var ObjectId = require('mongodb').ObjectID;
var passport = require('passport');
var moment = require('moment');
var twiliocall = require('../../twilioAction')
const VoiceResponse = require('twilio').twiml.VoiceResponse;
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
                       
                        callTwilio(orderID, function(err, twilioresponse) {

                            if (err) {
                                console.log("callTwilio ERR= ", err)
                                return res.status(500).send({ error: err });
                            }
                            else {
                                res.status(200).json(twilioresponse);
                            }
                        });
                    }); 
                }
            });
        }
         
    });
});

var callTwilio = function (orderID, callback) {

    getSpeech(orderID, function(err, parentOrderSpeech) {
            
        if (err) {
            console.log("parentOrderSpeech ERR= ", err)
            callback(err)
        }
        else {
            
            getOrderItems(orderID, function(err, childOrderItemSpeech, orderdetails) {
                
                if (err) {
                    console.log("childOrderItemSpeech ERR= ", err)
                    callback(err)
                }
                else {

                    var catererCountryCode = "" 
                    var catererPhoneNumber = ""

                    if (typeof orderdetails.catererDetails[0].catererCountryCode !== 'undefined' ) {
                        catererCountryCode = orderdetails.catererDetails[0].catererCountryCode
                    }

                    if (typeof orderdetails.catererDetails[0].catererPhoneNumber !== 'undefined' ) {
                        catererPhoneNumber = orderdetails.catererDetails[0].catererPhoneNumber
                    }

                    if (catererPhoneNumber.charAt(0) === "0") {
                        catererPhoneNumber = catererPhoneNumber.substring(1);
                    }

                    catererPhoneNumber = catererCountryCode + catererPhoneNumber
                
                    twiliocall.callToCaterer(orderID, parentOrderSpeech, childOrderItemSpeech, catererPhoneNumber, 0, function(err, call) {
                        if (err) {
                            callback(err)
                        }
                        else {
                            callback(null, call)
                        }
                    });
                }
                
            });	
            
        }
    });

};

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

var getSpeech = function(orderID, callback) {
    getOrder(orderID, function(err, doc) {
		if (err) {
			console.log("ORDER ACCEPTED ERR= ", err)
			callback(err)
		}
		else {
			
			var speech = ""
			
			if (doc.length > 0) {

				console.log("ORDER = ", doc[0])
				
				var orderType = doc[0].orderType
			
				var deliverydate = moment(doc[0].deliverydate).format('dddd, MMMM Do')
				
				var deliverytime = moment(doc[0].deliverytime, 'HH:mm').format('h:mm A')
				
				var catererName = doc[0].catererDetails[0].catererName
				
				var customerFirstName = doc[0].customerDetails[0].customerFirstName
				
				var customerLastName = doc[0].customerDetails[0].customerLastName
				
				var customerName = customerFirstName + customerLastName
				
				var deliveryaddress = ""
				if (typeof doc[0].deliveryaddress !== 'undefined') {
					deliveryaddress = doc[0].deliveryaddress
					
					speech = "Hello! We are calling from FoodieBee, your restaurant, " + catererName + ", has a " + orderType + " order from customer named " + customerName + ", to be delivered at " + deliverytime + 
							 " on " + deliverydate + ". Delivery address is: " + deliveryaddress + ". To listen for the orders, press 1. To reject the order, press 2. To repeat the order, press 3."
				}
				else {
					
					speech = "Hello! We are calling from FoodieBee, your restaurant, " + catererName + ", has a " + orderType + " order from customer named " + customerName + ", to be collected at " + deliverytime + 
							 " on " + deliverydate +  ". To listen for the orders, press 1. To reject the order, press 2. To repeat the order, press 3."
					
				}
				
				console.log("/////////////////////////////////////////////////////////////////////")
				console.log("speech = ", speech)
		
				callback(null, speech)

			}
			else {
				callback("doc not found")
			}
		}
	});
};


var getOrderItems = function(orderID, callback) {
    getOrder(orderID, function(err, doc) {
		if (err) {
			console.log("getOrderItems ERR= ", err)
			callback(err)
		}
		else {
			
			var speech = ""
			
			if (doc.length > 0) {
  
				var orderitems = doc[0].orderItem

				var totalspeech = ""

				for(var i = 0; i < orderitems.length; i++){
					
					var title = orderitems[i].title
					var quantity = orderitems[i].quantity
					
					var selections_speech = ""
					var selections = orderitems[i].selection
					for(var x = 0; x < selections.length; x++){
						
						var selectioncategory = selections[x].selectioncategory
					
						var innerselectionsitem_titlesspeech = ""
						var innerselectionsitem = selections[x].selectionitem
						for(var y = 0; y < innerselectionsitem.length; y++){
							
							var innerselectionsitemtitle = innerselectionsitem[y].selectionitemtitle
							
							if (y === 0) {
								innerselectionsitem_titlesspeech = innerselectionsitemtitle
							}
							else {
								innerselectionsitem_titlesspeech = innerselectionsitem_titlesspeech + ", " + innerselectionsitemtitle
							}
						}
						
					
						if (selections.length > 0 && selections.length !== 1) {
							if (x === selections.length - 1) {
								selections_speech = selections_speech + "and " + innerselectionsitem_titlesspeech + " for " + selectioncategory + " selection. "
							}
							else {
								selections_speech = selections_speech + innerselectionsitem_titlesspeech + " for " + selectioncategory + " selection, "
							}
						}
						else {
							selections_speech = selections_speech + innerselectionsitem_titlesspeech + " for " + selectioncategory + " selection. "
                        }
						
                    }
                    
                                            
                    if(typeof orderitems[i].instruction !== 'undefined') {
                        selections_speech = selections_speech + "For this item, customer has the following special instruction: " + orderitems[i].instruction + ". "
                    }

					if (selections.length > 0) {
						parentspeech = quantity + ": " + title + " with " + selections_speech
					}
					else {
						parentspeech = quantity + ": " + title + ". ";
					}					
			
					if (orderitems.length > 0) {
						if (i === orderitems.length - 1 && orderitems.length !== 1) {
							totalspeech = totalspeech + "And, " + parentspeech 
						}
						else {
							totalspeech = totalspeech + parentspeech 
						}
					}
					else {
						totalspeech = totalspeech + parentspeech 
					}
					
					
				}
				speech = "Ordered item are: " + totalspeech + ". To accept the order, press 1. To reject the order, press 2. To repeat the order, press 3."
      
				callback (null, speech, doc[0])
			 }
			 else {
				callback ("doc not found")
			 }
		}
    });

};


var getCatererDetails = function (catererID, callback) {

    Caterer.findOne({_id: new ObjectId(catererID)}, (err, caterer) => {
                    
        if (err) {
            console.log(err)
            callback(err)
        }
        else {
            // update the customer
            callback(null, caterer) 
        }
    }); 

};

module.exports = router;
