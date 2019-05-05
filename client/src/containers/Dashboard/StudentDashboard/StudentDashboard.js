import React, { Component } from 'react';
import { Button, Icon,Menu, Segment, Sidebar } from 'semantic-ui-react';
import {Link,Switch,Route} from 'react-router-dom';
import './StudentDashboard.css';
import Profile from '../../Profile/Profile';
import Lessons from '../../Lesson/Lessons';
import history from '../../../history';
class StudentDashboard extends Component{
    componentDidMount(){
        history.push("/dashboard/lessons");
    }
   
    state = { visible: false };

    handleHideClick = () => this.setState({ visible: false });
    handleShowClick = () => this.setState({ visible: true });
    handleSidebarHide = () => this.setState({ visible: false });

    render() {
        const { visible } = this.state;
        return (
            <div>
                <Button secondary style={{margin:'5px',padding:'15px'}} icon disabled={visible}  onClick={this.handleShowClick}>
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
                    <Menu.Item as={Link} to="/dashboard/lessons">
                        <Icon name='book' />
                         View Lessons
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
                            <Route exact path="/dashboard/lessons" component={Lessons} />
                        </Switch>
                    </Segment>
                </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    
    }
}

export default StudentDashboard;