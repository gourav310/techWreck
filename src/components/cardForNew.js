import '../style/App.css';
// import { useState } from "react";
import {
    Card, Button,  CardTitle, CardText, CardBody,CardHeader
  } from 'reactstrap';

export default function CardEle(props){
  const job = props.job;
  const denyJob=()=>{
    fetch(`https://techwreckback.herokuapp.com/deleteJob/${job._id}`,{
      method:'DELETE',
      credentials:"include"
    }).then((r)=>{if(r.ok){props.fun(); return {success:true}}else{ return r.json()}}).then((r)=>console.log(r))
  }
    return (
      <>
      <Card >
      <CardHeader tag="h3">{job.ClientName}</CardHeader>
        <CardBody>
        <CardTitle tag="h5">Job Type : {job.JobType}</CardTitle>
        <CardText>Job Description: {job.JobDescription}</CardText>
        <CardText>Address : {job.Address}</CardText>
        <CardText>Pincode : {job.Pincode}</CardText>
        <CardText>Please wait for service provider to confirm.</CardText>
        <div className="cardButton0">
        <Button outline color="danger" onClick={denyJob} >Delete Request</Button></div>
      </CardBody>
      </Card>
      </> 
      );
}