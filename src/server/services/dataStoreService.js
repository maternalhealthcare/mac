/*eslint no-unused-vars: 0*/
'use strict';


var datastoremanager = require('./../database/DataStoreManager');
var express = require('express');
var router = express.Router();

/*router.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});*/

router.post('/upload', function(req, res) {
    var data = req.body;
    datastoremanager.upload(data, function(response) {
        if (response.status === 'success') {
            res.send(response.data);
        } else if (response.status === 'error') {
            next(response.data);
        }
    });

});

module.exports = router;


