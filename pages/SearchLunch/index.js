import React, { Component } from 'react';
import  Link  from 'next/link';
import { Button, Card, CardHeader, CardBody, CardGroup, Col, Container, Form, Modal, ModalBody, ModalHeader, ModalFooter,
  Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label, FormGroup, Popover, PopoverBody, PopoverHeader ,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Nav, NavItem, NavLink, Table, Collapse } from 'reactstrap';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import './SearchLunch.css'
import moment from "moment";
import ContentLoader, { Facebook } from "react-content-loader";
import Dotdotdot from "react-dotdotdot";
import axios from "axios";
import apis from "../../apis";
import Router, { withRouter } from 'next/router'
import NextSeo from 'next-seo';
import { server } from '../../config';
import img from "../../assets/img"
import Select from "react-select";
import Lottie from 'react-lottie';

const glutenfreeIcon = '/static/glutenfree1.png';
const hotIcon = '/static/fire.png';
const spicyIcon = '/static/pepper.png';
const vegeIcon = '/static/lettuce.png';
const healthyIcon = '/static/fruit.png';
const halalicon = '/static/halalsign.png';
const closeIcon = '/static/close.png';

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
    cursor: "text",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#20a8d8",
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
      backgroundColor: isFocused ? "white" : "white",
      color: isFocused ? "#20a8d8" : "black",
      lineHeight: 2
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
    borderRadius: 0,
    fontSize: 16,
  }),

  singleValue: styles => ({
    ...styles,
    color: "black"
  })
};

class SearchLunch extends Component {

  static async getInitialProps({query: { location, date }}) {

    var url = `${server}${apis.GETdailyMenu}`
    var locationquerystring = "";
    var datequerystring = "";
  
    var selectedDate = "";
    
    if (typeof location !== 'undefined') {
      locationquerystring = "?location=" + location
      url = url + locationquerystring
    }
   
    if (typeof date !== 'undefined') {
      datequerystring = "&date=" + date
      url = url + datequerystring
      selectedDate = date
    }

    const res = await axios.get(url);
    const data = await res.data;
    console.log(`Show data fetched. Count: ${data.length}`);
    return {
      locationquerystring: locationquerystring, 
      datequerystring: datequerystring,
      dailyMenu: data,
      location: location,
      selectedDate,
    };
  }

  componentWillMount() {
    console.log("componentWillMount")
    this.setState({
      dailyMenu: this.props.dailyMenu,
      loading: this.props.dailyMenu.length > 0 ? true : false,
      empty: this.props.dailyMenu.length > 0 ? false : true,
      location: this.props.location,
      locationquerystring: this.props.locationquerystring,
      datequerystring: this.props.datequerystring,
      selectedDate: this.props.selectedDate,
    }, () => {
      this.getCompanyAddress(this.state.location)
      if (!this.state.empty) {
        this.resturctureData(this.state.dailyMenu)
      }
    })
  }


  constructor(props) {
    super(props);

    this.refObj = React.createRef();
    
    this.toggleMenuModal = this.toggleMenuModal.bind(this);
    this.togglePrimeModal = this.togglePrimeModal.bind(this);
  
    this.state = {
      dailyMenu: [],
      baseurl: "/searchlunch",
      locationquerystring: "",
      datequerystring: "",
      location: "",
      isMobile: null,
      loading: true,
      empty: false,
      address: "",
      selectedDate: "",
      dropDownAddress: false,
      isSearchBarOpen: false,
      dayList: [],
      selectedDay: {},
      selectedCompany: {},
      menuModalOpen: false,
      primeModalOpen: false,
      activeMenu: null,
      quantity: [1,2,3,4,5,6,7,8,9,10,11,12,13],
      selectedQuantity: 1,
      selectedPrice: 0,
    }
  }


