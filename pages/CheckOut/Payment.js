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
  DropdownMenu,
  Modal,
  ModalBody
} from "reactstrap";
import moment from "moment";
import axios from "axios";
import apis from "../../apis";
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
import { ToastContainer, toast } from 'react-toastify';
import Lottie from 'react-lottie';
import "./styles.css"
import PropTypes from 'prop-types';
import ContentLoader, { Facebook } from "react-content-loader";
import img from "../../assets/img"
import 'react-toastify/dist/ReactToastify.css';

const propTypes = {
    children: PropTypes.node,
  };
  
const defaultProps = {};

class Payment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      paymentcarddetails: [],
      holdername: "",
      customerPaymentAccoundID: "",
      customerEmail: "",
      customerpaymentaccountdetails: "",
      empty: false,
      cardElement: null,
      paymentType: "",
      selectedPayment: null,
      selectedPaymentIndex: null,
      paymentCardModalOpen: false,
      loading: true,
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
          this.setState({
            loading: false
          })
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
          empty: true,
          loading: false
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
          this.setState({
            paymentcarddetails: response.data.data,
            empty: response.data.data.length > 0 ? false : true,
            loading: false
          }, () => {
            this.handleSelectedPayment(this.state.customerpaymentaccountdetails.invoice_settings.default_payment_method)
          })
        } 
      })
      .catch((error) => {
        this.setState({
          empty: true,
          loading: false
        })
      });
  }

  handleSelectedPayment = id => {
    var index = this.state.paymentcarddetails.findIndex(x => x.id==id);
    var paymentcard = null;
    if (index >= 0) {
        paymentcard = this.state.paymentcarddetails[index];
    }
    this.setState({
      selectedPayment: paymentcard,
      selectedPaymentIndex: index
    });
  };

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
          console.log("error 1 = ", error)
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
          console.log("error 2 = ", error)
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
            console.log("error 3 = ", error)
            toast(<ErrorInfo/>, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          })
        } 
      }); 
  }

  handleReady = (element) => {
    this.setState({cardElement: element}) ;
  };

  proceedPayment = () => {
    if (this.state.selectedPayment && this.state.customerPaymentAccoundID) {
        this.props.paymentCheckOut(this.state.customerEmail, this.state.customerPaymentAccoundID, this.state.selectedPayment.id, this.state.selectedPayment.card.brand)
    }
  }

  renderLoadingItems() {
    var itemsarray = [];

    for (let i = 0; i < 2; i++) {
      itemsarray.push(
        <Col key={i} xs="12">
          <ContentLoader height="250">
            <rect x="0" y="0" rx="6" ry="6" width="100%" height="220" />
          </ContentLoader>
        </Col>
      );
    }

    return (
    <Row
        style={{
            marginTop: 10
        }}
        >
        {itemsarray}
    </Row>
    );
  }


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
            src={img.bank1}
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
          <Button disabled={this.state.loading ? true : false} onClick={() => this.togglePaymentCardModal()} style={{paddingTop:10, paddingBottom: 10}} color="primary" >Add Payment Card</Button>
          <Button disabled className="float-right" style={{paddingTop:10, paddingBottom: 10}} color="success" >Continue to Check Out</Button>
        </Col>
      </Row>
    );
  }

  togglePaymentCardModal = () => {
    this.setState({
      paymentCardModalOpen: !this.state.paymentCardModalOpen,
      holdername: "",
    });
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
              <h2>Add New Payment Card</h2>
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
        <Col xs="12" md="12">
          <Card  
            onClick={() => this.handleSelectedPayment(paymentcarddetails[i].id)}
            className="p-4"
            style={{ 
                borderColor: this.state.selectedPaymentIndex === i ? "#008000" : null,
                cursor: "pointer",
                borderWidth: this.state.selectedPaymentIndex === i ? 2 : 0,
                }} >
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
          <Button disabled={this.state.loading ? true : false} className="float-right" onClick={() => this.proceedPayment()} style={{paddingTop:10, paddingBottom: 10}} color="success" >Continue to Check Out</Button>
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
      <Row>

        <Col xs="12" md="10">
          <Card style={{ boxShadow: "1px 1px 3px #9E9E9E" }} className="p-4">
            <CardBody className="p-4">
              <Row>
                <Col xs="12">
                  <h5>Payment</h5>
                </Col>

                <Col style={{marginTop: 20}}>
                  <Form>
                
                    {this.state.loading ? this.renderLoadingItems() : !this.state.empty ? this.renderPaymentCard() : this.renderEmpty()}
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Col xs="0" md="2"></Col>

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

Payment.propTypes = propTypes;
Payment.defaultProps = defaultProps;

export default injectStripe(Payment);
