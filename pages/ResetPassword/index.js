import React, { Component } from 'react';
import { FormFeedback, Label, Button, Card, CardBody, CardGroup, Col, Container, Form, FormText, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import axios from "axios";
import apis from "../../apis";
import Router from 'next/router'
import { server } from '../../config';
import NextSeo from 'next-seo';

class ResetPassword extends Component {

  static async getInitialProps({query: { resetPasswordToken }}) {

    var url = `${server}${apis.GETresetpassword}` + "?resetPasswordToken=" + resetPasswordToken;

    var customerID = "";
    try{
      //get Stickers
      const res = await axios.get(url)
      if(res && res.data && typeof res.data !== 'undefined'){
        customerID = res.data.customerID
      }
    } catch(error){
      console.error(error)
    }

    return {
      customerID: customerID
    };
  }

  componentWillMount() {
    this.setState({
      customerID: this.props.customerID,
      error: this.props.customerID === '' ? true : false
    })
  }

  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmpassword: "",
      error: false,
      emailsending: false,
      customerID: null,
      passwordnotmatch: false,
      updatePassword: null,
    };
  }


  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirmPasswordChange(e) {
    this.setState({ confirmpassword: e.target.value });
  }

  sendClicked = () => {
    const { password, customerID, confirmpassword} = this.state;

    if (confirmpassword === password) {
      this.setState({
        emailsending: true
      })
  
      var headers = {
        'Content-Type': 'application/json',
      }
  
      var body = {
        catererPassword: password
      }
  
      var url = apis.PUTupdatepassword + "?_id=" + customerID;
  
      axios.put(url, body, {headers: headers})
        .then((response) => {
          if (response.status === 201) {
            this.setState({
              password: "",
              confirmpassword: "",
              emailsending: false,
              updatePassword: "Success"
            })
          } 
        })
        .catch((error) => {
          this.setState({
            password: "",
            confirmpassword: "",
            error: true,
            emailsending: false,
            updatePassword: "Failed"
          })
        });
    }
    else {
      this.setState({
        passwordnotmatch: true
      })
    }
  };

  backClicked = () => {
    window.location.assign(`${server}`);
  };

  signIn(e) {
    e.preventDefault()
    Router.push({
      pathname: '/login',
      query: {'returnurl': `/searchcaterer?${this.state.locationquerystring}${this.state.occasionquerystring}`}
    })
  }

  renderError() {
    return (
      <Form>
        <h2>Ooops!</h2>
        <p className="text-muted">
          Error resetting your password. Please send another resend link.
        </p>
        <Button color="primary" block onClick={() => this.backClicked()}>
          Back
        </Button>
      </Form>
    );
  }

  renderSuccess() {
    return (
      <Form>
        <h2>Success</h2>
        <p className="text-muted">Password has been successfully changed.</p>
        <Button color="success" block onClick={() => this.backClicked()}>
          Back
        </Button>
      </Form>
    );
  }
  
  render() {

    return (
    <Layout title={"Reset Password"}>
      <NextSeo
        config={{
          title: 'Reset Password | FoodieBee - Corporate Catering Services and Marketplace | Local Caterers',
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
                    {this.state.error || this.state.updatePassword === 'Failed' ? (
                      this.renderError()
                    ) : 
                    this.state.updatePassword === 'Success' ? (
                      this.renderSuccess()
                    ) : 
                    (
                      <Form>
                        <h2>Reset Password</h2>
                        <p className="text-muted">
                          Enter your new password below.
                        </p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <a
                                style={{
                                  color: "gray",
                                  marginLeft: 2.5,
                                  marginRight: 2.5
                                }}
                                className="fa fa-lock"
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Password"
                            autoComplete="password"
                            onChange={e => this.handlePasswordChange(e)}
                          />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <a
                                style={{
                                  color: "gray",
                                  marginLeft: 2.5,
                                  marginRight: 2.5
                                }}
                                className="fa fa-lock"
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                            autoComplete="confirmpassword"
                            onChange={e => this.handleConfirmPasswordChange(e)}
                          />
                        </InputGroup>
                        {this.state.passwordnotmatch ? <Label style={{color: 'red', marginBottom: 20, fontSize: 13}}>* Passwords do not match</Label> : null }
                        <Button
                          color="success"
                          block
                          disabled={this.state.password === "" ? true : false}
                          onClick={() => this.sendClicked()}
                        >
                          Update
                        </Button>
                      </Form>
                    )}
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

export default ResetPassword;
