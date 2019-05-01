import React, {Component} from 'react';
import './Dashboard.css';
import Teacher from './TeacherDashboard/TeacherDashboard';
import Student from './StudentDashboard/StudentDashboard';

class Dashboard extends Component{ 
  logoutHandler = () =>{
    localStorage.clear();
  }

  render(){
    const {user} = this.props;
    if(user && user.userType === "student") {
      return <Student logoutHandler={this.logoutHandler} />
    } else if(user && user.userType === "teacher") {
      return <Teacher logoutHandler={this.logoutHandler}/>
    }
    return null;
  }
    
  }
  
  export default Dashboard;


