//dependencies and other
const mongoose = require('mongoose');
const { userModel } = require('../models/User')
const { partnerModel } = require('../models/Client');
const { jobModel } = require('../models/Jobs');
const { connect } = require('./createDataBase');
const { connections } = require('mongoose');
const express = require('express');
const app = express();
const { session , SALT ,bcrypt,AuthMiddleware,SessionMiddlware,CorsMiddlware,cors} = require('./Middlewares')

//middlewares
app.use(express.urlencoded());
app.use(express.json());
app.use(CorsMiddlware())


const isNUllorUndefined = val => val === null || val === undefined;

const router = express.Router();
router.use(SessionMiddlware())
//api

router.get('/', async (req, res) => {
    const users = await jobModel.find();
    res.send(users);
})
//signupfor users
router.post('/userSignup', async (req, res) => {
    const { fullName, username, password } = req.body;
   // console.log(req.body)
    const userExist = await userModel.findOne({ UserName: username });
    // console.log(userExist)
    // console.log(password)
    if (!isNUllorUndefined(userExist)) {
        res.status(400).send({ error: `Username ${username} already exists.Please choose another Username.` })
    } else {
        const pass = bcrypt.hashSync(password, SALT);
        const newUser = new userModel({
            UserName: username,
            Password: pass,
            FullName: fullName
        });
        await newUser.save();
       // console.log(newUser._id);
       // req.session.userId= newUser._id;
        res.send({ message: `User ${username} has been created` })
    }
})

//signupfor partner
router.post('/partnerSignup', async (req, res) => {
    const { fullName, username, password, city, pincode, phone, SoftwareServices,HardwareServices,Installation } = req.body;
    // console.log(services)
    const partnerExist = await partnerModel.findOne({ UserName: username });
    // console.log(userExist)
    // console.log(password)
    if (!isNUllorUndefined(partnerExist)) {
        res.status(400).send({ error: `Username ${username} already exists.Please choose another Username.` })
    } else {
        const pass = bcrypt.hashSync(password, SALT);
        const newPartner = new partnerModel({
            UserName: username,
            Password: pass,
            FullName: fullName,
            City: city,
            Email:username,
            Pincode: pincode,
            Phone: phone,
            SoftwareServices: SoftwareServices,
            HardwareServices:HardwareServices,
            Installation:Installation
        });
        await newPartner.save();
        req.session.userId= newPartner._id;
       // console.log(req.session)
        res.send({ message: `Partner ${username} has been created` })
    }
})



module.exports = router;

