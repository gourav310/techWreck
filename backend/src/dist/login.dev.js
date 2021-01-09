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

var app = express();

var _require6 = require('./Middlewares'),
    session = _require6.session,
    SALT = _require6.SALT,
    bcrypt = _require6.bcrypt,
    AuthMiddleware = _require6.AuthMiddleware,
    SessionMiddlware = _require6.SessionMiddlware,
    CorsMiddlware = _require6.CorsMiddlware,
    cors = _require6.cors; //middlewares


app.use(express.urlencoded());
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
})); // app.use(session({
//     secret: session_secret,
//     saveUninitialized:false,
//     resave:false,
//     // cookie: { maxAge: 1*60*60*1000,secure:true }
//   })
// )

var isNUllorUndefined = function isNUllorUndefined(val) {
  return val === null || val === undefined;
};

var router = express.Router();
router.use(SessionMiddlware()); //api
//signupfor users

router.post('/userLogin', function _callee(req, res) {
  var _req$body, username, password, userExist, hashedPwd;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password; // console.log(req.body)

          _context.next = 3;
          return regeneratorRuntime.awrap(userModel.findOne({
            UserName: username
          }));

        case 3:
          userExist = _context.sent;

          // console.log(userExist)
          // console.log(password)
          if (isNUllorUndefined(userExist)) {
            res.status(400).send({
              error: "Username does not exists"
            });
          } else {
            hashedPwd = userExist.Password;

            if (bcrypt.compareSync(password, hashedPwd)) {
              //    req.session.userId = existingUser._id;
              console.log('Session saved with', req.session);
              res.status(200).send({
                success: "Logged in"
              });
            } else {
              res.status(401).send({
                err: "Password is incorrect."
              });
            }
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); //signupfor partner

router.post('/partnerLogin', function _callee2(req, res) {
  var _req$body2, username, password, partnerExist, hashedPwd;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password; // console.log(services)

          _context2.next = 3;
          return regeneratorRuntime.awrap(partnerModel.findOne({
            UserName: username
          }));

        case 3:
          partnerExist = _context2.sent;

          // console.log(userExist)
          // console.log(password)
          if (isNUllorUndefined(partnerExist)) {
            res.status(400).send({
              err: "Username does not exists"
            });
          } else {
            hashedPwd = partnerExist.Password;

            if (bcrypt.compareSync(password, hashedPwd)) {
              req.session.userId = partnerExist._id; //  console.log('Session saved with', req.session);

              res.status(200).send({
                success: "Logged in"
              });
            } else {
              res.status(401).send({
                err: "Password is incorrect."
              });
            }
          }

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;