  componentDidMount() {
  //  this.getDataFromDb();

    console.log("componentDidMount")

    var days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    var dayList = [];
    var selectedDay = {};

    var todayDate = new Date();
    var mondayOfTheWeek = this.getMonday(todayDate);
    var dayOfTheWeek = null;

    if (todayDate.getDay() === 0 || todayDate.getDay() === 6) {
      //detect if weekends, if yes, get next monday
      mondayOfTheWeek = new Date(
        mondayOfTheWeek.setDate(mondayOfTheWeek.getDate() + 7)
      );

      dayOfTheWeek = mondayOfTheWeek;

      for (let i = 0; i < 5; i++) {
        var newAddedDate = {
          date: dayOfTheWeek.getDate() + "",
          day: days[i],
          hovered: i === 0 ? true : false,
          fullDate: new Date(
            dayOfTheWeek.setDate(dayOfTheWeek.getDate() + 0)
          )
        };

        dayList.push(newAddedDate);

        if (i === 0) {
          selectedDay = newAddedDate;
        }

        dayOfTheWeek = new Date(
          dayOfTheWeek.setDate(dayOfTheWeek.getDate() + 1)
        );

      }
    } else {
      dayOfTheWeek = mondayOfTheWeek;

      for (let i = 0; i < 5; i++) {

        var newAddedDate2 = {
          date: dayOfTheWeek.getDate() + "",
          day: days[i],
          hovered: dayOfTheWeek - todayDate === 0 ? true : false,
          fullDate: new Date(
            dayOfTheWeek.setDate(dayOfTheWeek.getDate() + 0)
          )
        };

        dayList.push(newAddedDate2);

        if (dayOfTheWeek - todayDate === 0) {
          selectedDay = newAddedDate2;
        }

        dayOfTheWeek = new Date(
          dayOfTheWeek.setDate(dayOfTheWeek.getDate() + 1)
        );
       
      }
    }

    this.setState({
      dayList: dayList,
      selectedDay
    });

    if (window.innerWidth < 800) {
      this.setState({
        isMobile: true
      });
    }
    else {
      this.setState({
        isMobile: false
      });
    }

    window.addEventListener(
      "resize",
      () => {
        this.setState({
          isMobile: window.innerWidth < 800 ? true : false
        });
      },
      false
    );
  }

  getDataFromDb = (url) => {

    axios.get(url)
    .then((response) => {

      var data = response.data;
    
      this.setState({
        dailyMenu: data,
        empty: data.length > 0 ? false : true
      }, () => {
        if (!this.state.empty) {
          this.resturctureData()
        }
        this.getCompanyAddress(this.state.location)
      })
    })
    .catch(err => {
      // console.log(err)
       this.setState({
        loading: false,
        empty: true,
      })
    });
  };

  getCompanyAddress = (locationID) => {

    var index = companyList.findIndex(x => x._id === locationID);
    
    if (index >= 0) {

      var selectedCompany =  {
        value: companyList[index]._id,
        label: companyList[index].companyName + " | " + companyList[index].companyAddress
      }

      console.log(selectedCompany)

      this.setState({
        selectedCompany
      })
    }
  };

  toggleMenuModal() {
    this.setState({
      menuModalOpen: !this.state.menuModalOpen,
      selectedQuantity: 1,
      selectedPrice: 0,
    });
  }

  togglePrimeModal() {
    this.setState({
      primeModalOpen: !this.state.primeModalOpen,
    });
  }

  resturctureData() {
    var result = this.state.dailyMenu[0].menuDetails.reduce(function(r, a) {
      r[a[0].catererID] = r[a[0].catererID] || [];
      r[a[0].catererID].push(a);
      return r;
    }, Object.create(null));

   
    var finaldataAry = []

    for (var key in result) {

      var catererIndex = this.state.dailyMenu[0].catererDetails.findIndex(x => x[0]._id === key)

      var updateData = {
        catererDetails: this.state.dailyMenu[0].catererDetails[catererIndex][0],
        menuitems: result[key] 
      }
      finaldataAry.push(updateData)
    }

    console.log(finaldataAry)
    this.setState({
      dailyMenu: finaldataAry,
      loading: false
    })
  }


