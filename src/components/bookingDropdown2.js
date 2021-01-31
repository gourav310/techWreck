import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Example = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const [selected,setSelected]= useState("Sort");
  useEffect(()=>{
    ///console.log("here")
   
    setSelected("Sort")
    
  },[props.minor,props.major])
  const price=()=>{
    props.priceSort();
    setSelected("Price low to high")
  }
  const revPrice=()=>{
    props.revSort();
    setSelected("Price high to low")
  }
  const ratin=()=>{
    props.sortRating();
    setSelected("Ratings high to low")
  }
  return (
    <Dropdown isOpen={dropdownOpen} size="lg"  toggle={toggle}>
      <DropdownToggle caret color="transparent">
        <div style={{color:"#236084",display:"inline"}}>{selected}</div>
        </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={price}>Price low to high</DropdownItem>
        <DropdownItem onClick={revPrice} >Price high to low</DropdownItem>
        <DropdownItem onClick={ratin}>Ratings high to low</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Example;