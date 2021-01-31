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
        <div style={{color:"#236084",display:"inline"}}>{props.minor===null || undefined?"Select Service":props.minor}</div>
        </DropdownToggle>
      <DropdownMenu>
        {props.array.map((item,idx)=><DropdownItem onClick={()=>history.push(`/bookService/?major=${props.major}&minor=${item}`)} key={idx}>{item}</DropdownItem>)}
      </DropdownMenu>
    </Dropdown>
  );
}

export default Example;