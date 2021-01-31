import TopNav from "./TopNav";
import '../style/App.css';
import React from 'react';
import Footer from "./footer";
import { useEffect,useState } from "react";
import Home from './Home'
import { Switch,Route, useHistory} from "react-router-dom";
import Select from "./Select"
import Booking from "./Booking"
import Aboutus from "./Aboutus"
import BookingConfomation from "./BookingConfomation"
import DashBoard from "./DashBoard";
import Profile from "./Profile"
export default function App(){
  const [userName, setUser] = useState(null);
  const history=useHistory();
  const [fullname, setFull] = useState(null);
  // const history = useHistory();
  const getUserName = () => {
    return fetch('https://techwreckback.herokuapp.com/userDetails', { credentials: "include"})
    .then(r => {
      if(r.ok) {
        return r.json();
      } else {
        //setUser(null);
        return { success: false };
      }
    }).then(r => {
      if(r.success !== false) {

        setUser(r.UserName);
        setFull(r.FullName)
      }else{
        console.log(r.error)
      }
    });
  }

  useEffect(() => {
    console.log('yhape')
    getUserName();
  }, []);
  const logout = () => {
    return fetch('https://techwreckback.herokuapp.com/logout', { credentials: 'include'})
    .then(r => {
      if(r.ok) {
        // history.push('/')
        setUser(null);
        setFull(null);
        history.push('/');
      }
    })
  };
    return(
    <React.Fragment>
    <div>
      <TopNav logout={logout}  user={fullname} getUserName={getUserName}/> 
      <Switch>
        < Route path="/bookService/" render={(props)=><Booking {...props} user={userName} getUserName={getUserName}/>}/>
        < Route path="/bookingConfirmation" component={BookingConfomation} />
        < Route path="/selectService/" render={()=><Select />}/>
        < Route path="/AboutUs" render={()=><Aboutus />}/>
        <Route path="/dashBoard" render={()=><DashBoard />}/>
        <Route path="/profile" render={()=><Profile />}/>
        < Route path="/" render={()=><Home />}/>
        
      </Switch>
      <Footer /> 
    </div>
    </React.Fragment>)
}


