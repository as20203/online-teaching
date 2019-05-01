import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'; 

// import history from '../../history';
class Navbar extends Component {
  state = { activeItem: 'home'}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      
      <Menu inverted>
        <Menu.Item 
          name='home' 
          as={Link} 
          to="/" 
          active={activeItem === 'home'} 
          onClick={this.handleItemClick} 
        />
        <Menu.Item
          as={Link}
          to="/signup"
          name='Signup'
          active={activeItem === 'Signup'}
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
     
    
    )
  }
}

export default Navbar;
