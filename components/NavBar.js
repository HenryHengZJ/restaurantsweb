import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavDropdown, NavbarToggler, Button,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Label} from 'reactstrap';
import './styles/navbar.css'
import PropTypes from 'prop-types';
import Router from 'next/router'
import axios from 'axios';
import apis from "../apis";
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
      signInHide: false,
      goCateringHover: this.props.catering === true ? true : false,
      goLunchHover: this.props.catering === false ? true : false,
      aboutUsHover: false,
      contactUsHover: false,
      signInHover: false,
      catererSignInHover: false,
      userNameHover: false,
    };
  }

  componentDidMount() {

    this.setState({
      signInHide: typeof this.props.signInHide !== 'undefined' ? this.props.signInHide : false
    })

    if (typeof Cookies.get('userName') !== 'undefined') {
    //  alert(Cookies.get('userName'))
      this.setState({
        userName: Cookies.get('userName'),
        signInHide: true
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

  goLunchClicked = (event) => {
    event.preventDefault();
    Router.push(`/`)
  }

  goCateringClicked = (event) => {
    event.preventDefault();
    Router.push(`/catering`)
  }

  aboutUsClicked = () => {
    Router.push(`/aboutus`)
  }

  contactUsClicked = () => {
    Router.push(`/contactus`)
  }

  toggleHover = (navitem) => {
    this.setState({[navitem]: !this.state[navitem]})
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
      catererSignInVisible,
      catering,
      landingpage,
    } = this.props;

    const backgroundColorVal = theme === 'dark' ? this.state.isOpen ? '#696969' : 'transparent' : 'rgba(211,211,211,0.3)' ;
    const boxShadowVal = theme === 'dark' ? 'none' : '0px 0px 3px #9E9E9E';
    const lightVal = theme === 'dark' ? false : true;
    const darkVal = theme === 'dark' ? true : false;
    const imgsrc = theme === 'dark' ? '/static/brandlogo_dark.png' : '/static/brandlogo_light.png';
    const colorVal = theme === 'dark' ? 'white' : null;
    const userLoggedInVal = this.state.userName === "" ? false : true
    const cateringVal = catering ? catering : false
    const landingpageVal = landingpage ? landingpage : false

    return (
      <div>
        <Navbar style={{padding: 0, margin: 0, backgroundColor: backgroundColorVal, boxShadow: boxShadowVal}} light={lightVal} dark={darkVal} expand="md">
          <NavbarBrand style={{padding: 0, margin: 0,}} href="/">
            <img style={{objectFit: 'cover', height: 50, width: 160, marginLeft: 20, marginTop: 10}} src={imgsrc} alt="FoodieBee Logo"/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

             
              <NavItem >
                
                <NavLink href="/" onClick={e => this.goLunchClicked(e)} style={{ marginLeft: 10, cursor: 'pointer', color: theme === "dark" ? "white" : null, fontWeight: '600', fontSize: 15, paddingLeft: 10, paddingRight: 10, backgroundColor: this.state.isOpen ? "transparent" : this.state.goLunchHover ? "#20a8d8" : "transparent", borderRadius: 5}} target="_blank">Go Lunch</NavLink>
                
              </NavItem>
              
              <NavItem>
             
                <NavLink href="/catering" onClick={e => this.goCateringClicked(e)} style={{ marginLeft: 10,cursor: 'pointer', color: theme === "dark" ? "white" : null, fontWeight: '600', fontSize: 15, paddingLeft: 10, paddingRight: 10, backgroundColor: this.state.isOpen ? "transparent" : this.state.goCateringHover ? "#20a8d8" : "transparent", borderRadius: 5}} target="_blank">Go Catering</NavLink>
                
              </NavItem>
              

              <NavItem>
                <NavLink href="/aboutus" onClick={e => this.aboutUsClicked(e)} style={{ cursor: 'pointer', color: this.state.aboutUsHover ? "#20a8d8" : colorVal, fontWeight: '600', fontSize: 15, paddingLeft: 20, paddingRight: 20}} target="_blank">About Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contactus" onClick={e => this.contactUsClicked(e)} style={{ cursor: 'pointer', color: this.state.contactUsHover ? "#20a8d8" : colorVal, fontWeight: '600', fontSize: 15, paddingLeft: 20, paddingRight: 20}} target="_blank">Contact</NavLink>
              </NavItem>
              {!this.state.signInHide ?
              <NavItem>
                <NavLink href="/login" onClick={e => this.props.signIn(e)} style={{ cursor: 'pointer', color: this.state.signInHover ? "#20a8d8" : colorVal, fontWeight: '600', fontSize: 15, paddingLeft: 20, paddingRight: 20}} target="_blank">Sign In</NavLink>
              </NavItem>
              : null}
              {catererSignInVisible ?
              <NavItem>
                <NavLink href="https://caterer.foodiebee.eu" onClick={e => this.props.caterersignIn(e)} style={{ cursor: 'pointer', color: this.state.catererSignInHover ? "#20a8d8" : colorVal, fontWeight: '600', fontSize: 15, paddingLeft: 20, paddingRight: 20}} target="_blank">Caterer Sign In</NavLink>
              </NavItem>
              : null }
            
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
                  <Label style={{ paddingLeft: this.state.isOpen ? 8 : 0, fontWeight: '500', cursor: 'pointer', paddingRight: 5, paddingTop:2, fontSize: 15, color: this.state.userNameHover ? "#20a8d8" : colorVal, margin : 0, }}>{this.state.userName}</Label> 
                  </DropdownToggle>
                  <DropdownMenu right style={{ right: 0, left: 'auto' }}>
                    <DropdownItem href="/userprofile/Account Info" onClick={() => this.navItemClicked("Account Info")}>Account Info</DropdownItem>
                    <DropdownItem onClick={() => this.navItemClicked("Orders")}>Orders</DropdownItem>
                    <DropdownItem onClick={() => this.navItemClicked("Payment Methods")}>Payment Methods</DropdownItem>
                    <DropdownItem onClick={() => this.navItemClicked("Company Address")}>Company Address</DropdownItem>
                    <DropdownItem onClick={() => this.navItemClicked("Reviews")}>Reviews</DropdownItem>
                    <DropdownItem onClick={() => this.navItemClicked("Log Out")}>Log Out</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              : null}

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
};

NavBar.propTypes = {
  theme: PropTypes.string,
  signInHide: PropTypes.bool,
  catererSignInVisible: PropTypes.bool,
  catering: PropTypes.bool,
  landingpage: PropTypes.bool,
};

export default NavBar;
