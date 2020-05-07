import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Image, Badge } from 'react-bootstrap';
import DropDownTitle from '../common/DropDownTitle';
import CartDropdownHeader from '../cart/CartDropdownHeader';
import CartDropdownItem from '../cart/CartDropdownItem';
import Icofont from 'react-icofont';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavExpanded: false,
    };
  }
  setIsNavExpanded = (isNavExpanded) => {
    this.setState({ isNavExpanded: isNavExpanded });
  };
  closeMenu = () => {
    this.setState({ isNavExpanded: false });
  };

  handleClick = (e) => {
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
      <div ref={(node) => (this.node = node)}>
        <Navbar
          onToggle={this.setIsNavExpanded}
          expanded={this.state.isNavExpanded}
          color="light"
          expand="lg"
          className="navbar-light osahan-nav shadow-sm"
        >
          <Container>
            <Navbar.Brand to="/">
              <Image src="/img/KinKao.png" alt="" />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="navbarNavDropdown">
              <Nav activeKey={0} className="ml-auto" onSelect={this.closeMenu}>
                <Nav.Link eventKey={0} as={NavLink} activeclassname="active" exact to="/landing-page">
                  Home <span className="sr-only">(current)</span>
                </Nav.Link>
                <Nav.Link eventKey={1} as={NavLink} activeclassname="active" to="/offers">
                  <Icofont icon="sale-discount" /> Offers <Badge variant="danger">New</Badge>
                </Nav.Link>
                <Nav.Link as={NavLink} activeclassname="active" to="/restaurants">
                  <Icofont /> Restaurants
                </Nav.Link>
                <Nav.Link as={NavLink} activeclassname="active" to="/track-order">
                  <Icofont /> Current Order
                </Nav.Link>
                <Nav.Link as={NavLink} activeclassname="active" to="/checkout">
                  <Icofont /> Cart
                </Nav.Link>
                <NavDropdown
                  alignRight
                  title={
                    <DropDownTitle
                      className="d-inline-block"
                      image="img/user/4.png"
                      imageAlt="user"
                      imageClass="nav-osahan-pic rounded-pill"
                      title="My Account"
                    />
                  }
                >
                  <NavDropdown.Item eventKey={4.1} as={NavLink} activeclassname="active" to="/myaccount/orders">
                    <Icofont icon="food-cart" /> Past Orders
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item eventKey={4.2} as={NavLink} activeclassname="active" to="/myaccount/offers">
                    <Icofont icon="sale-discount" /> My Offers
                  </NavDropdown.Item> */}
                  {/* <NavDropdown.Item eventKey={4.3} as={NavLink} activeclassname='active' to='/myaccount/favourites'>
                    <Icofont icon='heart' /> Favourites
                  </NavDropdown.Item> */}
                  <NavDropdown.Item eventKey={4.4} as={NavLink} activeclassname="active" to="/myaccount/creditcards">
                    <Icofont icon="credit-card" /> Credit Cards
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey={4.5} as={NavLink} activeclassname="active" to="/myaccount/addresses">
                    <Icofont icon="location-pin" /> Addresses
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} onClick={this.handleLogout} to="/login">
                    <Icofont icon="logout" /> Logout
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

export default Header;
