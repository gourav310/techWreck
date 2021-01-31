import logo from '../logo.svg';
import '../style/App.css';
import {useHistory} from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import {useState,useEffect} from 'react'
import LoginModal from "./LoginModal"
export default function TopNav(props){
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  
  const toggle = () => setIsOpen(!isOpen);
  
  useEffect(()=>{
    console.log(isOpen)
    if(isOpen===true){
      // console.log("here")
      const nave2 = document.getElementById('nave2');
      nave2.classList.remove("nave1");
    }
},[isOpen])
return (<div>
        <Navbar color="light" light  expand="md">
          <NavbarBrand href="/"><img src={logo} alt="techwreck" width="200px" height="50px" /></NavbarBrand>
          <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto nave1" id="nave2"  navbar>
          <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
               <b> Services</b>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={()=>history.push('/selectService/?major=SoftwareServices')}>
                  Software Solutions
                </DropdownItem>
                <DropdownItem onClick={()=>history.push('/selectService/?major=HardwareServices')}>
                  Hardware Solutions
                </DropdownItem >
                <DropdownItem onClick={()=>history.push('/selectService/?major=Installation')}>
                  Device Installation
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem >
              <NavLink href="/AboutUs"><b>About Us</b></NavLink>
            </NavItem>
            <NavItem >
              <NavLink href='https://techwreckback.herokuapp.com'><b>Partner Us</b></NavLink>
            </NavItem>
            </Nav>
          {props.user!==null && props.user!==undefined?<UncontrolledDropdown className="unwantedList" nav >
            {/* {console.log(props.user)} */}
              <DropdownToggle style={{color: "#236084"}} nav caret>
                <b>{props.user}</b>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <div onClick={()=>history.push('/profile')}>Profile</div>
                </DropdownItem>
                <DropdownItem>
                  <div onClick={()=>history.push('/dashboard')}>Dashboard</div>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem >
                  <div onClick={()=>props.logout()}>Logout</div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>:<NavbarText><LoginModal getUserName={()=>props.getUserName()} name="Login" /></NavbarText>}
        </Collapse>
        
        </Navbar>
      </div>)
}