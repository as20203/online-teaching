import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import axios from "axios";

class Lessons extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            lessons: []
        }
    }
    componentDidMount = () => {
        this._isMounted = true;
        axios.get("/api/lesson")
            .then(result => {
                if(result.status === 200){
                    if(this._isMounted){
                        this.setState({lessons: result.data.lessons});
                    }
                    
                }
            })
            .catch(err=>{
                console.log(err);
            })
    };
    componentWillUnmount() {
        this._isMounted = false;
    }
    render = () => {
        const {lessons} = this.state;
        const LessonRows = lessons.map((lesson, index) => {
            return (
                <Table.Row key={lesson.lessonId}>
                    <Table.Cell>{lesson.lessonName}</Table.Cell>
                    <Table.Cell>{lesson.description}</Table.Cell>
                    <Table.Cell>{lesson.Teacher ? lesson.Teacher.User.name : "No Teacher"}</Table.Cell>
                    <Table.Cell><a target="_blank" rel="noopener noreferrer" href={lesson.lessonFile}>{lesson.lessonName}</a></Table.Cell>
                </Table.Row>
            )
        });
        return (
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Lesson Name</Table.HeaderCell>
                        <Table.HeaderCell>Lesson Description</Table.HeaderCell>
                        <Table.HeaderCell>Teacher Name</Table.HeaderCell>
                        <Table.HeaderCell>File</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {LessonRows}
                </Table.Body>
            </Table>
        )
    }
}

export default Lessons;