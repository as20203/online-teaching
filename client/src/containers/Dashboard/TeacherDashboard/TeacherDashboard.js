import React, { Component } from 'react'
import { Button, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import {Link,Switch,Route} from 'react-router-dom'
import Profile from '../../Profile/Profile'
import './TeacherDashboard.css';
import CreateLesson from '../../Lesson/CreateLesson';

class TeacherDashboard extends Component{
    state = { visible: false };

    handleHideClick = () => this.setState({ visible: false });
    handleShowClick = () => this.setState({ visible: true });
    handleSidebarHide = () => this.setState({ visible: false });

    render() {
        const { visible } = this.state;
        return (
            <div>
                <Button secondary={true} style={{margin:'5px',padding:'15px'}} icon disabled={visible}  onClick={this.handleShowClick}>
                    <Icon name='bars' />
                </Button>

                <Sidebar.Pushable as={Segment} style={{height:'150vh',margin:'0px'}}>
                <Sidebar
                    as={Menu}
                    animation='push'
                    icon='labeled'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={visible}
                    width='thin'
                >
                    <Menu.Item as={Link} to="/dashboard/profile">
                        <Icon name='user' />
                        Profile
                    </Menu.Item>
                    <Menu.Item as={Link} to="/dashboard/create-lesson">
                        <Icon name='book' />
                         Create Lesson
                    </Menu.Item>
                    <Menu.Item as={Link} to="/" onClick={this.props.logoutHandler}>
                        <Icon name='external' />
                        Logout
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={visible}>
                    <Segment basic>
                        <Switch>
                            <Route exact path="/dashboard/profile" component={Profile} />
                            <Route exact path="/dashboard/create-lesson" component={CreateLesson} />
                        </Switch>
                    </Segment>
                </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    
    }
}

export default TeacherDashboard;