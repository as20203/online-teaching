import React,{Component} from 'react'
import { Button,Form,Container, Header } from 'semantic-ui-react'
import './Login.css'
import axios from 'axios';
import history from '../../../history';
class Login extends Component{
  state = {
    username:'',
    password:''
  }
  onChange = (e) =>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  onSubmit = (e) =>{
    e.preventDefault();
    const credentials = this.state
    axios.post("/api/login",credentials)
    .then(result=>{
      if(result.data.status===200){
        this.props.setUser(result.data.user);
        localStorage.setItem("Token",result.data.token);
        history.replace("/dashboard");
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }
  render(){
      return(
        <div style={{margin:'200px auto'}}>
          <Container>
          <Header align="center" as="h1">Login</Header>
            <Form onSubmit={this.onSubmit}>
              <Form.Field>
                <label>Username:</label>
                <input required value={this.state.username} onChange={this.onChange} placeholder='Enter your username' name="username" />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type="password" required value={this.state.password} onChange={this.onChange} placeholder='Enter your password' name="password" />
              </Form.Field>
              <Button className="loginButton" color="blue" type='submit'>Login</Button>
            </Form>
          </Container> 
        </div>
      )
  }
}
export default Login;