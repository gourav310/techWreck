import '../style/App.css';
import { useState,useEffect } from "react"
import  TopNav  from './TopNav';
import  LoginForm  from './LoginForm';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import  SignupForm  from './SignupForm';
import  DashBoard  from './Dashboard';
import Profile from './Profile'

function App() {
  const [userName, setUser] = useState(null);
  const [ratings, setRating] = useState(null);
  const [fullname, setFull] = useState(null);
  const history = useHistory();
  const getUserName = () => {
    return fetch('http://localhost:9999/partnerDetails', { credentials: "include"})
    .then(r => {
      if(r.ok) {
        return r.json();
      } else {
        setUser(null);
        setRating(null)
        return { success: false };
      }
    }).then(r => {
      if(r.success !== false) {
        history.push('/dashboard');
        setUser(r.UserName);
        setFull(r.FullName)
        setRating(r.OverallRatings)
      }else{
        history.push('/');
        console.log(r.error)
      }
    });
  }

  useEffect(() => {
    console.log('yhape')
    getUserName();
  }, []);
  const logout = () => {
    return fetch('http://localhost:9999/logout', { credentials: 'include'})
    .then(r => {
      if(r.ok) {
        history.push('/')
        setUser(null);
      }
    })
  };
  return (
    
    <div className="App">
      <TopNav logout={logout}  user={fullname}/>
      
      {userName===null?
      
      <Switch>
      <Route path="/signup" render={(props)=>(<SignupForm {...props} getUsername={getUserName}/>)}>
           
        </Route>
        <Route path="/" render={(props)=>(<LoginForm {...props} getUsername={getUserName}/>)}>
           
        </Route>
      </Switch>
      
      :<Switch>
        <Route path="/dashboard" render={(props)=>(<DashBoard {...props} ratings={ratings}/>)}/>
        <Route path="/profile" render={(props)=>(<Profile/>)}/>
      </Switch>}
      
    </div>
  );
}

export default App;
