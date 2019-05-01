import React,{Component} from 'react'
import { Button, Form, Dropdown} from 'semantic-ui-react'
import './StudentSignup.css';
import axios from 'axios';
import history from '../../../../history';
const gradeOptions = [
    {
        key:1,
        text:'5th',
        value:'5th'
    },
    {
        key:2,
        text:'6th',
        value:'6th'
    },
    {
        key:3,
        text:'7th',
        value:'7th'
    }, 
    {
        key:4,
        text:'8th',
        value:'8th'
    }, 
    {
        key:5,
        text:'9th',
        value:'9th'
    },
    {
        key:6,
        text:'10th',
        value:'10th'
    }
]
class teacherSignup extends Component{
    state = {
        Name: '',
        age : '',
        grade: '',
        username:'',
        password:'',
        address:'',
        userType:'student'
    }
    onSubmit = (e) =>{
        e.preventDefault();
        const student = this.state;
        axios.post("/api/signup",student)
        .then(result=>{
            history.push("/landing/login");
        })
        .catch(err=>{
            console.log(err);
        })
    }
    onChange = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    gradeChangeHandler = (event,data) =>{
        this.setState({
            grade:data.value
        })
    }
    render(){
        return(
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Name:</label>
                        <input onChange={this.onChange} required value={this.state.Name} name="Name" placeholder='Enter your Name'  />
                    </Form.Field>
                    <Form.Field>
                        <label>Username:</label>
                        <input   onChange={this.onChange} required value={this.state.username} name="username" placeholder='Enter your username' />
                    </Form.Field>
                    <Form.Field>
                        <label>Password:</label>
                        <input type="password"  onChange={this.onChange} required value={this.state.password} name="password" placeholder='Enter your password' />
                    </Form.Field>
                    <Form.Field>
                        <label> Age:</label>
                        <input  onChange={this.onChange} required value={this.state.age} name="age" placeholder='Enter your age' />
                    </Form.Field>
                    <Form.Field required>
                        <label> Grade:</label>
                        <Dropdown required placeholder='Select Grade' fluid selection options={gradeOptions} onChange={this.gradeChangeHandler}/>
                    </Form.Field>
                    <Form.Field>
                        <label> Address</label>
                        <input  onChange={this.onChange} required value={this.state.address} name="address" placeholder='Enter your address' />                
                    </Form.Field>
                    <Button color="blue" className="studentButton" type='submit'>Submit</Button>
                </Form> 
        )
    }
}
export default teacherSignup;
