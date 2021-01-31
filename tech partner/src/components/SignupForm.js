import '../style/App.css';
import { useState,useEffect } from "react";
import {Link} from 'react-router-dom'
import { ButtonToggle, Button, FormGroup, Label, Input } from 'reactstrap';
import Services from "./Services"


export default function SignupForm(props) {
    const [error , setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setName] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("Bikaner");
    const [phone, setPhone] = useState("");
    const [SoftwareServices,setSoftware]=useState(["","","",""])
    const [HardwareServices,setHardware]=useState(["","",""])
    const [Installation,setInstallation]=useState(["","","",""])
    const [butDis,setButDis]= useState(true);
    const getPrice=(name,index,price)=>{
        if(name==="SoftwareServices"){
            const arr=[...SoftwareServices];
            arr[index]=price;
            // console.log(arr)
            setSoftware(arr);
            // console.log(SoftwareServices)
        }else if(name==="HardwareServices"){
            const arr=[...HardwareServices];
            arr[index]=price;
            setHardware(arr);
            //console.log(HardwareServices)
        }else if(name==="Installation"){
            const arr=[...Installation];
            arr[index]=price;
            setInstallation(arr);
            //console.log(Installation)
        }
        //console.log(Installation)
       
       
       
    }
    const doSignUp=()=>{
        const url ="https://techwreckback.herokuapp.com/partnerSignup";
        fetch(url,{
            method:"POST",
            body:JSON.stringify({username:username,password:password,fullName:fullname,city:city,pincode:pincode,phone:phone,SoftwareServices:SoftwareServices,HardwareServices:HardwareServices,Installation:Installation}),
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"}).then((r)=>{if(r.ok){
                return{success:true}
            }else{
                return r.json()
            }}).then((r)=>{
                if(r.success===true){
                    //console.log(props)
                    props.getUsername();
                }else{
                    setError(r.error)
                }
            })
    }
    useEffect(()=>{if(username!=="" && password!=="" && fullname!=="" && city!=="" && phone!==""  && pincode!=="" ){
        setButDis(false);
       
    }else{
        setButDis(true);
    }},[city, fullname, password, phone, pincode, username]);

    return (<div className="logForm">
         <div className="logg" ><p>Already have an account?     <Link to="/"><Button style={{margin: "10px"}} outline color="primary">Login</Button></Link></p></div>
        <FormGroup >
            <Label for="exampleEmail" >Email<span style={{ color: "red" }}> *</span></Label>
            <Input type="email" name="email" id="exampleEmail" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your Email" required />
        </FormGroup>
        <FormGroup >
            <Label for="examplePassword" >Password<span style={{ color: "red" }}> *</span></Label>
            <Input type="password" name="password" id="examplePassword" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
        </FormGroup>
        <FormGroup >
            <Label for="fullname" >Full Name<span style={{ color: "red" }}> *</span></Label>
            <Input type="text" name="fullname" value={fullname} onChange={(e) => setName(e.target.value)} placeholder="Enter your Full name" required />
        </FormGroup>
        <FormGroup >
            <Label for="pincode" >Pincode<span style={{ color: "red" }}> *</span></Label>
            <Input type="Number" name="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Pincode" required />
        </FormGroup>
        <FormGroup >
            <Label for="city" >City<span style={{ color: "red" }}> *</span></Label>
            <Input type="text" name="city" value={city} disabled  required />
            <div><span style={{ color: "red" }}> *</span>We are only in bikaner now</div>
        </FormGroup>
        <FormGroup >
            <Label for="phone" >Mobile<span style={{ color: "red" }}> *</span></Label>
            <Input type="tel" id="phone" value={phone} name="phone" pattern="[0-9]{10}" onChange={(e) => setPhone(e.target.value)} placeholder="Enter your Mobile Number" required />
        </FormGroup>
        <h3 style={{maxWidth:"700px"}}>Please select all the Services you provide.</h3>
        
        <h4>1. Software Services</h4>
        <FormGroup check className="servicesShow">
            <Services name="SoftwareServices" value="Windows Update" index={0} getPrice={getPrice}/>
            <Services name="SoftwareServices" value="Windows Installation" index={1} getPrice={getPrice}/>
            <Services name="SoftwareServices" value="Troubleshoot on Call" index={2} getPrice={getPrice}/>
            <Services name="SoftwareServices" value="Troubleshoot on Visit" index={3} getPrice={getPrice}/>
        </FormGroup>
   
        <h4>2. Hardware Services</h4>
        <FormGroup check className="servicesShow">
            <Services name="HardwareServices" value="Regular Service" index={0} getPrice={getPrice}/>
            <Services name="HardwareServices" value="Parts Upgrade" index={1} getPrice={getPrice}/>
            <Services name="HardwareServices" value="Hardware Troubleshooting" index={2} getPrice={getPrice}/>
        </FormGroup>
        
        <h4>3. Installation</h4> 
        <FormGroup check className="servicesShow"> 
            <Services name="Installation" value="CCTV Camera Installation" index={0} getPrice={getPrice}/>
            <Services name="Installation" value="TV Installation" index={1} getPrice={getPrice}/>
            <Services name="Installation" value="Router Installation" index={2} getPrice={getPrice}/>
            <Services name="Installation" value="Pc/Laptop Assemble" index={3} getPrice={getPrice}/>    
        </FormGroup>
        
        <div className="centre"> {(error)?<div className="error-msg" >
        <img alt="error" height="30px" width="30px" src="https://img.icons8.com/cute-clipart/64/000000/error.png"/>{error}
        </div>:null}
        <ButtonToggle type="submit"  outline color="primary" disabled={butDis} onClick={doSignUp}>Sign Up</ButtonToggle>
       </div>
       
    </div>)
}