import '../style/App.css';
// import { useState } from "react";
import {
    Card, Button,CardBody,  CardTitle, CardText, CardHeader,

  } from 'reactstrap';

export default function CardA(props){
  const job = props.job;
  const acceptJob=()=>{
    fetch(`https://techwreckback.herokuapp.com/jobStatusUpdate/${job._id}`,{
      method:'PUT',
      credentials:"include"
    }).then((r)=>{if(r.ok){props.fun(); return {success:true}}else{ return r.json()}})
  }
 
    return (
      <>
      <Card>
      <CardHeader tag="h3">{job.ClientName}</CardHeader>
      <CardBody >
        <CardTitle tag="h5">Job Type : {job.JobType}</CardTitle>
        <CardText>Job Description: {job.JobDescription}</CardText>
        <CardText>Address : {job.Address}</CardText>
        <CardText>Pincode : {job.Pincode}</CardText>
        <CardText>Phone : {job.PhoneNoUser}</CardText>
        <CardText>Service Provider : {job.PhoneNoPartner}</CardText>
        {job.FullStatus==="Resolved"?<>
        <CardText>Service marked completed by Service provider</CardText>
        <div className="cardButton0"><Button outline color="success"  onClick={acceptJob}>Mark Completed</Button>
      </div></>:<CardText style={{marginLeft:"50px"}}><b>Status:</b>   In progress</CardText>}
      </CardBody>
      </Card>
      </> 
      );
}