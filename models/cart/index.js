    
// load the things we need
var mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

var selectionItemSchema = mongoose.Schema({
	selectionitemtitle: String,
	selectionitemprice: Number,
});

var selectionSchema = mongoose.Schema({
	selectioncategory: String,
	selectionmaxnum: Number,
	selectionitem: [selectionItemSchema],
});

// define the schema for our catererSchema model
var cartItemSchema = mongoose.Schema({
	title: String,
	serveperunit: Number,
	quantity: Number,
	instruction: String,
	menuID: ObjectId,
	totalprice: Number,
	selection: [selectionSchema],
});

var cartSchema = mongoose.Schema({
	catererID: ObjectId,
	customerID: ObjectId,
	orderType: String,
	cartitem: [cartItemSchema],
	deliveryfee: Number,
	totalOrderPrice: Number
},{
	timestamps: true
});

//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('cart', cartSchema, 'cart');