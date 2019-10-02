var express = require('express');
var router = express.Router();
var Company = require('../../models/company');
var ObjectId = require('mongodb').ObjectID;

router.get('/getcompany', (req, res) => {

    var matchquery = {};
    
	if (typeof req.query.companyName !== 'undefined')
	{
		matchquery.companyName = {$regex: "^" + req.query.companyName,$options:'i'}
	}

	if (typeof req.query.companyID !== 'undefined')
	{
		matchquery._id = req.query.companyID
	}

	var q = Company.find(matchquery).limit(5);
	q.exec((err, doc) => {
        if (err) return res.status(500).send({ error: err });
		if (doc === null) return res.status(404).send({ error: 'doc not found' });
        return res.status(200).json(doc);
    });
}); 

router.post('/postcompany', (req, res) => {

	// create the company
	var newCompanyDetails = new Company(req.body);
	newCompanyDetails.save(function(err, doc, numAffected) {
        if (err) {
            return res.status(500).send({ error: err });
        }
        else {
			console.log(doc);
			res.status(200).json(doc)
		}
	});	

});


module.exports = router;
