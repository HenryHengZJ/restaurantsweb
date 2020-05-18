// load the things we need
var mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
var newObjectId = require('mongodb').ObjectID;

// define the schema for our orderSchema model
var selectionItemSchema = mongoose.Schema({
	selectionitemtitle: String,
	selectionitemprice: Number,
});

var selectionSchema = mongoose.Schema({
	selectioncategory: String,
	selectionmaxnum: Number,
	selectionitem: [selectionItemSchema],
});

var cartSchema = mongoose.Schema({
	menuID: ObjectId,
	title: String,
	descrip: String,
	quantity: Number,
	priceperunit: Number,
	instruction: String,
	totalunitprice: Number,
	src: String,
	selection: [selectionSchema],
});

var orderSchema = mongoose.Schema({
	orderNumber: String,
	orderItem: [cartSchema],
	customerID: ObjectId,
	customerType: String,
	totalOrderPrice: Number,
	orderType: String,
	orderStatus: String,
	paymentIntentID: String,
	paymentType: String,
	paymentStatus: String,
	pickupTime: Date,
	deliveryTime: Date,
	deliveryAddress: String,
}, {
    timestamps: true
});

//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('order', orderSchema, 'order');