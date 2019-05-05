import React, {Component} from 'react';
import './HomePage.css'
import {Header, Icon, Divider, Grid, Image} from 'semantic-ui-react';

class HomePage extends Component{
    render(){
        return (
            <div>
                <Header className='homepage-header' as='h2' icon textAlign='center'>
                    <Icon name='graduation' circular />
                    <Header.Content>Dunhill School System</Header.Content>
                </Header>

                <Header className='homepage-sub-header' textAlign='center'>
                    A learning management system for students and teachers.
                </Header>

                <div style={{margin: '0 auto', width: '600px'}}>
                    <Divider />
                </div>

                <Grid style={{marginTop: '50px'}} columns={4} centered divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='building' circular />
                                <Header.Content>Campus Life</Header.Content>
                            </Header>
                            {/*<Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />*/}
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='certificate' circular />
                                <Header.Content>Admissions</Header.Content>
                            </Header>
                            {/*<Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />*/}
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='flag checkered' circular />
                                <Header.Content>Athletics</Header.Content>
                            </Header>
                            {/*<Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />*/}
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='newspaper' circular />
                                <Header.Content>News & Events</Header.Content>
                            </Header>
                            {/*<Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />*/}
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='phone' circular />
                                <Header.Content>Contact Us</Header.Content>
                            </Header>
                            {/*<Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />*/}
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='user' circular />
                                <Header.Content>Parents</Header.Content>
                            </Header>
                            {/*<Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />*/}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                {/*<Image centered size='large' src='/images/wireframe/centered-paragraph.png' />*/}
            </div>
        )
    }
}

export default HomePage;