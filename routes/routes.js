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
var getPatientPage = function(req, res) {
  res.render('patientPage.ejs')
}
var getLoginPage = function(req, res) {
  res.render('login.ejs')
}
var getAllergiesPage = function(req, res) {
  res.render('allergies.ejs')
}
var getProblemList = function(req, res) {
  res.render('problemList.ejs')
}
var getImmunizationPage = function(req, res) {
  res.render('immunizationPage.ejs')
}

var addAllergy = function (req, res) {
// console.log("add allergy: " + req.body)
res.json({data: req.body});
}
var addChronMed = function (req, res) {
// console.log("add chron med: " + req.body) // this throws an error for some reason
res.json({data: req.body});
}
var addAcuteProb = function (req, res) {
 // console.log("add chron med: " + req.body) // this throws an error for some reason
 res.json({data: req.body});
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
    console.log(id);
    patientsDB.getPatientById(id, function(data, err) {
      if(err) {
        console.log(err);
      } else {
        res.render('patientPage.ejs', {data: data[0]});
      }
    });
  };
  

// this method handles the get_main request from app.js and reroutes it to the getMain function above
var routes = { 
get_main: getMain,
  get_form:getForm,
  get_patient_page: getPatient,
  get_login_page: getLoginPage,
  get_problem_list: getProblemList,
  get_allergies: getAllergiesPage,
  get_immunization_page: getImmunizationPage,
  submit_patient: submitPatient,
  get_patient_keys: getPatientKeys,
  get_patient_search: getSearchPatients,
  add_allergy: addAllergy,
  add_chron_med: addChronMed,
  add_acute_prob: addAcuteProb
};

module.exports = routes;
