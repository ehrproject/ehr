/* Some initialization boilerplate. Also, we include the code from
   routes/routes.js, so we can have access to the routes. Note that
   we get back the object that is defined at the end of routes.js,
   and that we use the fields of that object (e.g., routes.get_main)
   to access the routes. */

var express = require('express');
var routes = require('./routes/routes.js');
var app = express();
app.use(express.bodyParser());
app.use(express.logger("default"));
app.use(express.static('static'));


/* Below we install the routes. The first argument is the URL that we
   are routing, and the second argument is the handler function that
   should be invoked when someone opens that URL. Note the difference
   between app.get and app.post; normal web requests are GETs, but
   POST is often used when submitting web forms ('method="post"'). */

   
// GET requests
// var getIndex = require('./routes/getIndex');                    // (GET) Shows Home page
// var getForm = require('./routes/getForm');                      // (GET) Shows the Patient Input Form
// var getSearchPatients = require('./routes/getSearchPatients');  // (GET) Shows the Search Page

// var seePatient = require('./routes/seePatient');                // (GET) Sees the Patient Page of a certian Patient ID

// // POST requests
// var submitPatient = require('./routes/submitPatient');          // (POST) Add a new Patient to the database
// var findPatientKeys = require('./routes/findPatientKeys');      // (POST) Search Patient by Last Name

// app.use
// app.use('/', getIndex);
// app.use('/form', getForm);
// app.use('/searchPatients', getSearchPatients);
// app.use('/patient', seePatient);
// app.use('/submitPatient', submitPatient);
// app.use('/findPatientKeys', findPatientKeys);


app.get('/', routes.get_main);
app.get('/patientSearch', routes.get_patient_search);
app.get('/form', routes.get_form);
app.get('/patient/:id', routes.get_patient);
app.post('/form', routes.submit_patient);
app.post('/getPatientKeys', routes.get_patient_keys);

/* Run the server */
console.log('Author: Connor Chong (conchong)');
app.listen(8080);
console.log('Server running on port 8080. Now open http://localhost:8080/ in your browser!');
