var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var passport = require('passport');
var Customer = require('../../models/customer');

router.post('/customersignup', (req, res) => {
	
    var email = req.body.customerEmail.toLowerCase();

	Customer.findOne({ 'customerEmail' :  email }, function(err, customer) {
		// if there are any errors, return the error
		if (err) {
			return res.status(404).json({
				'message': err
			});
		}
		// check to see if theres already a customer with that email
		if (customer) {
			return res.status(404).json({
				'message': 'email existed'
			});
		} 
		else {
			// create the customer
			var newCustomer = new Customer();
			newCustomer.customerEmail    	     = email;
			newCustomer.customerPassword 	     = newCustomer.generateHash(req.body.customerPassword);
			newCustomer.customerFirstName	 	 = req.body.customerFirstName;
			newCustomer.customerLastName	 	 = req.body.customerLastName;
            newCustomer.customerPhoneNumber    	 = req.body.customerPhoneNumber;
            newCustomer.customerAddress        	 = req.body.customerAddress;
			newCustomer.customerCity			 = req.body.customerCity;
			newCustomer.customerCounty			 = req.body.customerCounty;
			newCustomer.customerCountry			 = req.body.customerCountry;
			newCustomer.save().then(() => res.json(newCustomer));
		}
	});
});

router.post('/customerlogin', (req, res) => {

   passport.authenticate(
      'customer-login',
      { session: false },
      (error, user) => {
  
        if (error || !user) {
            console.log('5')
            console.log('user = ', user)
          res.status(400).json({ 'error': error });
        }
        else {
            /** This is what ends up in our JWT */
            var myDate = new Date();
            myDate.setHours(myDate.getHours() + 24);
            console.log(myDate)
            const payload = {
                customerID: user._id,
                customerName: user.customerFirstName,
                customerEmail: user.customerEmail,
                expires: myDate,
            };

            /** assigns payload to req.user */
            req.login(payload, {session: false}, (error) => {
                if (error) {
                    console.log('6')
                    res.status(400).send({ error });
                }
                else {
                    /** generate a signed json web token and return it in the response */
                    const token = jwt.sign(payload, "FoodieBeeSecretKey", {expiresIn: '24h'} );

                    /** assign our jwt to the cookie */
                    res.cookie('jwt', token, { httpOnly: true});
                    res.status(200).json(payload);
                }
            });
        }
      },
    )(req, res);
});

router.get('/checkstatus', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { user } = req;
    console.log('req = ', user)
    res.status(200).send({ user });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).clearCookie('jwt', {path: '/'}).json({message: "successfully logout"});
});

module.exports = router;