import React, { Component } from 'react';
import  Link  from 'next/link';
import Head from 'next/head';
import { FormFeedback, Label, Button, Card, CardBody, CardFooter, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Router from 'next/router'
import axios from "axios";
import apis from "../../apis";
import {server} from "../../config"
import NextSeo from 'next-seo';
import {listCounties} from "../../utils"
import Cookies from 'js-cookie';
import AutoCompleteAddress from '../../components/AutoCompleteAddress'

class AddCompany extends Component {

  static async getInitialProps({query: { returnurl }}) {
    console.log('returnurl = ' + returnurl)
    return {
      returnurl: returnurl,
    };
  }

  componentWillMount() {
    this.setState({
      returnurl: this.props.returnurl,
    })
  }

  componentDidMount() {
    if (typeof Cookies.get('userName') !== 'undefined') {
      this.setState({
        userName: Cookies.get('userName'),
      })
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      returnurl: "",
      companyName: "",
      iscompanyNameEmpty: false,
      address: "",
      longitude: null,
      latitude: null,
      county: "",
      district: "",
      isAddressButtonActive: false,
      userName: "",
    };

    this.handleCounty = this.handleCounty.bind(this);
    this.handleDistrict = this.handleDistrict.bind(this);
    this.handleCompanyName = this.handleCompanyName.bind(this);
 
    this.CountyData = listCounties();

    this.DistrictData = ["Dublin 1","Dublin 2","Dublin 3","Dublin 4","Dublin 6","Dublin 6W","Dublin 7","Dublin 8"]

  }

  signIn(e) {
    e.preventDefault()
    Router.push({
      pathname: '/login'
    })
  }

  handleCompanyName(e) {
    this.setState(
      {
        companyName: e.target.value,
      },
      () => {
        this.checkAddressInput();
      }
    );
  }

  handleCounty(e) {
    this.setState(
      { 
        county: e.target.value,
        district: e.target.value !== "Dublin" ? "" : this.state.district
      },
      () => {
        this.checkAddressInput();
      })
  }

  handleDistrict(e) {
    this.setState(
      { 
        district: e.target.value 
      },
      () => {
        this.checkAddressInput();
      })
  }

  checkAddressInput = () => {
    const {
      companyName,
      address,
      county,
      district,
      longitude,
      latitude,
    } = this.state;

    var validCountyDistrict = true

    if (county !== "") {
      if (county === "Dublin" && district === "") {
        validCountyDistrict = false
      }
    }
    else {
      validCountyDistrict = false
    }

    if (companyName !== "" & address !== "" && longitude && latitude && validCountyDistrict) {
      this.setState({ isAddressButtonActive: true });
    }
    else {
      this.setState({ isAddressButtonActive: false });
    }
  }

  onUpdateClick = () => {
    
    const {
      companyName,
      address,
      longitude,
      latitude,
      county,
      district,
    } = this.state;

    //New User

    var locationdata = {
        type: "Point",
        coordinates: [latitude, longitude]
    }

    var customerCompany = {
      companyName: companyName,
      companyAddress: address,
      companyCity: county,
      companyDistrict: district,  
      location:  locationdata 
    }

    if (this.state.userName === "") {
      //New User
      sessionStorage.setItem("customerCompany", JSON.stringify(customerCompany));
      Router.push({
        pathname: '/register'
      })
    }
    else {
      //User Logged In
      var headers = {
        'Content-Type': 'application/json',
      }
  
      var url = apis.POSTcompany;
  
      axios.post(url, customerCompany, {withCredentials: true}, {headers: headers})
        .then((response) => {
          if (response.status === 200) {
            this.updateCustomerCompany(response.data._id)
          } 
        })
        .catch((error) => {
        });
    }
  }

  updateCustomerCompany = (_id) => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var body = {
      customerCompanyID: _id,
    }

    var url = apis.UPDATEcustomerprofile;

    axios.put(url, body, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 201) {
          if (typeof this.state.returnurl === 'undefined') {
            window.location.assign(`${server}/`);
          }
          else if (this.state.returnurl.includes("searchlunch") ) {
            var datesubstr = this.state.returnurl.substring(this.state.returnurl.lastIndexOf("=") + 1, this.state.returnurl.length)
            window.location.assign(`${server}/searchlunch?companyID=${_id}&date=${datesubstr}`);
          }
          else {
            window.location.assign(`${server}${this.state.returnurl}`);
          }
        } 
      })
      .catch((error) => {
      }); 
  }

  showPlaceDetails(address) {

    if (address != "" && typeof address !== 'undefined' && address !== null) {
       
      var city = address.address_components[1].long_name
      var formatted_address = address.formatted_address
      var longitude = address.geometry.location.lng()
      var latitude = address.geometry.location.lat()

      this.setState({
        address: formatted_address,
        longitude: longitude,
        latitude: latitude
      }, () => {
        this.checkAddressInput()
      })
    }
 
  }


  render() {
    return (
      <Layout title={'Add Company'}>
        <NextSeo
          config={{
            title: 'Add Company | FoodieBee - Corporate Catering Services and Marketplace | Local Caterers',
          }}
        />
        <div style={{backgroundColor: 'white'}}>
          <NavBar signIn={e=>this.signIn(e)}/>
          <div className="app justify-content-center align-items-center">
          <Container>
            <Row style={{flex: 1, display: 'flex'}} className="justify-content-center">
              <Col md="9" lg="7" xl="6">
                <Card  style={{boxShadow: '1px 1px 3px #9E9E9E'}} className="p-4">
                  <CardBody className="p-4">
                    <Form>
                      <h2>Add New Company</h2>
                      <FormGroup style={{ marginTop: 30 }}>
                        <h6>Company Name</h6>
                        <Input
                          style={{ color: "black" }}
                          value={this.state.companyName}
                          onChange={e => this.handleCompanyName(e)}
                          type="text"
                          placeholder="Company Name"
                          autoComplete="companyname"
                          invalid={this.state.iscompanyNameEmpty ? true : false}
                        />
                        <FormFeedback className="help-block">
                          Please enter company name
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup style={{ marginTop: 10 }}>
                        <h6>Company Address</h6>
                        <AutoCompleteAddress 
                          borderTopRightRadius={5}
                          borderBottomRightRadius = {5}
                          borderTopLeftRadius={5}
                          borderBottomLeftRadius={5}
                          borderColor = 'rgba(211,211,211,0.5)'
                          paddingLeft = {15}
                          paddingRight = {15}
                          paddingTop = {7}
                          paddingBottom = {7}
                          fontSize = {14}
                          color = 'black'
                          onPlaceChanged={this.showPlaceDetails.bind(this)} />     
                      </FormGroup>
                      <FormGroup style={{ marginTop: 10 }}>
                        <h6>County</h6>
                        <Input
                          style={{ color: this.state.county !== "" ? "black" : null }}
                          value={this.state.county}
                          onChange={e => this.handleCounty(e)}
                          type="select"
                          placeholder="County"
                          autoComplete="county"
                        >
                          <option value="" disabled>
                            Select County
                          </option>
                          {this.CountyData.map(county => (
                            <option
                              style={{ color: "black" }}
                              key={county}
                              value={county}
                            >
                              {county}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                      {this.state.county === "Dublin" ?
                      <FormGroup style={{ marginTop: 10 }}>
                        <h6>District</h6>
                        <Input
                          style={{ color: this.state.district !== "" ? "black" : null }}
                          value={this.state.district}
                          onChange={e => this.handleDistrict(e)}
                          type="select"
                          placeholder="District"
                          autoComplete="District"
                        >
                          <option value="" disabled>
                            Select District
                          </option>
                          {this.DistrictData.map(district => (
                            <option
                              style={{ color: "black" }}
                              key={district}
                              value={district}
                            >
                              {district}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                      :
                      null}
                      <Button
                        style={{
                          paddingTop: 10,
                          paddingBottom: 10,
                          marginTop: 20,
                          color: "white"
                        }}
                        color="success"
                        block
                        onClick={() => this.onUpdateClick()}
                        disabled={this.state.isAddressButtonActive ? false : true}
                      >
                        {this.state.userName === "" ? "Next" : "Save Changes"}
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          </div>
      <Footer />
      </div>
      </Layout>
    );
  }
}

export default AddCompany;
