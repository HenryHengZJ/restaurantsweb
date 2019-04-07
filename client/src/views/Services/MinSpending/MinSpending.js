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
import CurrencyInput from "react-currency-input";


class MinSpending extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  
    this.state = {
      minspending: true,
      minspendingfee: 0
    };

  }

  toggle() {
    this.setState({ minspending: !this.state.minspending });
  }

  handleNext() {
    const {minspendingfee} = this.state
    alert(minspendingfee)
  }

  handlePriceChange(e, value) {
    this.setState({
      minspendingfee: Number(value).toFixed(2)
    });
  }

  render() {
    const center = this.state.center;
    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            <Card >
              <CardHeader>
                <strong>Minimum Spending</strong>
              </CardHeader>
              <CardBody>

                <FormGroup row className="my-0">
                  <Col xs="12">
                    <Label>How much is the minimum spending that is required for customers in order to place an order?</Label>
                  </Col>
                </FormGroup>

                <Collapse style={{paddingTop: 20}} isOpen={this.state.minspending} >

                <FormGroup row>
                  <Col xs="4" md="3">
                    <h6>Minimum Spending:</h6>
                  </Col>
                  <Col style={{padding:0}} xs="8" md="9">
                    <InputGroup style={{padding: 0}} className="input-prepend">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>€</InputGroupText>
                      </InputGroupAddon>
                      <CurrencyInput
                        style={{
                          borderWidth: 1,
                          borderColor: "rgba(211,211,211,0.3)",
                          paddingLeft: 10,
                          color: "black",
                          width: 100
                        }}
                        value={this.state.minspendingfee}
                        onChange={(e, value) => this.handlePriceChange(e, value)}
                        placeholder="0.00"
                        required
                      />
                    </InputGroup>
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

export default MinSpending;
