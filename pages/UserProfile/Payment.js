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
import "./styles.css"
import axios from "axios";
import apis from "../../apis";
import color from "../../assets/color"
import {server} from "../../config"
import Cards from 'react-credit-cards';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from '../../utils';
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  PaymentRequestButtonElement,
  IbanElement,
  IdealBankElement,
  StripeProvider,
  injectStripe,
  Elements
} from "react-stripe-elements";
import Lottie from 'react-lottie';
import { ToastContainer, toast } from 'react-toastify';

class Payment extends Component {

  constructor(props) {
    super(props);

    this.state = {
        holdername: '',
        cardElement: null,
        isCardHolderNameEmpty: false,
        isCardInvalid: false,
        paymentCardModalOpen: false,
        customerPaymentAccoundID: "",
        customerEmail: "",
        paymentcarddetails: [],
        customerpaymentaccountdetails: [],
        empty: false,
        loadingModal: false,
    };
  }


  componentDidMount() {
  
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETcustomerprofile;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            customerEmail: typeof response.data[0].customerEmail !== 'undefined' ? response.data[0].customerEmail : "",
            customerPaymentAccoundID: typeof response.data[0].customerPaymentAccoundID !== 'undefined' ? response.data[0].customerPaymentAccoundID : "",
          }, () => {
            this.getCustomerPaymentAccount()
          })
        } 
      })
      .catch((error) => {
      });
  }

  handleHolderNameChange(e) {
    this.setState({ 
      holdername: e.target.value, 
      isCardHolderNameEmpty: false
    })
  }


  getCustomerPaymentAccount = () => {

    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETcustomer_paymentaccount+ "?customerPaymentAccoundID=" + this.state.customerPaymentAccoundID;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          this.setState({
            customerpaymentaccountdetails: response.data,
          }, () => {
            this.getCustomerCard()
          })
        } 
      })
      .catch((error) => {
        this.setState({
          empty: true
        })
      });
  }
  

  getCustomerCard = () => {

    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETcustomer_card+ "?customerPaymentAccoundID=" + this.state.customerPaymentAccoundID;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.data)
          this.setState({
            paymentcarddetails: response.data.data,
            empty: response.data.data.length > 0 ? false : true
          })
        } 
      })
      .catch((error) => {
        this.setState({
          empty: true
        })
      });
  }
  

  togglePaymentCardModal = () => {
    this.setState({
      paymentCardModalOpen: !this.state.paymentCardModalOpen,
      holdername: "",
    });
  }


  handleSubmit  = () => {

    if (this.state.holdername === "") {
      this.setState({
        isCardHolderNameEmpty: true
      })
    }
    else {

      this.setState({
        loadingModal: true
      })

      if (this.props.stripe) {

        this.props.stripe.createPaymentMethod('card', this.state.cardElement, {billing_details: { name: this.state.holdername }} )
        .then(({paymentMethod, error}) => {
          if (error) {
            this.setState({
              loadingModal: false
            })
          }
          else {
            if (this.state.customerPaymentAccoundID !== "") {
              this.saveNewCard(paymentMethod.id)
              console.log(paymentMethod)
            }
            else {
              console.log(paymentMethod)
              this.createUserPaymentAccount(paymentMethod.id)
            }
          }
        });

        /*this.props.stripe.createToken({type: 'card', name: this.state.holdername})
        .then(({token, error}) => {
          
            if (error) {
              this.setState({
                loadingModal: false
              })
            }
            else {
              if (this.state.customerPaymentAccoundID !== "") {
                this.updateUserPaymentAccount(token.id)
              }
              else {
                this.createUserPaymentAccount(token.id)
              }
            }
        });*/
      }
    }
  }

  saveNewCard =  (paymentID) => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.POSTsave_customer_card;

    var body = {
      paymentID: paymentID,
      customerPaymentAccoundID: this.state.customerPaymentAccoundID
    }

    axios.post(url, body, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loadingModal: false,
            paymentCardModalOpen: false
          }, () => {
            toast(<SuccessInfo/>, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
            this.getCustomerPaymentAccount()
          })
        } 
      })
      .catch((error) => {
        this.setState({
          loadingModal: false,
          paymentCardModalOpen: false
        }, () => {
          toast(<ErrorInfo/>, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        })
      });
  };

  createUserPaymentAccount =  (paymentID) => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.POSTcreate_customer_paymentaccount;

    var body = {
      name: this.state.holdername,
      paymentID: paymentID,
      email: this.state.customerEmail
    }

    axios.post(url, body, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            customerPaymentAccoundID: response.data.id
          }, () => {
            this.updateCustomerMongo()
          })
        } 
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          loadingModal: false,
          paymentCardModalOpen: false
        }, () => {
          toast(<ErrorInfo/>, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        })
      });
  };

  updateCustomerMongo = () => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var body = {
      customerPaymentAccoundID: this.state.customerPaymentAccoundID,
    }

    var url = apis.UPDATEcustomerprofile;

    axios.put(url, body, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 201) {
          this.setState({
            loadingModal: false,
            paymentCardModalOpen: false
          }, () => {
            toast(<SuccessInfo/>, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
            this.getCustomerPaymentAccount()
          })
        } 
      })
      .catch((error) => {
        if (error) {
          this.setState({
            loadingModal: false,
            paymentCardModalOpen: false
          }, () => {
            toast(<ErrorInfo/>, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          })
        } 
      }); 
  }

  deleteCustomerCard =  (paymentID) => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.DELETEcustomer_card + "?customerPaymentAccoundID=" + this.state.customerPaymentAccoundID + "&paymentID=" + paymentID;

    axios.delete(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          toast(<SuccessInfo/>, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          this.getCustomerPaymentAccount()
        } 
      })
      .catch((error) => {
        toast(<ErrorInfo/>, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });
  };

  updateDefaultCard =  (paymentID) => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var body = {
      paymentID: paymentID,
      customerPaymentAccoundID: this.state.customerPaymentAccoundID
    }

    var url = apis.PUTupdate_customer_card;

    axios.put(url, body, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 201) {
          toast(<SuccessInfo/>, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          this.getCustomerPaymentAccount()
        } 
      })
      .catch((error) => {
        toast(<ErrorInfo/>, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });
  };

  handleReady = (element) => {
    this.setState({cardElement: element}) ;
  };

  renderEmpty() {
    return (
      <Row >
        <Col xs="12">
          <img
            style={{
              objectFit: "cover",
              width: 70,
              height: 70,
              opacity: 0.9
            }}
            alt={""}
            src={
              "https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/empty_customer.png"
            }
          />
        </Col>
        <Col xs="12">
          <p
            style={{ fontSize: 15, letterSpacing: 1.2, marginTop: 20, marginBottom:20 }}
          >
            You have no saved cards yet.
          </p>
        </Col>
        <Col xs="12">
          <Button onClick={() => this.togglePaymentCardModal()} style={{paddingTop:10, paddingBottom: 10}} color="primary" >Add Payment Card</Button>
        </Col>
      </Row>
    );
  }

  renderPaymentCardModal() {
    const createOptions = (fontSize, padding) => {
      return {
        style: {
          base: {
            fontSize,
            color: "#424770",
            letterSpacing: "0.025em",
            fontFamily: "Source Code Pro, monospace",
            "::placeholder": {
              color: "#aab7c4"
            },
            padding: 20
          },
          invalid: {
            color: "#9e2146"
          }
        }
      };
    };

    return(
      <Modal isOpen={this.state.paymentCardModalOpen} toggle={() => this.togglePaymentCardModal()}>
     
        <ModalBody>
          <Card style={{boxShadow: 'none', borderWidth: 0}}>
          <CardBody>
            <Form>
              <h2>Payment Card</h2>
              <Row
                style={{ marginTop: 20, marginBottom:0, flex: 1, display: "flex" }}
                className="justify-content-center"
              >
                <Col xs="12" md="12">
                  <form >
                    <Row
                      style={{ marginTop: 20, flex: 1, display: "flex" }}
                      className="justify-content-center"
                    >
                      <Col xs="12">
                        <Label style={{ fontWeight: 400, letterSpacing: 0.025 }}>
                          Card Holder Name
                        </Label>
                        <input
                          className="StripeElement"
                          style={{
                            fontSize: 15,
                            fontWeight: 500,
                            width: "100%",
                            outline: 0,
                            border: 0,
                            marginBottom: 20,
                            marginTop: 10,
                            color: "rgba(0,0,0,0.8)"
                          }}
                          value={this.state.holdername}
                          onChange={e => this.handleHolderNameChange(e)}
                          type="text"
                          placeholder="Card Holder Name"
                          invalid={this.state.isCardHolderNameEmpty}
                        />
                        {this.state.isCardHolderNameEmpty ? (
                          <Label style={{ color: "red", fontSize: 13, marginBottom: 20 }}>
                            Please enter card holder name
                          </Label>
                        ) : null}
                      </Col>

                      <Col xs="12">
                        <Label style={{ fontWeight: 400, letterSpacing: 0.025 }}>
                          Card Details
                        </Label>
                        <CardElement
                          onReady={this.handleReady}
                          {...createOptions(15)}
                        />
                      </Col>

                      <Col style={{marginTop: 20}} xs="12">
                        <Button onClick={() => this.handleSubmit()} style={{padding:10}} block color="success">
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </Col>
              </Row>  
            </Form>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
    )
  }


  renderPaymentCard() {
    var itemsarray = [];

    var paymentcarddetails = this.state.paymentcarddetails

    var customerpaymentaccountdetails = this.state.customerpaymentaccountdetails

    for (let i = 0; i < paymentcarddetails.length; i++) {
      itemsarray.push(
        <Col xs="12" md="6">
        <Card  style={{marginBottom: 40, boxShadow: 'none', borderWidth: 0}} >
          <CardBody style={{margin:0, padding:0, }} >
            <img style={{objectFit:'cover', width: 80, height: 45 }} src={paymentcarddetails[i].card.brand === "visa" ? "https://foodiebeegeneralphoto.s3-eu-west-1.amazonaws.com/visa.png" : paymentcarddetails[i].card.brand === "mastercard" ? "https://foodiebeegeneralphoto.s3-eu-west-1.amazonaws.com/mastercard.png" : paymentcarddetails[i].card.brand === "amex" ? "https://foodiebeegeneralphoto.s3-eu-west-1.amazonaws.com/americanexpress.png" : null}  />
            <div style={{ marginTop: 20 }}>
              <Table borderless responsive>
                <tbody>
                  <tr>
                    <td >Cardholder name:</td>
                    <td className="h6">{paymentcarddetails[i].billing_details.name}</td>
                  </tr>
                  <tr>
                    <td >Card number</td>
                    <td className="h6">&#9679;&#9679;&#9679;&#9679; {paymentcarddetails[i].card.last4}</td>
                  </tr>
                  <tr>
                    <td >Expiration date:</td>
                    <td className="h6">{paymentcarddetails[i].card.exp_month}/{paymentcarddetails[i].card.exp_year}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <Row>
              <Col xs="6">
                <Button
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    fontWeight: "600"
                  }}
                  outline = {customerpaymentaccountdetails.invoice_settings.default_payment_method === paymentcarddetails[i].id? false : true}
                  color="success"
                  block
                  onClick={() => this.updateDefaultCard(paymentcarddetails[i].id)}
                >
                  {customerpaymentaccountdetails.invoice_settings.default_payment_method === paymentcarddetails[i].id ? "Default" : "Make Default"}
                </Button>
              </Col>
              <Col xs="6">
                <Button onClick={() => this.deleteCustomerCard(paymentcarddetails[i].id)} style={{paddingTop:10, paddingBottom: 10, fontWeight: '600'}} outline color="danger" block>Delete</Button>
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
        <Col xs="12">
          <Button onClick={() => this.togglePaymentCardModal()} style={{paddingTop:10, paddingBottom: 10}} color="primary" >Add Payment Card</Button>
        </Col>
      </Row>
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
        isOpen={this.state.loadingModal} >
        <ModalBody>
          <div>
            <Lottie 
              options={defaultOptions}
              height={200}
              width={200}/>

            <p style={{textAlign: 'center', paddingLeft:20, paddingRight:20, fontSize: 16, fontWeight: '600'}}>
              Please don't close the browser or refresh the page while we are connecting to your payment account. This proccess may take a while.
            </p>
          </div>
        </ModalBody>
      </Modal>
    )
  }


  render() {
    return (
      <Row style={{flex: 1, display: 'flex'}} >
        <Col style={{  paddingLeft:40, marginTop: 10, marginBottom: 20 }} xs="12">
          <b className="h5">Payment Methods</b>
        </Col>
        <Col xs="12">
          <Card  style={{boxShadow: 'none', borderWidth: 0}} >
            <CardBody >
              <Form>
                {!this.state.empty ? this.renderPaymentCard() : this.renderEmpty()}
              </Form>
            </CardBody>
          </Card>
        </Col>
        
        <ToastContainer hideProgressBar/>

        {this.renderPaymentCardModal()}

        {this.renderLoadingModal()}

      </Row>
    );
  }
}


const SuccessInfo = ({ closeToast }) => (
  <div>
    <img style={ { marginLeft:10, objectFit:'cover', width: 25, height: 25 }} src={"https://foodiebeegeneralphoto.s3-eu-west-1.amazonaws.com/checked.png"} />

     <b style={{marginLeft:10, marginTop:5, color: 'green'}}>Successfully updated!</b>
   
  </div>
)

const ErrorInfo = ({ closeToast }) => (
  <div>
    <img style={ { marginLeft:10, objectFit:'cover', width: 25, height: 25 }} src={"https://foodiebeegeneralphoto.s3-eu-west-1.amazonaws.com/cancel.png"} />

     <b style={{marginLeft:10, marginTop:5, color: 'red'}}>Error updating account.</b>
   
  </div>
)

export default injectStripe(Payment);
