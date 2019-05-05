import React,{Component} from 'react';
import { Button,Form,Container, Header } from 'semantic-ui-react';
import axios from 'axios';
import history from '../../history';

class CreateLesson extends Component{
    state = {
        lessonName: '',
        description: ''
    };
    onChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };
    onSubmit = (e) =>{
        e.preventDefault();
        const lesson = this.state;
        axios.post("/api/lesson", lesson)
            .then(result => {
                if(result.status === 200){
                    this.setState({lessonName: '', description: ''});
                }
            })
            .catch(err=>{
                console.log(err);
            })
    };
    render(){
        return(
            <div style={{margin:'200px auto'}}>
                <Container>
                    <Header align="center" as="h1">Create a Lesson</Header>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Field>
                            <label>Lesson Name:</label>
                            <input required value={this.state.lessonName} onChange={this.onChange} placeholder='Enter lesson name' name="lessonName" />
                        </Form.Field>
                        <Form.Field>
                            <label>Description:</label>
                            <input type="text" required value={this.state.description} onChange={this.onChange} placeholder='Enter description' name="description" />
                        </Form.Field>
                        <Form.Field>
                            <label>File:</label>
                            <input type="file" onChange={this.onChange} name="lessonFile" />
                        </Form.Field>
                        <Button className="loginButton" color="blue" type='submit'>Create</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default CreateLesson;