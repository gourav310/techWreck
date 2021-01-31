import '../style/App.css';
import React from 'react';
// import {Button} from "reactstrap"

// import navbar from 'react-bootstrap';
// import {Nav,Form, Button } from 'react-bootstrap';

export default function App(){
  
  
    return(
    <div  style={{backgroundColor:"#236084"}} >
      <div className="conatiner-md footerCont" style={{backgroundColor:"#236084"}} >
      <div className="popImages .col-6 .col-md-4 ">
        <div className="row footerRow">Explore</div>
        <br></br>
        <div className="footerPart2">
        <div style={{margin:"5px"}}><a href="/" style={{color:"aliceblue"}}>Home</a></div>
        <div style={{margin:"5px"}}><a href="/AboutUs" style={{color:"aliceblue"}} >About</a></div>
        <div style={{margin:"5px"}}><a href="https://techwreckback.herokuapp.com/" rel="noreferrer"  style={{color:"aliceblue"}} >Partner Us</a></div>
        </div>
        
        
        </div>
      <div className="popImages .col-6 .col-md-4">
      <div className="row footerRow">Follow</div>
        <br></br>
        <div className="footerPart2">
        <div style={{margin:"5px"}}><a rel="noreferrer"  href="https://twitter.com/sarcastic310?s=08" target="_Blank" style={{color:"aliceblue"}}>Twitter</a></div>
        <div style={{margin:"5px"}}><a rel="noreferrer"  href="https://www.facebook.com/profile.php?id=100005582177502" target="_Blank" style={{color:"aliceblue"}} >Facebook</a></div>
        <div style={{margin:"5px"}}><a rel="noreferrer"  href="https://www.linkedin.com/in/gouravkhurana/" target="_Blank" style={{color:"aliceblue"}} >Linkedin</a></div>
        </div>
      </div>
      <div className="popImages .col-6 .col-md-4">
      <div className="row footerRow">Contact Us</div>
        <br></br>
        <div className="footerPart2">
        <div style={{color:"aliceblue",margin:"5px"}}>Phone: 9829847310</div>
        <div style={{color:"aliceblue" ,margin:"5px"}}>Email: gouravKhurana310@gmail.com</div>
        <div style={{color:"aliceblue" ,margin:"5px"}}><a rel="noreferrer"  href="https://github.com/gourav310/techWreck.git" target="_Blank" style={{color:"aliceblue"}} >Github</a></div>
        </div>
      </div>
    </div>
    <div className="copyRite"><span>&#169;</span>2020 Techwreck.All Rights Reserved.</div>
    </div>)
}
