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
import TimeField from 'react-simple-timefield';

class OpeningHours extends Component {

  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.onMondayStartingTimeChange = this.onMondayStartingTimeChange.bind(this);
    this.onTuesdayStartingTimeChange = this.onTuesdayStartingTimeChange.bind(this);
    this.onWednesdayStartingTimeChange = this.onWednesdayStartingTimeChange.bind(this);
    this.onThursdayStartingTimeChange = this.onThursdayStartingTimeChange.bind(this);
    this.onFridayStartingTimeChange = this.onFridayStartingTimeChange.bind(this);
    this.onSaturdayStartingTimeChange = this.onSaturdayStartingTimeChange.bind(this);
    this.onSundayStartingTimeChange = this.onSundayStartingTimeChange.bind(this);

    this.onMondayClosingTimeChange = this.onMondayClosingTimeChange.bind(this);
    this.onTuesdayClosingTimeChange = this.onTuesdayClosingTimeChange.bind(this);
    this.onWednesdayClosingTimeChange = this.onWednesdayClosingTimeChange.bind(this);
    this.onThursdayClosingTimeChange = this.onThursdayClosingTimeChange.bind(this);
    this.onFridayClosingTimeChange = this.onFridayClosingTimeChange.bind(this);
    this.onSaturdayClosingTimeChange = this.onSaturdayClosingTimeChange.bind(this);
    this.onSundayClosingTimeChange = this.onSundayClosingTimeChange.bind(this);

