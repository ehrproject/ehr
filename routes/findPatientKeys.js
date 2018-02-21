var express = require('express');
var router = express.Router();
var patientsDB = require('../database/patientsDB.js');


router.post('/', function (req, res) {
  console.log('get patient: ' + req.body.lastName);
  var patientName = req.body.lastName;
  patientsDB.getPatientKeys(patientName, function(data, err){
      if(err){
          res.render('pokemon.ejs', {message: 'Please enter a Pokemon'});
      }
      else if(data){
          res.send({
              message: '',
              patient: data
          });
      }
      else {
          res.render('pokemon.ejs', {message: 'Pokemon does not exist'});
      }
  });
});

module.exports = router;