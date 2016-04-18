var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var passport = require('passport');
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
app.use(passport.initialize());
app.use(passport.session());

//Install and Require the mongoose library
var mongoose = require('mongoose');

//create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/webstormLocalDb';
console.log(connectionString);


// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}


//connect to database
var db = mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/hello', sayHello);

    function sayHello(req, res){
    res.send('hello world');
}

var userModelAssignment = require("./public/assignment/server/models/user.model.server.js")(db, mongoose);
var userModelProject = require("./public/project/server/models/user.model.server.js")(db, mongoose);
var securityService = require("./public/project/common-service/security.js")(userModelAssignment,userModelProject);

require("./public/assignment/server/app.js")(app, uuid,db, mongoose,userModelAssignment,securityService);
require("./public/project/server/app.js")(app, uuid, db, mongoose,userModelProject, securityService);
app.listen(port, ipaddress);