var express = require('express');
var router = express.Router();
var Menu = require('../../models/menuPublished');
var ObjectId = require('mongodb').ObjectID;
var passport = require('passport');

router.get('/getmenu/:catererID', (req, res) => {

    var matchquery = {};
	
	if (typeof req.params.catererID !== 'undefined')
		matchquery.catererID = new ObjectId(req.params.catererID)

    Menu.find(matchquery, (err,doc) => {
        if (err) return res.status(500).send({ error: err });
        return res.status(200).json(doc);
    });
});


module.exports = router;