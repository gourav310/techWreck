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
    cors = _require6.cors;

var _require7 = require('express'),
    urlencoded = _require7.urlencoded; //middlewares


app.use(express.urlencoded());
app.use(express.json());
app.use(CorsMiddlware());

var isNUllorUndefined = function isNUllorUndefined(val) {
  return val === null || val === undefined;
};

var router = express.Router(); //update total tasks when job is added

var updateTotalTasks = function updateTotalTasks(userid, partnerid) {
  var userExist, partnerExist;
  return regeneratorRuntime.async(function updateTotalTasks$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(userModel.findById(userid));

        case 2:
          userExist = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(partnerModel.findById(partnerid));

        case 5:
          partnerExist = _context.sent;
          userExist.TotalTasks = userExist.TotalTasks + 1; //userExist.ActiveTasks= userExist.ActiveTasks+1;

          partnerExist.TotalTasks = partnerExist.TotalTasks + 1; // partnerExist.ActiveTasks= partnerExist.ActiveTasks+1;

          _context.next = 10;
          return regeneratorRuntime.awrap(userExist.save());

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(partnerExist.save());

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}; //update active tasks


var updateActiveTasks = function updateActiveTasks(userid, partnerid) {
  var userExist, partnerExist;
  return regeneratorRuntime.async(function updateActiveTasks$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(userModel.findById(userid));

        case 2:
          userExist = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(partnerModel.findById(partnerid));

        case 5:
          partnerExist = _context2.sent;
          // userExist.TotalTasks= userExist.TotalTasks+1;
          userExist.ActiveTasks = userExist.ActiveTasks + 1; //  partnerExist.TotalTasks= partnerExist.TotalTasks+1;

          partnerExist.ActiveTasks = partnerExist.ActiveTasks + 1;
          _context2.next = 10;
          return regeneratorRuntime.awrap(userExist.save());

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(partnerExist.save());

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //delete total taks when user is deleted


var deleteTotalTasks = function deleteTotalTasks(userid, partnerid) {
  var userExist, partnerExist;
  return regeneratorRuntime.async(function deleteTotalTasks$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(userModel.findById(userid));

        case 2:
          userExist = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(partnerModel.findById(partnerid));

        case 5:
          partnerExist = _context3.sent;
          userExist.TotalTasks = userExist.TotalTasks - 1;
          partnerExist.TotalTasks = partnerExist.TotalTasks - 1;
          _context3.next = 10;
          return regeneratorRuntime.awrap(userExist.save());

        case 10:
          _context3.next = 12;
          return regeneratorRuntime.awrap(partnerExist.save());

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
}; /// delete Active taskwhen query is resolved


var deleteActiveTasks = function deleteActiveTasks(userid, partnerid) {
  var userExist, partnerExist;
  return regeneratorRuntime.async(function deleteActiveTasks$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(userModel.findById(userid));

        case 2:
          userExist = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(partnerModel.findById(partnerid));

        case 5:
          partnerExist = _context4.sent;
          userExist.ActiveTasks = userExist.ActiveTasks - 1;
          partnerExist.ActiveTasks = partnerExist.ActiveTasks - 1; // console.log(userExist)
          // console.log(partnerExist)

          _context4.next = 10;
          return regeneratorRuntime.awrap(userExist.save());

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(partnerExist.save());

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  });
}; //api
//add authentication at last


router.post('/newJob', function _callee(req, res) {
  var _req$body, userid, partnerid, address, city, pincode, jobtype, jobdes, _userExist, _partnerExist, userExist, partnerExist, newJob;

  return regeneratorRuntime.async(function _callee$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body = req.body, userid = _req$body.userid, partnerid = _req$body.partnerid, address = _req$body.address, city = _req$body.city, pincode = _req$body.pincode, jobtype = _req$body.jobtype, jobdes = _req$body.jobdes;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(userModel.findById(userid));

        case 4:
          _userExist = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(partnerModel.findById(partnerid));

        case 7:
          _partnerExist = _context5.sent;
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](1);
          res.status(400).send({
            "err": "Not Found"
          });

        case 13:
          _context5.next = 15;
          return regeneratorRuntime.awrap(userModel.findById(userid));

        case 15:
          userExist = _context5.sent;
          _context5.next = 18;
          return regeneratorRuntime.awrap(partnerModel.findById(partnerid));

        case 18:
          partnerExist = _context5.sent;

          if (!isNUllorUndefined(userExist)) {
            _context5.next = 23;
            break;
          }

          res.status(404).send({
            "error": "user not found"
          });
          _context5.next = 32;
          break;

        case 23:
          if (!isNUllorUndefined(partnerExist)) {
            _context5.next = 27;
            break;
          }

          res.status(404).send({
            'error': "partner not found"
          });
          _context5.next = 32;
          break;

        case 27:
          newJob = new jobModel({
            Userid: userid,
            Partnerid: partnerid,
            PhoneNoUser: userExist.Phone,
            FullStatus: "Not Started",
            PhoneNoPartner: partnerExist.Phone,
            City: city,
            Pincode: pincode,
            Address: address,
            JobType: jobtype,
            JobDescription: jobdes
          });
          _context5.next = 30;
          return regeneratorRuntime.awrap(newJob.save());

        case 30:
          //function to update active tasks of user and partner 
          updateTotalTasks(userid, partnerid);
          res.send(newJob);

        case 32:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); //job updates 
// Full Status update by partner

router.put('/jobFullStatusUpdate/:jobid', function _callee2(req, res) {
  var updateStatus, _partner, _jobid, _existingJob, partner, jobid, existingJob, userid, partnerid, _userid, _partnerid;

  return regeneratorRuntime.async(function _callee2$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          updateStatus = req.header('x-updatestatus'); // console.log(req.headers);

          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(partnerModel.findById(req.body.partnerid));

        case 4:
          _partner = _context6.sent;
          _jobid = req.params.jobid;
          _context6.next = 8;
          return regeneratorRuntime.awrap(jobModel.findById(_jobid));

        case 8:
          _existingJob = _context6.sent;
          _context6.next = 14;
          break;

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](1);
          res.status(400).send({
            "err": "Not Found"
          });

        case 14:
          _context6.next = 16;
          return regeneratorRuntime.awrap(partnerModel.findById(req.body.partnerid));

        case 16:
          partner = _context6.sent;
          jobid = req.params.jobid;
          _context6.next = 20;
          return regeneratorRuntime.awrap(jobModel.findById(jobid));

        case 20:
          existingJob = _context6.sent;

          if (isNUllorUndefined(partner)) {
            res.status(404).send({
              "error": "partner not found"
            });
          } else if (isNUllorUndefined(existingJob)) {
            res.status(404).send({
              'error': "No job with this Specified id"
            });
          } else {
            if (updateStatus === "Started" && existingJob.FullStatus != "Started") {
              existingJob.FullStatus = "Started";
              existingJob.save();
              userid = existingJob.Userid;
              partnerid = existingJob.Partnerid;
              updateActiveTasks(userid, partnerid);
              res.send(existingJob);
            } else if (updateStatus === "Resolved") {
              existingJob.FullStatus = "Resolved";
              existingJob.save();
              res.send(existingJob);
            } else if (updateStatus === "Service Denied") {
              existingJob.FullStatus = "Service Denied";

              if (existingJob.FullStatus === "Started") {
                _userid = existingJob.Userid;
                _partnerid = existingJob.Partnerid;
                deleteActiveTasks(_userid, _partnerid);
              }

              existingJob.save();
              res.send(existingJob);
            } else {
              res.sendStatus(400);
            }
          }

        case 22:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 11]]);
}); // Status Update by user

router.put('/jobStatusUpdate/:jobid', function _callee3(req, res) {
  var _user, _jobid2, _existingJob2, user, jobid, existingJob, userid, partnerid;

  return regeneratorRuntime.async(function _callee3$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(userModel.findById(req.body.userid));

        case 3:
          _user = _context7.sent;
          _jobid2 = req.params.jobid;
          _context7.next = 7;
          return regeneratorRuntime.awrap(jobModel.findById(_jobid2));

        case 7:
          _existingJob2 = _context7.sent;
          _context7.next = 13;
          break;

        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          res.status(400).send({
            "err": "Not Found"
          });

        case 13:
          _context7.next = 15;
          return regeneratorRuntime.awrap(userModel.findById(req.body.userid));

        case 15:
          user = _context7.sent;
          jobid = req.params.jobid;
          _context7.next = 19;
          return regeneratorRuntime.awrap(jobModel.findById(jobid));

        case 19:
          existingJob = _context7.sent;

          if (isNUllorUndefined(user)) {
            res.status(404).send({
              "error": "User not found"
            });
          } else if (isNUllorUndefined(existingJob)) {
            res.status(404).send({
              "error": "No job with this Specified id"
            });
          } else {
            if (existingJob.Status) {
              res.status(403).send({
                "error": "Cannot modify after closing of Service request"
              });
            } else {
              existingJob.Status = !existingJob.Status;
              existingJob.save();
              userid = existingJob.Userid;
              partnerid = existingJob.Partnerid;
              deleteActiveTasks(userid, partnerid);
              res.send(existingJob);
            }

            ;
          }

        case 21:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); //delte request by user

router["delete"]("/deleteJob/:jobid", function _callee4(req, res) {
  var _id, _existingJob3, _user2, id, existingJob, user, partnerid, userid;

  return regeneratorRuntime.async(function _callee4$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _id = req.params.jobid;
          _context8.next = 4;
          return regeneratorRuntime.awrap(jobModel.findById(_id));

        case 4:
          _existingJob3 = _context8.sent;
          _context8.next = 7;
          return regeneratorRuntime.awrap(userModel.findById(req.body.userid));

        case 7:
          _user2 = _context8.sent;
          _context8.next = 13;
          break;

        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          res.status(400).send({
            "err": "Not Found"
          });

        case 13:
          id = req.params.jobid;
          _context8.next = 16;
          return regeneratorRuntime.awrap(jobModel.findById(id));

        case 16:
          existingJob = _context8.sent;
          _context8.next = 19;
          return regeneratorRuntime.awrap(userModel.findById(req.body.userid));

        case 19:
          user = _context8.sent;

          if (!isNUllorUndefined(user)) {
            _context8.next = 24;
            break;
          }

          res.status(404).send({
            "error": "User not found"
          });
          _context8.next = 38;
          break;

        case 24:
          if (!isNUllorUndefined(existingJob)) {
            _context8.next = 28;
            break;
          }

          res.status(404).send({
            "error": "no request with specified id"
          });
          _context8.next = 38;
          break;

        case 28:
          if (!(existingJob.FullStatus === 'Not Started' || existingJob.FullStatus === "Service Denied")) {
            _context8.next = 37;
            break;
          }

          _context8.next = 31;
          return regeneratorRuntime.awrap(jobModel.deleteOne({
            _id: id
          }));

        case 31:
          partnerid = existingJob.Partnerid;
          userid = existingJob.Userid;
          deleteTotalTasks(userid, partnerid);
          res.send({
            "message": "Deleted Successfully"
          });
          _context8.next = 38;
          break;

        case 37:
          res.status(403).send({
            "error": "Can not delete request after starting"
          });

        case 38:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
module.exports = router;