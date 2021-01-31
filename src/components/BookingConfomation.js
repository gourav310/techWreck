import React,{useState,useEffect,useLayoutEffect} from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {useHistory} from "react-router-dom"
export default function BookingConfomation(props){
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
}, []);
const history=useHistory();
    const [pincode,setPin]=useState("");
    const [Address,setAdd]=useState("");
    const [disable,setButDis]= useState(true);
    const [des,setDes]=useState("")
    const funAddAddres=(e)=>{
        if(e.target.value.trim()!==""){
            setAdd(e.target.value);
        }else{
            setAdd("")
        }
    }
    const bookService=()=>{
      fetch('https://techwreckback.herokuapp.com/newJob',{method:"POST",
    credentials:"include",
    body:JSON.stringify({userEmail:props.location.state.user,partnerEmail:props.location.state.client,address:Address,city:"Bikaner",pincode:pincode,jobtype:props.location.state.jobtype,jobdes:des}),
    headers:{
        "Content-Type":"application/json"
    },}).then((r)=>{if(r.ok){
      return{success:true}
  }else{
      return r.json()
  }}).then((r)=>{
      if(r.success===true){
    // console.log('success')
    history.push('/dashBoard')     
      }else{
          console.log(r.error)
        
      }
  })
    }
    useEffect(()=>{if(pincode!==""  && Address!=="" ){
        setButDis(false);
    }else{
        setButDis(true);
    }},[ pincode,Address]);
    return (<>
     { props.location.state!==undefined  ?
     <Form style={{margin:"50px"}}>
       <div className="row jobType"><b>Job Type: </b><span>{props.location.state.jobtype}</span></div>
        <FormGroup row>
          <Label for="client"  className="confirmLabel"  sm={2}>Service Provider:</Label>
          <Col sm={8}>
            <Input type="text" name="client" disabled  value={props.location.state.clientName} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="user" className="confirmLabel"  sm={2}>User Email:</Label>
          <Col sm={8}>
            <Input type="text" name="user" disabled value={props.location.state.user} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="pincode"  className="confirmLabel"  sm={2}>Pincode:</Label>
          <Col sm={8}>
            <Input type="Number" name="pincode" value={pincode} onChange={(e) => setPin(e.target.value)} placeholder="Enter your Pincode" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="city"  className="confirmLabel"  sm={2}>City:</Label>
          <Col sm={8}>
            <Input type="text" name="city" disabled value="Bikaner" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Address"  className="confirmLabel"  sm={2}>Address:</Label>
          <Col sm={8}>
            <Input type="textarea" name="Address" value={Address} onChange={(e)=>funAddAddres(e)} placeholder="Enter your address" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label className="confirmLabel" for="price" sm={2}>Charges:</Label>
          <Col sm={8}>
            <Input type="Number" name="price" disabled value={props.location.state.Price} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label className="confirmLabel" for="des" sm={2}>Full Description:</Label>
          <Col sm={8}>
            <Input type="textarea" name="des" value={des} placeholder="Give a brief description about service for service provider" onChange={(e)=>setDes(e.target.value)}/>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button  disabled={disable} color="primary" onClick={bookService} >Confirm Booking</Button>
          </Col>
        </FormGroup>
      </Form>:<h3>Nothing here</h3>}
    {/* {console.log(props)} */}
    </>)
    
}


