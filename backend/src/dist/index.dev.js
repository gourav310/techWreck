"use strict";

//dependencies and other
var mongoose = require('mongoose');

var _require = require('../models/User'),
    userModel = _require.userModel;

var _require2 = require('../models/Client'),
    partnerModel = _require2.partnerModel;

var _require3 = require('../models/Jobs'),
    jobModel = _require3.jobModel;

var _require4 = require('./createDataBase'),
    connect = _require4.connect;

var _require5 = require('mongoose'),
    connections = _require5.connections;

var express = require('express');

var _require6 = require('./Middlewares'),
    SALT = _require6.SALT,
    bcrypt = _require6.bcrypt,
    AuthMiddleware = _require6.AuthMiddleware,
    SessionMiddlware = _require6.SessionMiddlware,
    CorsMiddlware = _require6.CorsMiddlware,
    cors = _require6.cors;

var app = express(); //middlewares

app.use(express.urlencoded());
app.use(express.json());
app.use(CorsMiddlware()); //connect to db

connect(); // this function is imported fro create database and is started here 

var isNUllorUndefined = function isNUllorUndefined(val) {
  return val === null || val === undefined;
}; //api for signup


var signupRouter = require('./signup');

app.use(signupRouter); //api for jobs

var jobRouter = require('./Jobs');

app.use(jobRouter); //api for login

var loginRouter = require('./login');

app.use(loginRouter); //all api for get request

var getRouter = require('./getApi');

app.use(getRouter);

var session = require('express-session');

app.use(session({
  secret: "session_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1 * 60 * 60 * 1000,
    secure: true
  }
})); // app.get('/farzi',(req,res)=>{
//     console.log(req.session);
//     res.end()
// })

app.listen(9999, function () {
  return "App is listening on ".concat(9999);
});
module.exports = app;