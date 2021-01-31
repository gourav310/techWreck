"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    Model = _require.Model;

var mongoose = require('mongoose');

var jobSchema = new Schema({
  Userid: Schema.Types.ObjectId,
  Partnerid: Schema.Types.ObjectId,
  PhoneNoUser: Number,
  AssingedTime: {
    type: Date,
    "default": Date.valueOf()
  },
  Status: {
    type: Boolean,
    "default": false
  },
  FullStatus: String,
  PhoneNoPartner: Number,
  Review: String,
  Rating: Number,
  City: String,
  Pincode: Number,
  Address: String,
  JobType: [Schema.Types.Mixed],
  JobDescription: String
});
exports.jobModel = mongoose.model("job", jobSchema);