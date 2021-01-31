//dependencies and other
const mongoose = require('mongoose');
const { userModel } = require('../models/User')
const { partnerModel } = require('../models/Client');
const { jobModel } = require('../models/Jobs');
const { connect } = require('./createDataBase');
const { connections } = require('mongoose');
const express = require('express');
const app = express();
const { session, SALT, bcrypt, AuthMiddleware, SessionMiddlware, CorsMiddlware, cors } = require('./Middlewares')

//middlewares

app.use(CorsMiddlware())

app.use(express.urlencoded());
app.use(express.json());
// app.use(cors({
//     credentials: true,
//     origin: "http://localhost:3000"
// }))

// app.use(session({
//     secret: session_secret,
//     saveUninitialized:false,
//     resave:false,
//     // cookie: { maxAge: 1*60*60*1000,secure:true }
//   })
// )

const isNUllorUndefined = val => val === null || val === undefined;

const router = express.Router();
router.use(SessionMiddlware());
//api

//loginfor users
router.post('/userLogin', async (req, res) => {
    const { username, password } = req.body;
    // console.log(req.body)
    const userExist = await userModel.findOne({ UserName: username });
    // console.log(userExist)
    // console.log(password)
    if (isNUllorUndefined(userExist)) {
        res.status(400).send({ error: `Username does not exists` })
    } else {
        const hashedPwd = userExist.Password;
        if (bcrypt.compareSync(password, hashedPwd)) {
            req.session.userId = userExist._id;
            console.log('Session saved with', req.session);
            res.status(200).send({ success: "Logged in" });
        } else {
            res.status(401).send({ error: "Password is incorrect." });
        }
    }
})

//loginfor partner
router.post('/partnerLogin', async (req, res) => {
    const { username, password } = req.body;
    // console.log(services)
    const partnerExist = await partnerModel.findOne({ UserName: username });

    // console.log(userExist)
    // console.log(password)
    if (isNUllorUndefined(partnerExist)) {
        res.status(400).send({ error: `Username does not exists` })
    } else {
        const hashedPwd = partnerExist.Password;
        if (bcrypt.compareSync(password, hashedPwd)) {
            req.session.partnerId = partnerExist._id;
            res.status(200).send({ success: "Logged in" });
        } else {
            res.status(401).send({ error: "Password is incorrect." });
        }
    }

})



module.exports = router;

