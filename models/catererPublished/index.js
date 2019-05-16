// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

// define the schema for our openingHoursSchema model
var openingHoursSchema = mongoose.Schema({
	day: String,
	starttime: Number,
	closetime: Number,
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
	openinghours: [openingHoursSchema],
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
    verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


catererSchema.methods.toAuthJSON = function() {
  return {
    _id			 		: this._id,
	catererName			: this.catererName,
    catererDescrip		: this.catererDescrip,
    catererPhoneNumber  : this.catererPhoneNumber,
    catererAddress		: this.catererAddress,
    catererFullAddress  : this.catererFullAddress,
    catererCity			: this.catererCity,
    catererCounty		: this.catererCounty,
    catererCountry		: this.catererCountry,
    catererCountryCode  : this.catererCountryCode,
    catererCuisine		: this.catererCuisine,
    catererOccasion		: this.catererOccasion,
	catererDietaryConcern : this.catererDietaryConcern,
    catererPickup		: this.catererPickup,
	catererDelivery		: this.catererDelivery,
	deliveryradius		: this.deliveryradius,
    deliveryfee			: this.deliveryfee,
	minimumspend		: this.minimumspend,
	openinghours		: this.openinghours,
	catererOrderLater	: this.catererOrderLater,
	inAdvanceMin		: this.inAdvanceMin,
	inAdvanceDay		: this.inAdvanceDay,
    phoneReceivable     : this.phoneReceivable,
    emailReceivable     : this.emailReceivable,
    rating				: this.rating,
    numofreview			: this.numofreview,
    coversrc			: this.coversrc,
    profilesrc          : this.profilesrc,
    verified			: this.verified,
  };
};


//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('catererPublished', catererSchema, 'catererPublished');