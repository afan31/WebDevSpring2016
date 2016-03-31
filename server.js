var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var uuid          = require('node-uuid');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({   secret: "afan",
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());

//Install and Require the mongoose library
var mongoose = require('mongoose');

//create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/webstormLocalDb';
console.log(connectionString);

//for running in remote : to be coded

//connect to database
var db = mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/hello', sayHello);

    function sayHello(req, res){
    res.send('hello world');
}

require("./public/assignment/server/app.js")(app, uuid,db, mongoose);
require("./public/project/server/app.js")(app, uuid);
app.listen(port, ipaddress);