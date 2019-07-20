    
// load the things we need
var mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

// define the schema for our catererSchema model
var menuSchema = mongoose.Schema({
	title: String,
	catererID: ObjectId,
	descrip: String,
	markitem: [String],
	priceperunit: Number,
	soldamount: {
        type: Number,
        default: 0
    },
	src: String,
});

//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('lunchMenuPublished', menuSchema, 'lunchMenuPublished');