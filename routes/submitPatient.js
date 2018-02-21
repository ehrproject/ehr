var express = require('express');
var router = express.Router();
var patientsDB = require('../database/patientsDB.js');

router.post('/', function(req, res){
    console.log(req.body);
    patientsDB.putPatient(req.body, function(data, err) {
        if(err){
            console.log("error")
        }
        else if(data){
            // console.log('success');
            console.log(data);
            res.send({
                message: '',
                patient: data
            });
        }
        else {
        }
    })
    res.render('form.ejs')
});

module.exports = router;