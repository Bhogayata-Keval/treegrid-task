var express = require('express')
const request = require('request')

var app = express()
const bodyParser = require('body-parser');
const firebase = require('firebase');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var datetime = new Date();

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('Hello Main World --3-- !!! ' + datetime)
})

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzfQ_6COY5Y_osIsNUKOyhpyUXWo-LBF4",
  authDomain: "treegrid-task.firebaseapp.com",
  databaseURL: "https://treegrid-task-default-rtdb.firebaseio.com",
  projectId: "treegrid-task",
  storageBucket: "treegrid-task.appspot.com",
  messagingSenderId: "168387181368",
  appId: "1:168387181368:web:1b182409da173d3a69dfcd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database()
const rootref = database.ref('users')


/* -------------- Posting and Getting data from firebase using using "npm - firebase" package ------------- */


app.get('/treegrid', function (req, res) {
    rootref.child("user1").once("value").then(function(snapshot) {
        res.send(snapshot.val())
    })
})

app.post('/treegrid', function (req, res) {
    rootref.child("user1").set({
        testkey: "testvalue2"
    })
    res.send('Hello Main World --3-- !!! ' + datetime)
})


/* -------------- Posting and Getting data from firebase using HTTP Request ------------- */

/* app.get('/treegrid', function (req, res) {
    res.send('Hello Main World --3-- !!! ' + datetime)
    request.get({url:'https://treegrid-task-default-rtdb.firebaseio.com/treegrid-db.json', json:true}, function (e, r, data) {
        console.log(data)
    })
})

app.post('/treegrid', function (req, res) {
    res.send('Hello Main World --3-- !!! ' + datetime)
    console.log("body---", req.body)
    request.post({url:'https://treegrid-task-default-rtdb.firebaseio.com/treegrid-db.json', form: JSON.stringify(req.body)}, 
        function(err,httpResponse,body){
            console.error("::::", err)
            console.log("httpResponse:::", httpResponse.body)
        })
    
}) */


//Launch listening server on port 8081
app.listen(8081, function () {
  console.log('app listening on port 8081!')
})