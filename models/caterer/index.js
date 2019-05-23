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
	catererEmail: String,
    catererPassword: String,
    catererRegistrationNumber: String,
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
    status: {
        type: String,
        default: "new"
    },
    statusUpdated: {
        type : Date, 
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {
    timestamps: true
});

// generating a hash
catererSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
catererSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.catererPassword);
};

catererSchema.methods.generateJWT = function() {
  return jwt.sign({
    catererEmail: this.catererEmail,
    id: this._id,
  }, 'foodiebeecaterer', {expiresIn: '24h'} );
}

//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('caterer', catererSchema, 'caterer');