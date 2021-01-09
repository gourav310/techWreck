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
router.use(SessionMiddlware()); //api
//add authentication at last 
//get for user 

router.get('/userDetails/:id', function _callee(req, res) {
  var userid, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userid = req.params.id; // console.log(userid)

          _context.next = 3;
          return regeneratorRuntime.awrap(userModel.findOne({
            _id: userid
          }));

        case 3:
          user = _context.sent;

          // console.log(user)
          if (isNUllorUndefined(user)) {
            res.status(403).send({
              error: "User not found"
            });
          } else {
            user.Password = null;
            res.send(user);
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/partnerDetails', function _callee2(req, res) {
  var partnerid, partner;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          partnerid = req.session.userId; // console.log(userid)

          _context2.next = 3;
          return regeneratorRuntime.awrap(partnerModel.findOne({
            _id: partnerid
          }));

        case 3:
          partner = _context2.sent;

          // console.log(user)
          if (isNUllorUndefined(partner)) {
            res.status(403).send({
              error: "User not found"
            });
          } else {
            partner.Password = null;
            res.send(partner);
          }

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/service', function _callee3(req, res) {
  var array, ele;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.t0 = regeneratorRuntime;
          _context3.next = 3;
          return regeneratorRuntime.awrap(partnerModel.find());

        case 3:
          _context3.t1 = _context3.sent;
          _context3.next = 6;
          return _context3.t0.awrap.call(_context3.t0, _context3.t1);

        case 6:
          array = _context3.sent;
          ele = array[0].Services[0]["Software Services"];
          res.send(ele);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;