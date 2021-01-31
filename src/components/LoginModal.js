import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
const LoginModal = (props) => {
  const {
    className
  } = props;
  const [logOrSign,setLogorSign]= useState("Login");
  const [modal, setModal] = useState(false);
  const loginOrSignUp =()=>{
    if(logOrSign==="Login"){
      setLogorSign("SignUp")
    }else{
      setLogorSign("Login");
    }
  }
  const getUserName=()=>{
    // console.log('working here');
    props.getUserName();
  }
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button color="transparent" onClick={toggle}><b><span style={{color: "rgba(0,0,0,.5)"}}>{props.name}</span></b></Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{logOrSign}</ModalHeader>
        <ModalBody>
        {logOrSign==="Login"?<LoginForm getUserName={getUserName} setLogorSign={()=>loginOrSignUp()} />:<SignUpForm setLogorSign={()=>loginOrSignUp()} getUserName={()=>props.getUserName()} />}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default LoginModal;