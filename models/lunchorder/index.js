// load the things we need
var mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
var newObjectId = require('mongodb').ObjectID;

var cartSchema = mongoose.Schema({
	title: String,
	menuID: ObjectId,
	descrip: String,
	totalprice: Number,
});

var orderSchema = mongoose.Schema({
	orderItemID: ObjectId,
	orderItem: [cartSchema],
	catererID: ObjectId,
	customerID: ObjectId,
	customerCompanyID: ObjectId,
	totalOrderPrice: Number,
	orderStatus: String,
	paymentIntentID: String,
	paymentType: String,
	paymentStatus: String,
}, {
    timestamps: true
});

//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('lunchorder', orderSchema, 'lunchorder');