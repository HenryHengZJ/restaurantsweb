import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Label,
  FormGroup,
  FormFeedback,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import Dotdotdot from "react-dotdotdot";
import ContentLoader, { Facebook } from "react-content-loader";
import Router from 'next/router'
import { Calendar } from "react-date-range";
import moment from "moment";
import axios from "axios";
import apis from "../../apis";
import {server} from "../../config"
import { timeRanges } from  "../../utils"
import { listCounties } from "../../utils";
import Cookies from 'js-cookie';
import color from "../../assets/color"
import PropTypes from 'prop-types';
import AutoCompleteAddress from '../../components/AutoCompleteAddress'

const propTypes = {
    children: PropTypes.node,
  };
  
const defaultProps = {};

class Address extends Component {

  constructor(props) {
    super(props);

    this.handleAddressName = this.handleAddressName.bind(this);

    this.state = {
      address: null,
      addressName: "",
      selectedLongitude: null,
      selectedLatitude: null,
      isAddressNameEmpty: false,
      selectedAddress: "",
      selectedAddressIndex: null,
      searchedAddressSelected: true,
      dropDownAddress: false,
      catererNotAvailable: false,
      isProceedAvailable: true,
    };
  }
  
  componentDidMount() {

    if (sessionStorage.getItem('selectedAddress')) {
      var selectedAddressJSON = JSON.parse(sessionStorage.getItem('selectedAddress'))
      this.setState({
        selectedAddress: selectedAddressJSON.formatted_address.replace("%20", " "),
        selectedLongitude: selectedAddressJSON.longitude,
        selectedLatitude: selectedAddressJSON.latitude,
      })
    }

    if (sessionStorage.getItem('selectedAddressName')) {
      this.setState({
        addressName: sessionStorage.getItem('selectedAddressName'),
      })
    }

  }

  handleAddressName(e) {
    this.setState({ addressName: e.target.value, isAddressNameEmpty: false });
    sessionStorage.setItem('selectedAddressName', e.target.value);
  }

  addressClicked = () => {

    if (this.state.addressName === "") {
      this.setState({
        isAddressNameEmpty: true
      })
    }
    else {
      var fulladdress = this.state.addressName + ", " + this.state.selectedAddress
      this.props.addressProceedClick(fulladdress)
    }
     
  };

  toggleDropDownAddress = () => {
    this.setState({
      dropDownAddress: !this.state.dropDownAddress
    })
  }

  saveAddress = () => {
    var address = this.state.address
    if (address !== null && address != "") {
      var formatted_address = address.formatted_address
      
      this.setState(
        { 
          selectedAddress: formatted_address, 
          dropDownAddress: false 
        }, () => {
          if (this.checkAvailability()) {
            var selectedAddress = {
              formatted_address: formatted_address,
              longitude: address.geometry.location.lng(),
              latitude: address.geometry.location.lat()
            }
            sessionStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
          }
        
        }
      );
    }
    
  }
 
  showPlaceDetails(address) {
    this.setState({ address });
  }

  checkAvailability = () => {
    var center_coordinates_longitude = this.props.location.coordinates[1]
    var center_coordinates_latitude = this.props.location.coordinates[0]

    var selected_longitude = this.state.address.geometry.location.lng()
    var selected_latitude = this.state.address.geometry.location.lat()

    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * center_coordinates_latitude / 180.0) * ky;
    var dx = Math.abs(center_coordinates_longitude - selected_longitude) * kx;
    var dy = Math.abs(center_coordinates_latitude - selected_latitude) * ky;

    if (Math.sqrt(dx * dx + dy * dy) <= 12) {
      this.setState({
        catererNotAvailable: false,
        isProceedAvailable: true
      })
      return true
    }
    else {
      this.setState({
        catererNotAvailable: true,
        isProceedAvailable: false
      })
      this.props.disabledTimeDatePayment()
      return false
    }
  }


  renderNewAddress() {
    return (
      <Form style={{ marginTop: 20 }}>

        <FormGroup style={{ marginTop: 10 }}>
          <h6>Address</h6>
        
            <AutoCompleteAddress 
              borderRadius = {5}
              borderColor = 'rgba(211,211,211, 0.5)'
              paddingLeft = {10}
              paddingRight = {10}
              paddingTop = {5}
              paddingBottom = {5}
              fontSize = {15}
              color = 'black'
              height = {40}
              onPlaceChanged={this.showPlaceDetails.bind(this)} />
               
        </FormGroup>
      </Form>
    );
  }

  render() {
    return (
        <Row>
        <Col xs="12" md="10">
          <Card style={{ boxShadow: "1px 1px 3px #9E9E9E" }} className="p-4">
            <CardBody className="p-4">
              <Row>
                <Col xs="12">
                  <h5>Delivery Address</h5>
                </Col>

                <Col xs="12">
                  {this.renderNewAddress()}
                </Col>

               </Row>
               {this.state.catererNotAvailable ?
                <p style={{color:'red', marginTop: 10, fontSize: 14}}>
                    * Caterer is not available within the location provided. *
                </p>
                :
                null}
              <Button
                style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginTop: 20,
                    backgroundColor: color.secondaryLight,
                    color: 'white',
                    fontWeight: '600',
                    fontSize: 16
                }}
                className="float-right"
                disabled={this.state.isProceedAvailable ? false : true}
                onClick={() => this.addressClicked()}
                >
                Continue to CheckOut
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col xs="0" md="2"></Col>
      </Row>
    );
  }
}

Payment.propTypes = propTypes;
Payment.defaultProps = defaultProps;

export default Address;
