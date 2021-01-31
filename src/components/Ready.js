import '../style/App.css';
import React from 'react';
import {Button} from "reactstrap"
import {Link} from "react-router-dom"
// import navbar from 'react-bootstrap';
// import {Nav,Form, Button } from 'react-bootstrap';

export default function App(){
  
    return(<div className="Ready">
      <div className="row">
    <div className="popImages .col-6 .col-md-4"><div className="ready1 popImages .col-6 .col-md-4"> Ready to get Started?</div></div>
    <div className="popImages .col-6 .col-md-4"> <Link to="/bookService"><Button className="btnforservice popImages .col-6 .col-md-4">Book a Service.</Button></Link></div></div> 
      </div>)
}


