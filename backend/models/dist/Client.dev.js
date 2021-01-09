"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    Model = _require.Model;

var mongoose = require('mongoose');

var partnerSchema = new Schema({
  UserName: String,
  Password: String,
  FullName: String,
  JoiningDate: {
    type: Date,
    "default": Date.now
  },
  TotalTasks: {
    type: Number,
    "default": 0
  },
  ActiveTasks: {
    type: Number,
    "default": 0
  },
  OverallRatings: {
    type: Number,
    "default": 0
  },
  City: String,
  Pincode: Number,
  Phone: Number,
  Email: String,
  SoftwareServices: [Number],
  HardwareServices: [Number],
  Installation: [Number]
});
exports.partnerModel = mongoose.model("partner", partnerSchema);