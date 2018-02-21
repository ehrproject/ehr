var patientsDB = require('../database/patientsDB.js');

// this function renders index.ejs, which is located in the views folder
var getMain = function(req, res) {
	res.render('index.ejs');
}

var getForm = function(req, res) {
	res.render('form.ejs');
}

var getSearchPatients = function(req, res) {
  res.render('patientSearch.ejs');
}
var submitPatient = function(req, res) {
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
}
var getPatientKeys = function (req, res) {
  console.log('get patient: ' + req.body.lastName);
  // user signup
  var patientName = req.body.lastName;
  patientsDB.getPatientKeys(patientName, function(data, err){
      if(err){
          res.render('pokemon.ejs', {message: 'Please enter a Pokemon'});
      }
      else if(data){
          // console.log('success');
          // console.log(data);
          res.send({
              message: '',
              patient: data
          });
      }
      else {
          res.render('pokemon.ejs', {message: 'Pokemon does not exist'});
      }
  });
}

var getPatient = function(req, res) {
  var id = decodeURI(req.params.id);
  patientsDB.getPatientById(id, function(data, err) {
    if(err) {
      console.log('error here');
      console.log(err);
    } else {
      var data1 = data[0];
      res.render('patient.ejs', {data: data1});
    }
  });
};

// this method handles the get_main request from app.js and reroutes it to the getMain function above
var routes = { 
  get_main: getMain,
  get_form:getForm,
  submit_patient: submitPatient,
  get_patient_keys: getPatientKeys,
  get_patient_search: getSearchPatients,
  get_patient: getPatient
};

module.exports = routes;
