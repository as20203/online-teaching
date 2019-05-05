import React,{Component} from 'react';
import {Segment,Container,Header,Image,Form,Button,Input} from 'semantic-ui-react';
import './Profile.css';
import axios from 'axios';

class Profile extends Component{
    _isMounted = false;
    state={
        name:'',
        age:'',
        specificInfo:'',
        gender:'',
        address:'',
        userType:'',
        userImage:'',
        userFile:null
    };
    getUserData = async() =>{
        const user = await axios.get("/api/user");
        if(user.data.status===200){
            if (user.data.userType==="teacher") {
                 const {name, age, gender, degree, address,userImage} = user.data.teacher;
                 if(this._isMounted){
                    this.setState({
                        name, age, gender, specificInfo:degree, address, userType: user.data.userType,userImage
                    })
                 }         
            } else {
                 const {name, age, gender, grade, address,userImage} = user.data.student;
                 if(this._isMounted){
                    this.setState({
                        name, age, gender, specificInfo: grade, address, userType: user.data.userType,userImage
                    })
                 }          
            }
        } else {
            console.log("Couldn't find user");
        }
    }
    
    componentDidMount=async()=>{
        this._isMounted=true
        this.getUserData();
     }
 
     componentWillUnmount() {
         this._isMounted = false;
 
    }
    fileSelectHandler = (event) =>{
        console.log(event.target.files[0]);
        this.setState({userFile:event.target.files[0]})
    }
    onSubmit = (e) =>{
        e.preventDefault();
        const fd = new FormData();
        fd.append('userFile',this.state.userFile,this.state.userFile.name);
        axios.put("/api/user-image",fd)
        .then(result=>{
            this.getUserData();
        })
    }
    render(){
        let userSpecHeader = null;
        if (this.state.userType==="student") {
            userSpecHeader=  <Header as="h1" textAlign="left">Grade:</Header>
        }
        else if (this.state.userType==="teacher") {
            userSpecHeader =<Header as="h1" textAlign="left">Degree:</Header>
        }
        return (
          <Container>
              <Segment style={{background:"#F7F7F7"}} raised color="teal">
              <Header as="h2" textAlign="center">Profile</Header>
              <Image src={this.state.userImage} size='medium' circular />
              <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <Input  type="file" required  name="userImage" onChange={this.fileSelectHandler} /> 
                    <br/>
                    <Button style={{margin:'5px auto',display:'block',width:'30%'}} type="submit"  color="blue"> Upload </Button>      
                </Form.Field>            
              </Form>   
                <Header as="h1" textAlign="left">Name:</Header>
                <p>{this.state.name}</p>
                <Header as="h1" textAlign="left">Age:</Header>
                <p>{this.state.age}</p>
                {userSpecHeader}
                <p>{this.state.specificInfo}</p>
                <Header as="h1" textAlign="left">Gender:</Header>
                <p>{this.state.gender}</p>
                <Header as="h1" textAlign="left">Address:</Header>
                <p>{this.state.address}</p>   
              </Segment>
          </Container>
        )
    }
}

export default Profile;