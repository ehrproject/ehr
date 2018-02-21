var express = require('express');
var router = express.Router();
var patientsDB = require('../database/patientsDB.js');

router.post('/:id', function(req, res, next) {
	var id = decodeURI(req.params.id);
	console.log('id: ' + id);
	patientsDB.getPatientById(id, function(err, data) {
		if(err) {
			console.log(err);
		} else {
			console.log("first" + data);
			console.log("here:" + data[0]);
			res.render('patient', {data: data});
		}
	});
});

module.exports = router;