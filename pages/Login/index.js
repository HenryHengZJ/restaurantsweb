import React, { Component } from 'react';
import  Link  from 'next/link';
import Head from 'next/head';
import Router from 'next/router'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Login extends Component {

  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
 
    this.state = {
      useremail: "",
      userpassword: "",
    }
  }

  signIn(e) {
    e.preventDefault()
    Router.push({
      pathname: '/login'
    })
  }

  handleEmailChange(e) {
    this.setState({ useremail: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ userpassword: e.target.value });
  }

  login = (e) => {
    e.preventDefault()
    const {userpassword, useremail, } = this.state;
    if (useremail === 'user' && userpassword === '12345') {
    //  this.props.history.push('/caterer')
    }
   // this.props.history.push('/caterer')
  }


  caterersignup = (e) => {
    e.preventDefault()
    Router.push({
      pathname: '/caterersignup'
    })
  }

  signupmember = (e) => {
    e.preventDefault()
    Router.push({
      pathname: '/register'
    })
  }

  render() {
    return (
      <Layout title={'Login FoodieBee - Catering Service'}>
        <div style={{backgroundColor: 'white'}}>
          <NavBar signIn={e=>this.signIn(e)}/>
          <div className="app justify-content-center align-items-center">
          <Container>
            <Row style={{marginTop: 20, flex: 1, display: 'flex'}} className="justify-content-center">
              <Col xs="12" md="6">
                <Card style={{boxShadow: '1px 1px 3px #9E9E9E'}} className="p-4">
                  <CardBody className="text-center">
                    <Form>
                      <h2>Login</h2>
                      <p style={{marginBottom:20}} className="text-muted text-center">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input value={this.state.useremail} onChange={(e) => this.handleEmailChange(e)} type="text" placeholder="Email" autoComplete="email" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <a style={{color: 'gray', marginLeft: 2.5, marginRight: 2.5}} className="fa fa-lock"></a>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input value={this.state.userpassword} onChange={(e) => this.handlePasswordChange(e)} type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6" md="6">
                          <Button style={{backgroundColor: '#20a8d8'}} onClick={e => this.login(e)} color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" md="6" >
                          <Button style={{boxShadow: 'none', background: 'none', fontWeight: '500'}} color="link" className="px-4">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                </Col>

                <Col xs="12" md="6">
                  <Card style={{backgroundColor: "#20a8d8"}} className="text-white py-4" >
                    <CardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        
                        <Button onClick={(e) => this.signupmember(e)} color="primary" className="mt-3" active tabIndex={-1}>Register As Member</Button>
                        
                        <h2 style={{marginTop: 45}}>I'm a Caterer</h2>
                        
                        <Button onClick={(e) => this.caterersignup(e)} style={{backgroundColor: 'white', fontWeight: '500'}} color="link" className="mt-3" >Register As Caterer</Button>
                        
                      </div>
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

export default Login;