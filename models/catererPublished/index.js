// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

// define the schema for our openingHoursSchema model
var deliveryHoursSchema = mongoose.Schema({
	day: String,
	starttime: Number,
    closetime: Number,
    timerange: [Number]
});

// define the schema for our catererSchema model
var catererSchema = mongoose.Schema({
	catererName: String,
    catererDescrip: String,
    catererPhoneNumber: String,
    catererAddress: String,
    catererFullAddress: String,
    catererCity: String,
    catererCounty: String,
    catererCountry: String,
    catererCountryCode: String,
    catererCuisine: [String],
    catererOccasion: [String],
	catererDietaryConcern: [String],
    catererPickup: Boolean,
	catererDelivery: Boolean,
	location: { type: {type:String}, coordinates: [Number]},
	deliveryradius: Number,
    deliveryfee: Number,
	minimumspend: Number,
	deliveryhours: [deliveryHoursSchema],
	catererOrderLater: Boolean,
	inAdvanceMin: Number,
	inAdvanceDay: Number,
	phoneReceivable: {
        type: Boolean,
        default: true
    },
	emailReceivable: {
        type: Boolean,
        default: true
    },
    rating: Number,
    numofreview: Number,
    coversrc: String,
    profilesrc: String,
    status: {
        type: String,
        default: "new"
    },
    statusUpdated: {
        type : Date, 
        default: Date.now
    }
}, {
    timestamps: true
});


//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('catererPublished', catererSchema, 'catererPublished');