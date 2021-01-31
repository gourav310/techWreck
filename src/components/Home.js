
import '../style/App.css';
import React from 'react';
import Carousel1 from "./carousel";
import Popular from './popular';
import Peace from './peaceOfMind';
import ShowOff from './ShowOff';
import Ready from './Ready';
import Partner from './Partner'
// import navbar from 'react-bootstrap';
// import {Nav,Form, Button } from 'react-bootstrap';

export default function App(){
  
  
    return(
    <React.Fragment>
      <div className="crouse"><Carousel1  /></div>
    <Popular />
    <Peace />
    <ShowOff />
    <Ready />  
     {/* <HowCanWeHelp /> */}
     <Partner/>
    </React.Fragment>)
}


