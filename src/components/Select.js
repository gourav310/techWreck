// import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import {useLocation,useHistory} from "react-router-dom";


export default function Select(props){
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const history= useHistory();
    let query = useQuery();

    const [major,setMajor]=useState(query.get('major'));
    const Installation=['CCTV Camera Installation',"TV Installation","Router Installation","Pc/Laptop Assemble"];
    const Hardware =["Regular Service","Parts Upgrade","Hardware Troubleshooting"]
    const Software=["Windows Update","Windows Installation","Troubleshoot on Call","Troubleshoot on Visit"];
    const [array ,setArray] = useState([])
    
   useEffect(()=>{
       console.log("select is ruunnning");
       if(query.get('major')===null || undefined){
           setMajor("Software Services");
           setArray(Software);
       }
       else if(query.get('major')==="SoftwareServices"){
           setMajor('Software Services')
           setArray(Software);
       }
       else if(query.get('major')==="HardwareServices"){
        setMajor('Hardware Services')
        setArray(Hardware);
       }else{
            setMajor('Installation')
            setArray(Installation);
        }
   },[query.get('major')])
    return (
        <>
        <div className="container">
            <div className="row selectComp">
                <div className="Sel1">Select from below {major}</div>
                {array.map((serv,idx)=>(<div key={idx} style={{padding:"20px"}}><button onClick={()=>history.push(`/bookService/?major=${major}&minor=${serv}`)} className="servButton">{serv}</button></div>))}
            </div>
        </div>
        </>
    )
}