  signIn(e) {
    e.preventDefault()

    var url = this.state.baseurl;
    var locationquerystring = this.state.locationquerystring;
    var datequerystring = this.state.datequerystring;

    url = url + locationquerystring + datequerystring ; 

    console.log('signinurl = ',url) 

    Router.push({
      pathname: '/login',
      query: {'returnurl': url}
    })
  }

  menuItemClicked = ( childIndex, parentIndex) => {
    var item = this.state.dailyMenu[parentIndex].menuitems[childIndex][0]
    this.setState({
      menuModalOpen: !this.state.menuModalOpen,
      activeMenu: item,
    });
  };

  handleCompanyChange = (selectedCompany) => {
    this.setState({ 
      selectedCompany,
      location:  selectedCompany._id
    } , () => {

      sessionStorage.setItem('selectedCompany', JSON.stringify(this.state.selectedCompany));

      var url = this.state.baseurl;
      var locationquerystring = this.state.locationquerystring;
      var datequerystring = this.state.datequerystring;

      locationquerystring = "?location=" + this.state.selectedCompany.value

      url = url + locationquerystring + datequerystring; 
      var fullapiurl = apis.GETdailyMenu + locationquerystring + datequerystring;

      this.setState({
        loading: true,
        locationquerystring,
        datequerystring,
      },() => {
        this.refObj.current.scrollIntoView();
        window.history.pushState(null, '', url);    
        this.getDataFromDb(fullapiurl)
      })    
    })
  };
  
  handleDateSearch = (selectedDate) => {
    var url = this.state.baseurl;
    var locationquerystring = this.state.locationquerystring;
    var datequerystring = this.state.datequerystring;
   
    datequerystring = "&date=" + selectedDate;

    url = url + locationquerystring + datequerystring; 
    var fullapiurl = apis.GETdailyMenu + locationquerystring + datequerystring;

    this.setState({
      loading: true,
      locationquerystring,
      datequerystring,
    },() => {
      this.refObj.current.scrollIntoView();
      window.history.pushState(null, '', url);    
      this.getDataFromDb(fullapiurl)
    })
  }

  getMonday = d => {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  };

  hoverDate = index => {
    var dayList = this.state.dayList.slice();
    if (
      JSON.stringify(this.state.selectedDay) !== JSON.stringify(dayList[index])
    ) {
      dayList[index].hovered = true;
    }
    this.setState({
      dayList
    });
  };

  unhoverDate = index => {
    var dayList = this.state.dayList.slice();
    if (
      JSON.stringify(this.state.selectedDay) !== JSON.stringify(dayList[index])
    ) {
      dayList[index].hovered = false;
    }
    this.setState({
      dayList
    });
  };

  selectDateClicked = index => {
    var dayList = this.state.dayList.slice();

    for (let i = 0; i < dayList.length; i++) {
      dayList[i].hovered = false;
    }

    dayList[index].hovered = true;
    var selectedDay = dayList[index];

    this.setState({
      selectedDay,
      dayList,
      selectedDate: moment(selectedDay.fullDate).format("YYYY-MM-DD") 
    }, () => {
      this.handleDateSearch(this.state.selectedDate)
      sessionStorage.setItem('selectedDate', this.state.selectedDate);
    })
  };

  calculateMenuTotalPrice = (priceperunit) => {
    const {selectedQuantity, selectedPrice} = this.state
    var totalprice = selectedPrice;
    var totalSelectedSelectionPrice = 0;

    priceperunit = priceperunit + totalSelectedSelectionPrice;
    totalprice = priceperunit * selectedQuantity;
  
    this.setState({
      selectedPrice: totalprice
    })
  }

  handleQuantityChange(e, priceperunit) {
    this.setState({ 
      selectedQuantity: e.target.value, 
    } ,() => {
      this.calculateMenuTotalPrice(priceperunit)
    })
  }
  
