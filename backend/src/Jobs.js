//dependencies and other
const mongoose = require('mongoose');
const { userModel } = require('../models/User')
const { partnerModel } = require('../models/Client');
const { jobModel } = require('../models/Jobs');
const { connect } = require('./createDataBase');
const { connections } = require('mongoose');
const express = require('express');
const app = express();
const { session , SALT ,bcrypt,AuthMiddleware,SessionMiddlware,CorsMiddlware,cors} = require('./Middlewares');
const { urlencoded } = require('express');

//middlewares
app.use(express.urlencoded());
app.use(express.json());
app.use(CorsMiddlware())


const isNUllorUndefined = val => val === null || val === undefined;

const router = express.Router();
//update total tasks when job is added
const updateTotalTasks=async(userid,partnerid)=>{
    const userExist = await userModel.findById(userid);
    const partnerExist = await partnerModel.findById(partnerid);
    userExist.TotalTasks= userExist.TotalTasks+1;
    //userExist.ActiveTasks= userExist.ActiveTasks+1;
    partnerExist.TotalTasks= partnerExist.TotalTasks+1;
   // partnerExist.ActiveTasks= partnerExist.ActiveTasks+1;
    await userExist.save();
    await partnerExist.save();
}
//update active tasks
const updateActiveTasks=async(userid,partnerid)=>{
    const userExist = await userModel.findById(userid);
    const partnerExist = await partnerModel.findById(partnerid);
   // userExist.TotalTasks= userExist.TotalTasks+1;
    userExist.ActiveTasks= userExist.ActiveTasks+1;
  //  partnerExist.TotalTasks= partnerExist.TotalTasks+1;
    partnerExist.ActiveTasks= partnerExist.ActiveTasks+1;
    await userExist.save();
    await partnerExist.save();
}
//delete total taks when user is deleted
const deleteTotalTasks= async(userid,partnerid)=>{
    const userExist = await userModel.findById(userid);
    const partnerExist = await partnerModel.findById(partnerid);
    userExist.TotalTasks= userExist.TotalTasks-1;
  
    partnerExist.TotalTasks= partnerExist.TotalTasks-1;
  
    await userExist.save();
    await partnerExist.save();
}
/// delete Active taskwhen query is resolved
const deleteActiveTasks=async(userid,partnerid)=>{
    const userExist = await userModel.findById(userid);
    const partnerExist = await partnerModel.findById(partnerid);
    userExist.ActiveTasks= userExist.ActiveTasks-1;
  
    partnerExist.ActiveTasks= partnerExist.ActiveTasks-1;
   // console.log(userExist)
   // console.log(partnerExist)
    await userExist.save();
    await partnerExist.save();
}
//api
//add authentication at last
router.post('/newJob',async(req,res)=>{
    const {userid,partnerid,address,city,pincode,jobtype,jobdes}= req.body;
    try{const userExist = await userModel.findById(userid);
    const partnerExist = await partnerModel.findById(partnerid);}
    catch{res.status(400).send({"err":"Not Found"})}

    const userExist = await userModel.findById(userid);
    const partnerExist = await partnerModel.findById(partnerid);
    if(isNUllorUndefined(userExist)){
        res.status(404).send({"error":`user not found`})
        
    }else if(isNUllorUndefined(partnerExist)){
        res.status(404).send({'error':`partner not found`})
    }
    else {

        const newJob= new jobModel({
            Userid: userid,
            Partnerid: partnerid,
            PhoneNoUser: userExist.Phone,
            FullStatus: "Not Started",
            PhoneNoPartner: partnerExist.Phone,
            City: city,
            Pincode: pincode,
            Address: address,
            JobType: jobtype,
            JobDescription: jobdes,
        });
        await newJob.save();
        //function to update active tasks of user and partner 
        updateTotalTasks(userid,partnerid);
        res.send(newJob);
    }
})

//job updates 
// Full Status update by partner
router.put('/jobFullStatusUpdate/:jobid',async(req,res)=>{
    const updateStatus = req.header('x-updatestatus');
    // console.log(req.headers);
    try{const partner = await partnerModel.findById(req.body.partnerid);
    const jobid = req.params.jobid;
    const existingJob = await jobModel.findById(jobid);}
    catch(e){res.status(400).send({"err":"Not Found"})}
    const partner = await partnerModel.findById(req.body.partnerid);
    const jobid = req.params.jobid;
    const existingJob = await jobModel.findById(jobid);
    if(isNUllorUndefined(partner)){
        res.status(404).send({"error":`partner not found`})
    }
    else if(isNUllorUndefined(existingJob)){
        res.status(404).send({'error':`No job with this Specified id`});
    }else{
        if(updateStatus==="Started" && existingJob.FullStatus!= `Started`){
            const stat= existingJob.FullStatus;
            existingJob.FullStatus= `Started`
            existingJob.save();
            const userid = existingJob.Userid;
            const partnerid = existingJob.Partnerid;
            if(stat!=="Resolved"){updateActiveTasks(userid,partnerid);}
            res.send(existingJob);
        }else if(updateStatus==="Resolved"){
            existingJob.FullStatus= `Resolved`
            existingJob.save();
            res.send(existingJob);
        }else if(updateStatus==="Service Denied"){
            existingJob.FullStatus= `Service Denied`
            if(existingJob.FullStatus==="Started"){
                const userid = existingJob.Userid;
               const partnerid = existingJob.Partnerid;
                deleteActiveTasks(userid,partnerid)
            }
            existingJob.save();
            res.send(existingJob);
        }else{
            res.sendStatus(400);
        }
    }
})

// Status Update by user
router.put('/jobStatusUpdate/:jobid',async(req,res)=>{
  
    try{const user = await userModel.findById(req.body.userid);
    const jobid = req.params.jobid;
    const existingJob = await jobModel.findById(jobid);}
    catch{res.status(400).send({"err":"Not Found"})}
    const user = await userModel.findById(req.body.userid);
    const jobid = req.params.jobid;
    const existingJob = await jobModel.findById(jobid);
    if(isNUllorUndefined(user)){
        res.status(404).send({"error":`User not found`})
    }
    else if(isNUllorUndefined(existingJob)){
        res.status(404).send({"error":`No job with this Specified id`});
    }else{
        if(existingJob.Status){
            res.status(403).send({"error": "Cannot modify after closing of Service request"})
        }
        else{existingJob.Status = !existingJob.Status;
        existingJob.save()
        const userid = existingJob.Userid;
        const partnerid = existingJob.Partnerid;
        deleteActiveTasks(userid,partnerid);
        res.send(existingJob)};
    }
})
//delte request by user
router.delete("/deleteJob/:jobid", async(req,res)=>{
    try{const id = req.params.jobid;
    const existingJob = await jobModel.findById(id);
    const user = await userModel.findById(req.body.userid)}
    catch{res.status(400).send({"err":"Not Found"})}
    const id = req.params.jobid;
    const existingJob = await jobModel.findById(id);
    const user = await userModel.findById(req.body.userid)
    if(isNUllorUndefined(user)){
        res.status(404).send({"error":`User not found`})
    }
    else if(isNUllorUndefined(existingJob)){
        res.status(404).send({"error":`no request with specified id`})
    }else{
        if(existingJob.FullStatus==='Not Started' || existingJob.FullStatus==="Service Denied"){
            await jobModel.deleteOne({_id:id})
            const partnerid = existingJob.Partnerid;
             const userid = existingJob.Userid;
            deleteTotalTasks(userid,partnerid);
            res.send({"message": "Deleted Successfully"})
        }else{
            res.status(403).send({"error":"Can not delete request after starting"})
        }
    }

})
module.exports = router;

