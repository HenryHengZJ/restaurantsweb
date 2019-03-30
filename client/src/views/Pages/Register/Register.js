import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';


class Register extends Component {

  constructor(props) {
    super(props);
  }

  signIn(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    return (

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
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="First Name" autoComplete="firstname" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Last Name" autoComplete="lastname" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
               
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
      </div>
    );
  }
}

export default Register;