  findIcon = (iconname) => {
    var iconPath;
    if (iconname == 'Hot') { iconPath = hotIcon }
    else if (iconname == 'Spicy') { iconPath = spicyIcon }
    else if (iconname == 'Halal') { iconPath = halalicon }
    else if (iconname == 'Gluten Free') { iconPath = glutenfreeIcon }
    else if (iconname == 'Vegetarian') { iconPath = vegeIcon }
    else if (iconname == 'Healthy') { iconPath = healthyIcon }
    return iconPath
  }


  findQuantityRange = (minimumquantity) => {
    var index = this.state.quantity.findIndex(x => x==minimumquantity);
    var quantityrange = this.state.quantity.slice(index, this.state.quantity.length)
    return quantityrange
  }

  renderMarkAsIcon(markitem) {
    var iconarray = [];
    for (let i = 0; i < markitem.length; i++) {
      iconarray.push(
        <img
          key={i} 
          style={{
            marginLeft: i === 0 ? 0 : 5,
            marginBottom: 5,
            height: 20,
            width: 20,
            objectFit: "cover"
          }}
          src={this.findIcon(markitem[i])}
          alt=""
        />
      );
    }
    return (
      <Col
        style={{
          textAlign: "start",
          flex: 1
        }}
      >
        {iconarray}
      </Col>
    );
  }

  renderIcon(markitem) {
    var iconarray = [];
    for (let i = 0; i < markitem.length; i++) {
      iconarray.push(
        <span key={i} style={{opacity: 0.8}}>
          {markitem[i]}
          <img
            style={{
              marginLeft: 5,
              marginRight:10, 
              marginBottom: 5,
              height: 20,
              width: 20,
              objectFit: "cover"
            }}
            src={this.findIcon(markitem[i])}
            alt=""
          ></img>
        </span>
      );
    }
    return (
      <Row
        style={{
          textAlign: "start",
          marginTop:20, 
        }}
      >
        <Col>
        {iconarray}
        </Col>
      </Row>
    );
  }

  renderPrimeModal() {

    return (
      <Modal    
        toggle={this.togglePrimeModal}
        isOpen={this.state.primeModalOpen} >

        <ModalHeader toggle={this.togglePrimeModal}>
          Go Prime
        </ModalHeader>
        <ModalBody style={{paddingTop: 0, marginTop: 0, paddingLeft: 0, paddingRight: 0}}>
          <div style={{ height: 130, backgroundImage: 'url(' + img.golunch_wallpaper_dimmed + ')', backgroundSize: 'cover'}}>

            <Row style={{margin:0, marginTop: 0, display:'flex',}} >

              <Col style={{textAlign: 'center', marginTop: 20, }} xs="12">
                <img style={{objectFit: 'cover', height: 50, width: 160,}} src={'/static/brandlogo_dark.png'} alt="FoodieBee Logo"/>
              </Col>
            
              <Col style={{textAlign: 'center',}} xs="12">
                <b style={{fontSize: 23, letterSpacing: 1.5, color: "white"}}>
                  GO
                  <Button style={{cursor: "pointer", marginLeft: 10, opacity: 1.0, padding: 7, fontWeight: '600', fontSize: 18, borderWidth: 0, backgroundColor: "#FF5722", color: "white" }} disabled>PRIME</Button>          
                </b>
              </Col>

            </Row>

          </div>

          <Table borderless style={{ marginLeft: 10, marginRight: 10, marginTop: 20}}>
            <tbody>
              <tr>
                <td><img style={ { objectFit:'cover', marginTop:5, width: 25, height: 25 }} src={'/static/checked.png'} alt=""/></td>
                <td style={{fontSize: 16}}><b style={{opacity: 0.8}}>€10 meals daily</b></td>
              </tr>
              <tr>
                <td><img style={ { objectFit:'cover', marginTop:5, width: 25, height: 25 }} src={'/static/checked.png'} alt=""/></td>
                <td style={{fontSize: 16}}><b style={{opacity: 0.8}}>Free delivery</b></td>
              </tr>
              <tr>
                <td><img style={ { objectFit:'cover', marginTop:5, width: 25, height: 25 }} src={'/static/checked.png'} alt=""/></td>
                <td style={{fontSize: 16}}><b style={{opacity: 0.8}}>No commitment. Order when you like</b></td>
              </tr>
              <tr>
                <td><img style={ { objectFit:'cover', marginTop:5, width: 25, height: 25 }} src={'/static/checked.png'} alt=""/></td>
                <td style={{fontSize: 16}}><b style={{opacity: 0.8}}>Special offers & treats</b></td>
              </tr>
            </tbody>
          </Table>

          <div style={{textAlign: 'center', color: 'white',}}>
            <Button  style={{fontSize: 18, height: 50, marginTop: 10, marginBottom: 30,}} className="bg-primary" size="lg" color="primary">Start Free Trial</Button>
          </div>

          <div style={{textAlign: 'center',marginBottom: 20}}>
            <b style={{fontSize: 17,}}>€15 / month after free trial. Cancel anytime. </b>
          </div>

        </ModalBody>
      </Modal>
    )
  }

