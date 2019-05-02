import React,{Component} from 'react';
import {Segment,Container,Header,Image} from 'semantic-ui-react';
import './Profile.css';
import axios from 'axios';

class Profile extends Component{
    state={
        name:'',
        age:'',
        specificInfo:'',
        gender:'',
        address:'',
        userType:'',
    }
    
    componentDidMount=async()=>{
       const user = await axios.get("/api/user")
       if(user){
           console.log(user);
           if(user.data.userType==="teacher"){
                const {name,age,gender,degree,address} = user.data.teacher;
                this.setState({
                    name,age,gender,specificInfo:degree,address,userType:user.data.userType
                })
           }else{
                const {name,age,gender,grade,address} = user.data.student;
                this.setState({
                name,age,gender,specificInfo:grade,address,userType:user.data.userType
                })
           }
       }else{
           console.log("Couldn't find user");
       }
    }
    
    render(){
        let userSpecHeader = null;
        if(this.state.userType==="student"){
            userSpecHeader=  <Header as="h1" textAlign="left">Grade:</Header>
        }
        else if(this.state.userType==="teacher"){
            userSpecHeader =<Header as="h1" textAlign="left">Degree:</Header>
        }
        return(
          <Container>
              <Segment style={{background:"#F7F7F7"}} raised color="teal">
              <Header as="h2" textAlign="center">Profile</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' circular />   
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