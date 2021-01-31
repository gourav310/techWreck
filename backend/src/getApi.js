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
router.get('/userDetails',async(req,res)=>{
    const userid= req.session.userId;
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
    const partnerid= req.session.partnerId;
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
    const array =   await partnerModel.find({"SoftwareServices.0":{$exists:true,$ne:null}})
    console.log(array)
    // const ele = array[0].Services[0]["Software Services"];
    res.send();
})

//get for partnerdashboard
router.get('/partnerJobs',AuthMiddleware,async(req,res)=>{
    try{const id = req.session.partnerId;
    const array =await jobModel.find({Partnerid:id});
 //   console.log("requested")
    res.send(array);}catch(e){res.status(400).send({error:"Unable to fetch"})}
})
router.get('/userJobs',AuthMiddleware,async(req,res)=>{
    try{const id = req.session.userId;
    const array =await jobModel.find({Userid:id});
  //  console.log(array)
    res.send(array);}catch(e){res.status(400).send({error:"Unable to fetch"})}
})
router.get("/logout", (req, res)=> {
    if(!isNUllorUndefined(req.session)) {
        // destroy the session
        req.session.destroy(() => {
            res.sendStatus(200);
        });

    } else {
        res.sendStatus(400);
    }
});
//api to fetch clients matching services
router.get('/availableClients',async(req,res)=>{
    try{
        const {major,minor}=req.query;
    if(isNUllorUndefined(major) || isNUllorUndefined(minor)){
        res.sendStatus(404)
    }
    else{
        if(major==="Software Services"){
            if(minor==='Windows Update'){
                const array =   await partnerModel.find({"SoftwareServices.0":{$exists:true,$ne:null}}).select("-Password").lean();
                array.map((client)=>client.Price=client.SoftwareServices[0])
                res.send(array);
            }else if(minor==='Windows Installation'){
                let array =    await partnerModel.find({"SoftwareServices.1":{$exists:true,$ne:null}}).select("-Password").lean();
                array.map((client)=>client.Price=client.SoftwareServices[1])
                res.send(array)
            }
            else if(minor==='Troubleshoot on Call'){
                const array =   await partnerModel.find({"SoftwareServices.2":{$exists:true,$ne:null}}).select("-Password").lean();
                array.map((client)=>client.Price=client.SoftwareServices[2])
                res.send(array)
            }
            else if(minor==='Troubleshoot on Visit'){
                const array =   await partnerModel.find({"SoftwareServices.3":{$exists:true,$ne:null}}).select("-Password").lean();
                array.map((client)=>client.Price=client.SoftwareServices[3])
                res.send(array)
            }
        }else if(major==="Hardware Services"){
            if(minor==='Regular Service'){
                const array =   await partnerModel.find({"HardwareServices.0":{$exists:true,$ne:null}}).select("-Password").lean();
               array.map((client)=>client.Price=client.HardwareServices[0])
                res.send(array)
            }else if(minor==='Parts Upgrade'){
                const array =   await partnerModel.find({"HardwareServices.1":{$exists:true,$ne:null}}).select("-Password").lean();
                array.map((client)=>client.Price=client.HardwareServices[1])
                res.send(array)
            }
            else if(minor==='Hardware Troubleshooting'){
                const array =   await partnerModel.find({"HardwareServices.2":{$exists:true,$ne:null}}).select("-Password").lean();
                array.map((client)=>client.Price=client.HardwareServices[2])
                res.send(array)
            }
        }else{
            if(minor==='CCTV Camera Installation'){
                const array =   await partnerModel.find({"Installation.0":{$exists:true,$ne:null}}).select("-Password").lean();
                array.map((client)=>client.Price=client.Installation[0])
                res.send(array)
            }else if(minor==='TV Installation'){
                const array =   await partnerModel.find({"Installation.1":{$exists:true,$ne:null}}).select("-Password").lean();
                array.map((client)=>client.Price=client.Installation[1])
                res.send(array)
            }
            else if(minor==='Router Installation'){
                const array =   await partnerModel.find({"Installation.2":{$exists:true,$ne:null}}).select("-Password").lean();
                array.map((client)=>client.Price=client.Installation[2])
                res.send(array)
            }
            else if(minor==='Pc/Laptop Assemble'){
                const array =   await partnerModel.find({"Installation.3":{$exists:true,$ne:null}}).select("-Password").lean();
                array.map((client)=>client.Price=client.Installation[3])
                res.send(array)
            }
        }
    }
}
catch(e){
    res.sendStatus(500).send({error:"Server Error"})
}
}
)
module.exports = router;