  renderMenuModal() {

    var activeMenu = this.state.activeMenu

    return (
      <Modal isOpen={this.state.menuModalOpen} toggle={this.toggleMenuModal}>
        <ModalBody>
          <b style={{ color: "#20a8d8", fontSize: 19 }}>{activeMenu.title}</b>
          <Button className="float-right" style={{ borderColor: "transparent", paddingTop: 0, paddingLeft: 5, paddingRight: 5, paddingBottom: 5,backgroundColor: "transparent" }} onClick={this.toggleMenuModal}>
              <img 
                style={{cursor:'pointer', objectFit: "cover", width: 13, height: 13 }}
                src={img.close} />
          </Button>

           <p style={{ fontWeight: '600', marginTop:5, fontSize: 14, opacity: 0.5}}>Delivered by: 12:30p.m - 1:30p.m</p>

          {activeMenu.src ? <img
            style={{cursor:'pointer', marginTop:10, marginBottom: 10, objectFit: "cover", width: "100%", height: 200 }}
            onClick={() => this.inputOpenFileRef.current.click()}
            src={activeMenu.src}
          /> : null }

          <div style={{ marginTop: 10 }}>
            <p>
              {activeMenu.descrip}
            </p>
          </div>

          {typeof activeMenu.markitem === 'undefined' || activeMenu.markitem.length === 0 ? null : this.renderIcon(activeMenu.markitem)} 

          <div style={{ marginTop: 20 }}>
            <FormGroup>
              <Label style={{fontWeight: '600'}}>Select Quantity</Label>
              <Input value={this.state.selectedQuantity} onChange={(e) => this.handleQuantityChange(e, activeMenu.priceperunit)} style={{color:'black'}} type="select">
              {this.findQuantityRange(activeMenu.minimumquantity).map(quantity =>
                <option style={{color:'black'}} key={quantity} value={quantity}>{quantity}</option>
              )}
              </Input>
            </FormGroup>
          </div>

          <Row>

            <Col style={{marginTop: 10, }} xs="12">
              <Button style={{borderColor: "#FF5722", borderWidth: 1, backgroundColor: "white"}} onClick={this.togglePrimeModal}>
                <b style={{fontSize: 16, fontWeight: '700', color: "#FF5722",marginTop: 12,}}>Get it for €10 with 
                  <Button style={{cursor: "pointer", marginLeft: 10, opacity: 1.0, padding: 5, fontWeight: '600', fontSize: 12,borderWidth: 0, backgroundColor: "#FF5722", color: "white" }} disabled>PRIME</Button>          
                </b>
              </Button>
            </Col>

           

            <Col style={{marginTop: 15,}} xs="6">
              <b style={{fontSize: 19, fontWeight: '600',}}>€{Number(this.state.selectedPrice === 0 ? activeMenu.priceperunit : this.state.selectedPrice).toFixed(2)}</b>
            </Col>

            <Col style={{textAlign:'end', marginTop: 15,}} xs="6">
              <Button disabled style={{fontSize: 17, padding: 10}} color="primary">
                {"Add to Cart"}
              </Button>
            </Col>  
          </Row>
        </ModalBody>
       
      </Modal>
    );
  }

