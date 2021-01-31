exports.session = session =  require("express-session");
exports.SALT=  1;
exports.bcrypt=  bcrypt = require('bcrypt');
const isNUllorUndefined = val => val===null || val ===undefined;
exports.cors= cors= require('cors');
exports.CorsMiddlware =CorsMiddlware=()=>cors({
    credentials: true,
    origin:["https://techpartner0.herokuapp.com","https://techwreck0.herokuapp.com"]
})
exports.AuthMiddleware = AuthMiddleware=async (req,res,next)=>{
 //   console.log("auth is here ");
 //userId is for end users
 //partnerId is for service providers
 console.log(req.session.userId)
 console.log(req.session.partnerId)
    if(isNUllorUndefined(req.session) || (isNUllorUndefined(req.session.userId) && isNUllorUndefined(req.session.partnerId))){
        res.status(401).send({'error':"Not logged in"})
    } else{
        next();
    }
}
const express = require('express');
const app = express();
const session_secret = "techislove";
exports.SessionMiddlware  = SessionMiddlware=()=>session({
    secret:session_secret,
    
    cookie:{maxAge:1000*60*60*24*30,sameSite:'none',secure:true}
})
