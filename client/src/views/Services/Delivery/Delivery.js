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
import GoogleMapReact from 'google-map-react';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'transparent',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    <img style={ { objectFit:'cover', width: 40, height: 40 }} src={require('../../../assets/img/mapmarker.png')}/>
  </div>
);


class Delivery extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleNext = this.handleNext.bind(this);
  
    this.state = {
      delivery: true,
      latitude: 53.349244,
      longitude: -6.2693076,
      radius: 1000,
      center: {
        lat: 53.349244,
        lng: -6.2693076
      }
    };

  }

  toggle() {
    this.setState({ delivery: !this.state.delivery });
  }

  handleNext() {
    const {delivery} = this.state
    alert(delivery)
  }

  addCircle = (map, maps) => {
    var newcircle = new maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.3,
      editable: true,
      map,
      center: { lat: this.state.latitude, lng: this.state.longitude },
      radius: 1000
    });
    newcircle.setMap(map);
    // Add an event listener on the rectangle.
    newcircle.addListener("radius_changed", () => {
      // alert(newcircle.getRadius());
      this.setState({
        radius: Math.floor(newcircle.getRadius()) 
      });
    });
  };

  render() {
    const center = this.state.center;
    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            <Card >
              <CardHeader>
                <strong>Delivery Option</strong>
              </CardHeader>
              <CardBody>

                <FormGroup row className="my-0">
                  <Col xs="10">
                    <Label htmlFor="Delivery">Do you offer food delivery?</Label>
                  </Col>
                  <Col xs="2">
                    <AppSwitch onChange={this.toggle} className={'mx-1 float-right'} variant={'3d'} color={'success'} checked={this.state.delivery} label dataOn={'Yes'} dataOff={'No'}/>   
                  </Col>
                </FormGroup>

                <Collapse style={{paddingTop: 20}} isOpen={this.state.delivery} >

                <h6>Delivery Radius: <b style={{color: 'green'}}>{this.state.radius}</b>km</h6>

                <div style={{ marginTop: 20, height: 500, width: '100%' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: [GOOGLE_API_KEY] }}
                    center={center}
                    zoom={14}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({ map, maps }) => this.addCircle(map, maps)}
                  >
                    <AnyReactComponent 
                      lat={this.state.latitude} 
                      lng={this.state.longitude} 
                      text={'Select Area'} 
                    />
                  </GoogleMapReact>
                </div>

             
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

export default Delivery;
