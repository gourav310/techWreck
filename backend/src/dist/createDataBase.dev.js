"use strict";

var mongoose = require('mongoose');

var _require = require('../models/User'),
    userModel = _require.userModel;

var _require2 = require('../models/Client'),
    partnerModel = _require2.partnerModel;

var _require3 = require('../models/Jobs'),
    jobModel = _require3.jobModel;

var mongoURI = "mongodb://localhost:27017" + "/techWreck";
var newuser = new userModel({
  UserName: "gourav",
  Password: "Khurana",
  FullName: 'Gourav Khurana',
  Address: ["38-c Pawanpuri,bikaner"],
  Phone: 9829847310,
  City: "Bikaner",
  Pincode: 334001,
  Email: "Gouravkhurana310@gmail.com"
});
var newPartner = new partnerModel({
  UserName: "Mohit Computerss",
  Password: "123456",
  FullName: "mohit ji",
  Address: "Bothra Complex",
  Phone: 123456789,
  City: "Bikaner",
  Pincode: 334001,
  Email: "mohit@gmail.com",
  SoftwareServices: [200, 300, "", 300],
  HardwareServices: [550, 300, ""],
  Installation: ["", "", "", ""]
});
var newJob = new jobModel({
  Userid: "5fdd9f8a3d7acc3fe8c6e05c",
  Partnerid: "5fdd9f8a3d7acc3fe8c6e05b",
  PhoneNoUser: '9829847310',
  FullStatus: "Not Started",
  PhoneNoPartner: 123456789,
  City: "Bikaner",
  Pincode: 334001,
  Address: "38-c Pawanpuri,bikaner",
  JobType: [{
    "Software Services": {
      "Update": 200
    }
  }],
  JobDescription: "End to End Windows Update"
});

var connect = function connect() {
  return regeneratorRuntime.async(function connect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }).then(function () {
            console.log("connection established with mongodb server online");
          }));

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(partnerModel.deleteMany());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(newPartner.save());

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}; //connect();


exports.connect = connect;