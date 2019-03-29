import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import NavBar from '../../components/NavBar/NavBar';

class Banner extends Component {

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
    this.props.history.push('/login')
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
      this.props.history.push('/caterer')
    }
    this.props.history.push('/caterer')
  }


  render() {
    return (
      <div style={{backgroundColor: 'white'}}>
         <NavBar signIn={e=>this.signIn(e)}/>
      <div className="app justify-content-center align-items-center">
       
        <Container>
          <Row className="justify-content-center">
           
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
                        <Input value={this.state.useremail} onChange={(e) => this.handleEmailChange(e)} style={{marginLeft:20}} type="text" placeholder="Email" autoComplete="email" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input value={this.state.userpassword} onChange={(e) => this.handlePasswordChange(e)} style={{marginLeft:20}} type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6" md="6">
                          <Button onClick={e => this.login(e)} color="primary" className="px-4">Login</Button>
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
                <Card className="text-white bg-primary py-4" >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                   
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register As Member</Button>
                      </Link>
                      <h2 style={{marginTop: 45}}>I'm a Caterer</h2>
                      <Link to="/register">
                        <Button style={{backgroundColor: 'white', fontWeight: '500'}} color="link" className="mt-3" >Register As Caterer</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            
          </Row>
        </Container>
      </div>
      
      </div>
    );
  }
}

export default Banner;
