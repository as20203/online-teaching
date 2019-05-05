import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom'; 

class Navbar extends Component {
  state = { activeItem: 'home'};
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Segment >
        <Menu secondary >
          <Menu.Item
            name='home'
            as={Link}
            to="/"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/register"
            name='Register'
            active={activeItem === 'Register'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/login'
            name='Login'
            active={activeItem === 'Login'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    )
  }
}

export default Navbar;
