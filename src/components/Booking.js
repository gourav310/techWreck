import React, { useEffect, useLayoutEffect, useState } from "react";
import BookingDropDown from "./bookingDropDown";
import CardForBooking from "./cardsForBooking"
import { useLocation } from "react-router-dom";
import BookingDropDown1 from "./bookingDropDown1";
import BookingDropDown2 from "./bookingDropdown2"
export default function Booking(props) {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    // const history= useHistory();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    let query = useQuery();
    const isNullOrUndefined = val => val === null || val === undefined;
    const minor = query.get('minor');
    //   console.log(minor)
    const Installation = ['CCTV Camera Installation', "TV Installation", "Router Installation", "Pc/Laptop Assemble"];
    const Hardware = ["Regular Service", "Parts Upgrade", "Hardware Troubleshooting"]
    const Software = ["Windows Update", "Windows Installation", "Troubleshoot on Call", "Troubleshoot on Visit"];
    const [array, setArray] = useState([]);
    const [major, setMajor] = useState(query.get('major'));
    const [clients,setClients]=useState("")
    const [error,setError]=useState("");
    useEffect(() => {
        //   console.log(query.get('major'));
        if (query.get('major') === null || undefined) {
            setMajor("Software Services");
            setArray(Software);
        }
        else if (query.get('major') === "Software Services") {
            setMajor('Software Services')
            setArray(Software);
        }
        else if (query.get('major') === "Hardware Services") {
            setMajor('Hardware Services')
            setArray(Hardware);
        } else {
            setMajor('Installation')
            setArray(Installation);
        }
        if (!isNullOrUndefined(major) && !isNullOrUndefined(minor)) {
         //   console.log(major,minor)
            fetch(`https://techwreckback.herokuapp.com/availableClients/?major=${major}&minor=${minor}`, { credentials: 'include' }).then((r) => {
                if (r.ok) {
                    return r.json();
                } else {
                   return {sucess:false}
                }
            }).then((r)=>{
                if(r.sucess===false){
                    // console.log(r.json())
                    setClients([])
                    setError(r.error)
                }else{
                    // console.log(r)
                   setClients(r);
                }
            })
        }else{
            setClients("");
        }
    }, [query.get('major'), query.get('minor')])
    const priceSort=()=>{
     //   console.log("here")
        function compare( a, b ) {
            console.log(typeof a.Price)
            if ( a.Price< b.Price ){
              return -1;
            }
            if ( a.Price > b.Price ){
              return 1;
            }
            return 0;
          }
        const arr=[...clients];
        arr.sort(compare);
        setClients(arr);
    }
    const revSort=()=>{
        //console.log("here")
        function compare( a, b ) {
            console.log(typeof a.Price)
            if ( a.Price< b.Price ){
              return 1;
            }
            if ( a.Price > b.Price ){
              return -1;
            }
            return 0;
          }
        const arr=[...clients];
        arr.sort(compare);
        setClients(arr);
    }
    const sortRating=()=>{
        function compare( a, b ) {
          //  console.log(typeof a.Rating)
            if ( a.OverallRatings< b.OverallRatings ){
              return 1;
            }
            if ( a.OverallRatings > b.OverallRatings ){
              return -1;
            }
            return 0;
          }
        const arr=[...clients];
        arr.sort(compare);
        setClients(arr);
    }
    const errOrSelect=()=>{
       
        if(clients===""){
            return <div style={{fontSize:"x-large"}}>Please select services to get Started.</div>
        }else if(clients.length===0){
            return <div style={{fontSize:"x-large"}}>Sorry No Service Providers available.</div>
        }else{
            return null;
        }
    }
    return (
        <>
            <div className="container">
                <div className="row  bookin">
                    <div className=".col-6 .col-md-4 bookin2" ><BookingDropDown display={major} /></div>
                    <div className=".col-6 .col-md-4 bookin2"><BookingDropDown1 major={major} minor={minor} array={array} /></div>
                    <div className=".col-6 .col-md-4 bookin2"><BookingDropDown2 minor={minor} sortRating={sortRating} major={major} priceSort={priceSort} revSort={revSort}/></div>
                </div>
                <div className="row cardRow">
                    {clients.length>=1?clients.map((client,idx)=><div key={idx} style={{ margin: "20px" }}><CardForBooking Price={client.Price} client={client.Email} ratings={client.OverallRatings} minor={minor} clientName={client.FullName} user={props.user} getUserName={()=>props.getUserName()} /></div>):null}
               {/* // {clients.length===0?<div style={{fontSize:"x-large"}}>Please select services to get Started.</div>:null} */}
                {errOrSelect()}
                {error}
               {/* { console.log(props.user)} */}
                </div>
            </div>
        </>
    )
}