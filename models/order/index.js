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
	title: String,
	serveperunit: Number,
	quantity: Number,
	instruction: String,
	menuID: ObjectId,
	totalprice: Number,
	selection: [selectionSchema],
});

var orderSchema = mongoose.Schema({
	orderItem: [cartSchema],
	catererID: ObjectId,
	customerID: ObjectId,
	deliveryfee: Number,
	totalOrderPrice: Number,
	orderType: String,
	orderStatus: String,
	paymentType: String,
	deliveryaddress: String,
	deliverydate: Date,
	deliverytime: String,
	paymentIntentID: String,
	paymentStatus: String,
}, {
    timestamps: true
});

//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('order', orderSchema, 'order');