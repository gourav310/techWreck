import TopNav from "./TopNav";
import '../style/App.css';
import React from 'react';
import Footer from "./footer";
import Carousel1 from "./carousel";
import Popular from './popular';
import Peace from './peaceOfMind';
import ShowOff from './ShowOff';

// import navbar from 'react-bootstrap';
// import {Nav,Form, Button } from 'react-bootstrap';

export default function App(){
  
  
    return(<div>
      <TopNav />
      <div className="crouse"><Carousel1  /></div>
      <Popular />
      <Peace />
      <ShowOff />
      <Footer />
    </div>)
}


