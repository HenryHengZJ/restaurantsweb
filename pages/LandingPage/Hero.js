import React from 'react';
import { Popover, PopoverBody, PopoverHeader ,Button, Row, Col, InputGroup, InputGroupAddon, FormGroup, Form, Label, Input, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import './styles.css'
import PropTypes from 'prop-types';
import Router from 'next/router'
import img from "../../assets/img"
import color from "../../assets/color"


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};


class Hero extends React.Component {
  constructor(props) {
    super(props);
  }

  getStarted = () => {
    Router.push(`/menudetail`, `/menudetail`)
  }


  render() {

    return (
      <section
        id="hero"
        style={{ height: 800, marginTop: -120, backgroundImage: 'url(' + img.welcome_pic + ')', backgroundSize: 'cover', }}
      >
       
          <Row style={{margin:0, marginTop: 200, display:'flex',}} >
            
            <Col style={{textAlign: 'center', color: 'white',}} xs="12">
              <h1 style={{fontSize: 60, letterSpacing: 2, fontWeight: 800}}>
                The Japanese Flavour
              </h1>
            </Col>

            <Col style={{textAlign: 'center', color: 'white',}} xs="12">
              <h2 style={{fontSize: 30, letterSpacing: 2, marginTop: 20,  fontWeight: 800}}>
                Home Delivery or Pickup
              </h2>
            </Col>


            <Col xs="12" style={{textAlign: 'center', marginTop: 20}}>
              <Row >
                <Col style={{padding: 0,}} xs="1" sm="1" md="4" lg="4"/>

                <Col style={{padding: 0,}} xs="10" sm="10" md="4" lg="4">
                 
                      <Button
                        onClick={e => this.getStarted()}
                        block
                        style={{
                          height: "100%",
                          fontWeight: 600,
                          color: 'white',
                          fontSize: 18,
                          borderRadius: 10,
                          backgroundColor: color.primary,
                          padding: 10
                        }}
                      >
                        ORDER NOW
                      </Button>
                   
                </Col>

                <Col style={{padding: 0,}} xs="1" sm="1" md="4" lg="4"/>
              </Row>
            </Col>
            
          </Row>
      </section>
    );
  }
};


Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