    this.state = {
      mondaystartingtime: '08:00',
      mondayclosingtime: '22:00',
      tuesdaystartingtime: '08:00',
      tuesdayclosingtime: '22:00',
      wednesdaystartingtime: '08:00',
      wednesdayclosingtime: '22:00',
      thursdaystartingtime: '08:00',
      thursdayclosingtime: '22:00',
      fridaystartingtime: '08:00',
      fridayclosingtime: '22:00',
      saturdaystartingtime: '08:00',
      saturdayclosingtime: '22:00',
      sundaystartingtime: '08:00',
      sundayclosingtime: '22:00',
    };

  }
  
  handleNext() {
    const {mondaystartingtime, mondayclosingtime, tuesdaystartingtime, tuesdayclosingtime, wednesdaystartingtime, wednesdayclosingtime,
      thursdaystartingtime, thursdayclosingtime, fridaystartingtime, fridayclosingtime, saturdaystartingtime, saturdayclosingtime, sundaystartingtime, sundayclosingtime} = this.state
  
    var openinghours = {
      "Monday": {"startingtime": mondaystartingtime, "closingtime": mondayclosingtime},
      "Tuesday": {"startingtime": tuesdaystartingtime, "closingtime": tuesdayclosingtime},
      "Wednesday": {"startingtime": wednesdaystartingtime, "closingtime": wednesdayclosingtime},
      "Thursday": {"startingtime": thursdaystartingtime, "closingtime": thursdayclosingtime},
      "Friday": {"startingtime": fridaystartingtime, "closingtime": fridayclosingtime},
      "Saturday": {"startingtime": saturdaystartingtime, "closingtime": saturdayclosingtime},
      "Sunday": {"startingtime": sundaystartingtime, "closingtime": sundayclosingtime}
    }

    alert(JSON.stringify(openinghours))
  }

  onMondayStartingTimeChange(mondaystartingtime) {
    this.setState({mondaystartingtime});
  }

  onTuesdayStartingTimeChange(tuesdaystartingtime) {
    this.setState({tuesdaystartingtime});
  }

  onWednesdayStartingTimeChange(wednesdaystartingtime) {
    this.setState({wednesdaystartingtime});
  }

  onThursdayStartingTimeChange(thursdaystartingtime) {
    this.setState({thursdaystartingtime});
  }

  onFridayStartingTimeChange(fridaystartingtime) {
    this.setState({fridaystartingtime});
  }

  onSaturdayStartingTimeChange(saturdaystartingtime) {
    this.setState({saturdaystartingtime});
  }

  onSundayStartingTimeChange(sundaystartingtime) {
    this.setState({sundaystartingtime});
  }


  onMondayClosingTimeChange(mondayclosingtime) {
    this.setState({mondayclosingtime});
  }

  onTuesdayClosingTimeChange(tuesdayclosingtime) {
    this.setState({tuesdayclosingtime});
  }

  onWednesdayClosingTimeChange(wednesdayclosingtime) {
    this.setState({wednesdayclosingtime});
  }

  onThursdayClosingTimeChange(thursdayclosingtime) {
    this.setState({thursdayclosingtime});
  }

  onFridayClosingTimeChange(fridayclosingtime) {
    this.setState({fridayclosingtime});
  }

  onSaturdayClosingTimeChange(saturdayclosingtime) {
    this.setState({saturdayclosingtime});
  }

  onSundayClosingTimeChange(sundayclosingtime) {
    this.setState({sundayclosingtime});
  }


  render() {

    const {mondaystartingtime, mondayclosingtime, tuesdaystartingtime, tuesdayclosingtime, wednesdaystartingtime, wednesdayclosingtime,
       thursdaystartingtime, thursdayclosingtime, fridaystartingtime, fridayclosingtime, saturdaystartingtime, saturdayclosingtime, sundaystartingtime, sundayclosingtime} = this.state
    
    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            <Card >
              <CardHeader>
                <strong>Opening Hours</strong>
              </CardHeader>
              <CardBody>

                <Label htmlFor="OpeningHours">Please select times for your restaurant opening hours</Label>
                
                <table className="w-100" style={{marginTop: 20}}>
                  <thead>
                    <tr>
                      <td>
                        <Label className="h6" style={{color: "black", justifyContent: 'center'}}>Day</Label>
                      </td>
                      <td>
                        <Label className="h6" style={{marginLeft: 10, color: "black", justifyContent: 'center'}}>Time</Label>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Label style={{justifyContent: 'center'}}>Monday</Label>
                      </td>
                      <td>
                        <Row style={{margin: 10}}>
                          <TimeField 
                            style={{textAlign: 'center', width: 80, padding: '5px 8px'}} value={mondaystartingtime} onChange={this.onMondayStartingTimeChange} />
                          <Label style={{marginTop: 5, marginLeft: 10, marginRight: 10, justifyContent: 'center', alignSelf: 'center'}}>-</Label>
                          <TimeField 
                            style={{textAlign: 'center', width: 80, padding: '5px 8px'}} value={mondayclosingtime} onChange={this.onMondayClosingTimeChange} />
                        </Row>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <Label style={{justifyContent: 'center'}}>Tuesday</Label>
                      </td>
                      <td>
                        <Row style={{margin: 10}}>
                          <TimeField 
                            style={{textAlign: 'center', width: 80, padding: '5px 8px'}} value={tuesdaystartingtime} onChange={this.onTuesdayStartingTimeChange} />
                          <Label style={{marginTop: 5, marginLeft: 10, marginRight: 10, justifyContent: 'center', alignSelf: 'center'}}>-</Label>
                          <TimeField 
                            style={{textAlign: 'center', width: 80, padding: '5px 8px'}} value={tuesdayclosingtime} onChange={this.onTuesdayClosingTimeChange} />
                        </Row>
                      </td>
                    </tr>

                     <tr>
                      <td>
                        <Label style={{justifyContent: 'center'}}>Wednesday</Label>
                      </td>
                      <td>
                        <Row style={{margin: 10}}>
                          <TimeField 
                            style={{textAlign: 'center', width: 80, padding: '5px 8px'}} value={wednesdaystartingtime} onChange={this.onWednesdayStartingTimeChange} />
                          <Label style={{marginTop: 5, marginLeft: 10, marginRight: 10, justifyContent: 'center', alignSelf: 'center'}}>-</Label>
                          <TimeField 
                            style={{textAlign: 'center', width: 80, padding: '5px 8px'}} value={wednesdayclosingtime} onChange={this.onWednesdayClosingTimeChange} />
                        </Row>
                      </td>
                    </tr>

                     <tr>
                      <td>
                        <Label style={{justifyContent: 'center'}}>Thursday</Label>
                      </td>
                      <td>
                        <Row style={{margin: 10}}>
                          <TimeField 
                            style={{textAlign: 'center', width: 80, padding: '5px 8px'}} value={thursdaystartingtime} onChange={this.onThursdayStartingTimeChange} />
                          <Label style={{marginTop: 5, marginLeft: 10, marginRight: 10, justifyContent: 'center', alignSelf: 'center'}}>-</Label>
                          <TimeField 
                            style={{textAlign: 'center', width: 80, padding: '5px 8px'}} value={thursdayclosingtime} onChange={this.onThursdayClosingTimeChange} />
                        </Row>
                      </td>
                    </tr>

                     <tr>
                      <td>
                        <Label style={{justifyContent: 'center'}}>Friday</Label>
                      </td>
                      <td>
                        <Row style={{margin: 10}}>
                          <TimeField 
                            style={{textAlign: 'center', width: 80, padding: '5px 8px'}} value={fridaystartingtime} onChange={this.onFridayStartingTimeChange} />
                          <Label style={{marginTop: 5, marginLeft: 10, marginRight: 10, justifyContent: 'center', alignSelf: 'center'}}>-</Label>
                          <TimeField 
                            style={{textAlign: 'center', width: 80, padding: '5px 8px'}} value={fridayclosingtime} onChange={this.onFridayClosingTimeChange} />
                        </Row>
                      </td>
                    </tr>

                     <tr>
                      <td>
                        <Label style={{justifyContent: 'center'}}>Saturday</Label>
                      </td>
                      <td>
                        <Row style={{margin: 10}}>
                          <TimeField 
                            style={{textAlign: 'center', width: 80, padding: '5px 8px'}} value={saturdaystartingtime} onChange={this.onSaturdayStartingTimeChange} />
                          <Label style={{marginTop: 5, marginLeft: 10, marginRight: 10, justifyContent: 'center', alignSelf: 'center'}}>-</Label>
                          <TimeField 
                            style={{textAlign: 'center', width: 80, padding: '5px 8px'}} value={saturdayclosingtime} onChange={this.onSaturdayClosingTimeChange} />
                        </Row>
                      </td>
                    </tr>

                     <tr>
                      <td>
                        <Label style={{justifyContent: 'center'}}>Sunday</Label>
                      </td>
                      <td>
                        <Row style={{margin: 10}}>
                          <TimeField 
                            style={{textAlign: 'center', width: 80, padding: '5px 8px'}} value={sundaystartingtime} onChange={this.onSundayStartingTimeChange} />
                          <Label style={{marginTop: 5, marginLeft: 10, marginRight: 10, justifyContent: 'center', alignSelf: 'center'}}>-</Label>
                          <TimeField 
                            style={{textAlign: 'center', width: 80, padding: '5px 8px'}} value={sundayclosingtime} onChange={this.onSundayClosingTimeChange} />
                        </Row>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
                
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

export default OpeningHours;
