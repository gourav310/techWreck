import '../style/App.css';
import { useState,useEffect } from "react";
import { Label, Input } from 'reactstrap';


export default function Services(props){
    const [priceBox,setPriceBox]= useState(false);
    const [price,setPrice]= useState("");
    const fun = (value)=>{
        if(priceBox){setPrice(value)}
        else{setPrice("")}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{props.getPrice(props.name,props.index,price)},[price])
    return (<div>
    <Label check inline>
                <Input type="checkbox" name={props.name} value={props.value} onClick={()=>{setPriceBox(!priceBox);if(priceBox){setPrice("")}}}/>{props.value}.
                {priceBox===true?<><Input type="Number" placeholder='Enter service Charge' onChange={(e)=>fun(e.target.value)}/></>:null}
    </Label>
    </div>)

}