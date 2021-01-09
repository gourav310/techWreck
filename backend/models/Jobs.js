const {Schema,Model} = require('mongoose');
const mongoose = require('mongoose');

const jobSchema = new Schema({
    Userid: Schema.Types.ObjectId,
    Partnerid: Schema.Types.ObjectId,
    PhoneNoUser: Number,
    AssingedTime: { type: Date, default: Date.valueOf() },
    Status: {type:Boolean , default:false},
    FullStatus: String,
    PhoneNoPartner: Number,
    Review:String,
    Rating: Number,
    City: String,
    Pincode: Number,
    Address: String,
    JobType: String,
    JobDescription: String,
    
})
exports.jobModel= mongoose.model("job",jobSchema);
