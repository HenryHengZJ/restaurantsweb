import React, { Component } from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Router from 'next/router'

class Page404 extends Component {

  constructor(props) {
    super(props);
  }
  
  signIn(e) {
    e.preventDefault()
    Router.push({
      pathname: '/login'
    })
  }

  render() {
    return (
      <Layout>
        <div style={{backgroundColor: 'white'}}>
        <NavBar signIn={e=>this.signIn(e)}/>
        <div className="app justify-content-center align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">Oops! You're lost.</h4>
                <p className="text-muted float-left">The page you are looking for was not found.</p>
              </div>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-search"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input size="16" type="text" placeholder="What are you looking for?" />
                <InputGroupAddon addonType="append">
                  <Button color="info">Search</Button>
                </InputGroupAddon>
              </InputGroup>
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

export default Page404;
