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
  DropdownMenum,
  Modal,
  ModalBody
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
import { timeRanges } from  "../../utils"
import DateTime from "./DateTime"
import Address from "./Address"
import Payment from "./Payment"
import { StripeProvider, Elements } from 'react-stripe-elements'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "../../utils";
import Cookies from 'js-cookie';
import "./styles.css"
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie';
import NextSeo from 'next-seo';

class CheckOut extends Component {

  static async getInitialProps({query: { cartID, catererID }}) {
    return {
      cartID: cartID,
      catererID: catererID,
    };
  }

  componentWillMount() {
    this.setState({
      cartID: this.props.cartID,
      catererID: this.props.catererID,
    })
  }

  constructor(props) {
    super(props);

    this.refObj = React.createRef();

    this.state = {
      cartID: null,
      userName: "",
      phoneNumber: "",
      isPhoneNumberEmpty: false,
      name: "",
      isNameEmpty: false,
      isNextButtonActive: false,
      menutitle: ["Date & Time", "Address", "Payment"],
      selectedMenu: "Date & Time",
      catererID: null,
      deliveryfee: null,
      fetchedmenu: null,
      cartToBeOrder: null,
      cartitem: null,
      orderType: null,
      cartloading: true,
      stripe: null,
      deliveryhours: null,
      location: null,
      disableDateTime: false,
      disableAddress: true,
      disabledPayment: true,
      placeOrderDisabled: true,
      makepaymentdetails: {},
      formatted_address: "",
      selectedDate: "",
      selectedTime: "",
      placingOrderModal: false,
      successModal: false,
      failedModal: false,
    };

    this.CountyData = ["Dublin", "Limerick", "Cork"];

    this.time = timeRanges()
  }

