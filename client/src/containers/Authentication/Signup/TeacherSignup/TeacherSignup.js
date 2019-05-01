import React,{Component} from 'react'
import { Button, Form, Dropdown} from 'semantic-ui-react'
import './TeacherSignup.css'
import axios from 'axios';
import history from '../../../../history';

const degreeOptions = [
    {
        key:1,
        text:'BS-CS',
        value:'BS-CS'
    },
    {
        key:2,
        text:'BE-SE',
        value:'BE-SE'
    },
    {
        key:3,
        text:'MS-CS',
        value:'MS-CS'
    }, 
    {
        key:4,
        text:'MS-SE',
        value:'MS-SE'
    }
]
class studentSignup extends Component{
    state = {
        Name: '',
        age : '',
        degree:'',
        username:'',
        password:'',
        address:'',
        userType:'teacher'
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
    degreeChangeHandler = (event,data) =>{
        this.setState({
            degree:data.value
        })
    }
    render(){
        return(
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Name:</label>
                    <input  onChange={this.onChange} required value={this.state.Name} name="Name" placeholder='Enter your Name'  />
                </Form.Field>
                <Form.Field>
                    <label>Username:</label>
                    <input  onChange={this.onChange} required value={this.state.username} name="username" placeholder='Enter your username' />
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
                    <label> Degree:</label>
                    <Dropdown required placeholder='Select Degree' fluid selection options={degreeOptions} onChange={this.degreeChangeHandler}/>
                </Form.Field>
                <Form.Field>
                    <label> Address</label>
                    <input  onChange={this.onChange} required value={this.state.address} name="address" placeholder='Enter your address' />                
                </Form.Field>
                <Button color="blue" className="teacherButton"  required type='submit'>Submit</Button>
            </Form> 
        )
    }
}
export default studentSignup;
