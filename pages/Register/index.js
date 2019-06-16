import React, { Component } from 'react';
import  Link  from 'next/link';
import Head from 'next/head';
import { FormFeedback, Label, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Router from 'next/router'
import axios from "axios";
import apis from "../../apis";
import {server} from "../../config"
import NextSeo from 'next-seo';

class Register extends Component {

  static async getInitialProps({query: { returnurl }}) {
    console.log('returnurl = ' + returnurl)
    return {
      returnurl: returnurl,
    };
  }

  componentWillMount() {
    this.setState({
      returnurl: this.props.returnurl,
    })
  }

  constructor(props) {
    super(props);

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);

   this.state = {
      returnurl: "",
      customerFirstName: "",
      isFirstNameEmpty: false,
      customerLastName: "",
      isLastNameEmpty: false,
      customerEmail: "",
      isEmailEmpty: false,
      customerPassword: "",
      isPasswordEmpty: false,
      customerConfirmPassword: "",
      isConfirmPasswordEmpty: false,
      customerPhoneNumber: "",
      isPhoneNumberEmpty: false,
      isPasswordMatch: true,
      isButtonActive: false,
      isCreating: false,
      error: false,
      redirecting: false,
      errorRedirect: false,
    };
  }

  signIn(e) {
    e.preventDefault()
    Router.push({
      pathname: '/login'
    })
  }

  handleFirstNameChange(e) {
    this.setState({
      customerFirstName: e.target.value,
      isFirstNameEmpty: e.target.value === "" ? true : false,
      error: false,
    });
  }

  handleLastNameChange(e) {
    this.setState({
      customerLastName: e.target.value,
      isLastNameEmpty: e.target.value === "" ? true : false,
      error: false,
    });
  }

  handleEmailChange(e) {
    this.setState({
      customerEmail: e.target.value,
      isEmailEmpty: e.target.value === "" ? true : false,
      error: false,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      customerPassword: e.target.value,
      isPasswordEmpty: e.target.value === "" ? true : false,
      error: false,
    });
  }

  handleConfirmPasswordChange(e) {
    this.setState({
      customerConfirmPassword: e.target.value,
      isConfirmPasswordEmpty: e.target.value === "" ? true : false,
      error: false,
    });
  }
  
  handlePhoneNumberChange(e) {
    if (isNaN(e.target.value)) {
      //Letters
    } 
    else if (e.target.value.includes("+") || e.target.value.includes("-") || e.target.value.includes(".")) {
      //Letters
    }
    else {
      //Valid Number
      this.setState({
        customerPhoneNumber: e.target.value,
        isPhoneNumberEmpty: e.target.value === "" ? true : false,
        error: false,
      });
    }
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

  onRegisterClick = () => {
    const {
      customerFirstName,
      customerLastName,
      customerEmail,
      customerPhoneNumber,
      customerPassword,
      customerConfirmPassword
    } = this.state;
    if (customerFirstName === "") {
      this.setState({
        isFirstNameEmpty: true
      });
    } else if (customerLastName === "") {
      this.setState({
        isLastNameEmpty: true
      });
    } else if ((customerEmail === "") || !this.validateEmail(customerEmail) ) {
      this.setState({
        isEmailEmpty: true
      });
    } else if ((customerPhoneNumber === "") || !this.validatePhoneNumber(customerPhoneNumber)) {
      this.setState({
        isPhoneNumberEmpty: true
      });
    } else if (customerPassword === "") {
      this.setState({
        isPasswordEmpty: true
      });
    } else if (customerConfirmPassword === "") {
      this.setState({
        isConfirmPasswordEmpty: true
      });
    } else if (customerPassword !== customerConfirmPassword) {
      this.setState({
        isPasswordMatch: false
      });
    } else {

      this.setState({
        isCreating: true,
      })
      
      var headers = {
        'Content-Type': 'application/json',
      }

      var body = {
        customerFirstName: customerFirstName,
        customerLastName: customerLastName,
        customerEmail: customerEmail,
        customerPhoneNumber: customerPhoneNumber,
        customerPassword: customerPassword,
        customerCountry: "Ireland",
        customerCountryCode: "+353"
      }

      var url = apis.POSTcustomersignup;

      axios.post(url, body, {headers: headers})
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              redirecting: true
            }, () => {
              this.loginRegisteredUser();
            })
          } 
        })
        .catch((error) => {
          if (error) {
            this.setState({
              error: true,
              isCreating: false
            })
          } 
        }); 
  
    }
  }

  loginRegisteredUser = () => {
    const { customerEmail, customerPassword, } = this.state;

    var data = {
      email: customerEmail,
      password: customerPassword
    }

    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.POSTcustomerlogin;

    axios.post(url, data, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: false,
            isCreating: false,
            redirecting: false
          })
          if (typeof this.state.returnurl === 'undefined') {
            window.location.assign(`${server}/`);
          }
          else {
            window.location.assign(`${server}${this.state.returnurl}`);
          }
        }
      })
      .catch((error) => {
        this.setState({
          errorRedirect: true,
          isCreating: false,
          redirecting: false
        })
      });
  }

  render() {
    return (
      <Layout title={'Register'}>
        <NextSeo
          config={{
            title: 'Register | FoodieBee - Corporate Catering Services and Marketplace | Local Caterers',
          }}
        />
        <div style={{backgroundColor: 'white'}}>
          <NavBar signIn={e=>this.signIn(e)}/>
          <div className="app justify-content-center align-items-center">
          <Container>
            <Row style={{flex: 1, display: 'flex'}} className="justify-content-center">
              <Col md="9" lg="7" xl="6">
                <Card  style={{boxShadow: '1px 1px 3px #9E9E9E'}} className="p-4">
                  <CardBody className="p-4">
                    <Form>
                      <h2>Register</h2>
                      <p className="text-muted">Create your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <a style={{color: 'gray', marginLeft: 2.5, marginRight: 2.5}} className="fa fa-user"></a>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          style={{ color: "black" }}
                          type="text" 
                          placeholder="First Name" 
                          autoComplete="firstname"
                          value={this.state.customerFirstName}
                          onChange={e => this.handleFirstNameChange(e)}
                          invalid={this.state.isFirstNameEmpty ? true : false} />
                        <FormFeedback>Please enter first name</FormFeedback>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <a style={{color: 'gray', marginLeft: 2.5, marginRight: 2.5}} className="fa fa-user"></a>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          style={{ color: "black" }}
                          type="text" 
                          placeholder="Last Name" 
                          autoComplete="lastname" 
                          value={this.state.customerLastName}
                          onChange={e => this.handleLastNameChange(e)}
                          invalid={this.state.isLastNameEmpty ? true : false} />
                        <FormFeedback>Please enter last name</FormFeedback>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          style={{ color: "black" }}
                          type="text" 
                          placeholder="Email" 
                          autoComplete="email"
                          value={this.state.customerEmail}
                          onChange={e => this.handleEmailChange(e)}
                          invalid={this.state.isEmailEmpty ? true : false} />
                        <FormFeedback>Please enter email in correct format</FormFeedback>
                      </InputGroup>
                       <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <a style={{color: 'gray', marginLeft: 2.5, marginRight: 2}} className="fa fa-phone"></a>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          style={{ color: "black" }}
                          value={this.state.customerPhoneNumber}
                          onChange={e => this.handlePhoneNumberChange(e)}
                          type="text"
                          placeholder="Phone number"
                          invalid={this.state.isPhoneNumberEmpty ? true : false}
                        />
                        <FormFeedback>Please enter phone number. Phone numbers should be 10 digits</FormFeedback>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <a style={{color: 'gray', marginLeft: 2.5, marginRight: 2.5}} className="fa fa-lock"></a>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          style={{ color: "black" }}
                          type="password" 
                          placeholder="Password" 
                          autoComplete="new-password" 
                          value={this.state.customerPassword}
                          onChange={e => this.handlePasswordChange(e)}
                          invalid={this.state.isPasswordEmpty ? true : false}
                          />
                        <FormFeedback>Please enter password</FormFeedback>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <a style={{color: 'gray', marginLeft: 2.5, marginRight: 2.5}} className="fa fa-lock"></a>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          style={{ color: "black" }}
                          type="password" 
                          placeholder="Repeat password" 
                          autoComplete="new-password"
                          value={this.state.customerConfirmPassword}
                          onChange={e => this.handleConfirmPasswordChange(e)}
                          invalid={this.state.isConfirmPasswordEmpty ? true : false}
                          />
                        <FormFeedback>Please confirm password again</FormFeedback>
                      </InputGroup>
                      {!this.state.isPasswordMatch ? <Label style={{color: 'red', fontSize: 13, marginBottom: 20}}>Password do not match</Label> : null}
                      {this.state.error ? <Label style={{color: 'red', fontSize: 13, marginBottom: 20}}>Error creating account. Please try again</Label> : null}
                      {this.state.errorRedirect ? <Label style={{color: 'green', fontSize: 15, marginBottom: 20}}>Account created successfully. Click <a style={{fontWeight: '600'}} href="/">here</a> to go to homepage.</Label> : null}
                      <Button disabled={this.state.isCreating ? true : false} style={{paddingTop:10, paddingBottom: 10}} color="success" onClick={() => this.onRegisterClick()} block> {this.state.isCreating ? this.state.redirecting ? "Redirecting..." : "Creating..." : "Create Account"}</Button>
                    </Form>
                  </CardBody>
                </Card>
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

export default Register;
