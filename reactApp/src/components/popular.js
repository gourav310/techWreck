import '../style/App.css';
import React from 'react';
import img1 from '../rsz_asas.png';
import img2 from '../Computer_1a1c63e111214cfb31206d3e11763534.png';
import img3 from '../SmartCam_5ce8980e69d72133470795c1dd5f66b0.png';
import img4 from '../TvMount_69e5291f490de1ae368d3b09c823cdfa.png';

// import navbar from 'react-bootstrap';
// import {Nav,Form, Button } from 'react-bootstrap';

export default function Popular(){
  
  
    return(<div>
        <h3 className="popText" style={{marginTop:"30px"}}>Popular Services</h3>
       <div
       className="container-md"> 
       <div class="row">
       <a href="/" className="popImages .col-6 .col-md-4" > <div ><img src={img1} alt ="update" height="150px" width="250px"/><h6 className="popText">Windows Update</h6></div></a>
       <a href="/" className="popImages .col-6 .col-md-4"><div ><img src={img2} alt ="hardware support" height="150px" width="250px"/><h6 className="popText">Hardware Support</h6></div></a>
       <a href="/" className="popImages .col-6 .col-md-4"><div><img src={img3} alt ="CCTV Install" height="150px" width="250px"/><h6 className="popText">CCTV Installation</h6></div></a>
       <a href="/" className="popImages .col-6 .col-md-4"><div><img src={img4} alt ="TV Mounting" height="150px" width="250px"/><h6 className="popText">TV Mounting</h6></div></a>
        </div>
        </div>
    </div>)
}

