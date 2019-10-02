// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

var deliveryAddressSchema = mongoose.Schema({
	default: {
        type: Boolean,
        default: false
    },
    address1: String,
    address2: String,
    address3: String,
    city: String,
	county: String,
});

// define the schema for our customerSchema model
var customerSchema = mongoose.Schema({
    customerFirstName: String,
	customerLastName: String,
    customerEmail: String,
	customerPassword: String,
    customerPhoneNumber: String,
    customerDeliveryAddress: [deliveryAddressSchema],
    customerCity: String,
    customerCounty: String,
    customerCountry: String,
    customerCountryCode: String,
    customerCompanyID: ObjectId,
    customerOrderCount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "new"
    },
    statusUpdated: {
        type : Date, 
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    customerPaymentAccoundID: String,
}, {
    timestamps: true
});

// generating a hash
customerSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
customerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.customerPassword);
};

customerSchema.methods.generateJWT = function() {
  return jwt.sign({
    customerEmail: this.customerEmail,
    id: this._id,
  }, process.env.jwtSecretKey, {expiresIn: '24h'} );
}

//Connect to specific database
const db = mongoose.connection.useDb('foodiebee');

// create the model
module.exports = db.model('customer', customerSchema, 'customer');