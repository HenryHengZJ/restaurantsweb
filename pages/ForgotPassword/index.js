import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, FormFeedback, Label, Button, Card, CardBody, CardGroup, Col, Container, Form, FormText, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import axios from "axios";
import apis from "../../apis";
import Router from 'next/router'
import img from "../../assets/img"
import NextSeo from 'next-seo';

class ForgotPassword extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      isEmailInValid: false,
      emailSent: null,
      isModalOpen: false,
      emailsending: false,
    };
  }

  handleEmailAddress(e) {
    this.setState({ email: e.target.value, isEmailInValid: false });
  }

  sendClicked = () => {

    const { email } = this.state;

    if (this.validateEmail(email)) {

      this.setState({
        emailsending: true
      })

      var headers = {
        'Content-Type': 'application/json',
      }

      var body = {
        customerEmail: email
      }
  
      var url = apis.POSTpasswordreset;
  
      axios.post(url, body, {headers: headers})
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              email: "",
              emailSent: "Success",
              emailsending: false,
            }, () => {
              this.toggleModal()
            })
          } 
        })
        .catch((error) => {
          this.setState({
            email: "",
            emailSent: "Failed",
            emailsending: false,
          }, () => {
            this.toggleModal()
          })
        });
    } 
    else {
      this.setState({
        isEmailInValid: true
      });
    }
  };

  validateEmail(email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(email).toLowerCase());
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    })
  }

  signIn(e) {
    e.preventDefault()
    Router.push({
      pathname: '/login',
      query: {'returnurl': `/searchcaterer?${this.state.locationquerystring}${this.state.occasionquerystring}`}
    })
  }

  renderSuccessModal() {
    return (
      <Modal isOpen={this.state.isModalOpen} toggle={() => this.toggleModal()}>
        <ModalHeader toggle={() => this.toggleModal()}>Email Sent</ModalHeader>
        <ModalBody>
          <div style={{ textAlign: 'center' }} >
           <img style={{ objectFit:'cover', width: 50, height: 50 }} src={"https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/checked.png"}  />
          </div>
          <div style={{ marginTop: 20 }}>
            <p>We have successfully sent you an email to reset your password.</p>
          </div>
        </ModalBody>
      </Modal>
    )
  }

  renderFailedModal() {
    return (
      <Modal isOpen={this.state.isModalOpen} toggle={() => this.toggleModal()}>
        <ModalHeader toggle={() => this.toggleModal()}>Email Failed to Send</ModalHeader>
        <ModalBody>
          <div style={{ textAlign: 'center' }} >
            <img style={{objectFit:'cover', width: 50, height: 50 }} src={"https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/cancel.png"}  />
          </div>
          <div style={{ marginTop: 20 }}>
            <p>Unfortunately, we have failed to send you an email to reset your password. Please try again.</p>
          </div>
        </ModalBody>
      </Modal>
    )
  }


  render() {

    const { isMobile, invalidUser } = this.state;
  
    return (
    <Layout title={"Forgot Password"}>
    <NextSeo
        config={{
          title: 'Forgot Password | Restaurant',
        }}
      />
    <div style={{backgroundColor: 'white'}}>
        <NavBar signIn={e=>this.signIn(e)}/>
        <div className="app justify-content-center align-items-center">
        <Container>
            <Row
              style={{ flex: 1, display: "flex" }}
              className="justify-content-center"
            >
              <Col md="9" lg="7" xl="6">
                <Card
                  style={{ boxShadow: "1px 1px 3px #9E9E9E" }}
                  className="p-4"
                >
                  <CardBody className="p-4">
                    <Form>
                      <h2>Forgot Password</h2>
                      <p className="text-muted">
                        Enter your email address, we will send you an email to
                        help you reset your password.
                      </p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Email"
                          autoComplete="email"
                          onChange={e => this.handleEmailAddress(e)}
                          invalid={this.state.isEmailInValid}
                        />
                        <FormFeedback>
                          Email Address format incorrect.
                        </FormFeedback>
                      </InputGroup>
                      <Button
                        color="success"
                        block
                        disabled={this.state.email === "" || this.state.emailsending ? true : false}
                        onClick={() => this.sendClicked()}
                      >
                        { this.state.emailsending ? "Sending" : "Send" }
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        {this.state.emailSent === "Success" ? this.renderSuccessModal() : this.state.emailSent === "Failed" ? this.renderFailedModal() : null}
        <Footer />
      </div>
      </Layout>
    );
  }
}

export default ForgotPassword;
