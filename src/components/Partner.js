import '../style/App.css';
import React from 'react';
import {Button} from "reactstrap"

// import navbar from 'react-bootstrap';
// import {Nav,Form, Button } from 'react-bootstrap';

export default function App(){
  
  
    return(<div className="conatiner-md partnerCol" >
      <div className="row partnerRow" ><h3 >Become a Service Partner</h3></div>
      <div className="row partnerRow"><p style={{color:"6d7d8c"}}>Earn up to 100<span>&#8377;</span>/hr for helping people discover and enjoy technology.</p></div>
       <div className="row partnerRow" ><Button color="trasparent" style={{border:"1px solid #236084"}}><a rel="noreferrer" href="https://techpartner0.herokuapp.com/" target="_Blank">Know More</a></Button></div>
  
    </div>)
}
