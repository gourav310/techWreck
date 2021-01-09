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
router.use(SessionMiddlware());
//api
//add authentication at last 
//get for user 
router.get('/userDetails/:id',async(req,res)=>{
    const userid= req.params.id;
   // console.log(userid)
    const user = await userModel.findOne({_id:userid})
   // console.log(user)
    if(isNUllorUndefined(user)){
        res.status(403).send({error:`User not found`})
    }else{
        user.Password=null
        res.send(user);
    }
})
router.get('/partnerDetails',AuthMiddleware,async(req,res)=>{
    const partnerid= req.session.userId;
   // console.log(partnerid)
    const partner = await partnerModel.findOne({_id:partnerid})
   // console.log(partner)
    if(isNUllorUndefined(partner)){
        res.status(403).send({error:`User not found`})
    }else{
        partner.Password=null
        res.send(partner);
    }
})

router.get('/service',async(req,res)=>{
    const array = await  (await partnerModel.find())
    const ele = array[0].Services[0]["Software Services"];
    res.send(ele);
})

//get for partnerdashboard
router.get('/partnerJobs',AuthMiddleware,async(req,res)=>{
    try{const id = req.session.userId;
    const array =await jobModel.find({Partnerid:id});
    console.log("requested")
    res.send(array);}catch(e){res.status(400).send({error:"Unable to fetch"})}
})
router.get("/logout", (req, res)=> {
    if(!isNUllorUndefined(req.session)) {
        // destroy the session
        req.session.destroy(() => {
            res.sendStatus(200);
        });

    } else {
        res.sendStatus(200);
    }
});
module.exports = router;

