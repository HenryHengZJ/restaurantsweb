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
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node,
  };
  
const defaultProps = {};

class Address2 extends Component {

  constructor(props) {
    super(props);

    this.handleAddress1 = this.handleAddress1.bind(this);
    this.handleAddress2 = this.handleAddress2.bind(this);
    this.handleAddress3 = this.handleAddress3.bind(this);
    this.handleCounty = this.handleCounty.bind(this);

    this.state = {
      address1: "",
      isAddressEmpty: false,
      isCountyEmpty: false,
      address2: "",
      address3: "",
      county: "",
      addressType: "",
      deliveryaddresses: [
        {
          fulladdress: "301, the Windmill, Dock Road",
          county: "Limerick"
        },
        {
          fulladdress: "304, Harveys Quay",
          county: "Limerick"
        }
      ],
      searchedaddress: {
        fulladdress: "301, the Windmill, Dock Road",
        county: "Limerick"
      },
      selectedAddress: null,
      selectedAddressIndex: null,
      searchedAddressSelected: true,
    };

    this.CountyData = listCounties();

  }

  handleAddress1(e) {
    this.setState({ address1: e.target.value });
  }

  handleAddress2(e) {
    this.setState({ address2: e.target.value });
  }

  handleAddress3(e) {
    this.setState({ address3: e.target.value });
  }

  handleCounty(e) {
    this.setState({ county: e.target.value });
  }

  handleSelectedAddress = index => {
    var address = this.state.deliveryaddresses[index];
    this.setState({ selectedAddress: address, selectedAddressIndex: index, searchedAddressSelected: false });
  };

  handleSelectedSearchedAddress = () => {
    this.setState({ addressType: "", selectedAddress: this.state.searchedaddress, selectedAddressIndex: -1, searchedAddressSelected: true });
  };

  addressProceedClick = () => {
    if (this.state.addressType === "existing") {
      this.setState(
        {
          selectedMenu: "Payment"
        },
        () => {
          alert(JSON.stringify(this.state.selectedAddress));
        }
      );
    } else if (this.state.addressType === "new") {
      if (this.state.address1 !== "" && this.state.county !== "") {
        var fulladdress = this.state.address1;

        if (this.state.address2 !== "") {
          fulladdress = fulladdress + ", " + this.state.address2;
        }

        if (this.state.address3 !== "") {
          fulladdress = fulladdress + ", " + this.state.address3;
        }

        var county = this.state.county;
        var selectedAddress = {
          fulladdress: fulladdress,
          county: county
        };
        this.setState(
          {
            selectedAddress: selectedAddress,
            selectedMenu: "Payment"
          },
          () => {
            alert(JSON.stringify(this.state.selectedAddress));
          }
        );
      } else if (this.state.address1 === "") {
        this.setState({ isAddressEmpty: true });
      } else if (this.state.county === "") {
        this.setState({ isCountyEmpty: true });
      }
    }
  };


  renderSearchedAddress() {

    var searchedaddress = this.state.searchedaddress

    return (
      <Col style={{marginTop: 20}} xs="12" md="12">
        <Card
          onClick={() => this.handleSelectedSearchedAddress()}
          style={{
            borderColor: this.state.searchedAddressSelected ? "#20a8d8" : null,
            cursor: "pointer",
            boxShadow: this.state.searchedAddressSelected ? "1px 1px 3px #20a8d8" : "0px 0px 0px #9E9E9E"
          }}
          className="p-4"
        >
          <CardBody style={{ margin: 0, padding: 0 }}>
            <b>{searchedaddress.county}</b>
            <div style={{ marginTop: 10, marginBottom: 0 }}>
              <Label>{searchedaddress.fulladdress}</Label>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }


  renderExistingAddress() {
    var itemsarray = [];

    var deliveryaddresses = this.state.deliveryaddresses;

    for (let i = 0; i < deliveryaddresses.length; i++) {
      itemsarray.push(
        <Col xs="12" md="6">
          <Card
            onClick={() => this.handleSelectedAddress(i)}
            style={{
              borderColor:
                this.state.selectedAddressIndex === i ? "#20a8d8" : null,
              cursor: "pointer",
              boxShadow:
                this.state.selectedAddressIndex === i
                  ? "1px 1px 3px #20a8d8"
                  : "0px 0px 0px #9E9E9E"
            }}
            className="p-4"
          >
            <CardBody style={{ margin: 0, padding: 0 }}>
              <b>{deliveryaddresses[i].county}</b>
              <div style={{ marginTop: 10, marginBottom: 0 }}>
                <Label>{deliveryaddresses[i].fulladdress}</Label>
              </div>
            </CardBody>
          </Card>
        </Col>
      );
    }

    return (
      <Row style={{ marginTop: 30 }}>
        {itemsarray}
        <Col xs="12">
          <Button
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              marginTop: 20
            }}
            className="float-right"
            color="success"
            disabled={this.state.selectedAddress ? false : true}
            onClick={() => this.addressProceedClick()}
          >
            Proceed
          </Button>
        </Col>
      </Row>
    );
  }

  renderNewAddress() {
    return (
      <Form style={{ marginTop: 30 }}>
        <FormGroup style={{ marginTop: 10 }}>
          <h6>Deliver To</h6>
          <Input
            value={this.state.address1}
            onChange={e => this.handleAddress1(e)}
            type="text"
            placeholder="Address line 1"
            autoComplete="address1"
            invalid={this.state.isAddressEmpty ? true : false}
          />
          <FormFeedback className="help-block">
            Please enter your address
          </FormFeedback>
          <Input
            value={this.state.address2}
            onChange={e => this.handleAddress2(e)}
            style={{ marginTop: 10 }}
            type="text"
            placeholder="Address line 2 (optional)"
            autoComplete="address2"
          />
          <Input
            value={this.state.address3}
            onChange={e => this.handleAddress3(e)}
            style={{ marginTop: 10 }}
            type="text"
            placeholder="Address line 3 (optional)"
            autoComplete="address3"
          />
        </FormGroup>
        <FormGroup style={{ marginTop: 10 }}>
          <h6>Town / County*</h6>
          <Input
            value={this.state.county}
            onChange={e => this.handleCounty(e)}
            type="select"
            placeholder="County"
            autoComplete="county"
            invalid={this.state.isCountyEmpty ? true : false}
          >
            <option value="" disabled>
              Select County
            </option>
            {this.CountyData.map(county => (
              <option style={{ color: "black" }} key={county} value={county}>
                {county}
              </option>
            ))}
          </Input>
          <FormFeedback className="help-block">
            Please select county
          </FormFeedback>
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
                  <h5>Address</h5>
                </Col>

                {this.renderSearchedAddress()}

                <Col xs="12">
                  <h5>Or</h5>
                </Col>
             
                <Col>
                  <Button
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                      marginTop: 20
                    }}
                    outline={this.state.addressType === "new" ? false : true}
                    color="primary"
                    block
                    onClick={() => this.setState({ addressType: "new", searchedAddressSelected: false })}
                  >
                    New Address
                  </Button>
                </Col>
              </Row>
              <Collapse isOpen={true}>
                {this.state.addressType === "existing"
                  ? this.renderExistingAddress()
                  : this.state.addressType === "new"
                  ? this.renderNewAddress()
                  : null}
              </Collapse>
              <Button
                style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginTop: 30
                }}
                className="float-right"
                color="success"
                onClick={() => this.addressProceedClick()}
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

export default Address2;
