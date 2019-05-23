var express = require('express');
var router = express.Router();
var Caterer = require('../../models/caterer');
var mail = require('../../nodeMailerWithTemp');

router.post('/newcaterersignup', (req, res) => {
	
    var email = req.body.catererEmail.toLowerCase();

	Caterer.findOne({ 'catererEmail' :  email }, function(err, caterer) {
		// if there are any errors, return the error
		if (err) {
			return res.status(404).json({
				'message': err
			});
		}
		// check to see if theres already a customer with that email
		if (caterer) {
			return res.status(404).json({
				'message': 'email existed'
			});
		} 
		else {
			// create the customer
			var newCatererDetails = new Caterer(req.body);
			newCatererDetails.save().then(() =>
			{
				mail.sendNewCatererRegisterEmail('/templates/newcatererregister/email.html', email);
				mail.sendNewCatererRegisterAdminEmail('/templates/newcatererregister_admin/email.html', newCatererDetails);
				res.json(newCatererDetails)
			});
		}
	});
});


module.exports = router;