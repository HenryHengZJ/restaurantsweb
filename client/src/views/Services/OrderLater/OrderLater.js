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

class OrderLater extends Component {

  constructor(props) {
    super(props);

    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleOrderLaterMin = this.handleOrderLaterMin.bind(this);
    this.handleOrderLaterDay = this.handleOrderLaterDay.bind(this);
    this.handleNext = this.handleNext.bind(this);

    this.state = {
      collapse: false,
      status: 'Closed',
      orderlatermin: "60",
      orderlaterday: "4",
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

  handleOrderLaterMin(e) {
    if(isNaN(e.target.value)){
      //Letters
    }else {
      //Valid Number
      this.setState({ 
        orderlatermin: e.target.value,
      })
    }
  }

  handleOrderLaterDay(e) {
    if(isNaN(e.target.value)){
      //Letters
    }else {
      this.setState({ 
        orderlaterday: e.target.value,
      })
    }
  }

  handleNext() {
    const {orderlaterday, orderlatermin} = this.state
    var orderlater = {
      "InAdvanceMin": orderlatermin,
      "InAdvanceDay": orderlaterday
    }
    alert(orderlater)
  }

  render() {

    const {orderlaterday, orderlatermin} = this.state
    
    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            <Card >
              <CardHeader>
                <strong>Accept orders for later</strong>
              </CardHeader>
              <CardBody>

                <FormGroup row className="my-0">
                  <Col xs="10">
                    <Label htmlFor="OrderLater">Do you allow customer to "order for later" at any time, even when your restaurant is closed? Orders placed outside opening hours will queue up for acceptance as soon as your restaurant opens. </Label>
                  </Col>
                  <Col xs="2">
                    <AppSwitch onChange={this.toggle} className={'mx-1 float-right'} variant={'3d'} color={'success'} checked={false} label dataOn={'Yes'} dataOff={'No'}/>   
                  </Col>
                </FormGroup>

                <Collapse style={{paddingTop: 20}} isOpen={this.state.collapse} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                  <Label className="h6" >Order placement has to be at least:</Label>
                  <Row>
                    <Col>
                      <Input style={{color: 'black'}} type="text" value={orderlatermin} onChange={(e) => this.handleOrderLaterMin(e)}/>
                    </Col>
                    <Col>
                      <Input className="text-center" style={{color: 'black'}} type="text" value="min" disabled />
                    </Col>
                    <Col>
                      <Label style={{paddingTop:10}}> in advance</Label>
                    </Col>
                  </Row>

                  <Label className="h6" style={{marginTop:20}}>Order placement cannot placed more than</Label>
                  <Row>
                    <Col>
                      <Input style={{color: 'black'}} type="text" value={orderlaterday} onChange={(e) => this.handleOrderLaterDay(e)}/>
                    </Col>
                    <Col>
                      <Input className="text-center" style={{color: 'black'}} type="text" value="days" disabled />
                    </Col>
                    <Col>
                      <Label style={{paddingTop:10}}> in advance</Label>
                    </Col>
                  </Row>
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

export default OrderLater;
