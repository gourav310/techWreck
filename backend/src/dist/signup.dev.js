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
app.use(CorsMiddlware());

var isNUllorUndefined = function isNUllorUndefined(val) {
  return val === null || val === undefined;
};

var router = express.Router();
router.use(SessionMiddlware); //api

router.get('/', function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(jobModel.find());

        case 2:
          users = _context.sent;
          res.send(users);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); //signupfor users

router.post('/userSignup', function _callee2(req, res) {
  var _req$body, fullName, username, password, userExist, pass, newUser;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, fullName = _req$body.fullName, username = _req$body.username, password = _req$body.password; // console.log(req.body)

          _context2.next = 3;
          return regeneratorRuntime.awrap(userModel.findOne({
            UserName: username
          }));

        case 3:
          userExist = _context2.sent;

          if (isNUllorUndefined(userExist)) {
            _context2.next = 8;
            break;
          }

          res.status(400).send({
            error: "Username ".concat(username, " already exists.Please choose another Username.")
          });
          _context2.next = 13;
          break;

        case 8:
          pass = bcrypt.hashSync(password, SALT);
          newUser = new userModel({
            UserName: username,
            Password: pass,
            FullName: fullName
          });
          _context2.next = 12;
          return regeneratorRuntime.awrap(newUser.save());

        case 12:
          // console.log(newUser._id);
          // req.session.userId= newUser._id;
          res.send({
            message: "User ".concat(username, " has been created")
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //signupfor partner

router.post('/partnerSignup', function _callee3(req, res) {
  var _req$body2, fullName, username, password, city, pincode, phone, SoftwareServices, HardwareServices, Installation, partnerExist, pass, newPartner;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, fullName = _req$body2.fullName, username = _req$body2.username, password = _req$body2.password, city = _req$body2.city, pincode = _req$body2.pincode, phone = _req$body2.phone, SoftwareServices = _req$body2.SoftwareServices, HardwareServices = _req$body2.HardwareServices, Installation = _req$body2.Installation; // console.log(services)

          _context3.next = 3;
          return regeneratorRuntime.awrap(partnerModel.findOne({
            UserName: username
          }));

        case 3:
          partnerExist = _context3.sent;

          if (isNUllorUndefined(partnerExist)) {
            _context3.next = 8;
            break;
          }

          res.status(400).send({
            error: "Username ".concat(username, " already exists.Please choose another Username.")
          });
          _context3.next = 14;
          break;

        case 8:
          pass = bcrypt.hashSync(password, SALT);
          newPartner = new partnerModel({
            UserName: username,
            Password: pass,
            FullName: fullName,
            City: city,
            Email: username,
            Pincode: pincode,
            Phone: phone,
            SoftwareServices: SoftwareServices,
            HardwareServices: HardwareServices,
            Installation: Installation
          });
          _context3.next = 12;
          return regeneratorRuntime.awrap(newPartner.save());

        case 12:
          req.session.userId = newPartner.__id;
          res.send({
            message: "Partner ".concat(username, " has been created")
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;