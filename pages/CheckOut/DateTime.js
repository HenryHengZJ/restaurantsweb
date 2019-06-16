import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Label,
  FormGroup,
  FormFeedback,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import Dotdotdot from "react-dotdotdot";
import ContentLoader, { Facebook } from "react-content-loader";
import Router from 'next/router'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import { Calendar } from "react-date-range";
import moment from "moment";
import axios from "axios";
import apis from "../../apis";
import {server} from "../../config"
import { timeRanges } from  "../../utils"
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node,
  };
  
const defaultProps = {};

class DateTime extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTime: "",
      selectedDate: "",
      maxDate: null,
      dropDownDate: false,
      catererNotAvailable: false,
      isProceedAvailable: true,
    };

    this.time = timeRanges()
  }

  componentDidMount() {

    var currentDate = moment().toDate();
    this.setState({
      maxDate: currentDate,
    });

    if (sessionStorage.getItem('selectedDate')) {
        this.setState({
            selectedDate: sessionStorage.getItem('selectedDate')
        })
    }

    if (sessionStorage.getItem('selectedTime')) {
        this.setState({
            selectedTime: sessionStorage.getItem('selectedTime')
        })
    }

  }

  toggleDateDropDown = () => {
    this.setState({
      dropDownDate: !this.state.dropDownDate
    });
  };

  handleDateChange(date) {
    this.setState(
      {
        selectedDate: moment(date).format("dddd, DD/MM/YY") 
      },
      () => {
        this.toggleDateDropDown();
        if (this.checkAvailability()) {
            sessionStorage.setItem('selectedDate', this.state.selectedDate)
        }
      }
    );
  }

  handleTimeChange(e) {
    this.setState({
      selectedTime: e.target.value
    }, () => {
        if (this.checkAvailability()) {
            sessionStorage.setItem('selectedTime', this.state.selectedTime)
        }
    })
  }

  checkAvailability = () => {
    var deliveryhours = this.props.deliveryhours
    var selectedDay = this.state.selectedDate.split(",")[0]
    var selectedTime = Number(this.state.selectedTime.replace(":", ""))

    for (let i = 0; i < deliveryhours.length; i++) {
        if (deliveryhours[i].day === selectedDay) {
            var starttime = deliveryhours[i].starttime
            var closetime = deliveryhours[i].closetime

            if (selectedTime >= starttime && selectedTime <= closetime) {
                this.setState({
                    catererNotAvailable: false,
                    isProceedAvailable: true
                })
                return true
            }
            else {
                this.setState({
                    catererNotAvailable: true,
                    isProceedAvailable: false
                })
                this.props.disabledAddressPayment()
                return false
            }
        }
    }
  }

  render() {
    return (
        <Row>
        <Col xs="12" md="10">
          <Card style={{ boxShadow: "1px 1px 3px #9E9E9E" }} className="p-4">
            <CardBody className="p-4">
              <Form>
                <h5>Date & Time</h5>
                <div style={{ marginTop: 30 }} />
                <FormGroup style={{ marginTop: 10 }}>
                  <h6>Date</h6>
                  <UncontrolledDropdown
                    isOpen={this.state.dropDownDate}
                    toggle={() => this.toggleDateDropDown()}
                  >
                    <DropdownToggle
                      style={{
                        height: 40,
                        width: "100%",
                        color: "rgba(0,0,0, 0.5)",
                        borderColor: "rgba(211,211,211, 0.5)",
                        backgroundColor: "white"
                      }}
                      caret
                    >
                      <Label
                        style={{
                          cursor: "pointer",
                          fontSize: 15,
                          paddingLeft: 5,
                          textAlign: "start",
                          color:
                            this.state.selectedDate === "" ? "gray" : "black",
                          height: 12,
                          width: "98%"
                        }}
                      >
                        {this.state.selectedDate === ""
                          ? "Select Date"
                          : this.state.selectedDate}
                      </Label>
                    </DropdownToggle>
                    <DropdownMenu>
                      <div>
                        <Calendar
                          onChange={this.handleDateChange.bind(this)}
                          minDate={this.state.maxDate}
                        />
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </FormGroup>
                <FormGroup style={{ marginTop: 10 }}>
                  <h6>Time</h6>
                  <Input
                    value={this.state.selectedTime}
                    onChange={e => this.handleTimeChange(e)}
                    style={{
                      cursor: "pointer",
                      color: this.state.selectedTime === "" ? "gray" : "black",
                      fontSize: 15,
                      height: 40
                    }}
                    type="select"
                  >
                    <option value="" disabled>
                      Select Time
                    </option>
                    {this.time.map(time => (
                      <option
                        style={{ color: "black" }}
                        key={time}
                        value={time}
                      >
                        {time}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                {this.state.catererNotAvailable ?
                <p style={{color:'red', marginTop: 10, fontSize: 14}}>
                    * Caterer is not available within the time and date provided. *
                </p>
                :
                null}

                <Button
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginTop: 20
                  }}
                  className="float-right"
                  color="success"
                  disabled = {!this.state.isProceedAvailable ? true : false}
                  onClick={() => this.props.datetimeProceedClick(this.state.selectedDate, this.state.selectedTime)}
                >
                  Continue to CheckOut
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col xs="0" md="2"></Col>
      </Row>
    );
  }
}

Payment.propTypes = propTypes;
Payment.defaultProps = defaultProps;

export default DateTime;
