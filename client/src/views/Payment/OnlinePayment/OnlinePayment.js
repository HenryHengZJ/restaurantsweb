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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class OnlinePayment extends Component {

  constructor(props) {
    super(props);

    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);

    this.state = {
      collapse: true,
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      isMasterCardChecked: true,
      isVisaCardChecked: true,
      isAmericanExpressChecked: true,

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

  toggleModal() {
    this.setState({
      pgprovidermodal: !this.state.pgprovidermodal,
    });
  }

  handleNext() {
    const {isMasterCardChecked, isVisaCardChecked, isAmericanExpressChecked} = this.state
  }

  handleCheckbox(e) {
    const name = e.target.name;
    const checked = e.target.checked;
    this.setState({
      [name]: !this.state[name]
    })
  }

  renderPGProviderModal() {
    return (
      <Modal isOpen={this.state.pgprovidermodal} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Payment Gateway Provider</ModalHeader>
        <ModalBody>
          <img style={{objectFit:'cover', width: 80, height: 45 }} src={'https://icons-for-free.com/free-icons/png/512/701548.png'}  />
          <div style={{ marginTop: 20 }}>
            <span><a className="h6" href="https://stripe.com/ie/payments">Stripe</a> is a technology company that allows individuals and businesses to receive payments over the Internet. Stripe provides the technical, fraud prevention, and banking infrastructure required to operate on-line payment systems.</span>
          </div>
          <div style={{ marginTop: 20 }}>
            <Table bordered responsive>
              <tbody>
                <tr>
                  <td >Setup fee:</td>
                  <td className="h6">€0</td>
                </tr>
                <tr>
                  <td >Monthly fee:</td>
                  <td className="h6">€0</td>
                </tr>
                <tr>
                  <td >Transaction fee:</td>
                  <td>
                    <span><strong>1.4% + €0.25</strong> (European cards) *excluding VAT</span>
                    <div>
                      <span><strong>2.9% + €0.25</strong> (Non-European cards) *excluding VAT</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td >Payout:</td>
                  <td>
                    <span><strong>Daily</strong> (7 day rolling basis)</span>
                  </td>
                </tr>
                <tr>
                  <td >Application:</td>
                  <td>
                    <span><strong>Online</strong> (Approval usually within hours)</span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.toggleModal} color="primary" >Got It</Button>
        </ModalFooter>
      </Modal>
    )
  }

  renderCard(cardName, cardChecked, srcimg) {
    return(
      <Card style={{marginLeft: 15, borderColor: cardChecked ? '#20a8d8': null}}>
        <CardBody>
          <Col>
            <Input style={{ width: 15, height: 15 }} onChange={this.handleCheckbox} name={cardName} className="form-check-input" type="checkbox" value={cardChecked} checked={cardChecked} />
            <img style={{ marginLeft: 10, objectFit:'cover', width: 60, height: 30 }} src={srcimg}  />
          </Col>
        </CardBody>
      </Card>
    )
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col xs="12" md="9" sm="9" lg="6">
            <Card >
              <CardHeader>
                <strong>Online Payment</strong>
              </CardHeader>
              <CardBody>

                <FormGroup row className="my-0">
                  <Col xs="10">
                    <Label htmlFor="OnlinePayment">Do you accept online / credit card payments?</Label>
                  </Col>
                  <Col xs="2">
                    <AppSwitch onChange={this.toggle} className={'mx-1 float-right'} variant={'3d'} color={'success'} checked={true} label dataOn={'Yes'} dataOff={'No'}/>   
                  </Col>
                </FormGroup>

                <Collapse style={{paddingTop: 20}} isOpen={this.state.collapse} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                  <Row>
                    {this.renderCard('isVisaCardChecked', this.state.isVisaCardChecked, 'https://cdn1.iconfinder.com/data/icons/credit-card-icons/512/visa.png')}
                    {this.renderCard('isMasterCardChecked', this.state.isMasterCardChecked, 'https://cdn1.iconfinder.com/data/icons/credit-card-icons/512/master.png')}
                    {this.renderCard('isAmericanExpressChecked', this.state.isAmericanExpressChecked, 'https://cdn4.iconfinder.com/data/icons/simple-peyment-methods/512/amex_american_express-512.png')}
                  </Row>
                  <div>
                    <Label style={{marginTop: 10, marginBottom: 20}}>Payment Gateway Provider</Label>
                    <Row>
                      <Card style={{marginLeft: 15, borderColor: '#20a8d8'}}>
                        <CardBody>
                          <Col>
                            <img style={{ objectFit:'cover', width: 60, height: 30 }} src={'https://icons-for-free.com/free-icons/png/512/701548.png'}  />
                          </Col>
                        </CardBody>
                      </Card>
                      <Button onClick={this.toggleModal} color="link">What is Stripe?</Button>
                    </Row>
                  </div>
                </Collapse>

                <div className="form-actions">
                  <Button style={{marginTop: 20}} onClick={this.handleNext} className="float-right" type="submit" color="primary">Next</Button>
                </div>

                {this.renderPGProviderModal()}
               
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default OnlinePayment;
