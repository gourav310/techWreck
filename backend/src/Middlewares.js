exports.session = session =  require("express-session");
exports.SALT=  1;
exports.bcrypt=  bcrypt = require('bcrypt');
const isNUllorUndefined = val => val===null || val ===undefined;
exports.cors= cors= require('cors');
exports.CorsMiddlware =CorsMiddlware=()=>cors({
    credentials: true,
    origin: "http://localhost:3000"
})
exports.AuthMiddleware = AuthMiddleware=async (req,res,next)=>{
 //   console.log("auth is here ");
    if(isNUllorUndefined(req.session) || isNUllorUndefined(req.session.userId)){
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
    resave:false,
    cookie:{maxAge:1*60*60*24*30}
})
