//dependencies and other
const mongoose = require('mongoose');
const {userModel}=require('../models/User')
const {partnerModel}=require('../models/Client');
const {jobModel}= require('../models/Jobs');
const {connect}= require('./createDataBase');
const {connections} = require('mongoose');
const express = require('express');
const PORT = process.env.PORT ||9999; 
const {   SALT ,bcrypt,AuthMiddleware,SessionMiddlware,CorsMiddlware,cors} = require('./Middlewares')

const app=express();

//middlewares
app.use(express.urlencoded());
app.use(express.json());
app.use(CorsMiddlware());
app.set('trust proxy',1);

//connect to db
connect();// this function is imported fro create database and is started here 
const isNUllorUndefined = val => val===null || val ===undefined;
//api for signup
const signupRouter = require('./signup');
app.use(signupRouter);

//api for jobs
const jobRouter= require('./Jobs');
app.use(jobRouter);
//api for login
const loginRouter= require('./login');
app.use(loginRouter);

//all api for get request
const getRouter= require('./getApi');
app.use(getRouter);

const session= require('express-session')
app.use(session({
    secret: "session_secret",
    resave:false,
    saveUninitialized:false,
    cookie: { maxAge: 1*60*60*1000,secure:true }
}))
app.get('/',(req,res)=>{
   // console.log(req.session);
    res.send({message:'working fine'})
})
app.listen(PORT,()=>`App is listening on ${9999}`);
module.exports=app;
