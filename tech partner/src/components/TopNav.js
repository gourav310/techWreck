import logo from '../logo.svg';
import '../style/App.css';
import {useHistory} from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
     DropdownToggle, DropdownMenu, DropdownItem,Nav ,UncontrolledDropdown,
} from 'reactstrap';


export default function TopNav(props){
  const history = useHistory();
  return (<div>
        <Navbar color="light" light  expand="md">
          <NavbarBrand href="/"><img src={logo} alt="techwreck" width="200px" height="50px" /></NavbarBrand>
        
          <Nav className="mr-auto profile" navbar>
          {props.user!==null?<UncontrolledDropdown nav >
            {/* {console.log(props.user)} */}
              <DropdownToggle nav caret>
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
            </UncontrolledDropdown>:<div>Login</div>}
        </Nav>
        </Navbar>
      </div>)
}