  renderEmptyItems() {
    return (
      <Row style={{ paddingLeft: 20, paddingRight: 20, marginTop: 50 }}>
        <Col style={{ textAlign: "center" }} xs="12">
          <img
            style={{
              objectFit: "cover",
              width: 70,
              height: 70,
              opacity: 0.6
            }}
            alt={""}
            src={
              "https://cdn0.iconfinder.com/data/icons/huge-black-icons/512/Find.png"
            }
          />
        </Col>
        <Col style={{ textAlign: "center" }} xs="12">
          <p
            style={{ fontSize: 18, letterSpacing: 2, marginTop: 30 }}
            className="big"
          >
            NO CATERER IS AVAILABLE FOR THIS SEARCH.
          </p>
        </Col>
        <Col style={{ textAlign: "center" }} xs="12">
          <p
            style={{ fontSize: 15, opacity: 0.8, marginTop: 10, paddingLeft:20, paddingRight: 20 }}
            className="big"
          >
            We recommend you to make special request to our team by contacting us at support@foodiebee.eu. We will make response to you as soon as possible.
          </p>
        </Col>
      
      </Row>
    );
  }

  renderLoadingItems() {
    var itemsarray = [];

    for (let i = 0; i < 6; i++) {
      itemsarray.push(
        <Col key={i} xs="12" sm="6" md="6" lg="4">
          <ContentLoader height="400">
            <rect x="0" y="0" rx="6" ry="6" width="100%" height="200" />
            <rect x="0" y="240" rx="4" ry="4" width="300" height="13" />
            <rect x="0" y="260" rx="3" ry="3" width="250" height="10" />
            <rect x="0" y="280" rx="2" ry="2" width="100%" height="20" />
          </ContentLoader>
        </Col>
      );
    }

    return (
      <Row
        style={{
          marginTop: 10
        }}
      >
        {itemsarray}
      </Row>
    );
  }

  renderItems(menuitems, parentIndex) {
    var itemsarray = [];

    for (let i = 0; i < menuitems.length; i++) {

      var item = menuitems[i][0]

      itemsarray.push(
        <Col key={i} xs="12" sm="6" md="4" lg="4">
          <Card className="card-1" onClick={() => this.menuItemClicked( i, parentIndex)} style={{ cursor: "pointer" }}>
            <CardBody
              style={{
                cursor: "pointer",
                paddingTop: 0,
                paddingBottom: 0,
                paddingRight: 15,
                height: "100%"
              }}
            >
            <Row>
              <Col style={{ marginTop: 15, marginBottom: 10,}} xs={item.src ? "8" : "12"}>
                <div style={{paddingRight: 10}} class="row">
                  <Dotdotdot clamp={1}>
                    <p className="h5" style={{ cursor: "pointer", marginLeft: 15, color: "#20a8d8", overflow: "hidden" }}>
                      {item.title}
                    </p>
                  </Dotdotdot>
                </div>
             
                <div class="row">
                  {typeof item.markitem === 'undefined' ? null : this.renderMarkAsIcon(item.markitem)}
                </div>
                
                <div style={{ marginTop: 10 }}>
                  <Dotdotdot clamp={2}>
                    <p style={{ cursor: "pointer", overflow: "hidden" }}>
                      {item.descrip}
                    </p>
                  </Dotdotdot>
                </div>

                <div class="row" style={{ marginTop: 10, }}>
                  <Label
                    style={{
                      cursor: "pointer",
                      opacity: 0.5,
                      marginLeft: 15, 
                      textDecorationLine: 'line-through',
                    }}
                    className="h5 float-left"
                  >
                    €{Number(item.priceperunit).toFixed(2)}
                  </Label>
                </div>

                <div style={{ marginTop: 10, marginBottom: 10 }}>
                  <Row>
                    <Button style={{cursor: "pointer", marginLeft: 10, opacity: 1.0, padding: 5, fontWeight: '600', fontSize: 12,borderWidth: 0, backgroundColor: "#FF5722", color: "white" }} disabled>PRIME</Button>          
                    <Label
                      style={{
                        cursor: "pointer",
                        marginLeft: 10, 
                        marginTop: 5,
                        color: "#FF5722"
                      }}
                      className="h5 float-left"
                    >
                      €{Number(10).toFixed(2)}
                    </Label>
                  </Row>
                </div>
              </Col>

              {item.src ?
                <Col xs="4" style={{padding: 0,}}>
                  <div style={{ objectFit:'cover', width: 'auto', height: '100%', }}>
                    <img style={{ objectFit:'cover', width: '100%', height: '100%', }} src={item.src}/>
                  </div>
                </Col>
                :
                null}

              </Row>
              
            </CardBody>
          </Card>
        </Col>
      );
    }

    return (
      <Row style={{marginLeft: 20, marginRight: 20}} >
        {itemsarray}
      </Row>
    );
  }

