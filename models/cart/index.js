    
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
var cartSchema = mongoose.Schema({
	quantity: Number,
	instruction: String,
	menuID: ObjectId,
	catererID: ObjectId,
	customerID: ObjectId,
	totalprice: Number,
	selection: [selectionSchema],
});

//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('cart', cartSchema, 'cart');