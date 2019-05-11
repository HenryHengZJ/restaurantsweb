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
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import { Calendar } from "react-date-range";
import moment from "moment";
import axios from "axios";
import apis from "../../apis";
import {server} from "../../config"


import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "../../utils";
import { inject, observer } from 'mobx-react'
import Cookies from 'js-cookie';

@inject('store')
@observer

class DeliveryConfirmation extends Component {

  static async getInitialProps({query: { id }}) {
    return {
      id: id,
    };
  }

  componentWillMount() {
    if (typeof this.props.id !== 'undefined') {
      console.log( this.props.id)
      this.setState({
        catererID: this.props.id,
       })
    }
  }

  constructor(props) {
    super(props);

    this.handleAddress1 = this.handleAddress1.bind(this);
    this.handleAddress2 = this.handleAddress2.bind(this);
    this.handleAddress3 = this.handleAddress3.bind(this);
    this.handleCounty = this.handleCounty.bind(this);
    this.handleNote = this.handleNote.bind(this);

    this.state = {
      userName: "",
      phoneNumber: "",
      isPhoneNumberEmpty: false,
      name: "",
      isNameEmpty: false,
      address1: "",
      isAddressEmpty: false,
      isCountyEmpty: false,
      address2: "",
      address3: "",
      county: "",
      note: "",
      isNextButtonActive: false,
      menutitle: ["Date & Time", "Address", "Payment"],
      selectedMenu: "Date & Time",
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
      paymentcards: [
        {
          cardnumber: "4356789045673333",
          cardholdername: "Ben Simmon",
          expiry: "09/20",
          cvc: "444"
        },
        {
          cardnumber: "41235678934561238",
          cardholdername: "Steven Chow",
          expiry: "01/23",
          cvc: "875"
        }
      ],
      paymentType: "",
      selectedTime: "",
      selectedDate: "",
      maxDate: null,
      dropDownDate: false,
      selectedAddress: null,
      selectedAddressIndex: null,
      cardnumber: "",
      cardholdername: "",
      expiry: "",
      cvc: "",
      issuer: "",
      focused: "",
      selectedPayment: null,
      selectedPaymentIndex: null,
      catererID: null,
      deliveryfee: null,
      fetchedmenu: null,
      cartToBeOrder: null,
      cartitem: null,
      orderType: null,
      cartloading: true
    };

    this.CountyData = ["Dublin", "Limerick", "Cork"];

    this.time = [
      {
        value: "07:00"
      },
      {
        value: "07:30"
      },
      {
        value: "08:00"
      }
    ];
  }

  componentDidMount() {

    if (typeof Cookies.get('userName') !== 'undefined') {
      this.setState({
        userName: Cookies.get('userName'),
      })
    }
  
    var currentDate = moment().toDate();
    this.setState({
      maxDate: currentDate,
    });
    this.getCatererDetail()
    this.getCatererMenu()
  }

