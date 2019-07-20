import React from 'react';
import { Popover, PopoverBody, PopoverHeader ,Button, Row, Col, InputGroup, InputGroupAddon, FormGroup, Form, Label, Input, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import './styles.css'
import AutoCompleteAddress from '../../components/AutoCompleteAddress'
import PropTypes from 'prop-types';
import Router from 'next/router'
import img from "../../assets/img"

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};


class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      address: "",
      searchAddressInvalid: false,
    }
  }

  toggle() {
    this.setState({
      searchAddressInvalid: false
    });
  }


  searchAddress = (e, address) => {
    e.preventDefault()
   // console.log(address)
   // alert(address.address_components[1].long_name)
    if (address === "" || typeof address === 'undefined' || address === null)  {
      this.setState({
        searchAddressInvalid: true
      })
    }
    else if (address != "") {
       
      var city = address.address_components[1].long_name
      var formatted_address = address.formatted_address
      var longitude = address.geometry.location.lng()
      var latitude = address.geometry.location.lat()
      this.setState({
        address: ""
      }, () => {
        var selectedAddress = {
          formatted_address: formatted_address,
          longitude: address.geometry.location.lng(),
          latitude: address.geometry.location.lat()
        }
        sessionStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
        Router.push(`/searchcaterer?location=${formatted_address}&longitude=${longitude}&latitude=${latitude}`, `/searchcaterer?location=${formatted_address}&longitude=${longitude}&latitude=${latitude}`)
      })
    }
    else {
      var longitude = "-8.630498"
      var latitude = "52.6638"
      this.setState({
        address: ""
      }, () => {
        var selectedAddress = {
          formatted_address: "County%20Limerick",
          longitude:  "-8.630498",
          latitude: "52.6638"
        }
        sessionStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
        Router.push(`/searchcaterer?location=County%20Limerick&longitude=${longitude}&latitude=${latitude}`, `/searchcaterer?location=County%20Limerick&longitude=${longitude}&latitude=${latitude}`)
      })
    }
    
  }

  showPlaceDetails(address) {
    this.setState({ address, searchAddressInvalid: false });
  }

  render() {
    return (
      <section
        id="hero"
        style={{ height: 600, marginTop: -70, backgroundImage: 'url(' + img.corporate_lunch2 + ')', backgroundSize: 'cover'}}
      >
          <Row style={{margin:0, marginTop: 150, display:'flex',}} >
            
            <Col style={{textAlign: 'center', color: 'white',}} xs="12">
              <h1 style={{fontSize: 40}}>
                All you need for corporates catering
              </h1>
            </Col>

            <Col style={{textAlign: 'center', color: 'white',}} xs="12">
              <p style={{fontSize: 18, letterSpacing: 2, marginTop: 20}} className="big">
                Order catering from wide variety of restaurants and pubs nationwide.
              </p>
            </Col>

            <Col style={{textAlign: 'center', }} xs="12">
              <Label className="h6" style={{ letterSpacing: 2, color: 'white', fontSize: 15, marginTop: 40}} >Delivery Address</Label>
            </Col>

            <Col style={{textAlign: 'center'}} xs="12">
              <Row >
                <Col style={{padding: 0,}} xs="1" sm="1" md="3" lg="3"/>
                <Col style={{padding: 0,}} xs="10" sm="10" md="6" lg="6">
                  <InputGroup id="Popover">

                      <AutoCompleteAddress 
                        borderTopRightRadius={0}
                        borderBottomRightRadius = {0}
                        borderTopLeftRadius={5}
                        borderBottomLeftRadius={5}
                        borderColor = 'transparent'
                        paddingLeft = {20}
                        paddingRight = {20}
                        paddingTop = {10}
                        paddingBottom = {10}
                        fontSize = {16}
                        color = 'black'
                        onPlaceChanged={this.showPlaceDetails.bind(this)} />     

                      <InputGroupAddon addonType="prepend">
                        <Button onClick={e => this.searchAddress(e, this.state.address)} block style={{height: '100%', fontWeight: '600', borderTopRightRadius: 5, borderBottomRightRadius: 5,}} className="bg-primary" color="primary">SEARCH</Button>
                      </InputGroupAddon>
                  </InputGroup>
                  
                </Col>

                <Col style={{padding: 0,}} xs="1" sm="1" md="3" lg="3"/>
              </Row>
            </Col>

            <Popover placement="bottom-start" isOpen={this.state.searchAddressInvalid} target="Popover" toggle={this.toggle}>
              <PopoverHeader style={{color: 'red'}}>Invalid Address</PopoverHeader>
              <PopoverBody>Please search for a valid address</PopoverBody>
            </Popover>
            
          </Row>
      </section>
    );
  }
};


Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
