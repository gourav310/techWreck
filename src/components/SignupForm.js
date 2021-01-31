import '../style/App.css';
import { useState,useEffect } from "react";
import { ButtonToggle, Button, FormGroup, Label, Input } from 'reactstrap';



export default function SignupForm(props) {
    const [error , setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setName] = useState("");
    const [pincode, setPincode] = useState("");
    const city ="Bikaner";
    const [phone, setPhone] = useState("");
    
    const [butDis,setButDis]= useState(true);
   
    const doSignUp=()=>{
        const url ="https://techwreckback.herokuapp.com/userSignup";
        fetch(url,{
            method:"POST",
            body:JSON.stringify({username:username,password:password,fullName:fullname,city:city,pincode:pincode,phone:phone}),
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
                    props.getUserName();
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
         <div className="logg" ><p>Already have an account?     <Button style={{margin: "10px"}} onClick={()=>props.setLogorSign()} outline color="primary">Login</Button></p></div>
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
            <div><span style={{color:'red'}}>* </span> Please enter Pincode of bikaner city only.</div>
            <Input type="Number" name="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Pincode" required />
        </FormGroup>
        <FormGroup >
            <Label for="city" >City<span style={{ color: "red" }}> *</span></Label>
            <Input type="text" name="city" value={city} disabled placeholder="Enter your city" required />
            <div><span style={{color:'red'}}>* </span> We are currently only available in Bikaner.</div>
        </FormGroup>
        <FormGroup >
            <Label for="phone" >Mobile<span style={{ color: "red" }}> *</span></Label>
            <Input type="tel" id="phone" value={phone} name="phone" pattern="[0-9]{10}" onChange={(e) => setPhone(e.target.value)} placeholder="Enter your Mobile Number" required />
        </FormGroup>
     
        <div className="centre"> {(error)?<div className="error-msg" >
        <img alt="error" height="30px" width="30px" src="https://img.icons8.com/cute-clipart/64/000000/error.png"/>{error}
        </div>:null}
        <ButtonToggle type="submit"  outline color="primary" disabled={butDis} onClick={doSignUp}>Sign Up</ButtonToggle>
       </div>
       
    </div>)

}