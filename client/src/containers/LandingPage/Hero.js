import React from 'react';
import corporate_lunch2 from '../../assets/img/corporate_lunch2.jpg';
import { Button, Row, Col, FormGroup, Form, Label, Input, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import './styles.css'
import AutoCompleteAddress from '../../components/AutoCompleteAddress/AutoCompleteAddress'
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};


class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
    }
  }

  showPlaceDetails(address) {
    this.setState({ address });
  }

  render() {
    return (
      <section
        id="hero"
        style={{ height: 600, marginTop: -70, backgroundImage: 'url(' + corporate_lunch2 + ')', backgroundSize: 'cover'}}
      >
          <Row style={{marginTop: 150, display:'flex',}} >
            
            <Col style={{textAlign: 'center', color: 'white',}} xs="12">
              <h2 style={{fontSize: 40}}>
                All you need for corporates catering
              </h2>
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
                <Col style={{padding: 0,}} xs="1" md="1" lg="3"/>
                <Col style={{padding: 0,}} xs="8" md="8" lg="5">
                  <AutoCompleteAddress 
                    borderRadius = {5}
                    borderColor = 'transparent'
                    paddingLeft = {20}
                    paddingRight = {20}
                    paddingTop = {10}
                    paddingBottom = {10}
                    fontSize = {16}
                    color = 'black'
                    onPlaceChanged={this.showPlaceDetails.bind(this)} />
                </Col>
                <Col style={{padding: 0,}} xs="2" md="2" lg="1">
                  <Button onClick={e => this.props.searchAddress(e)} block style={{height: '100%', fontWeight: '600', }} className="bg-primary" color="primary">SEARCH</Button>
                </Col>
                <Col style={{padding: 0,}} xs="1" md="1" lg="3"/>
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
