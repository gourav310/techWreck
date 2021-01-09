import '../style/App.css';
// import { useState } from "react";
import {
    Card, Button,  CardTitle, CardText,
   
  } from 'reactstrap';

export default function CardC(props){
  const job = props.job;
  const acceptJob=()=>{
    fetch(`http://localhost:9999/jobFullStatusUpdate/${job._id}`,{
      method:'PUT',
      body:JSON.stringify({partnerid:job.Partnerid}),
      headers:{'x-updatestatus':'Started','content-type':"application/JSON"},
      credentials:"include"
    }).then((r)=>{if(r.ok){props.fun();return {success:true}}else{ return r.json()}})
  }
    return (
      <>
      <Card body   className="card card-body">
        <CardTitle tag="h5">Job Type : {job.JobType}</CardTitle>
        <CardText>Job Description: {job.JobDescription}</CardText>
        <CardText>Address : {job.Address}</CardText>
        <CardText>Pincode : {job.Pincode}</CardText>
        {job.Status===false?<div style={{margin:"10px"}}>Waiting For User Conformation <Button outline color="success" style={{width:"100px"}} onClick={acceptJob}>Restart</Button></div>:<>{job.Ratings}</>}
      </Card>
      </> 
      );
}