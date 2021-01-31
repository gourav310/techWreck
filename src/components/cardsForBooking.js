import React, { useState } from 'react';
import star from '../star.png'
import {Link,useHistory} from 'react-router-dom'
import { Card, Button, CardHeader, CardBody,
  CardTitle, CardText } from 'reactstrap';
import LoginModal from "./LoginModal"


const App = (props) => {
  
  return (
    <div>
      <Card>
        <CardHeader><b>{props.clientName}</b></CardHeader>
        <CardBody>
          <CardTitle tag="h5">Selected Service: {props.minor}</CardTitle>
          <CardText><b>Ratings: </b> {props.ratings}/10 <img alt="ratings" height="20px" width="20px"  src={star}/></CardText>
          <CardText><b>Charges: </b> {props.Price} <span>&#8377;</span></CardText>
          {props.user===null?<Button color="primary"><LoginModal  getUserName={()=>props.getUserName()} name="Login to Book" /></Button>:
      <Link to={{pathname:"/bookingConfirmation",
      state:{client:props.client,Price:props.Price,clientName:props.clientName,user:props.user,jobtype:props.minor}}} ><Button>Book Service</Button></Link>}
        </CardBody>
        {/* {props.client} */}
      </Card>
     
    </div>
  );
};

export default App;