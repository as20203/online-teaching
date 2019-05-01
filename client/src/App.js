import React ,{ Component } from 'react';
import { Router,Route, Switch} from 'react-router-dom';
import history from "./history"; 
import './App.css';
import Navbar from './containers/Navbar/Navbar';
import Signup from './containers/Authentication/Signup/Signup';
import Login from './containers/Authentication/Login/Login';
import Dashboard from './containers/Dashboard/Dashboard';
import Landing from './containers/HomePage/HomePage'
import axios from 'axios'
class  App extends Component{
  state = {
    user:null
  }
  setUser = (user) => {
    this.setState({user});
  }

  componentDidMount = async()=>{
    const token = localStorage.getItem("Token");
    if(token){
      const result = await axios.post("/api/verify-token",null,{ headers: {"Authorization" : `Bearer ${token}`} })
      if(result.data.status!==200){
        history.push("/");
      } else {
          this.setState({user: result.data.user});
          history.push("/dashboard");
      }
    }
    else{
        history.push("/");
    }
  }


  render(){
    const user = this.state.user;
    let navbar = null;
    console.log(user);
    if(!user){
      navbar = <Navbar />
    }
    return (
     
      <Router history={history}>
      {navbar}
      <Switch>
       <Route exact path="/" component={Landing} />
       <Route path="/login" component={() => <Login setUser={this.setUser} />} />
       <Route path="/signup" component={Signup} />
       <Route path="/dashboard" component={() => <Dashboard user={this.state.user} />}/>
      </Switch>
    </Router>
    );
  }
}
export default App;