  getCatererDetail= () => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETcatererprofile + "/" + this.state.catererID;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            deliveryfee: typeof response.data[0].deliveryfee !== 'undefined' ? response.data[0].deliveryfee : 0,
          })
        } 
      })
      .catch((error) => {
      });
  }

  getCatererMenu= () => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETmenu + "/" + this.state.catererID;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            fetchedmenu: response.data,
          },() => {
            this.getCustomerCart()
          })
        } 
      })
      .catch((error) => {
        this.getCustomerCart()
      });
  }

  getCustomerCart= () => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETcart + "?catererID=" + this.state.catererID;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            cartToBeOrder: response.data.length > 0 ? response.data : [],
            cartitem: response.data.length > 0 ? response.data[0].cartitem.length > 0 ? response.data[0].cartitem : [] : [],
            orderType: response.data.length > 0 ? typeof response.data[0].orderType !== 'undefined' ? response.data[0].orderType : "" : "",
            cartloading: false,
          })
        } 
      })
      .catch((error) => {
        this.getLocalStorage()
      });
  }

  
  getLocalStorage = () => {
    if (localStorage.getItem(this.state.catererID) !== null) {
      var localstoragecartitem = JSON.parse(localStorage.getItem(this.state.catererID));
      this.setState({
        cartitem: localstoragecartitem.cartitem,
        orderType: localstoragecartitem.orderType,
        cartloading: false
      })
    }
  }

  calculateCartTotalPrice = () => {
    const {cartitem, orderType, fetchedmenu, deliveryfee} = this.state
    var cartTotalPrice = 0;
    for (let i = 0; i < cartitem.length; i++) { 
      var index = fetchedmenu.findIndex(x => x._id===cartitem[i].menuID);
      if (index > 0) {
        var singlemenuprice = fetchedmenu[index].priceperunit
        var quantitychosen = cartitem[i].quantity
        cartTotalPrice =  cartTotalPrice + (quantitychosen * singlemenuprice);
      }
      else {
        cartTotalPrice =  cartTotalPrice;
      }
    }

    if (orderType === "delivery") {
      cartTotalPrice =  cartTotalPrice + deliveryfee
    }

    return (Number(cartTotalPrice).toFixed(2));
  }

  toggleDateDropDown = () => {
    this.setState({
      dropDownDate: !this.state.dropDownDate
    });
  };

  handleDateChange(date) {
    this.setState(
      {
        selectedDate: moment(date).format("DD MMM, YYYY")
      },
      () => {
        this.toggleDateDropDown();
      }
    );
  }

  handleTimeChange(e) {
    this.setState({
      selectedTime: e.target.value
    });
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

  handleNote(e) {
    this.setState({ note: e.target.value });
  }

  handleSelectedAddress = index => {
    var address = this.state.deliveryaddresses[index];
    this.setState({ selectedAddress: address, selectedAddressIndex: index });
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

  handleSelectedPayment = index => {
    var paymentcard = this.state.paymentcards[index];
    this.setState({
      selectedPayment: paymentcard,
      selectedPaymentIndex: index
    });
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "cardnumber") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handlePaymentSubmit = e => {
    e.preventDefault();
    const { issuer } = this.state;
    const paymentCard = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});
    this.setState({ selectedPayment: paymentCard });
  };

  paymentProceedClick = () => {
    const { selectedPayment } = this.state;
    alert(JSON.stringify(selectedPayment));
  };

  datetimeProceedClick = () => {
    const { selectedDate, selectedTime } = this.state;
    if (selectedDate !== "" && selectedTime !== "") {
      this.setState({
        selectedMenu: "Address"
      });
    }
  };

  signIn(e) {
    e.preventDefault()
    Router.push({
      pathname: '/login',
      query: {'returnurl': `/checkout/${this.state.catererID}`}
    })
  }

  logIn = (e) => {
    e.preventDefault()
    Router.push({
      pathname: '/login',
      query: {'returnurl': `/checkout/${this.state.catererID}`}
    })
  }

  signUp = (e) => {
    e.preventDefault()
    Router.push({
      pathname: '/register'
    })
  }

  navItemClicked = selectedMenu => {
    this.setState({
      selectedMenu: selectedMenu
    });
  };

  renderNavItem(menutitle) {
    return (
      <NavItem>
        <NavLink
          onClick={() => this.navItemClicked(menutitle)}
          style={{
            cursor: "pointer",
            paddingRight: 20,
            paddingLeft: menutitle === "Account Info" ? 0 : 20,
            fontWeight: "600",
            color: this.state.selectedMenu === menutitle ? "#20a8d8" : "black",
            fontSize: 15
          }}
        >
          {menutitle}
        </NavLink>
        <div
          style={{
            height: 2,
            width: "100%",
            backgroundColor:
              this.state.selectedMenu === menutitle ? "#20a8d8" : "transparent"
          }}
        />
      </NavItem>
    );
  }

  renderNewPayment() {
    return (
      <Row>
        <Col xs="12">
          <form
            style={{ marginTop: 30 }}
            ref={c => (this.form = c)}
            onSubmit={this.handlePaymentSubmit}
          >
            <div className="form-group">
              <input
                type="tel"
                name="cardnumber"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <small>E.g.: 49..., 51..., 36..., 37...</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="cardholdername"
                className="form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={this.state.issuer} />
            <div className="form-actions">
              <Button
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  marginTop: 30
                }}
                className="float-right"
                color="success"
              >
                Save & Place Order
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    );
  }

  renderPaymentCard() {
    var itemsarray = [];

    var paymentcards = this.state.paymentcards;

    for (let i = 0; i < paymentcards.length; i++) {
      itemsarray.push(
        <Col xs="12">
          <Card
            onClick={() => this.handleSelectedPayment(i)}
            style={{
              borderColor:
                this.state.selectedPaymentIndex === i ? "#20a8d8" : null,
              cursor: "pointer",
              boxShadow:
                this.state.selectedPaymentIndex === i
                  ? "1px 1px 3px #20a8d8"
                  : "1px 1px 3px #9E9E9E"
            }}
          >
            <CardBody style={{ margin: 0, padding: 0 }}>
              <img
                style={{
                  marginTop: 15,
                  marginLeft: 10,
                  objectFit: "cover",
                  width: 80,
                  height: 45
                }}
                src={"/static/visa.png"}
              />
              <div style={{ marginTop: 10 }}>
                <Table borderless responsive>
                  <tbody>
                    <tr>
                      <td>Cardholder name:</td>
                      <td className="h6">{paymentcards[i].cardholdername}</td>
                    </tr>
                    <tr>
                      <td>Card number</td>
                      <td className="h6">
                        &#9679;&#9679;&#9679;&#9679;{" "}
                        {paymentcards[i].cardnumber.slice(-4)}
                      </td>
                    </tr>
                    <tr>
                      <td>Expiration date:</td>
                      <td className="h6">{paymentcards[i].expiry}</td>
                    </tr>
                  </tbody>
                </Table>
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
            disabled={this.state.selectedPayment ? false : true}
            onClick={() => this.paymentProceedClick()}
          >
            Place Order
          </Button>
        </Col>
      </Row>
    );
  }

  renderPayment() {
    return (
      <Row>
        <Col xs="12" md="10">
          <Card style={{ boxShadow: "1px 1px 3px #9E9E9E" }} className="p-4">
            <CardBody className="p-4">
              <Row>
                <Col xs="12">
                  <h5>Payment</h5>
                </Col>

                <Col>
                  <Button
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                      marginTop: 20
                    }}
                    outline={
                      this.state.paymentType === "existing" ? false : true
                    }
                    color="primary"
                    block
                    onClick={() => this.setState({ paymentType: "existing" })}
                  >
                    Saved Payment
                  </Button>
                </Col>
                <Col>
                  <Button
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                      marginTop: 20
                    }}
                    outline={this.state.paymentType === "new" ? false : true}
                    color="primary"
                    block
                    onClick={() => this.setState({ paymentType: "new" })}
                  >
                    New Payment
                  </Button>
                </Col>
              </Row>
              <Collapse isOpen={true}>
                {this.state.paymentType === "existing"
                  ? this.renderPaymentCard()
                  : this.state.paymentType === "new"
                  ? this.renderNewPayment()
                  : null}
              </Collapse>
            </CardBody>
          </Card>
        </Col>
        <Col xs="0" md="2"></Col>
      </Row>
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
                  : "1px 1px 3px #9E9E9E"
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
        <Button
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: 20
          }}
          className="float-right"
          color="success"
          onClick={() => this.addressProceedClick()}
        >
          Save & Proceed
        </Button>
      </Form>
    );
  }

  renderAddress() {
    return (
      <Row>
        <Col xs="12" md="10">
          <Card style={{ boxShadow: "1px 1px 3px #9E9E9E" }} className="p-4">
            <CardBody className="p-4">
              <Row>
                <Col xs="12">
                  <h5>Address</h5>
                </Col>

                <Col>
                  <Button
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                      marginTop: 20
                    }}
                    outline={
                      this.state.addressType === "existing" ? false : true
                    }
                    color="primary"
                    block
                    onClick={() => this.setState({ addressType: "existing" })}
                  >
                    Saved Address
                  </Button>
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
                    onClick={() => this.setState({ addressType: "new" })}
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
            </CardBody>
          </Card>
        </Col>
        <Col xs="0" md="2"></Col>
      </Row>
    );
  }

  renderDateTime() {
    return (
      <Row>
        <Col xs="12" md="10">
          <Card style={{ boxShadow: "1px 1px 3px #9E9E9E" }} className="p-4">
            <CardBody className="p-4">
              <Form>
                <h5>Date & Time</h5>
                <div style={{ marginTop: 30 }} />
                <FormGroup style={{ marginTop: 10 }}>
                  <h6>Date</h6>
                  <UncontrolledDropdown
                    isOpen={this.state.dropDownDate}
                    toggle={() => this.toggleDateDropDown()}
                  >
                    <DropdownToggle
                      style={{
                        height: 40,
                        width: "100%",
                        color: "rgba(0,0,0, 0.5)",
                        borderColor: "rgba(211,211,211, 0.5)",
                        backgroundColor: "white"
                      }}
                      caret
                    >
                      <Label
                        style={{
                          cursor: "pointer",
                          fontSize: 15,
                          paddingLeft: 5,
                          textAlign: "start",
                          color:
                            this.state.selectedDate === "" ? "gray" : "black",
                          height: 12,
                          width: "98%"
                        }}
                      >
                        {this.state.selectedDate === ""
                          ? "Select Date"
                          : this.state.selectedDate}
                      </Label>
                    </DropdownToggle>
                    <DropdownMenu>
                      <div>
                        <Calendar
                          onChange={this.handleDateChange.bind(this)}
                          minDate={this.state.maxDate}
                        />
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </FormGroup>
                <FormGroup style={{ marginTop: 10 }}>
                  <h6>Time</h6>
                  <Input
                    value={this.state.selectedTime}
                    onChange={e => this.handleTimeChange(e)}
                    style={{
                      cursor: "pointer",
                      color: this.state.selectedTime === "" ? "gray" : "black",
                      fontSize: 15,
                      height: 40
                    }}
                    type="select"
                  >
                    <option value="" disabled>
                      Select Time
                    </option>
                    {this.time.map(time => (
                      <option
                        style={{ color: "black" }}
                        key={time.value}
                        value={time.value}
                      >
                        {time.value}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <Button
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginTop: 20
                  }}
                  className="float-right"
                  color="success"
                  onClick={() => this.datetimeProceedClick()}
                >
                  Proceed
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col xs="0" md="2"></Col>
      </Row>
    );
  }

  renderInvalidUser() {
    return (
      <Row>
        <Col xs="12" md="10">
          <Card style={{ boxShadow: "1px 1px 3px #9E9E9E" }} className="p-4">
            <CardBody className="p-4">
              <p>Login or Register on FoodieBee</p>
              <Row>
                <Col>
                  <Button
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                      marginTop: 20
                    }}
                    color="primary"
                    block
                    onClick={(e) => this.logIn(e)}
                  >
                    Login
                  </Button>
                </Col>
                <Col>
                  <Button
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                      marginTop: 20
                    }}
                    outline
                    color="primary"
                    block
                    onClick={(e) => this.signUp(e)}
                  >
                    Register
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xs="0" md="2"></Col>
      </Row>
    );
  }

  renderCartSelectionItem(selectionitem) {
    var itemstext = '';

    for (let i = 0; i < selectionitem.length; i++) {
      if (i == 0) {
        itemstext = selectionitem[i].selectionitemtitle
      }
      else {
        itemstext = itemstext + ', ' + selectionitem[i].selectionitemtitle
      }
    }
    return <div><Label style={{ opacity: 0.7, }}>{itemstext}</Label></div>;
  }

  renderCartSelection(selection) {
    var itemsarray = [];

    for (let i = 0; i < selection.length; i++) {
      itemsarray.push(
        <p key={i} style={{textSize: 13, opacity: 0.7, margin: 0 }}>
          <span>&#8226;</span> {selection[i].selectioncategory}:
          {this.renderCartSelectionItem(selection[i].selectionitem)}
        </p>
      );
    }

    return <div>{itemsarray}</div>;
  }

  renderInstruction(instruction) {
    var itemsarray = [];

    for (let i = 0; i < 1; i++) {
      itemsarray.push(
        <p key={i} style={{ textSize: 13, opacity: 0.7, margin: 0 }}>
          <span>&#8226;</span> Instruction:
          <div>
            <Label style={{ opacity: 0.7, }}>
              {instruction}
            </Label>
          </div>
        </p>
      );
    }

    return <div>{itemsarray}</div>;
  }

  renderTableItems(cartitem) {
    var itemarray = [];
    for (let i = 0; i < cartitem.length; i++) {
      itemarray.push(
        <tr>
          <td style={{  fontWeight: "500" }} >
            {cartitem[i].quantity}
          </td>
          <td style={{textAlign: "start"}} >
            <Dotdotdot clamp={2}>
              <p
                style={{
                  marginBottom: 5,
                  fontWeight: "500",
                  color: "#20a8d8",
                  overflow: "hidden"
                }}
              >
                {cartitem[i].title}
              </p>
            </Dotdotdot>
            <p style={{ fontStyle: 'italic', marginBottom: 5, textSize: 13, opacity: 0.7 }}>
              serves {cartitem[i].serveperunit}
            </p>
            {
              typeof cartitem[i].selection === 'undefined' ? null : 
              this.renderCartSelection(cartitem[i].selection)
            }
            {
              typeof cartitem[i].instruction === 'undefined' ? null : 
                this.renderInstruction(cartitem[i].instruction)
            }
          </td>

          <td style={{ width: "20%", textAlign: "end" }} onClick={() => this.cartItemClicked(cartitem[i].menuID, cartitem[i].quantity, cartitem[i].selection, cartitem[i].totalprice, cartitem[i].instruction)}>
            €{Number(cartitem[i].totalprice).toFixed(2)}
          </td>
        </tr>
      );
    }

    return <tbody>{itemarray}</tbody>;
  }

  renderNotEmptyCart() {
    return (
      <CardBody style={{ textAlign: "center" }}>
        <Table borderless>{typeof this.state.cartitem !== 'undefined' ? this.renderTableItems(this.state.cartitem) : null}</Table>
        <Collapse isOpen={this.state.orderType === "delivery"} >
          <Table borderless>
            <tbody>
              <tr>
                <td
                  style={{ fontSize: 16, textAlign: "start" }}
                >
                  Delivery Fee
                </td>
                <td style={{ fontSize: 16, textAlign: "end" }}>
                  €{Number(this.state.deliveryfee).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </Table>
        </Collapse>

        <div
          style={{
            height: 1,
            backgroundColor: "gray",
            opacity: 0.5,
            width: "100%"
          }}
        />

        <Table borderless>
          <tbody>
            <tr>
              <td
                style={{ fontSize: 16, fontWeight: "600", textAlign: "start" }}
              >
                TOTAL
              </td>
              <td style={{ fontSize: 16, fontWeight: "600", textAlign: "end" }}>
                €{this.calculateCartTotalPrice()}
              </td>
            </tr>
          </tbody>
        </Table>

        <Button
          style={{
            color: "white",

            marginTop: 30,
            padding: 15,
            fontWeight: "600",
            fontSize: 16
          }}
          color="success"
          disabled
          block
        >
          Place Order
        </Button>

      </CardBody>
    );
  }

  renderCartLoadingItems() {
    var itemsarray = [];

    for (let i = 0; i < 4; i++) {
      itemsarray.push(
        <tr>
          <td >
            <ContentLoader height="250">
              <rect x="0" y="0" rx="4" ry="4" width="50" height="20" />
            </ContentLoader> 
          </td>
          <td >
            <ContentLoader height="250">
              <rect x="0" y="0" rx="4" ry="4" width="300" height="20" />
              <rect x="0" y="40" rx="4" ry="4" width="200" height="20" />
            </ContentLoader> 
          </td>
          <td >
            <ContentLoader height="250">
              <rect x="0" y="0" rx="4" ry="4" width="50" height="20" />
            </ContentLoader> 
          </td>
          <td >
            <ContentLoader height="250">
              <rect x="0" y="0" rx="4" ry="4" width="50" height="20" />
            </ContentLoader> 
          </td>
        </tr>
      );
    }

    return (
      <CardBody style={{ textAlign: "center" }}>
        <Table>
         <tbody>
          {itemsarray}
         </tbody>
        </Table>
        <Button
          style={{
            color: "white",
            marginTop: 30,
            padding: 15,
            fontWeight: "600",
            fontSize: 16
          }}
          disabled
          block
          color="success"
        >
          Place Order
        </Button>
      </CardBody>
    );
  }


  renderCart() {
    return (
      <Card
        style={{
          boxShadow: "0px 3px 1px #9E9E9E",
          borderWidth: 0
        }}
      >
        <CardHeader
          style={{
            backgroundColor: "rgba(13, 152, 186, 0.8)",
            textAlign: "center"
          }}
        >
          <Label
            style={{
              marginTop: 5,
              fontWeight: "600",
              color: "white",
              fontSize: 15
            }}
          >
            Your Order
          </Label>
        </CardHeader>

        {!this.state.cartloading ? this.renderNotEmptyCart() : this.renderCartLoadingItems()}
      </Card>
    );
  }

  
  render() {
    return (
      <Layout title={'Delivery Confirmation FoodieBee - Catering Service'}>
      <div style={{ backgroundColor: "white" }}>
      <NavBar signIn={e=>this.signIn(e)}/>
        <div className="app align-items-center">
        <Container>
            <Row
              style={{ flex: 1, display: "flex" }}
              className="justify-content-center"
            >
              <Col xs="12" md="7">
                <Row>
                  <Col style={{ marginTop: 20 }} xs="12">
                    <Nav className="float-left" pills>
                      {this.renderNavItem(this.state.menutitle[0])}
                      {this.renderNavItem(this.state.menutitle[1])}
                      {this.renderNavItem(this.state.menutitle[2])}
                    </Nav>
                  </Col>

                  <Col style={{ marginTop: 20 }} xs="12">
                    {this.state.selectedMenu === "Date & Time"
                      ? this.state.userName === "" ? this.renderInvalidUser() : this.renderDateTime()
                      : this.state.selectedMenu === "Address"
                      ? this.state.userName === "" ? this.renderInvalidUser() : this.renderAddress()
                      : this.state.selectedMenu === "Payment"
                      ? this.state.userName === "" ? this.renderInvalidUser() : this.renderPayment()
                      : null}
                  </Col>
                </Row>
              </Col>

              <Col style={{ marginTop: 40 }} xs="0" md="5">
                {this.renderCart()}
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
      </Layout>
    );
  }
}

export default DeliveryConfirmation;
