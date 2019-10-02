import React, { Component } from 'react';
import  Link  from 'next/link';
import Head from 'next/head';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardGroup,
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
    UncontrolledDropdown,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink,
    Table,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Collapse,
    Badge,
  } from "reactstrap";
  
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Router from 'next/router'
import axios from "axios";
import apis from "../../apis";
import {server} from "../../config"
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

class Address extends Component {

  constructor(props) {
    super(props);

    this.state = {
      customerCompanyDetails: {},
      selectedCompany: null,
      companyList: [],
    };

    this.timeout =  0;
  }


  componentDidMount() {
     this.getCustomerCompanyID()
  }

  getCustomerCompanyID = () => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETcustomerprofile;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          var customerCompanyID = response.data[0].customerCompanyID
          this.getCustomerCompanyDetails(customerCompanyID)
        } 
      })
      .catch((error) => {
      });
  }

  getCustomerCompanyDetails = (customerCompanyID) => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETcompany + "?companyID=" + customerCompanyID;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            customerCompanyDetails: response.data,
          })
        } 
      })
      .catch((error) => {
      });
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
          this.getCustomerCompanyDetails(_id)
        } 
      })
      .catch((error) => {
      }); 
  }

  handleChange = (selectedCompany) => {
    this.toggleWorkAddressModal()
    this.setState({ 
      selectedCompany,
    })
    if (selectedCompany.value === 0) {
      Router.push({
        pathname: '/addcompany',
        query: {'returnurl': `/userprofile/Company%20Address`}
      })
    }
    else {
      this.updateCustomerCompany(selectedCompany.value)
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
  
  toggleWorkAddressModal = () => {
    this.setState({
      workAddressModalOpen: !this.state.workAddressModalOpen,
      selectedCompany: !this.state.workAddressModalOpen ? "" : this.state.selectedCompany
    });
  }

  renderWorkAddressModal() {

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

    return(
      <Modal isOpen={this.state.workAddressModalOpen} toggle={() => this.toggleWorkAddressModal()}>
        <ModalBody>
          <Card style={{boxShadow: 'none', borderWidth: 0}}>
          <CardBody>
            <Form>
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
            </Form>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
    )
  }

  renderAddressesItem() {
    var itemsarray = [];

    var companydetails = this.state.customerCompanyDetails

    for (let i = 0; i < companydetails.length; i++) {
      itemsarray.push(
        <Col xs="12" md="5">
        <Card  style={{marginBottom: 40, boxShadow: '1px 1px 3px #9E9E9E'}}  className="p-4">

          <CardBody style={{margin:0, padding:0, }} >

            <div>
              <b style={{fontSize: 16}}>{companydetails[i].companyName}</b>
            </div>

            <div style={{marginTop: 20, fontWeight: 500, opacity: 0.7, color: 'black'}}><Label>{companydetails[i].companyAddress}</Label></div>

            <div style={{marginTop: 5, fontWeight: 500, opacity: 0.7, color: 'black'}}><Label>{companydetails[i].companyDistrict}, {companydetails[i].companyCity}</Label></div>

            <Row>
              <Col xs="12">
                <Button onClick={() => this.toggleWorkAddressModal()} style={{marginTop: 20, paddingTop:10, paddingBottom: 10, fontWeight: '600'}} color="primary" block>Change</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        </Col>
      )
    }

    return (
      <Row>
        {itemsarray}
      </Row>
    ); 
  }

  render() {
    return (
     <Row style={{flex: 1, display: 'flex'}} >
        <Col style={{  paddingLeft:40, marginTop: 10, marginBottom: 20 }} xs="12">
          <b className="h5">Company Address</b>
        </Col>
        <Col xs="12">
          <Card  style={{boxShadow: 'none', borderWidth: 0}} >
            <CardBody >
              <Form>
                {this.renderAddressesItem()}
              </Form>
            </CardBody>
          </Card>
        </Col>
        {this.renderWorkAddressModal()}
      </Row>
    );
  }
}

export default Address;
