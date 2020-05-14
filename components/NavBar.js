import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavDropdown, NavbarToggler, Button,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Label} from 'reactstrap';
import './styles/navbar.css'
import PropTypes from 'prop-types';
import Router from 'next/router'
import axios from 'axios';
import apis from "../apis";
import color from "../assets/color"
import Cookies from 'js-cookie';
import {server} from "../config"

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      dropDown: false,
      userName: "",
    };
  }

  componentDidMount() {

    if (typeof Cookies.get('userName') !== 'undefined') {
      this.setState({
        userName: Cookies.get('userName'),
      })
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleDropDown = () => {
    this.setState({
      dropDown: !this.state.dropDown
    });
  }

  navItemClicked = (selectedMenu) => {
    if(selectedMenu === "Log Out") {
     
      var headers = {
        'Content-Type': 'application/json',
      }
  
      var url = apis.GETcustomerlogout;
     
      axios.get(url, {withCredentials: true}, {headers: headers})
        .then((response) => {
          if (response.status === 200) {
            //Router.push(`/`)
            window.location.assign(`${server}`);
          }
        })
        .catch((error) => {

        });
      
    }
    else {
      Router.push(`/userprofile/${selectedMenu}`, `/userprofile/${selectedMenu}`)
    }
  };

  render() {
    const {
      theme,
    } = this.props;

    const backgroundColorVal = theme === 'dark' ? this.state.isOpen ? '#696969' : 'transparent' : 'white' ;
    const boxShadowVal = theme === 'dark' ? 'none' : '0px 0px 3px #9E9E9E';
    const lightVal = theme === 'dark' ? false : true;
    const darkVal = theme === 'dark' ? true : false;
    const imgsrc = theme === 'dark' ? '/static/logo.png' : '/static/logo.png';
    const colorVal = theme === 'dark' ? 'white' : null;
    const userLoggedInVal = this.state.userName === "" ? false : true
    const isLandingPage = theme === 'dark' ? true : false;

    return (
      <div>
        <Navbar style={{padding: 0, margin: 0, backgroundColor: backgroundColorVal, boxShadow: boxShadowVal}} light={lightVal} dark={darkVal} expand="md">
          <NavbarBrand style={{padding: 0, margin: 0,}} href="/">
            <img style={{objectFit: 'cover', height: 100, width: 100, marginLeft: 20, marginTop: 10, marginBottom: 10}} src={imgsrc} alt="Restaurant Logo"/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

              <NavItem>
                <NavLink href={!isLandingPage ? "/" : null} onClick={e => !isLandingPage ? null : this.props.aboutUsClicked(e)} style={{ cursor: 'pointer', color: colorVal, fontWeight: '600', fontSize: 18, paddingLeft: 20, paddingRight: 20}}>About</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href={!isLandingPage ? "/" : null} onClick={e => !isLandingPage ? null : this.props.menuClicked(e)} style={{ cursor: 'pointer', color: colorVal, fontWeight: '600', fontSize: 18, paddingLeft: 20, paddingRight: 20}}>Menu</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href={!isLandingPage ? "/" : null} onClick={e => !isLandingPage ? null : this.props.contactClicked(e)} style={{ cursor: 'pointer', color: colorVal, fontWeight: '600', fontSize: 18, paddingLeft: 20, paddingRight: 20}}>Contact</NavLink>
              </NavItem>
            
              {userLoggedInVal ?
              <NavItem>
                <UncontrolledDropdown isOpen={this.state.dropDown}  toggle={() => this.toggleDropDown()}>
                  <DropdownToggle
                    style={{
                      color: theme === 'dark' ? "white" : "rgba(0,0,0, 0.5)",
                      borderWidth: 0,
                      marginRight:10,
                      backgroundColor: "transparent",
                    }}
                    caret
                  >
                  <Label style={{ paddingLeft: this.state.isOpen ? 8 : 0, fontWeight: '500', cursor: 'pointer', paddingRight: 5, paddingTop:2, fontSize: 18, color: colorVal, margin : 0, }}>{this.state.userName}</Label> 
                  </DropdownToggle>
                  <DropdownMenu right style={{ right: 0, left: 'auto' }}>
                    <DropdownItem href="/userprofile/Account Info" onClick={() => this.navItemClicked("Account Info")}>Account Info</DropdownItem>
                    <DropdownItem onClick={() => this.navItemClicked("Orders")}>Orders</DropdownItem>
                    <DropdownItem onClick={() => this.navItemClicked("Address")}>Address</DropdownItem>
                    <DropdownItem onClick={() => this.navItemClicked("Payment Methods")}>Payment Methods</DropdownItem>
                    <DropdownItem onClick={() => this.navItemClicked("Log Out")}>Log Out</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              : null}

                
              <NavItem >
                
                <NavLink href="/menudetail" style={{ marginRight: 20, marginLeft: 10, cursor: 'pointer', color: "white", fontWeight: '600', fontSize: 18, paddingLeft: 10, paddingRight: 10, backgroundColor: color.primary, borderRadius: 5}}>Order Now</NavLink>
                
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
