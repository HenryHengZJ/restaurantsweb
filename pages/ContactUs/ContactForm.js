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
  Container,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import axios from "axios";
import apis from "../../apis"

class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleMessage = this.handleMessage.bind(this);
    this.handleEmail = this.handleEmail.bind(this);

    this.state = {
      message: "",
      isMessageEmpty: false,
      email: "",
      isEmailEmpty: false,
      status: null,
      isModalOpen: false,
    };
  }

  toggleModal = (status) => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      status: status
    })
  }

  handleMessage(e) {
    this.setState({
      message: e.target.value,
      isMessageEmpty: e.target.value === "" ? true : false
    });
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value,
      isEmailEmpty: e.target.value === "" ? true : false
    });
  }

  onSendClicked = () => {
    const { message, email } = this.state;
    if (email === "" || !this.validateEmail(email)) {
      this.setState({
        isEmailEmpty: true
      });
    } else if (message === "") {
      this.setState({
        isMessageEmpty: true
      });
    }
    else {
      var headers = {
        'Content-Type': 'application/json',
      }

      var body ={
        email: email,
        message: message
      }
  
      var url = apis.POSTcustomermessage;
  
      axios.post(url, body, {headers: headers})
        .then((response) => {
          if (response.status === 200) {
            
            this.toggleModal("Success")
            
          } 
        })
        .catch((error) => {
        
          this.toggleModal("Failed")
         
        });
    }
  };

  validateEmail(email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(email).toLowerCase());
  }

  renderSuccessModal() {
    return (
      <Modal isOpen={this.state.isModalOpen} toggle={() => this.toggleModal()}>
        <ModalHeader toggle={() => this.toggleModal()}>Enquiry Sent</ModalHeader>
        <ModalBody>
          <div style={{ textAlign: 'center' }} >
           <img style={{ objectFit:'cover', width: 50, height: 50 }} src={"https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/checked.png"}  />
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
            <img style={{objectFit:'cover', width: 50, height: 50 }} src={"https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/cancel.png"}  />
          </div>
          <div style={{ marginTop: 20 }}>
            <p>Unfortunately, your enquiry has failed to send. Please try again.</p>
          </div>
        </ModalBody>
      </Modal>
    )
  }

  render() {
    return (
      <section
        style={{
          backgroundColor: "white",
          paddingTop: 50,
          paddingBottom: 100
        }}
        id="ContactInfo"
        className="white"
      >
        <Container>
          <Row className="justify-content-center" style={{ display: "flex" }}>
            <Col xs="12" style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: 34 }}>Or Send Message</h2>
            </Col>
            <Col style={{ marginTop: 50 }} xs="12">
              <FormGroup>
                <Label>Email</Label>
                <Input
                  style={{ color: "black" }}
                  value={this.state.email}
                  onChange={e => this.handleEmail(e)}
                  type="text"
                  placeholder="Email address"
                  invalid={this.state.isEmailEmpty ? true : false}
                />
                <FormFeedback>Please enter email address</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label>Message</Label>
                <Input
                  style={{ color: "black" }}
                  value={this.state.message}
                  onChange={e => this.handleMessage(e)}
                  type="textarea"
                  rows="10"
                  placeholder="Enter your message"
                  invalid={this.state.isMessageEmpty ? true : false}
                />
                <FormFeedback>Please enter your message</FormFeedback>
              </FormGroup>

              <Button
                style={{
                  marginTop: 30,
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 20,
                  paddingRight: 20
                }}
                color="primary"
                onClick={() => this.onSendClicked()}
              >
                Send
              </Button>
            </Col>
          </Row>
        </Container>
        {this.state.status === "Success" ? this.renderSuccessModal() : this.state.status === "Failed" ? this.renderFailedModal() : null}
      </section>
    );
  }
}

export default ContactForm;
