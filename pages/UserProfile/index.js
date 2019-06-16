import React, { Component } from "react";
import  Link  from "next/link";
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
import Account from './Account'
import Address from './Address'
import Order from './Order'
import Review from './Review'
import Payment from './Payment'
import moment from "moment";
import { format, addDays, subDays } from 'date-fns';
import Router from 'next/router'
import {server} from "../../config"
import axios from "axios";
import apis from "../../apis";
import { StripeProvider, Elements } from 'react-stripe-elements'
import "./styles.css"
import 'react-toastify/dist/ReactToastify.css';
import getConfig from 'next/config'
import NextSeo from 'next-seo';

const {publicRuntimeConfig} = getConfig()
const {STIRPE_CLIENT_KEY} = publicRuntimeConfig

class UserProfile extends Component {

  static async getInitialProps({query: { userprofilepage, currentDate, previousDate }}) {

    console.log('userprofilepage = ' + userprofilepage)
    var activemenu;
    if (typeof userprofilepage !== 'undefined') {
      activemenu = userprofilepage
    }
    else {
      activemenu = "Account Info"
    }
    return {
      selectedMenu: activemenu,
    };
  }

  componentWillMount() {
    this.setState({
      selectedMenu: this.props.selectedMenu,
      orderdata: this.props.orderdata,
      finalOrderSelectionDateString: this.props.finalOrderSelectionDateString
    })
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedMenu: "",
      isMobile: false,
      menuDropDownOpen: false,
      menutitle: [
        "Account Info",
        "Orders",
        "Payment Methods",
        "Delivery Addresses",
        "Reviews",
      ], 
      orderdata: null,
      stripe: null,
      finalOrderSelectionDateString: null,
    };
  }

  componentDidMount() {

      if (window.innerWidth < 800) {
        this.setState({
          isMobile: true
        });
      }
  
      window.addEventListener(
        "resize",
        () => {
          this.setState({
            isMobile: window.innerWidth < 800
          });
        },
        false
      );

      if (window.Stripe) {
        this.setState({stripe: window.Stripe(STIRPE_CLIENT_KEY)});
      } else {
        document.querySelector('#stripe-js').addEventListener('load', () => {
          // Create Stripe instance once Stripe.js loads
          this.setState({stripe: window.Stripe(STIRPE_CLIENT_KEY)});
        });
      }

    }


  ////////////////////////////////////////////////Other functions/////////////////////////////////////////////////////

  navItemClicked = (selectedMenu) => {
    var url = `/userprofile/${selectedMenu}`;
    Router.replace(url)
    /*this.setState({
      selectedMenu: selectedMenu,
    });*/
  };

  toggleDropDown = () => {
    this.setState({
      menuDropDownOpen: !this.state.menuDropDownOpen,
    });
  }

  getOrderDetail= () => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETcatererprofile + "/" + this.state.restaurantInfo.catererID;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          var restaurantInfo = this.state.restaurantInfo
          restaurantInfo.catererID = response.data[0]._id;
          restaurantInfo.catererName = typeof response.data[0].catererName !== 'undefined' ? response.data[0].catererName : "";
          restaurantInfo.profilesrc = typeof response.data[0].profilesrc !== 'undefined' ? response.data[0].profilesrc : "";
          restaurantInfo.coversrc = typeof response.data[0].coversrc !== 'undefined' ? response.data[0].coversrc : "https://stmed.net/sites/default/files/food-wallpapers-28249-101905.jpg";
          restaurantInfo.catererAddress = typeof response.data[0].catererAddress !== 'undefined' ? response.data[0].catererAddress : "";
          restaurantInfo.rating = typeof response.data[0].rating !== 'undefined' ? response.data[0].rating : 0;
          restaurantInfo.numofreview = typeof response.data[0].numofreview !== 'undefined' ? response.data[0].numofreview : 0;
          restaurantInfo.deliveryfee = typeof response.data[0].deliveryfee !== 'undefined' ? response.data[0].deliveryfee : 0;
          restaurantInfo.minimumspend = typeof response.data[0].minimumspend !== 'undefined' ? response.data[0].minimumspend : 0;
          restaurantInfo.openinghours = typeof response.data[0].openinghours !== 'undefined' ? response.data[0].openinghours : [];
          this.setState({
            restaurantInfo: restaurantInfo
          })
        } 
      })
      .catch((error) => {
      });
  }

  ////////////////////////////////////////////////Render////////////////////////////////////////////////////////
  
  renderNavItem(menutitle) {
    return (
      <NavItem>
        <NavLink
          onClick={() => this.navItemClicked(menutitle)}
          style={{
            cursor: 'pointer',
            paddingRight: 20,
            paddingLeft: menutitle === "Account Info" ? 0 : 20,
            fontWeight: "600",
            color: this.state.selectedMenu === menutitle ? "#20a8d8" : "black",
            fontSize: 15
          }}
        >
          {menutitle}
        </NavLink>
        <div
          style={{
            height: 2,
            width: "100%",
            backgroundColor:
              this.state.selectedMenu === menutitle ? "#20a8d8" : "transparent"
          }}
        />
      </NavItem>
    );
  }

  renderAccountInfo() {
    return (
      <Account/>
    )
  }

  renderDeliveryAddresses() {
    return (
      <Address/>
    )
  }

  renderPaymentMethods() {
    return (
      <StripeProvider stripe={this.state.stripe}>
      <Elements>
        <Payment/>
      </Elements>
      </StripeProvider>
    )
  }

  renderOrderTable() {
    return (
      <Order/>
    );
  }

  renderReviewTable() {
    return (
      <Review/>
    );
  }

  ////////////////////////////////////////////////Render Modal////////////////////////////////////////////////////////

  
  renderSmallScreenNavBar() {
    return (
      <Col style={{ paddingLeft: 40, paddingRight: 40, marginTop: 30, marginBottom: 20 }} xs="12" md="12">
        <UncontrolledDropdown isOpen={this.state.menuDropDownOpen}  toggle={() => this.toggleDropDown()}>
          <DropdownToggle
            style={{
              height: 40,
              width: '100%',
              color: "rgba(0,0,0, 0.5)",
              borderColor: "rgba(211,211,211, 0.8)",
              backgroundColor: "white",
            }}
            caret
          >
          <Label style={{ cursor: 'pointer', fontSize: 15, fontWeight: '600', paddingLeft:5, textAlign:'start', color: '#20a8d8', height:12, width: '98%'}}>{this.state.selectedMenu}</Label> 
          </DropdownToggle>
          <DropdownMenu style={{width: '100%'}}>
            <DropdownItem onClick={() => this.navItemClicked("Account Info")}>Account Info</DropdownItem>
            <DropdownItem onClick={() => this.navItemClicked("Orders")}>Orders</DropdownItem>
            <DropdownItem onClick={() => this.navItemClicked("Payment Methods")}>Payment Methods</DropdownItem>
            <DropdownItem onClick={() => this.navItemClicked("Delivery Addresses")}>Delivery Addresses</DropdownItem>
            <DropdownItem onClick={() => this.navItemClicked("Reviews")}>Reviews</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>      
      </Col>
    )
  }

  render() {

    return (
     
      <Layout title={this.state.selectedMenu + ' Customer Details'}>

      <NextSeo
        config={{
          title: this.state.selectedMenu + ' Customer Details',
        }}
      />
    
      <div style={{backgroundColor: 'white'}}>
         <NavBar signInHide={true}/>
      <div className="app align-items-center">

          <Container>
            <Row
              style={{ marginTop: 20, marginBottom: 50 }}
              className="justify-content-center"
            >
             
              {!this.state.isMobile ? <Col style={{ paddingLeft: 40, paddingRight: 40, marginTop: 30, marginBottom: 20 }} xs="12" md="12">
                <Nav className="float-left" pills>
                  {this.renderNavItem(this.state.menutitle[0])}
                  {this.renderNavItem(this.state.menutitle[1])}
                  {this.renderNavItem(this.state.menutitle[2])}
                  {this.renderNavItem(this.state.menutitle[3])}
                  {this.renderNavItem(this.state.menutitle[4])}
                </Nav>
              </Col> : null}

              {this.state.isMobile ? this.renderSmallScreenNavBar() : null}

              <Col style={{ marginTop: 20 }} xs="12" sm="12" md="12" lg="12">
                {this.state.selectedMenu === "Account Info" ? this.renderAccountInfo() :
                this.state.selectedMenu === "Orders" ? this.renderOrderTable() :
                this.state.selectedMenu === "Payment Methods" ? this.renderPaymentMethods() :
                this.state.selectedMenu === "Delivery Addresses" ? this.renderDeliveryAddresses() :
                this.state.selectedMenu === "Reviews" ? this.renderReviewTable() : null}
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

export default UserProfile;
