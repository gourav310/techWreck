import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {useHistory} from "react-router-dom";
const Example = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const history= useHistory();
  const toggle = () => setDropdownOpen(prevState => !prevState);
  
  return (
    <Dropdown isOpen={dropdownOpen} size="lg"  toggle={toggle}>
      <DropdownToggle caret color="transparent">
        <div style={{color:"#236084",display:"inline"}}>{props.display}</div>
        </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={()=>history.push(`/bookService/?major=Software Services`)}>Software Services</DropdownItem>
        <DropdownItem onClick={()=>history.push(`/bookService/?major=Hardware Services`)}>Hardware Services</DropdownItem>
        <DropdownItem onClick={()=>history.push(`/bookService/?major=Installation`)}>Installation</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Example;