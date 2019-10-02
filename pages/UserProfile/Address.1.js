import React, { Component } from 'react';
import  Link  from 'next/link';
import Head from 'next/head';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardGroup,
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
    UncontrolledDropdown,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink,
    Table,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Collapse,
    Badge,
  } from "reactstrap";
  
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Router from 'next/router'
import axios from "axios";
import apis from "../../apis";
import {server} from "../../config"
import {listCounties} from "../../utils"

const closeIcon = '/static/close.png';

class Address1 extends Component {

  constructor(props) {
    super(props);

    this.handleAddress1 = this.handleAddress1.bind(this);
    this.handleAddress2 = this.handleAddress2.bind(this);
    this.handleAddress3 = this.handleAddress3.bind(this);
    this.handleCounty = this.handleCounty.bind(this);
    this.handleCity = this.handleCity.bind(this);

    this.CountyData = listCounties();

    this.state = {
        address1: "",
        isAddressEmpty: false,
        address2: "",
        address3: "",
        county: "",
        city: "",
        isAddressButtonActive: false,
        deliveryAddressModalOpen: false,
        deliveryaddresses: [],
        error: false,
    };
  }


  componentDidMount() {
     this.getCustomerDeliveryAddress()
  }

  getCustomerDeliveryAddress = () => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETcustomerprofile;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            deliveryaddresses: response.data[0].customerDeliveryAddress,
          })
        } 
      })
      .catch((error) => {
        this.setState({
          error: true
        })
      });
  }

  handleAddress1(e) {
    this.setState(
      {
        address1: e.target.value,
      },
      () => {
        this.checkAddressInput();
      }
    );
  }

  handleAddress2(e) {
    this.setState(
      { 
        address2: e.target.value   
      })
  }

  handleAddress3(e) {
    this.setState(
      { 
        address3: e.target.value 
      })
  }

  handleCounty(e) {
    this.setState(
      { 
        county: e.target.value 
      },
      () => {
        this.checkAddressInput();
      })
  }

  handleCity(e) {
    this.setState(
      { 
        city: e.target.value 
      },
      () => {
        this.checkAddressInput();
      })
  }

  deleteAddress = (index) => {

    var customerDeliveryAddress = this.state.deliveryaddresses.slice()
    customerDeliveryAddress.splice(index, 1);

    var headers = {
      'Content-Type': 'application/json',
    }

    var body = {
      customerDeliveryAddress: customerDeliveryAddress,
    }

    var url = apis.UPDATEcustomerprofile;

    axios.put(url, body, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 201) {
          this.getCustomerDeliveryAddress()
        } 
      })
      .catch((error) => {
        if (error) {
          this.setState({
            error: true
          })
        } 
      }); 
  }

  makeDefaultAddress = (index) => {

    var customerDeliveryAddress = this.state.deliveryaddresses.slice()

    for (let i = 0; i < customerDeliveryAddress.length; i++) {
      if (i === index) {
        customerDeliveryAddress[i].default = true
      }
      else {
        customerDeliveryAddress[i].default = false
      }
    }

    var headers = {
      'Content-Type': 'application/json',
    }

    var body = {
      customerDeliveryAddress: customerDeliveryAddress,
    }

    var url = apis.UPDATEcustomerprofile;

    axios.put(url, body, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 201) {
          this.getCustomerDeliveryAddress()
        } 
      })
      .catch((error) => {
        if (error) {
          this.setState({
            error: true
          })
        } 
      }); 
  }

  checkAddressInput = () => {
    const {
      address1,
      county,
      city,
    } = this.state;

    if (address1 !== "" && county !== "" && city !== "") {
      this.setState({ isAddressButtonActive: true });
    }
    else {
      this.setState({ isAddressButtonActive: false });
    }
  }

  addNewAddressClick = () => {
    this.setState(
      { 
        address1: "",
        address2: "",
        address3: "",
        county: "",
        city: "",
        isAddressButtonActive: false,
      }
    , () => {
      this.toggleDeliveryAddressModal()
    })
  }

  selectDeliveryAddress = (index) => {
    var selectedAddress = this.state.deliveryaddresses[index];
    this.setState(
      { 
        address1: typeof selectedAddress.address1 !== 'undefined' ? selectedAddress.address1 : "",
        address2: typeof selectedAddress.address2 !== 'undefined' ? selectedAddress.address2 : "",
        address3: typeof selectedAddress.address3 !== 'undefined' ? selectedAddress.address3 : "",
        county: typeof selectedAddress.county !== 'undefined' ? selectedAddress.county : "",
        city: typeof selectedAddress.city !== 'undefined' ? selectedAddress.city : "",
        isAddressButtonActive: true,
      }
    , () => {
      this.toggleDeliveryAddressModal()
    })
  }

  onUpdateClick = () => {
    const {
      address1,
      address2,
      address3,
      county,
      city,
    } = this.state;

    this.setState({
      isAddressButtonActive: false,
    })
    
    var headers = {
      'Content-Type': 'application/json',
    }

    var newData = {
      address1: address1,
      city: city,
      county: county,
    }

    if (address2 !== "") {
      newData.address2 = address2
    }

    if (address3 !== "") {
      newData.address3 = address3
    }

    var customerDeliveryAddress = this.state.deliveryaddresses.slice()
    customerDeliveryAddress.push(newData)

    var body = {
      customerDeliveryAddress: customerDeliveryAddress,
    }

    var url = apis.UPDATEcustomerprofile;

    axios.put(url, body, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 201) {
          this.setState({
            isAddressButtonActive: true,
          }, () => {
            this.toggleDeliveryAddressModal()
            this.getCustomerDeliveryAddress()
          })
        } 
      })
      .catch((error) => {
        if (error) {
          this.setState({
            isAddressButtonActive: true,
            error: true
          }, () => {
            this.toggleDeliveryAddressModal()
          })
        } 
      }); 
 
  }
  
  toggleDeliveryAddressModal = () => {
    this.setState({
      deliveryAddressModalOpen: !this.state.deliveryAddressModalOpen,
    });
  }

  renderDeliveryAddressModal() {
    return(
      <Modal isOpen={this.state.deliveryAddressModalOpen} toggle={() => this.toggleDeliveryAddressModal()}>
     
        <ModalBody>
          <Card style={{boxShadow: 'none', borderWidth: 0}}>
          <CardBody>
            <Form>
              <h2>Delivery Address</h2>
              <div style={{ marginTop: 30 }} />
              <FormGroup style={{ marginTop: 10 }}>
                <h6>Address*</h6>
                <Input
                  style={{ color: "black" }}
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
                  style={{ marginTop: 10, color: "black" }}
                  type="text"
                  placeholder="Address line 2 (optional)"
                  autoComplete="address2"
                />
                <Input
                  value={this.state.address3}
                  onChange={e => this.handleAddress3(e)}
                  style={{ marginTop: 10, color: "black" }}
                  type="text"
                  placeholder="Address line 3 (optional)"
                  autoComplete="address3"
                />
              </FormGroup>
              <FormGroup style={{ marginTop: 10 }}>
                <h6>City *</h6>
                <Input
                  value={this.state.city}
                  onChange={e => this.handleCity(e)}
                  style={{ marginTop: 10, color: "black" }}
                  type="text"
                  placeholder="City"
                  autoComplete="city"
                />
              </FormGroup>
              <FormGroup style={{ marginTop: 10 }}>
                <h6>Town / County*</h6>
                <Input
                  style={{ color: this.state.county !== "" ? "black" : null }}
                  value={this.state.county}
                  onChange={e => this.handleCounty(e)}
                  type="select"
                  placeholder="County"
                  autoComplete="county"
                >
                  <option value="" disabled>
                    Select County
                  </option>
                  {this.CountyData.map(county => (
                    <option
                      style={{ color: "black" }}
                      key={county}
                      value={county}
                    >
                      {county}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <Button
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  marginTop: 20,
                  color: "white"
                }}
                color="success"
                block
                onClick={() => this.onUpdateClick()}
                disabled={this.state.isAddressButtonActive ? false : true}
              >
                Save Changes
              </Button>
            </Form>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
    )
  }

  renderAddressesItem() {
    var itemsarray = [];

    var deliveryaddresses = this.state.deliveryaddresses

    for (let i = 0; i < deliveryaddresses.length; i++) {
      itemsarray.push(
        <Col xs="12" md="4">
        <Card  style={{marginBottom: 40, boxShadow: '1px 1px 3px #9E9E9E'}}  className="p-4">

          <CardBody style={{margin:0, padding:0, }} >

            <div>
              <b>{deliveryaddresses[i].city}, {deliveryaddresses[i].county}</b>

              <div onClick={() => this.deleteAddress(i)} className="card-header-actions">
                <img
                  style={{
                    height: 12,
                    width: 12,
                    objectFit: "cover",
                    cursor: 'pointer'
                  }}
                  src={closeIcon}
                  alt=""
                />
              </div>
            </div>


            <div style={{marginTop: 20}}><Label>{deliveryaddresses[i].address1}</Label></div>

            <div style={{marginTop: 5}}><Label>{deliveryaddresses[i].address2}</Label></div>

            {typeof deliveryaddresses[i].address3 !=='undefined' ? <div style={{marginTop: 5}}><Label>{deliveryaddresses[i].address3}</Label></div> : null }

            <Row>
              <Col xs="6">
                <Button  onClick={() => this.makeDefaultAddress(i)} style={{marginTop: 20, paddingTop:10, paddingBottom: 10, fontWeight: '600'}} outline={deliveryaddresses[i].default ? false:true} color="success" block>{deliveryaddresses[i].default ? "Default" : "Make Default"}</Button>
              </Col>
              <Col xs="6">
                <Button onClick={() => this.selectDeliveryAddress(i)} style={{marginTop: 20, paddingTop:10, paddingBottom: 10, fontWeight: '600'}} outline color="primary" block>Edit</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        </Col>
      )
    }

    return (
      <Row>
        {itemsarray}
        {this.state.error ?
          <Col xs="12">
            <Label style={{color: 'red', fontSize: 13, marginBottom: 20}}>Error updating. Please try again</Label>
          </Col>
          : null}
        <Col xs="12">
          <Button onClick={() => this.addNewAddressClick()} style={{paddingTop:10, paddingBottom: 10}} color="primary" >Add Delivery Address</Button>
        </Col>
      </Row>
    ); 
  }

  render() {
    return (
     <Row style={{flex: 1, display: 'flex'}} >
        <Col style={{  paddingLeft:40, marginTop: 10, marginBottom: 20 }} xs="12">
          <b className="h5">Delivery Addresses</b>
        </Col>
        <Col xs="12">
          <Card  style={{boxShadow: 'none', borderWidth: 0}} >
            <CardBody >
              <Form>
                {this.renderAddressesItem()}
              </Form>
            </CardBody>
          </Card>
        </Col>
        {this.renderDeliveryAddressModal()}
      </Row>
    );
  }
}

export default Address1;