  renderRestaurants() {
    var itemsarray = [];

    var dailyMenu = this.state.dailyMenu;

    for (let i = 0; i < dailyMenu.length; i++) {
      itemsarray.push(
        <div >
          <Row style={{marginLeft: 20, marginRight: 20}}>
          
             <div className="float-left" style={{ marginLeft: 30, width: 80, height: 80,  borderRadius: '50%', overflow: 'hidden'}}>
              <img style={{ objectFit:'cover', width: 'auto', height: '100%', display: 'inline'}} src={dailyMenu[i].catererDetails.profilesrc}/>
             </div>
            
            <div class="row" style={{ marginTop:10, marginLeft: 40, marginRight: 20 }} >
              <Label style={{width: '100%', }} className="h4">{dailyMenu[i].catererDetails.catererName} lalalalallalalalala</Label>
              <Label style={{ opacity: 0.6, width: '100%'}} className="h6">Order Before 11:30 A.M</Label>
            </div>

          </Row>

          <Col style={{ marginTop: 20, marginBottom: 20 }} xs="12">
            {this.renderItems(dailyMenu[i].menuitems, i)}
          </Col>
          
        </div>
      );
    }

    return (
      <Row>
        {itemsarray}
      </Row>
    );
  }


  renderDateItems() {
    var itemsarray = [];

    var dayList = this.state.dayList;

    for (let i = 0; i < dayList.length; i++) {
      itemsarray.push(
        <Col style={{ paddingRight: 0, paddingLeft: 0 }} key={i} xs="2.4">
          <Card
            onMouseEnter={() => this.hoverDate(i)}
            onMouseLeave={() => this.unhoverDate(i)}
            style={{
              cursor: "pointer",
              marginTop: 0,
              boxShadow: "none",
              borderWidth: 0,
              marginBottom: 0,
            }}
            onClick={() => this.selectDateClicked(i)}
          >
            <CardBody>
              <div style={{ textAlign: "center" }}>
                <span
                  style={{
                    color: dayList[i].hovered ? "#FF5722" : "#696969",
                    fontWeight: "600",
                  }}
                >
                  {dayList[i].day}
                </span>
              </div>
              <div
                style={{
                  margin: 'auto',
                  marginTop: 5,
                  backgroundColor: dayList[i].hovered ? "#FF5722" : "white",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  textAlign: "center"
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontWeight: "500",
                    color: dayList[i].hovered ? "white" : "#696969",
                    verticalAlign: "middle"
                  }}
                >
                  {dayList[i].date}
                </span>
              </div>
            </CardBody>
          </Card>
        </Col>
      );
    }

    return <Row style={{backgroundColor: 'transparent'}} className="justify-content-center">{itemsarray}</Row>;
  }


