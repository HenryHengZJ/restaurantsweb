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

class Website extends Component {

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
                <strong>Restaurant Website</strong>
              </CardHeader>
              <CardBody>

                <FormGroup row className="my-0">
                  <Col xs="10">
                    <Label htmlFor="website">Do you have a real www. domain website?</Label>
                  </Col>
                  <Col xs="2">
                    <AppSwitch onChange={this.toggle} className={'mx-1 float-right'} variant={'3d'} color={'success'} checked={false} label dataOn={'Yes'} dataOff={'No'}/>   
                  </Col>
                </FormGroup>

                <Collapse style={{paddingTop: 20}} isOpen={this.state.collapse} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                  <FormGroup row>
                    <Col xs="3" md="3">
                      <Input className="text-center" style={{color: 'black'}} type="text" value="www." disabled />
                    </Col>
                    <Col xs="9" md="9">
                      <Input style={{color: 'black'}} type="text" value={domainName} onChange={(e) => this.handleDomainName(e)}/>
                    </Col>
                  </FormGroup>
                </Collapse>

                <div className="form-actions">
                  <Button style={{marginTop: 20}} onClick={this.handleNext} className="float-right" type="submit" color="primary">Next</Button>
                </div>
               
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Website;
