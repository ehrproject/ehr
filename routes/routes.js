var patientsDB = require('../database/patientsDB.js');
var weightDB = require('../database/weightDB.js');

// this function renders login.ejs first now
var getMain = function(req, res) {
	res.render('login.ejs');
}

// renders the form page which is used to submit a new patient
var getForm = function(req, res) {
	res.render('form.ejs');
}

// renders the patientSearch page which has a search bar
var getSearchPatients = function(req, res) {
  res.render('patientSearch.ejs');
}

// renders the allergy page  BUT WE NEED TO FIX THIS AT A LATER DATE TO MAKE IT UNIQUE DEPENEDING ON PATIENT
var getAllergiesPage = function(req, res) {
  res.render('allergies.ejs')
}

// renders the problem list page BUT WE NEED TO FIX THIS AT A LATER DATE TO MAKE IT UNIQUE DEPENEDING ON PATIENT
var getProblemList = function(req, res) {
  res.render('problemList.ejs')
}

// saves a new patient to the database, and returns patient data 
// params: a JSON of data from form
// returns: patient data (why though??? unclear)
// used in form.ejs in views
var submitPatient = function(req, res) {
  console.log(req.body);
  patientsDB.putPatient(req.body, function(data, err) {
        if(err){
            console.log("error")
        }
        else if(data){
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

//used to render the patient page depending on the url of the patient that was clicked
//params: patient url with id embedded in url
var getPatient = function(req, res) {
    var id = decodeURI(req.params.id); // gets id from url
    patientsDB.getPatientById(id, function(data, err) {
        if(err) {
            console.log(err);
        } else {
        // render the patientPage with the returned data
            res.render('patientPage.ejs', {data: data[0]}); 
        }
    });
};
  
// this function finds all the patients starting with the input
// it will then return the data back in JSON format
var getPatientKeys = function (req, res) {
  console.log('get patient: ' + req.body.search);
  // get the field and the search data from the body
  var search = req.body.search;
  var field = req.body.field;
  // pass the fields in the getPatientKeys function in patientsDB
  patientsDB.getPatientKeys(search, field, function(data, err){
      if(err){
          alert("Error from getPatientKeys, patients DB, in routes.js -> getPatientKeys")
      }
      else if(data){
          res.send({
              message: '',
              patient: data
          });
      }
      else {
          alert("No data or error in routes.js -> getPatientKeys")
      }
  });
}

// display the weight page
var getWeightPage = function(req, res) {
    res.render('weight.ejs');
};

var getAllWeights = function(req, res) {
    var id = req.body.id;
    weightDB.getAllWeights(id, function(data, err) {
        if(err) {
            console.log(err);
        } else {
            console.log("data1: " + data);
            res.send({data: data});
        }
    });
};
  
var submitNewWeight = function(req, res) {
    // weightDB.putWeight(req.body.id, req.body.weight, req.body.date, function(data, err) {
    weightDB.putWeightEntry(req.body.id, req.body.weight, req.body.date, function(data, err) {
        if(err){
            console.log("error")
        }
        else if(data){
            console.log('success here in routes');
            console.log('data in routes: ' + data);
            res.send({
                data: data
            });
        }
    });
};

  
// display the weight page
var getWeightPage = function(req, res) {
    res.render('weight.ejs');
  };
  

// this method handles the get_main request from app.js and reroutes it to the getMain function above
var routes = { 
  get_main: getMain,
  get_form:getForm,
  get_weight_page: getWeightPage,
  get_patient_page: getPatient,
  get_problem_list: getProblemList,
  get_allergies: getAllergiesPage,
  submit_patient: submitPatient,
  get_patient_keys: getPatientKeys,
  get_patient_search: getSearchPatients,
  get_all_weights: getAllWeights,
  submit_weight: submitNewWeight,
  get_weight_page: getWeightPage
};

module.exports = routes;
