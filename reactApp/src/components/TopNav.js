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
                <DropdownItem>
                  Software Solutions
                </DropdownItem>
                <DropdownItem>
                  Hardware Solutions
                </DropdownItem>
                <DropdownItem>
                  Device Installation
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem >
              <NavLink href="/"><b>FAQ</b></NavLink>
            </NavItem>
            <NavItem >
              <NavLink href='/'><b>Partner Us</b></NavLink>
            </NavItem>
            
          </Nav>
          <NavbarText><b>Login</b></NavbarText>
        </Collapse>
          
        </Navbar>
      </div>)
}