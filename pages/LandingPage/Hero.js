import React from 'react';
import { Popover, PopoverBody, PopoverHeader ,Button, Row, Col, InputGroup, InputGroupAddon, FormGroup, Form, Label, Input, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import './styles.css'
import AutoCompleteAddress from '../../components/AutoCompleteAddress'
import PropTypes from 'prop-types';
import Router from 'next/router'
import img from "../../assets/img"
import Select from "react-select";
import moment from "moment";

const companyList = [
  {
    _id: "Google_123",
    companyName: "Google",
    companyAddress:
      "Google Building Gordon House, 4 Barrow St, Dublin, D04 E5W5, Ireland"
  },
  {
    _id: "Facebook_123",
    companyName: "Facebook",
    companyAddress: "Hanover Reach 5/7 Hanover Quay Dublin 2 Co. Dublin"
  },
  {
    _id: "LinkedIn_123",
    companyName: "LinkedIn",
    companyAddress:
      "Gardner House, 2 Wilton Pl, Grand Canal Dock, Dublin, Ireland"
  },
  {
    _id: "Indeed_123",
    companyName: "Indeed",
    companyAddress:
      "Bank of Scotland House, 124 St Stephen's Green, Dublin 2, D02 C628, Ireland"
  }
];

const customStyles = {
  control: (base, state) => ({
    ...base,
    fontSize: 16,
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    cursor: "text",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: "transparent",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: "100%",
    color: "black"
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: "pointer",
      backgroundColor: isFocused ? "#20a8d8" : "white",
      color: isFocused ? "white" : "black",
      lineHeight: 2,
      fontSize: 16,
    };
  },

  input: styles => ({
    ...styles,
    color: "black",
    boxShadow: "none",
    borderRadius: 0,
    borderWidth: 0
  }),

  menu: styles => ({
    ...styles,
    marginTop: 0,
    boxShadow: "none",
    borderRadius: 0
  }),

  singleValue: styles => ({
    ...styles,
    color: "black"
  })
};

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};


class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      address: "",
      searchAddressInvalid: false,
      selectedCompany: null,
    }
  }

  toggle() {
    this.setState({
      searchAddressInvalid: false
    });
  }

  getMonday = d => {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  };

  getStarted = () => {
    var todayDate = moment(new Date()).format("YYYY-MM-DD")
    var mondayOfTheWeek = this.getMonday(new Date());

    if (new Date().getDay() === 0 || new Date().getDay() === 6) {
      //detect if weekends, if yes, get next monday
      mondayOfTheWeek = new Date( mondayOfTheWeek.setDate(mondayOfTheWeek.getDate() + 7));
      todayDate = moment(mondayOfTheWeek).format("YYYY-MM-DD")
    }

    sessionStorage.setItem('selectedCompany', JSON.stringify(this.state.selectedCompany));
    Router.push(`/searchlunch?location=${this.state.selectedCompany.value}&date=${todayDate}`, `/searchlunch?location=${this.state.selectedCompany.value}&date=${todayDate}`)
  }

  handleChange = (selectedCompany) => {
    this.setState({ 
      selectedCompany 
    })
  };

  render() {

    const searchList = companyList.map(({ _id, companyName, companyAddress }) => {
      return {
        value: _id,
        label: companyName + " | " + companyAddress
      };
    });

    const DropdownIndicator = () => {
      return <div />;
    };

    return (
      <section
        id="hero"
        style={{ height: 600, marginTop: -70, backgroundImage: 'url(' + img.golunch_wallpaper_dimmed + ')', backgroundSize: 'cover'}}
      >
          <Row style={{margin:0, marginTop: 150, display:'flex',}} >
            
            <Col style={{textAlign: 'center', color: 'white',}} xs="12">
              <h1 style={{fontSize: 40}}>
                Lunch for 10 EUR
              </h1>
            </Col>

            <Col style={{textAlign: 'center', color: 'white',}} xs="12">
              <p style={{fontSize: 18, letterSpacing: 2, marginTop: 20}} className="big">
                Lunch delivered to your workplace on-time, with no delivery charges.
              </p>
            </Col>

            <Col style={{textAlign: 'center', }} xs="12">
              <Label className="h6" style={{ letterSpacing: 2, color: 'white', fontSize: 15, marginTop: 40}} >Your Workplace</Label>
            </Col>

            <Col  xs="12">
              <Row >
                <Col style={{padding: 0,}} xs="1" sm="1" md="3" lg="3"/>
                <Col style={{padding: 0,}} xs="10" sm="10" md="6" lg="6">
                  <Row>
                    <Col style={{paddingRight: 0,}} xs="9" md="9">
                      <Select
                        value={this.state.selectedCompany}
                        options={searchList}
                        onChange={this.handleChange}
                        placeholder="ex: Google"
                        openMenuOnClick={false}
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                      />
                    </Col>
                    <Col style={{ paddingLeft: 0 }} xs="3" md="3">
                      <Button
                        onClick={e => this.getStarted()}
                        block
                        style={{
                          height: "100%",
                          fontWeight: "600",
                          fontSize: 14,
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                          borderTopRightRadius: 5,
                          borderBottomRightRadius: 5,
                        }}
                        className="bg-primary"
                        color="primary"
                      >
                        SEARCH
                      </Button>
                    </Col>
                  </Row>
                  
                </Col>

                <Col style={{padding: 0,}} xs="1" sm="1" md="3" lg="3"/>
              </Row>
            </Col>
            
          </Row>
      </section>
    );
  }
};


Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
