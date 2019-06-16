import React, { Component } from 'react';
import  Link  from 'next/link';
import Head from 'next/head';
import { Collapse, FormFeedback, Label, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Router from 'next/router'
import axios from "axios";
import apis from "../../apis";
import {server} from "../../config"
import {listCounties} from "../../utils"

class Account extends Component {

  constructor(props) {
    super(props);

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleCurrentPasswordChange = this.handleCurrentPasswordChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleCounty = this.handleCounty.bind(this);
    this.handleCity = this.handleCity.bind(this);

    this.CountyData = listCounties();

    this.state = {
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
      currentPassword: "",
      isCurrentPasswordEmpty: false,
      customerPhoneNumber: "",
      isPhoneNumberEmpty: false,
      customerCounty: "",
      customerCity: "",
      isPasswordMatch: true,
      isUpdating: false,
      updateStatus: "",
      isUpdatingPassword: false,
      updatePasswordStatus: "",
      error: false,
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
          console.log('account data =', response.data)
          this.setState({
            customerFirstName: typeof response.data[0].customerFirstName !== 'undefined' ? response.data[0].customerFirstName : "",
            customerLastName: typeof response.data[0].customerLastName !== 'undefined' ? response.data[0].customerLastName : "",
            customerEmail: typeof response.data[0].customerEmail !== 'undefined' ? response.data[0].customerEmail : "",
            customerPhoneNumber: typeof response.data[0].customerPhoneNumber !== 'undefined' ? response.data[0].customerPhoneNumber : "",
            customerCity: typeof response.data[0].customerCity !== 'undefined' ? response.data[0].customerCity : "",
            customerCounty: typeof response.data[0].customerCounty !== 'undefined' ? response.data[0].customerCounty : "",
          })
        } 
      })
      .catch((error) => {
      });
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

  handleCurrentPasswordChange(e) {
    this.setState({
      currentPassword: e.target.value,
      isCurrentPasswordEmpty: e.target.value === "" ? true : false,
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

  handleCounty(e) {
    this.setState(
      {
        customerCounty: e.target.value
      }
    );
  }

  handleCity(e) {
    this.setState(
      {
        customerCity: e.target.value
      }
    );
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

  onUpdateClick = () => {
    const {
      customerFirstName,
      customerLastName,
      customerEmail,
      customerPhoneNumber,
      customerCounty,
      customerCity
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
    } else {

      this.setState({
        isUpdating: true,
      })
      
      var headers = {
        'Content-Type': 'application/json',
      }

      var body = {
        customerFirstName: customerFirstName,
        customerLastName: customerLastName,
        customerEmail: customerEmail,
        customerPhoneNumber: customerPhoneNumber,
        customerCountry: "Ireland",
        customerCountryCode: "+353"
      }

      if (customerCounty !== "") {
        body.customerCounty = customerCounty
      }

      if (customerCity !== "") {
        body.customerCity = customerCity
      }

      var url = apis.UPDATEcustomerprofile;

      axios.put(url, body, {withCredentials: true}, {headers: headers})
        .then((response) => {
          if (response.status === 201) {
            this.setState({
              isUpdating: false,
              updateStatus: "Success"
            })
          } 
        })
        .catch((error) => {
          if (error) {
            this.setState({
              isUpdating: false,
              updateStatus: "Failed"
            })
          } 
        }); 
  
    }
  }

  onUpdatePasswordClick = () => {
    const {
      currentPassword,
      customerPassword,
      customerConfirmPassword
    } = this.state;

    if (customerPassword === "") {
      this.setState({
        isPasswordEmpty: true
      });
    }
    else if (customerConfirmPassword === "") {
      this.setState({
        isConfirmPasswordEmpty: true
      });
    } else if (customerPassword !== customerConfirmPassword) {
      this.setState({
        isPasswordMatch: false
      });
    } else {

      this.setState({
        isUpdatingPassword: true,
      })
      
      var headers = {
        'Content-Type': 'application/json',
      }

      var body = {
        originalpassword: currentPassword,
        newpassword: customerPassword,
      }

      var url = apis.UPDATEcustomerpassword;

      axios.put(url, body, {withCredentials: true}, {headers: headers})
        .then((response) => {
          if (response.status === 201) {
            this.setState({
              isUpdatingPassword: false,
              updatePasswordStatus: "Success"
            })
          } 
        })
        .catch((error) => {
          if (error) {
            this.setState({
              isUpdatingPassword: false,
              updatePasswordStatus: "Failed"
            })
          } 
        }); 
    }
  }

  render() {
    return (
      <Row style={{flex: 1, display: 'flex'}} >
      
        
        <Col md="9" lg="7" xl="6">
          <Col style={{ paddingLeft:30, marginTop: 10, marginBottom: 20 }} xs="12" md="6">
            <b className="h5">Account Info</b>
          </Col>
          <Card  style={{boxShadow: 'none', borderWidth: 0}} >
            <CardBody className="p-4">
              <Form>
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
                      <a style={{color: 'gray', marginLeft: 2.5, marginRight: 2.5}} className="fa fa-phone"></a>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input 
                     style={{ color: "black" }}
                     type="text"
                     placeholder="Phone number"
                     autoComplete="phonenumber"
                     value={this.state.customerPhoneNumber}
                     onChange={e => this.handlePhoneNumberChange(e)}
                     invalid={this.state.isPhoneNumberEmpty ? true : false}/>
                   <FormFeedback>Please enter phone number. Phone numbers should be 10 digits</FormFeedback>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <a style={{color: 'gray', marginLeft: 4, marginRight: 3}} className="fa fa-map-marker"></a>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input 
                     style={{ color: "black" }}
                     type="text"
                     placeholder="City"
                     autoComplete="city"
                     value={this.state.customerCity}
                     onChange={e => this.handleCity(e)}/>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <a style={{color: 'gray', marginLeft: 2, marginRight: 2}} className="fa fa-map"></a>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input 
                     style={{ color: this.state.customerCounty !== "" ? "black" : null }}
                     value={this.state.customerCounty}
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
                </InputGroup>

                {this.state.updateStatus !== "" ? <Label style={{color: this.state.updateStatus === 'Success' ? 'green' : 'red', fontSize: 13}}> {this.state.updateStatus === 'Success' ? "Successfully updated account!" : "Error updating account. Please try again" } </Label> : null}
                <Button disabled={this.state.isUpdating} style={{marginTop:40, paddingBottom: 10}} onClick={()=>this.onUpdateClick()} color="success" block>{this.state.isUpdating ? "Updating..." : "Update Profile"}</Button>

              </Form>
            </CardBody>
          </Card>
        </Col>

        <Col md="9" lg="7" xl="6">
          <Col style={{ paddingLeft:30,  marginTop: 10, marginBottom: 20 }} xs="12" md="6">
            <b className="h5">Reset Password</b>
          </Col>
          <Card  style={{boxShadow: 'none', borderWidth: 0}} >
            <CardBody className="p-4">
              <Form>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <a style={{color: 'gray', marginLeft: 2.5, marginRight: 2.5}} className="fa fa-lock"></a>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input 
                    style={{ color: "black" }}
                    type="password" 
                    placeholder="Current Password" 
                    autoComplete="current-password" 
                    value={this.state.currentPassword}
                    onChange={e => this.handleCurrentPasswordChange(e)}
                    invalid={this.state.isCurrentPasswordEmpty ? true : false}
                    />
                <FormFeedback>Please enter current password</FormFeedback>
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
                    placeholder="New Password" 
                    autoComplete="new-password"
                    value={this.state.customerPassword}
                    onChange={e => this.handlePasswordChange(e)}
                    invalid={this.state.isPasswordEmpty ? true : false}
                    />
                <FormFeedback>Please enter new password</FormFeedback>
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
                    placeholder="Repeat New Password" 
                    autoComplete="repeat-password" 
                    value={this.state.customerConfirmPassword}
                    onChange={e => this.handleConfirmPasswordChange(e)}
                    invalid={this.state.isConfirmPasswordEmpty ? true : false}
                    />
                    <FormFeedback>Please confirm new password again</FormFeedback>
                </InputGroup>  

                {!this.state.isPasswordMatch ? <Label style={{color: 'red', fontSize: 13}}>Password do not match</Label> : null}
                {this.state.updatePasswordStatus !== "" ? <Label style={{color: this.state.updatePasswordStatus === 'Success' ? 'green' : 'red', fontSize: 13}}> {this.state.updatePasswordStatus === 'Success' ? "Successfully updated password!" : "Error updating password. Please try again" } </Label> : null}
                <Button disabled={this.state.currentPassword !== "" && this.state.customerPassword !== "" && this.state.customerConfirmPassword !== "" ? this.state.isUpdatingPassword ? true : false : true} style={{marginTop:40, paddingBottom: 10}} onClick={()=>this.onUpdatePasswordClick()} color="primary" block>{this.state.isUpdatingPassword ? "Updating..." : "Update Password" }</Button>
            
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Account;