  renderTopSearchBar() {
    
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
      <div style={{boxShadow: '0px 0px 3px #DEDEDE'}}>
      <Container>
          <Row style={{ paddingTop: 20, paddingBottom: 10}}>

            <Col xs="12" md={this.state.isMobile ? "12" : "6"}>
              {this.renderDateItems()}
            </Col>

            <Col xs="12" md={this.state.isMobile ? "12" : "6"}>
              <Row className="justify-content-center" style={{paddingTop: 20, paddingBottom: 20}}>
             
                 <img
                  style={{
                    objectFit: "cover",
                    width: 30,
                    height: 30,
                    marginTop: 10
                  }}
                  alt={""}
                  src={img.mapmarker}
                  />
               
               <div style={{width: "80%", marginLeft: 10}} >
                  <Select
                    value={this.state.selectedCompany}
                    options={searchList}
                    onChange={this.handleCompanyChange}
                    placeholder="ex: Google"
                    openMenuOnClick={false}
                    styles={customStyles}
                    components={{ DropdownIndicator }}
                  />
                </div>
            
              </Row>
            </Col>
          </Row>
     
      </Container>
      <div style={{height: 1, backgroundColor: 'gray', opacity: 0.3}}></div>
      </div>
    )
  }


  renderEmptyItems() {
    return (
      <Row style={{ paddingLeft: 20, paddingRight: 20, marginTop: 50 }}>
        <Col style={{ textAlign: "center" }} xs="12">
          <img
            style={{
              objectFit: "cover",
              width: 70,
              height: 70,
              opacity: 0.6
            }}
            alt={""}
            src={
              "https://cdn0.iconfinder.com/data/icons/huge-black-icons/512/Find.png"
            }
          />
        </Col>
        <Col style={{ textAlign: "center" }} xs="12">
          <p
            style={{ fontSize: 18, letterSpacing: 2, marginTop: 30 }}
            className="big"
          >
            NO CATERERS AVAILABLE.
          </p>
        </Col>
        <Col style={{ textAlign: "center" }} xs="12">
          <p
            style={{ fontSize: 15, opacity: 0.8, marginTop: 10, paddingLeft:20, paddingRight: 20 }}
            className="big"
          >
            We recommend you to reach out to our team by contacting us at support@foodiebee.eu. We will make response to you as soon as possible.
          </p>
        </Col>
      
      </Row>
    );
  }

  render() {

    return (
      <Layout title={this.state.location === "" || typeof this.state.location === "undefined" ? 'Caterers Nearby' : this.state.location + " Caterers Nearby"}>
      <NextSeo
        config={{
          title: this.state.location === "" || typeof this.state.location === "undefined" ? 'Caterers Nearby' : this.state.location + " Caterers Nearby",
        }}
      />
      
      <div ref={this.refObj} style={{backgroundColor: 'white'}}>
         <NavBar signIn={e=>this.signIn(e)}/>

         {this.renderTopSearchBar()}

      <div className="app align-items-center">
       
        <Container>
          <Row style={{marginTop: 20, marginBottom: 50, }} >

            <Col style={{ marginTop: 20 }} xs="12">
              {this.state.loading ? this.renderLoadingItems() : null}
            </Col>

            <Col xs="12">
              {this.renderRestaurants()}
            </Col>

            <Col xs="12">
              {this.state.empty ? this.renderEmptyItems() : null}
            </Col>
 
          </Row>
        </Container>

        {this.state.menuModalOpen ? this.renderMenuModal() : null}

        {this.state.primeModalOpen ? this.renderPrimeModal() : null}

      </div>
      <Footer />
      </div>
      </Layout>
    );
  }
}

export default withRouter(SearchLunch);
