import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Image, Badge } from 'react-bootstrap';
import DropDownTitle from './DropDownTitle';
import CartDropdownHeader from '../cart/CartDropdownHeader';
import CartDropdownItem from '../cart/CartDropdownItem';
import Icofont from 'react-icofont';

class HeaderTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavExpanded: false
    };
  }
  setIsNavExpanded = isNavExpanded => {
    this.setState({ isNavExpanded: isNavExpanded });
  };
  closeMenu = () => {
    this.setState({ isNavExpanded: false });
  };

  handleClick = e => {
    if (this.node.contains(e.target)) {
      // if clicked inside menu do something
    } else {
      // If clicked outside menu, close the navbar.
      this.setState({ isNavExpanded: false });
    }
  };

  handleLogout() {
    console.log("localStorage.getItem('loggedInUserId'): " + localStorage.getItem('loggedInUserId'));
    localStorage.clear();
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  render() {
    return (
      <div ref={node => (this.node = node)}>
        <Navbar
          onToggle={this.setIsNavExpanded}
          expanded={this.state.isNavExpanded}
          color='light'
          expand='lg'
          className='navbar-light osahan-nav shadow-sm'
        >
          <Container>
            <Navbar.Brand to='/'>
              <Image src='/img/logo.png' alt='' />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id='navbarNavDropdown'>
              <Nav activeKey={0} className='ml-auto' onSelect={this.closeMenu}>
                <Nav.Link eventKey={0} as={NavLink} activeclassname='active' exact to='/'>
                  Home <span className='sr-only'>(current)</span>
                </Nav.Link>
                <Nav.Link eventKey={1} as={NavLink} activeclassname='active' to='/offers'>
                  <Icofont icon='sale-discount' /> Offers <Badge variant='danger'>New</Badge>
                </Nav.Link>
                <Nav.Link as={NavLink} activeclassname='active' to='/restaurants'>
                  <Icofont /> Restaurants
                </Nav.Link>
                <NavDropdown title='Login / Register' alignRight>
                  <NavDropdown.Item eventKey={3.3} as={NavLink} activeclassname='active' to='/login'>
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey={3.4} as={NavLink} activeclassname='active' to='/register'>
                    Register
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default HeaderTwo;
