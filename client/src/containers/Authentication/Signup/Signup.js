import React, { Component } from 'react';
import { Button, Container, Header, Divider } from 'semantic-ui-react';
import './Signup.css';
import TeacherSignup from './TeacherSignup/TeacherSignup';
import StudentSignup from './StudentSignup/StudentSignup';
class Signup extends Component{
    state={
        studentButton:true,
    }
    
    studentSelect = () =>{
        this.setState({
            studentButton:true
        })
    }
    teacherSelect = () =>{
        this.setState({
            studentButton:false
        })
    }               
    render(){
        let Signup = null;
        if(this.state.studentButton){
            Signup = <StudentSignup />
        }else{
            Signup = <TeacherSignup />
        }
        return(
            <Container>
                <Header align={'center'} as="h1">Sign Up As:</Header>
                <Divider />
                <Button.Group  style={{margin:'15px 0px'}}>
                            <Button color="black" primary={this.state.studentButton} active={this.state.studentButton} onClick={this.studentSelect}>Student</Button>
                            <Button.Or />
                            <Button color="black" primary={!this.state.studentButton} active={!this.state.studentButton} onClick={this.teacherSelect}>Teacher</Button>
                </Button.Group>
                {Signup}
            </Container>
        )
    }
}
export default Signup;