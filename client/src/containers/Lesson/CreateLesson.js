import React,{Component} from 'react';
import { Button,Form,Container, Header, Message } from 'semantic-ui-react';
import axios from 'axios';

class CreateLesson extends Component{
    state = {
        lessonName: '',
        description: '',
        lessonFile:null,
        error: null
    };
    onChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };
    onSubmit = (e) =>{
        e.preventDefault();
        const fd = new FormData();
        fd.append("lessonName",this.state.lessonName);
        fd.append("description",this.state.description);
        fd.append('lessonFile',this.state.lessonFile,this.state.lessonFile.name);
        console.log(fd.get('lessonFile'));
        axios.post("/api/lesson",fd)
            .then(result => {
                console.log(result);
                if(result.status === 200){
                    this.setState({lessonName: '', description: '',error:null,lessonFile:null});
                }
            })
            .catch(err=>{
                const error = err.response.data.message;
                this.setState({error : error})
            })
    };  

    fileSelectHandler = (event) =>{
        this.setState({lessonFile:event.target.files[0]})
    }
    render(){
        let message = null;
        if(this.state.error){
            message = <Message negative>
                        <Message.Header>{this.state.error}</Message.Header>
                    </Message>
        }
        return(
            <div style={{margin:'200px auto'}}>
                <Container>
                    {message}
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
                            <input type="file" required onChange={this.fileSelectHandler}  name="lessonFile" />
                        </Form.Field>
                        <Button className="loginButton" color="blue" type='submit'>Create</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default CreateLesson;