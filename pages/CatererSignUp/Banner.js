import React from "react";
import {
  Button,
  Row,
  Col,
  FormGroup,
  FormFeedback,
  Form,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import "./styles.css";
import PropTypes from "prop-types";
import img from "../../assets/img"
import axios from "axios";
import apis from "../../apis";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.handleRestaurantNameChange = this.handleRestaurantNameChange.bind(
      this
    );
    this.handleRestaurantPhoneNumber = this.handleRestaurantPhoneNumber.bind(
      this
    );
    this.handleRestaurantAddress = this.handleRestaurantAddress.bind(this);
    this.handleRestaurantEmail = this.handleRestaurantEmail.bind(this);

    this.state = {
      restaurantName: "",
      isNameEmpty: false,
      restaurantAddress: "",
      isAddressEmpty: false,
      restaurantEmail: "",
      isEmailEmpty: false,
      restaurantPhoneNumber: "",
      isPhoneNumberEmpty: false,
      isMobile: false,
      isModalOpen: false,
      enquiryStatus: null,
      getStarting: false,
    };
  }

  componentDidMount() {
    if (window.innerWidth < 900) {
      this.setState({
        isMobile: true
      });
    }

    window.addEventListener(
      "resize",
      () => {
        this.setState({
          isMobile: window.innerWidth < 900
        });
      },
      false
    );
  }

  handleRestaurantNameChange(e) {
    this.setState({
      restaurantName: e.target.value,
      isNameEmpty: e.target.value === "" ? true : false
    });
  }

  handleRestaurantPhoneNumber(e) {
    if (isNaN(e.target.value)) {
      //Letters
    } 
    else if (e.target.value.includes("+") || e.target.value.includes("-") || e.target.value.includes(".")) {
      //Letters
    }
    else {
      //Valid Number
      this.setState({
        restaurantPhoneNumber: e.target.value,
        isPhoneNumberEmpty: e.target.value === "" ? true : false
      });
    }
  }

  handleRestaurantAddress(e) {
    this.setState({
      restaurantAddress: e.target.value,
      isAddressEmpty: e.target.value === "" ? true : false
    });
  }

  handleRestaurantEmail(e) {
    this.setState({
      restaurantEmail: e.target.value,
      isEmailEmpty: e.target.value === "" ? true : false
    });
  }

  validateEmail (email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(email).toLowerCase());
  }

  validatePhoneNumber (phone) {
    var returnval;
    if (phone.length === 10) {
      returnval = true
    }
    else {
      returnval = false
    }
    return returnval
  }

  toggleModal = (status) => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      enquiryStatus: status
    })
  }

  onGetStartedClick = () => {
    const {
      restaurantName,
      restaurantPhoneNumber,
      restaurantEmail,
      restaurantAddress
    } = this.state;
    if (restaurantName === "") {
      this.setState({
        isNameEmpty: true
      });
    } else if (restaurantAddress === "") {
      this.setState({
        isAddressEmpty: true
      });
    } else if ((restaurantEmail === "") || !this.validateEmail(restaurantEmail) ) {
      this.setState({
        isEmailEmpty: true
      });
    } else if ((restaurantPhoneNumber === "") || !this.validatePhoneNumber(restaurantPhoneNumber)) {
      this.setState({
        isPhoneNumberEmpty: true
      });
    } else {

      this.setState({
        getStarting: true,
      })
      
      var headers = {
        'Content-Type': 'application/json',
      }

      var body = {
        catererName: restaurantName,
        catererEmail: restaurantEmail,
        catererPhoneNumber: restaurantPhoneNumber,
        catererFullAddress: restaurantAddress,
        catererCountry: "Ireland",
        catererCountryCode: "+353"
      }
  
      var url = apis.POSTnewcaterersignup;

      axios.post(url, body, {headers: headers})
        .then((response) => {
          if (response.status === 200) {
            this.toggleModal("Success")
            this.setState({
              restaurantName: "",
              isNameEmpty: false,
              restaurantAddress: "",
              isAddressEmpty: false,
              restaurantEmail: "",
              isEmailEmpty: false,
              restaurantPhoneNumber: "",
              isPhoneNumberEmpty: false,
              getStarting: false,
            })
          } 
        })
        .catch((error) => {
          if (error) {
            this.toggleModal("Failed")
            this.setState({
              restaurantName: "",
              isNameEmpty: false,
              restaurantAddress: "",
              isAddressEmpty: false,
              restaurantEmail: "",
              isEmailEmpty: false,
              restaurantPhoneNumber: "",
              isPhoneNumberEmpty: false,
              getStarting: false,
            })
          } 
        }); 
    }
  };

  renderSuccessModal() {
    return (
      <Modal isOpen={this.state.isModalOpen} toggle={() => this.toggleModal()}>
        <ModalHeader toggle={() => this.toggleModal()}>Enquiry Sent</ModalHeader>
        <ModalBody>
          <div style={{ textAlign: 'center' }} >
           <img style={{ objectFit:'cover', width: 50, height: 50 }} src={"https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/checked.png"} alt="" />
          </div>
          <div style={{ marginTop: 20 }}>
            <p>Thank you for your interest in FoodieBee. We are now processing your enquiry and will get back to you as soon as we can. </p>
          </div>
        </ModalBody>
      </Modal>
    )
  }

  renderFailedModal() {
    return (
      <Modal isOpen={this.state.isModalOpen} toggle={() => this.toggleModal()}>
        <ModalHeader toggle={() => this.toggleModal()}>Enquiry Failed to Send</ModalHeader>
        <ModalBody>
          <div style={{ textAlign: 'center' }} >
            <img style={{objectFit:'cover', width: 50, height: 50 }} src={"https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/cancel.png"} alt="" />
          </div>
          <div style={{ marginTop: 20 }}>
            <p>Unfortunately, your enquiry has failed to send. Please try again.</p>
          </div>
        </ModalBody>
      </Modal>
    )
  }

  render() {
    const { isMobile } = this.state;

    return (
      <section
        id="hero"
        style={{
          height: isMobile ? 800 : 600,
          marginTop: -70,
          backgroundImage: "url(" + img.caterer_wallpaper + ")",
          backgroundSize: "cover"
        }}
      >
        <Row
          className="justify-content-center"
          style={{ margin: 0, display: "flex" }}
        >
          {isMobile ? null : <Col xs="1" />}
          <Col
            style={{
              textAlign: isMobile ? "center" : "start",
              marginTop: isMobile ? 50 : 150,
              color: "white"
            }}
            xs={isMobile ? "12" : "6"}
          >
            <h1 style={{ fontSize: 40 }}>Caterers, join us now!</h1>
            <h6 style={{ lineHeight:2, fontSize: 18, letterSpacing: 2, marginTop: 20 }}>
              Orders management, marketting channels, reviews and feedback.
              There are much more benefits when you join us.
            </h6>
          </Col>

          <Col style={{ marginTop: 50 }} xs={isMobile ? "10" : "4"}>
            <Card>
              <CardBody>
                <FormGroup>
                  <Label>Restaurant Name *</Label>
                  <Input
                    style={{ color: "black" }}
                    value={this.state.restaurantName}
                    onChange={e => this.handleRestaurantNameChange(e)}
                    type="text"
                    placeholder="Restaurant name"
                    invalid={this.state.isNameEmpty ? true : false}
                  />
                  <FormFeedback>Please enter restaurant name</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Address *</Label>
                  <Input
                    style={{ color: "black" }}
                    value={this.state.restaurantAddress}
                    onChange={e => this.handleRestaurantAddress(e)}
                    type="text"
                    placeholder="Restaurant address"
                    invalid={this.state.isAddressEmpty ? true : false}
                  />
                  <FormFeedback>Please enter restaurant address</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Email *</Label>
                  <Input
                    style={{ color: "black" }}
                    value={this.state.restaurantEmail}
                    onChange={e => this.handleRestaurantEmail(e)}
                    type="text"
                    placeholder="Owner email address"
                    invalid={this.state.isEmailEmpty ? true : false}
                  />
                  <FormFeedback>Please enter owner email address</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Phone Number *</Label>
                  <Input
                    style={{ color: "black" }}
                    value={this.state.restaurantPhoneNumber}
                    onChange={e => this.handleRestaurantPhoneNumber(e)}
                    type="text"
                    placeholder="Owner phone number"
                    invalid={this.state.isPhoneNumberEmpty ? true : false}
                  />
                  <FormFeedback>Please enter owner phone number. Phone numbers should be 10 digits</FormFeedback>
                </FormGroup>
                <Button
                  style={{ marginTop: 30, paddingTop: 10, paddingBottom: 10 }}
                  color="primary"
                  block
                  disabled={this.state.getStarting ? true : false}
                  onClick={() => this.onGetStartedClick()}
                >
                  {this.state.getStarting ? "Sending" : "Get Started"}
                </Button>
              </CardBody>
            </Card>
          </Col>
          {isMobile ? null : <Col xs="1" />}
        </Row>
        {this.state.enquiryStatus === "Success" ? this.renderSuccessModal() : this.state.enquiryStatus === "Failed" ? this.renderFailedModal() : null}
      </section>
    );
  }
}

Banner.propTypes = propTypes;
Banner.defaultProps = defaultProps;

export default Banner;
