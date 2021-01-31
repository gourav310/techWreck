import '../style/App.css';
import { useState } from "react";
import { ButtonToggle, FormGroup, Label, Input,Button } from 'reactstrap';

export default function LoginForm(props) {
    const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [error , setError] = useState("");
     
     const login=()=>{
         const url="https://techwreckback.herokuapp.com/userLogin"
//console.log('aaaaaa');
         fetch(url,{
            method:"POST",
            body:JSON.stringify({username:username,password:password}),
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"}).then((r)=>{if(r.ok){
                return{success:true}
            }else{
                return r.json()
            }}).then((r)=>{
                if(r.success===true){
               console.log('success')
                    props.getUserName();
                }else{
                    console.log(r.error)
                    setError(r.error)
                }
            })
     }
    return (
    
    <div className="logForm">

        <FormGroup >
            <Label for="exampleEmail" >Email:</Label>

            <Input type="email" name="email" id="exampleEmail" value={username}  onChange={(e)=>setUsername(e.target.value)} placeholder="Enter your Email" required/>

        </FormGroup>
        <FormGroup >
            <Label for="examplePassword" >Password:</Label>

            <Input type="password" name="password" id="examplePassword" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" required/>

        </FormGroup>
       <div className="centre"> {(error)?<div className="error-msg" >
        <img alt="error" height="30px" width="30px" src="https://img.icons8.com/cute-clipart/64/000000/error.png"/>{error}
        </div>:null}
        <ButtonToggle type="submit"  outline color="primary" onClick={login}>Login</ButtonToggle>
        <div className="login-signup"><p>Dont have an account?     <Button style={{height:"40px"}} onClick={()=>props.setLogorSign()} outline color="primary">Sign Up</Button></p></div></div>
        
    </div>)
}