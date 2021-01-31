import '../style/App.css';
// import { useState } from "react";
import {
    Card,  CardTitle, CardText,CardBody,CardHeader
  } from 'reactstrap';

import Star from "./star"
export default function CardC(props){
  const job = props.job;
 
  const Ratings=(Rating)=>{
    fetch(`https://techwreckback.herokuapp.com/ratingsUpdate/${job._id}`,{
      method:'PUT',
      body:JSON.stringify({Rating:2*Rating}),
      headers:{'Content-type':"application/JSON"},
      credentials:"include"
    }).then((r)=>{if(r.ok){return {success:true}}else{ return r.json()}})
  }
  
    return (
      <>
      <Card>
       <CardHeader tag="h3">{job.ClientName}</CardHeader>
      <CardBody>
        <CardTitle tag="h5">Job Type : {job.JobType}</CardTitle>
        <CardText>Job Description: {job.JobDescription}</CardText>
        <CardText>Address : {job.Address}</CardText>
        <CardText>Pincode : {job.Pincode}</CardText>
        <CardText>Job completed</CardText>
       
        <div>
        <div className="cardButton0"><Star val={job.Rating} setRating={Ratings}/>
        </div>
        </div>
        </CardBody>
      </Card>
      </> 
     
      );
}