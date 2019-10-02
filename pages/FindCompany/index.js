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
import Select from "react-select";
import Lottie from 'react-lottie';

const customStyles = {
  control: (base, state) => ({
    ...base,
    fontSize: 16,
    boxShadow:10,
    cursor: "text",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
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

class FindCompany extends Component {

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

  constructor(props) {
    super(props);
    
    this.state = {
      address: "",
      selectedCompany: null,
      companyList: [],
    }

    this.timeout =  0;

  }

  signIn(e) {
    e.preventDefault()
    Router.push({
      pathname: '/login'
    })
  }

  onStartClick = () => {

    if (this.state.selectedCompany === null) {
      Router.push("/addcompany")
    }
    else {
      sessionStorage.setItem("customerCompanyID", this.state.selectedCompany.value);
      Router.push("/register")
    }

  }
  
  handleChange = (selectedCompany) => {
    if (selectedCompany.value === 0) {
      Router.push("/addcompany")
    }
    else {
      this.setState({ 
        selectedCompany,
      })
    }
  };

  doSearch = (searchword) => {
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (searchword !== "") {
        this.getCompany(searchword)
      }
    }, 500);
  };

  getCompany = (searchCompany) => {

    var addNewCompany = {
      _id: 0,
      companyName: "Add new company: ",
      companyAddress: searchCompany
    }

    var url = apis.GETcompany + "?companyName=" + searchCompany

    axios.get(url)
    .then((response) => {
      var data = response.data;
      data.push(addNewCompany)
      this.setState({
        companyList: data
      })
    })
    .catch(err => {
      var data = this.state.companyList
      data.push(addNewCompany)
      this.setState({
        companyList: data
      })
    });
  }

  render() {

    const searchList = this.state.companyList.map(({ _id, companyName, companyAddress }) => {
      return {
        value: _id,
        label: _id === 0 ? companyName + companyAddress : companyName + " | " + companyAddress
      };
    });

    const DropdownIndicator = () => {
      return <div />;
    };

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: require('../../assets/animation/pinjump.json'),
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <Layout title={'Find Company'}>
        <NextSeo
          config={{
            title: 'Find Company | FoodieBee - Corporate Catering Services and Marketplace | Local Caterers',
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
                      <h2>Find Your Company</h2>
                      <div>
                        <Lottie 
                          options={defaultOptions}
                          height={200}
                          width={200}/>
                      </div>
                      <h6 style={{ marginTop: 10 }}>Company Name</h6>
                      <Select
                        value={this.state.selectedCompany}
                        options={searchList}
                        onChange={this.handleChange}
                        onInputChange={this.doSearch}
                        placeholder="ex: Google"
                        openMenuOnClick={false}
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                      />
                      <Button
                        style={{
                          paddingTop: 10,
                          paddingBottom: 10,
                          marginTop: 20,
                          color: "white"
                        }}
                        color="success"
                        block
                        onClick={() => this.onStartClick()}
                      >
                        Get Started
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

export default FindCompany;
