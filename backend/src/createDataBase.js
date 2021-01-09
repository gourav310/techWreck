const mongoose = require('mongoose');
const {userModel}=require('../models/User')
const {partnerModel}=require('../models/Client');
const {jobModel}= require('../models/Jobs');



const mongoURI = "mongodb://localhost:27017" + "/techWreck";
const newuser= new userModel({
    UserName:"gourav",
    Password: "Khurana",
    FullName: 'Gourav Khurana',
    Address: ["38-c Pawanpuri,bikaner"],
    Phone: 9829847310,
    City: "Bikaner",
    Pincode: 334001,
    Email: "Gouravkhurana310@gmail.com"
});

const newPartner= new partnerModel({
    UserName:"Mohit Computerss",
    Password: "123456",
    FullName: "mohit ji",
    Address: "Bothra Complex",
    Phone: 123456789,
    City: "Bikaner",
    Pincode: 334001,
    Email: "mohit@gmail.com",
    SoftwareServices: [200,300,"",300],
    HardwareServices: [550,300,""],
    Installation: ["","","",""]
});

const newJob= new jobModel({
    Userid: "5fdd9f8a3d7acc3fe8c6e05c",
    Partnerid: "5fdd9f8a3d7acc3fe8c6e05b",
    PhoneNoUser: '9829847310',
    FullStatus: "Not Started",
    PhoneNoPartner: 123456789,
    City: "Bikaner",
    Pincode: 334001,
    Address: "38-c Pawanpuri,bikaner",
    JobType: [{"Software Services":{"Update":200}}],
    JobDescription: "End to End Windows Update",
});

const connect =async()=>{
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
//     await userModel.deleteMany();
//     await jobModel.deleteMany();
  //   await partnerModel.deleteMany();
//    await newuser.save();
   //  await newPartner.save();
//    await newJob.save();
}

//connect();

exports.connect= connect;