  componentDidMount() {

    if (typeof Cookies.get('userName') !== 'undefined' && this.state.cartID.length === 24) {
      this.setState({
        userName: Cookies.get('userName'),
      })
    }

    this.getCustomerCart()
  
    this.getCatererDetail()

    if (window.Stripe) {
      this.setState({stripe: window.Stripe('pk_test_MQ87thwBK9MIVEqLB3jXQfHB00HFSE8cVS')});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: window.Stripe('pk_test_MQ87thwBK9MIVEqLB3jXQfHB00HFSE8cVS')});
      });
    }
  }

  getCustomerCart= () => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETcart + "?_id=" + this.state.cartID;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
       // alert(response.data)
        if (response.status === 200) {

          var makepaymentdetails = this.state.makepaymentdetails
          makepaymentdetails.totalOrderPrice = response.data[0].totalOrderPrice + ""
          
          this.setState({
            cartToBeOrder: response.data.length > 0 ? response.data : [],
            cartitem: response.data.length > 0 ? response.data[0].cartitem.length > 0 ? response.data[0].cartitem : [] : [],
            orderType: response.data.length > 0 ? typeof response.data[0].orderType !== 'undefined' ? response.data[0].orderType : "" : "",
            cartloading: false,
            makepaymentdetails,
          })
        } 
      })
      .catch((error) => {
        this.getSessionStorage()
      });
  }

  getCatererDetail= () => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETcatererprofile + "/" + this.state.catererID;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {

          var makepaymentdetails = this.state.makepaymentdetails
          makepaymentdetails.catererPaymentAccoundID = typeof response.data[0].catererPaymentAccoundID !== 'undefined' ? response.data[0].catererPaymentAccoundID : "",

          this.setState({
            deliveryfee: typeof response.data[0].deliveryfee !== 'undefined' ? response.data[0].deliveryfee : 0,
            location: response.data[0].location,
            deliveryhours: response.data[0].deliveryhours,
          })
        } 
      })
      .catch((error) => {
      });
  }
  
  getSessionStorage = () => {
    if (sessionStorage.getItem(this.state.catererID) !== null) {
      var sessionStorageCartToBeOrder = JSON.parse(sessionStorage.getItem(this.state.catererID));

      var makepaymentdetails = this.state.makepaymentdetails
      makepaymentdetails.totalOrderPrice = sessionStorageCartToBeOrder[0].totalOrderPrice + ""
          
      this.setState({
        cartToBeOrder: sessionStorageCartToBeOrder.length > 0 ? sessionStorageCartToBeOrder : [],
        cartitem: sessionStorageCartToBeOrder.length > 0 ? sessionStorageCartToBeOrder[0].cartitem.length > 0 ? sessionStorageCartToBeOrder[0].cartitem : [] : [],
        orderType: sessionStorageCartToBeOrder.length > 0 ? typeof sessionStorageCartToBeOrder[0].orderType !== 'undefined' ? sessionStorageCartToBeOrder[0].orderType : "" : "",
        cartloading: false,
        makepaymentdetails,
      })
    }
  }

  deleteSessionStorage = () => {
    sessionStorage.removeItem(this.state.catererID);
  }

  generateObjID = () => {
    return this.hexID(Date.now() / 1000) + ' '.repeat(16).replace(/./g, () => this.hexID(Math.random() * 16))
  }

  hexID = (value) => {
    return Math.floor(value).toString(16)
  }

  disabledAddressPayment = () => {
    this.setState({
      disableAddress: true,
      disabledPayment: true
    })
  }

  disabledTimeDatePayment = () => {
    this.setState({
      disableDateTime: true,
      disabledPayment: true
    })
  }

  paymentCheckOut = (customerEmail, customerPaymentAccoundID, paymentID, paymentType) => {
    var makepaymentdetails = this.state.makepaymentdetails
    makepaymentdetails.customerEmail = customerEmail
    makepaymentdetails.customerPaymentAccoundID = customerPaymentAccoundID
    makepaymentdetails.paymentMethodID = paymentID
    makepaymentdetails.paymentType = paymentType

    this.setState({
      placeOrderDisabled: false,
      makepaymentdetails,
    })
    this.refObj.current.scrollIntoView({behavior: 'smooth'});
  }

  addressProceedClick = (formatted_address) => {
    this.setState({
      selectedMenu: "Payment",
      disabledPayment: false,
      formatted_address,
    })
  }
 
  datetimeProceedClick = (selectedDate, selectedTime) => {
    this.setState({
      selectedMenu: this.state.cartToBeOrder !== null ? this.state.cartToBeOrder[0].orderType === 'delivery' ? "Address" : "Payment" : "Date & Time",
      disableAddress: false,
      disabledPayment: this.state.cartToBeOrder !== null ? this.state.cartToBeOrder[0].orderType === 'delivery' ? true : false : true,
      selectedDate,
      selectedTime
    })
  }

  placeOrder = () => {

    this.setState({
      placingOrderModal: true,
    })

    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.POSTcustomer_makepayment;

    axios.post(url, this.state.makepaymentdetails, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          this.addNewOrder(response.data.id)
        } 
      })
      .catch((error) => {
        this.setState({
          placingOrderModal: false,
          failedModal: true
        })
      });
  }

  addNewOrder = (paymentIntentID) => {

    var orderData = this.state.cartToBeOrder[0]
    const deliveryDate = moment(this.state.selectedDate, "dddd, DD/MM/YY").toDate();
    orderData.deliverydate = deliveryDate
    orderData.deliverytime = this.state.selectedTime
    orderData.orderItem = this.state.cartitem
    orderData.orderStatus = "pending"
    orderData.paymentType = this.state.makepaymentdetails.paymentType
    orderData.paymentIntentID = paymentIntentID
    orderData.paymentStatus = "incomplete"
    delete orderData._id

    if ( this.state.formatted_address !== "") {
      orderData.deliveryaddress = this.state.formatted_address
    }

    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.POSTaddorder;

    axios.post(url, orderData, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            placingOrderModal: false,
            successModal: true,
            placeOrderDisabled: true
          },() => {
            this.deleteCart()
            this.deleteSessionStorage()
          })
        } 
      })
      .catch((error) => {
        this.setState({
          placingOrderModal: false,
          failedModal: true
        },() => {
          this.deleteCart()
          this.deleteSessionStorage()
        })
      });
  }

  deleteCart = () => {

    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.DELETEcart + "?_id=" + this.state.cartID;

    axios.delete(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
        } 
      })
      .catch((error) => {
      });
  }
  

  toggleSuccessModal = () => {
    this.setState({
      successModal: !this.state.successModal
    })
  }

  toggleFailedModal = () => {
    this.setState({
      failedModal: !this.state.failedModal
    })
  }

  viewOrder = () => {
    Router.push({
      pathname: '/userprofile/Orders',
    })
  }

  signIn(e) {
    e.preventDefault()
    var cartID = this.state.cartID
    if (this.state.userName === "") {
      cartID = this.generateObjID()
    }
    Router.push({
      pathname: '/login',
      query: {'returnurl': `/checkout/${cartID}/${this.state.catererID}`}
    })
  }

  logIn = (e) => {
    e.preventDefault()
    var cartID = this.state.cartID
    if (this.state.userName === "") {
      cartID = this.generateObjID()
    }
    Router.push({
      pathname: '/login',
      query: {'returnurl': `/checkout/${cartID}/${this.state.catererID}`}
    })
  }

  signUp = (e) => {
    e.preventDefault()
    var cartID = this.state.cartID
    if (this.state.userName === "") {
      cartID = this.generateObjID()
    }
    Router.push({
      pathname: '/register',
      query: {'returnurl': `/checkout/${cartID}/${this.state.catererID}`}
    })
  }

  navItemClicked = selectedMenu => {
    this.setState({
      selectedMenu: selectedMenu
    });
  };

  renderNavItem(menutitle, disabled) {
    return (
      <NavItem>
        <NavLink
          disabled = {disabled}
          onClick={() => this.navItemClicked(menutitle)}
          style={{
            cursor: "pointer",
            paddingRight: 20,
            paddingLeft: menutitle === "Account Info" ? 0 : 20,
            fontWeight: "600",
            color: disabled ? 'rgba(0,0,0,0.3)' : this.state.selectedMenu === menutitle ? "#20a8d8" : "black",
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

  renderPayment() {
    return (
      <StripeProvider stripe={this.state.stripe}>
      <Elements>
        <Payment paymentCheckOut={(customerEmail, customerPaymentAccoundID, paymentID, paymentType) => this.paymentCheckOut(customerEmail, customerPaymentAccoundID, paymentID, paymentType)}/>
      </Elements>
      </StripeProvider>
    );
  }

  renderAddress() {
    return (
      <Address disabledTimeDatePayment={() => this.disabledTimeDatePayment()} addressProceedClick={(formatted_address) => this.addressProceedClick(formatted_address)} location={this.state.location}/>
    );
  }

  renderDateTime() {
    return (
      <DateTime deliveryhours={this.state.deliveryhours} disabledAddressPayment={() => this.disabledAddressPayment()} datetimeProceedClick={(selectedDate, selectedTime) => this.datetimeProceedClick(selectedDate, selectedTime)}/>
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
                €{this.state.cartToBeOrder ? Number(this.state.cartToBeOrder[0].totalOrderPrice).toFixed(2) : null}
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
          disabled = {this.state.placeOrderDisabled ? true : false}
          onClick={() => this.placeOrder()}
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

  renderLoadingModal() {

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: require('../../assets/animation/payment_loading.json'),
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <Modal    
        aria-labelledby="contained-modal-title-vcenter"
        centered
        isOpen={this.state.placingOrderModal} >
        <ModalBody>
          <div>
            <Lottie 
              options={defaultOptions}
              height={200}
              width={200}/>

            <p style={{textAlign: 'center', paddingLeft:20, paddingRight:20, fontSize: 16, fontWeight: '600'}}>
              Please don't close the browser or refresh the page while we are making the paying proccess. This proccess may take a while.
            </p>
          </div>
        </ModalBody>
      </Modal>
    )
  }

  renderSuccessModal() {

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: require('../../assets/animation/success.json'),
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <Modal    
        aria-labelledby="contained-modal-title-vcenter"
        centered
        isOpen={this.state.successModal} >
        <ModalBody>
          <div>
            <Lottie 
              options={defaultOptions}
              height={200}
              width={200}/>

            <p style={{textAlign: 'center', paddingLeft:20, paddingRight:20, fontSize: 16, fontWeight: '600'}}>
              Payment Success! Your order is now pending to caterer's action.
            </p>

            <Button
              style={{
                color: "white",
                marginTop: 30,
                padding: 15,
                fontWeight: "600",
                fontSize: 16
              }}
              block
              color="success"
              onClick={() => this.viewOrder()}
            >
              View Order
            </Button>

          </div>
        </ModalBody>
      </Modal>
    )
  }

  renderFailedModal() {

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: require('../../assets/animation/failed.json'),
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <Modal    
        aria-labelledby="contained-modal-title-vcenter"
        centered
        toggle={() => this.toggleFailedModal()}
        isOpen={this.state.failedModal} >
        <ModalBody>
          <div>
            <Lottie 
              options={defaultOptions}
              height={200}
              width={200}/>

            <p style={{textAlign: 'center', paddingLeft:20, paddingRight:20, fontSize: 16, fontWeight: '600'}}>
              Payment Failed! Please try again later.
            </p>
          </div>
        </ModalBody>
      </Modal>
    )
  }

  render() {
    return (
      <Layout title={'Checkout'}>
      <NextSeo
        config={{
          title: 'Checkout | FoodieBee - Corporate Catering Services and Marketplace | Local Caterers',
        }}
      />
      <div style={{ backgroundColor: "white" }}>
      <NavBar signIn={e=>this.signIn(e)}/>
        <div ref={this.refObj} className="app align-items-center">
        <Container>
            <Row
              style={{ flex: 1, display: "flex" }}
              className="justify-content-center"
            >
              <Col xs="12" md="7">
                <Row>
                  <Col style={{ marginTop: 20 }} xs="12">
                    {this.state.cartToBeOrder && this.state.cartToBeOrder[0].orderType === 'delivery' ? 
                      <Nav className="float-left" pills>
                        {this.renderNavItem(this.state.menutitle[0], this.state.disableDateTime)}
                        {this.renderNavItem(this.state.menutitle[1], this.state.disableAddress)}
                        {this.renderNavItem(this.state.menutitle[2], this.state.disabledPayment)}
                      </Nav>
                    :
                      <Nav className="float-left" pills>
                        {this.renderNavItem(this.state.menutitle[0], this.state.disableDateTime)}
                        {this.renderNavItem(this.state.menutitle[2], this.state.disabledPayment)}
                      </Nav>
                    }
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

          {this.renderLoadingModal()}

          {this.renderSuccessModal()}

          {this.renderFailedModal()}

        </div>
        <Footer />
      </div>
      </Layout>
    );
  }
}

export default CheckOut;
