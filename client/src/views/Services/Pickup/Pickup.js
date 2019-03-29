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

class Pickup extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleNext = this.handleNext.bind(this);

    this.state = {
      pickup: true,
    };

  }

  toggle() {
    this.setState({ pickup: !this.state.pickup });
  }

  handleNext() {
    const {pickup} = this.state
    alert(pickup)
  }

  render() {
 
    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            <Card >
              <CardHeader>
                <strong>Pickup Option</strong>
              </CardHeader>
              <CardBody>

                <FormGroup row className="my-0">
                  <Col xs="10">
                    <Label htmlFor="Pickup">Do you offer pickup from your location?</Label>
                  </Col>
                  <Col xs="2">
                    <AppSwitch onChange={this.toggle} className={'mx-1 float-right'} variant={'3d'} color={'success'} checked={this.state.pickup} label dataOn={'Yes'} dataOff={'No'}/>   
                  </Col>
                </FormGroup>
                
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

export default Pickup;
