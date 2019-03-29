import React, { Component } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class ValidateEmail extends Component {

  constructor(props) {
    super(props);

    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleDomainName = this.handleDomainName.bind(this);
    this.handleNext = this.handleNext.bind(this);

    this.state = {
      collapse: false,
      accordion: [true, false, false],
      custom: [true, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      domainName: "",
    };

  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  handleDomainName(e) {
    this.setState({ 
      domainName: e.target.value,
    })
  }

  handleNext() {
    const {domainName} = this.state
    alert(domainName)
  }

  render() {

    const {domainName} = this.state
    
    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            <Card >
              <CardHeader>
                <strong>Please Validate Email Address</strong>
              </CardHeader>
              <CardBody>

                
                  
                <Label htmlFor="ValidateEmail">A moment ago we have sent you an email to</Label>
                <Label style={{paddingLeft: 5}} className="font-weight-bold">hzj94@hotmail.com</Label>
                  
                <div>
                  <Button style={{marginTop: 10, marginBottom: 20}} disabled color="danger" className="btn-pill">Pending</Button>
                </div>

                <div>
                  <Label>Please click on the link in order to validate your email address.</Label>
                </div>

                <div className="form-actions">
                  <Button style={{marginTop: 10}} className="float-left" onClick={this.handleNext} outline color="primary">Resend activation email</Button>
                </div>
               
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ValidateEmail;
