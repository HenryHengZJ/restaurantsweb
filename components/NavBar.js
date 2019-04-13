import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler} from 'reactstrap';
import './styles/navbar.css'
import PropTypes from 'prop-types';

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const {
      theme
    } = this.props;

    const backgroundColorVal = theme === 'dark' ? this.state.isOpen ? '#696969' : 'transparent' : 'rgba(211,211,211,0.3)' ;
    const boxShadowVal = theme === 'dark' ? 'none' : '0px 0px 3px #9E9E9E';
    const lightVal = theme === 'dark' ? false : true;
    const darkVal = theme === 'dark' ? true : false;
    const imgsrc = theme === 'dark' ? '/static/brandlogo_dark.png' : '/static/brandlogo_light.png';
    const colorVal = theme === 'dark' ? 'white' : null;

    return (
      <div>
        <Navbar style={{padding: 0, margin: 0, backgroundColor: backgroundColorVal, boxShadow: boxShadowVal}} light={lightVal} dark={darkVal} expand="md">
          <NavbarBrand style={{padding: 0, margin: 0,}} href="/">
            <img style={{objectFit: 'cover', height: 50, width: 160, marginLeft: 20, marginTop: 10}} src={imgsrc}/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink style={{ color: colorVal, fontWeight: '600', fontSize: 15, paddingLeft: 20, paddingRight: 20}} href="">About Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{ color: colorVal, fontWeight: '600', fontSize: 15, paddingLeft: 20, paddingRight: 20}} href= "" target="_blank">Contact</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={e => this.props.signIn(e)} style={{ cursor: 'pointer', color: colorVal, fontWeight: '600', fontSize: 15, paddingLeft: 20, paddingRight: 20}} target="_blank">Sign In</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
};

NavBar.propTypes = {
  theme: PropTypes.string,
};

export default NavBar;
