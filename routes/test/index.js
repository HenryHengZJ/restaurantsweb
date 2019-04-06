var express = require('express');
var router = express.Router();
var Caterer = require('../../models/caterer');

router.get('/caterer', (req, res) => {
    Caterer.find( (err,caterer) => {
        if (err) return res.send(err);
        return res.status(200).json(caterer);
      });
});

module.exports = router;
