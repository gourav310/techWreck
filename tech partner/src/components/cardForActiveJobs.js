import '../style/App.css';
// import { useState } from "react";
import {
    Card, Button,  CardTitle, CardText,
   
  } from 'reactstrap';

export default function CardA(props){
  const job = props.job;
  const acceptJob=()=>{
    fetch(`https://techwreckback.herokuapp.com/jobFullStatusUpdate/${job._id}`,{
      method:'PUT',
      body:JSON.stringify({partnerid:job.Partnerid}),
      headers:{'x-updatestatus':'Resolved','content-type':"application/JSON"},
      credentials:"include"
    }).then((r)=>{if(r.ok){props.fun(); return {success:true}}else{ return r.json()}})
  }
  const denyJob=()=>{
    fetch(`https://techwreckback.herokuapp.com/jobFullStatusUpdate/${job._id}`,{
      method:'PUT',
      body:JSON.stringify({partnerid:job.Partnerid}),
      headers:{'x-updatestatus':'Service Denied','content-type':"application/JSON"},
      credentials:"include"
    }).then((r)=>{if(r.ok){props.fun(); return {success:true}}else{ return r.json()}})
  }
    return (
      <>
      <Card body   className="card card-body">
        <CardTitle tag="h5">Job Type : {job.JobType}</CardTitle>
        <CardText>Job Description: {job.JobDescription}</CardText>
        <CardText>Address : {job.Address}</CardText>
        <CardText>Pincode : {job.Pincode}</CardText>
        <CardText>Phone : {job.PhoneNoUser}</CardText>
        <div style={{margin:"10px"}}> <Button outline color="success" style={{width:"100px"}} onClick={acceptJob}>Resolved</Button>
        <Button outline color="danger" onClick={denyJob} style={{width:"100px"}}>Deny</Button></div>
      </Card>
      </> 
      );
}