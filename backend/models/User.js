const {Schema,Model} = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new Schema({
    UserName: String,
    FullName: String,
    Password: String,
    JoiningDate: { type: Date, default: Date.now },
    TotalTasks: {type: Number,default:0},
    Address: [String],
    ActiveTasks:{type: Number,default:0},
    Phone: Number,
    City: String,
    Pincode: Number,
    Email: String
})
exports.userModel= mongoose.model("user",userSchema);
