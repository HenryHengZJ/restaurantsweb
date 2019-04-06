import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, CardGroup, Col, Container, Form, Modal, ModalBody, ModalHeader, ModalFooter,
  Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label, FormGroup,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Nav, NavItem, NavLink, Table, Collapse } from 'reactstrap';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import AutoCompleteAddress from '../../../components/AutoCompleteAddress/AutoCompleteAddress'
import moment from "moment";
import StarRatingComponent from "react-star-rating-component";
import { Calendar } from 'react-date-range';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import ContentLoader, { Facebook } from "react-content-loader";
import Dotdotdot from "react-dotdotdot";
import axios from "axios";

import './SearchCaterer.css'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


class SearchCaterer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      address: "",
      price: [
        "All",
        "50 (or less)",
        "100 (or less)",
        "200 (or less)",
        "300 (or less)",
        "500 (or less)",
        "More than 500"
      ],
      dietary: [
        {
          name: "Spicy",
          value: false,
        }, 
        {
          name: "Hot",
          value: false,
        },
        {
          name: "Gluten Free",
          value: false,
        },
        {
          name: "Halal",
          value: false,
        },
        {
          name: "Healthy",
          value: false,
        },
        {
          name: "Vegetarian",
          value: false,
        },
      ],
      occasion: [
        {
          name: "Breakfast",
          value: false,
        },
        {
          name: "Brunch",
          value: false,
        },
        {
          name: "Buffet",
          value: false,
        },
        {
          name: "Christmas Party",
          value: false,
        },
        {
          name: "Dinner",
          value: false,
        },
        {
          name: "Event",
          value: false,
        },
        {
          name: "Finger Food",
          value: false,
        },
        {
          name: "Lunch",
          value: false,
        },
        {
          name: "Meeting",
          value: false,
        },
        {
          name: "Office Daily",
          value: false,
        },
        {
          name: "Wedding",
          value: false,
        },
        {
          name: "Snacks",
          value: false,
        },
      ],
      caterer: [
        /*{
          name: "Flannery Restaurant & Pub",
          descrip:
            "Specialized in American Burger style mealset.",
          rating: "4.5",
          numofreview: "2",
          src:
            "https://www.cityworksrestaurant.com/minneapolis/wp-content/uploads/sites/2/2015/11/Smokehouse-Burger_600x400.jpg",
          minimumspend: "50",
          deliveryfee: "3"
        },
        {
          name: "Asian Wok",
          descrip:
            "Asian style wok dishes",
          rating: "4.8",
          numofreview: "17",
          src:
            "https://media.apnarm.net.au/media/images/2017/01/24/twb240117asian-7aj2fxtt8c9k5lphmn2_ct677x380.jpg",
          minimumspend: "30",
          deliveryfee: "2.50"
        },
        {
          name: "Spade Burger",
          descrip:
            "Wide variety of burgers with flavourable toppings and addons",
          rating: "4.1",
          numofreview: "25",
          src:
            "https://du7ybees82p4m.cloudfront.net/578f9fac892d52.19976571.jpg?width=910&height=512",
          minimumspend: "50",
          deliveryfee: "3"
        },
        {
          name: "Italiano Di Angelo",
          descrip:
            "Best Italian Sandwiches in town. We have a long history since 1964. We are speacialised in pasta",
          rating: "4.7",
          numofreview: "15",
          src:
            "https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/Pasta-with-Cherry-Tomatoes.jpg?itok=mlbhhvu7&mtime=1401946169",
          minimumspend: "50",
          deliveryfee: "3"
        }*/
      ],
      cuisine: [
        "All Cuisines",
        "Sandwich",
        "Irish",
        "Asian",
        "American",
        "Burgers",
        "Caribbean",
        "Chinese",
        "Dessert",
        "Drinks",
        "English",
        "French",
        "Greek",
        "Halal",
        "Indian",
        "Italian",
        "Japanese",
        "Mexican",
        "Middle Eastern",
        "Pizza",
        "Salad",
        "Thai",
        "Vegetarian Friendly"
      ],
      filterArray: [],
      selectedCuisine: "All Cuisines",
      selectedPrice: "All",
      selectedTime: "",
      selectedDate: "",
      maxDate: null,
      cuisineDropDownOpen: false,
      dropDownDate: false,
      isSearchBarOpen: false,
      filterModalOpen: false,
    }

    this.time  = [
      {
        value: "07:00"
      },
      {
        value: "07:30"
      },
      {
        value: "08:00"
      },
    ];

  }

  componentDidMount() {
    this.getDataFromDb();
    var currentDate = moment().toDate();
   
    this.setState({
      maxDate: currentDate,
    });
  }

  getDataFromDb = () => {
    var url = '/test/caterer';

    axios.get(url)
    .then((response) => {

      var data = response.data;

      this.setState({
        caterer: data
      })
    })
    .catch(err => {
       alert(err)
    });
  };

  signIn(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  toggleDropDown = () => {
    this.setState({
      dropDownDate: !this.state.dropDownDate
    })
  }

  searchBarToggle = () => {
    this.setState({
      isSearchBarOpen: !this.state.isSearchBarOpen
    })
  }

  login = (e) => {
    e.preventDefault()
    const {userpassword, useremail, } = this.state;
    if (useremail === 'user' && userpassword === '12345') {
      this.props.history.push('/caterer')
    }
    this.props.history.push('/caterer')
  }

  showPlaceDetails(address) {
    this.setState({ address });
  }

  navItemClicked = selectedCuisine => {
    this.setState({
      selectedCuisine: selectedCuisine,
      cuisineDropDownOpen: false
    });
  };

  catererClicked = () => {
    this.props.history.push("./catererdetail");
  };

  handleTimeChange(e) {
    this.setState({ 
      selectedTime: e.target.value,
    })
  }

  handleChange = event => {
    this.setState({ selectedPrice: event.target.value });
  };

  handleCuisineChange = event => {
    this.setState({ selectedCuisine: event.target.value });
  };

  handleCheckBoxChange = (index, statename, event) => {
    var newArray = this.state[statename]

    if (newArray[index].value) {
      newArray[index].value = false
    }
    else {
      newArray[index].value = true
    }
    this.setState({ [statename]: newArray });
  };

  handleDateChange(date){
		this.setState({ 
      selectedDate : moment(date).format("DD MMM, YYYY") 
    }, () => {
      this.toggleDropDown()
    })
  }
  
  toggleCuisineDropDown = () => {
    this.setState({
      cuisineDropDownOpen: !this.state.cuisineDropDownOpen
    });
  };

  toggleFilterModal = () => {
    this.setState({
      filterModalOpen: !this.state.filterModalOpen
    });
  };

  removeFilterItem = (index) => { 

    var newfilterArray = this.state.filterArray
    newfilterArray.splice(index, 1)

    this.setState({
      filterArray: newfilterArray
    })
  }

  saveFilter = () => { 
    const {dietary, occasion, selectedCuisine, selectedPrice, filterArray} = this.state

    var newfilterArray = [];

    for(var i = 0; i < dietary.length; i++)
    {
      if(dietary[i].value == true)
      {
        newfilterArray.push(dietary[i].name)
      }
    }

    for(var i = 0; i < occasion.length; i++)
    {
      if(occasion[i].value == true)
      {
        newfilterArray.push(occasion[i].name)
      }
    }

    if (selectedCuisine != 'All Cuisines') {
      newfilterArray.push(selectedCuisine)
    }

    if (selectedPrice != 'All') {
      newfilterArray.push(selectedPrice)
    }

    this.setState({
      filterArray: newfilterArray
    },() => {
      this.toggleFilterModal()
    })

  };


  renderNavItem(cuisine) {
    return (
      <NavItem>
        <NavLink
          onClick={() => this.navItemClicked(cuisine)}
          style={{
            paddingRight: 20,
            paddingLeft: cuisine === "All Cuisines" ? 0 : 20,
            fontWeight: "600",
            color: this.state.selectedCuisine === cuisine ? "#20a8d8" : "black",
            fontSize: 15
          }}
          href="#"
        >
          {" "}
          {cuisine}
        </NavLink>
        <div
          style={{
            height: 2,
            width: "100%",
            backgroundColor:
              this.state.selectedCuisine === cuisine ? "#20a8d8" : "transparent"
          }}
        />
      </NavItem>
    );
  }

  renderMoreCuisine(startindex, lastindex) {
    var itemsarray = [];

    var cuisine = this.state.cuisine;

    for (let i = startindex; i < lastindex; i++) {
      itemsarray.push(
        <td>
          <Button
            onClick={() => this.navItemClicked(cuisine[i])}
            block
            color="ghost-link"
          >
            {cuisine[i]}
          </Button>
        </td>
      );
    }

    return <tr>{itemsarray}</tr>;
  }

  renderCuisine() {
    var itemsarray = [];

    var cuisine = this.state.cuisine;

    for (let i = 0; i < cuisine.length; i++) {
      itemsarray.push(
        <Col xs={this.state.filterModalOpen ? "6" : "12"}>
        <FormGroup style={{ paddingLeft: 0, marginTop: 10 }} check className="radio">
           <Radio
            checked={this.state.selectedCuisine === cuisine[i]}
            onChange={this.handleCuisineChange}
            value={cuisine[i]}
            name={cuisine[i]}
            style={{padding:0, marginRight: 10}}
          />
          <Label check className="form-check-label">
            {cuisine[i]}
          </Label>
        </FormGroup>
        </Col>
      );
    }

    return (
      <Row>
        {itemsarray}
      </Row>
    );
  }

  renderPrice() {
    var itemsarray = [];

    var price = this.state.price;

    for (let i = 0; i < price.length; i++) {
      itemsarray.push(
        <Col xs={this.state.filterModalOpen ? "6" : "12"}>
        <FormGroup style={{ paddingLeft: 0, marginTop: 10 }} check className="radio">
           <Radio
            checked={this.state.selectedPrice === price[i]}
            onChange={this.handleChange}
            value={price[i]}
            name={price[i]}
            style={{padding:0, marginRight: 10}}
          />
          <Label check className="form-check-label">
            {price[i]}
          </Label>
        </FormGroup>
        </Col>
      );
    }

    return (
      <Row>
        {itemsarray}
      </Row>
    );
  }

  renderDietary() {
    var itemsarray = [];

    var dietary = this.state.dietary;

    for (let i = 0; i < dietary.length; i++) {
      itemsarray.push(
        <Col xs={this.state.filterModalOpen ? "6" : "12"}>
        <FormGroup style={{ paddingLeft: 0, marginTop: 10 }} check className="checkbox">
          <Checkbox
            checked={dietary[i].value}
            onChange={(e) => this.handleCheckBoxChange(i, 'dietary', e)}
            value={dietary[i].name}
            style={{padding:0, marginRight: 10}}
          />
          <Label check className="form-check-label">
            {dietary[i].name}
          </Label>
        </FormGroup>
        </Col>
      );
    }

    return (
      <Row>
        {itemsarray}
      </Row>
    );
  }

  renderOccasion() {
    var itemsarray = [];

    var occasion = this.state.occasion;

    for (let i = 0; i < occasion.length; i++) {
      itemsarray.push(
        <Col xs={this.state.filterModalOpen ? "6" : "12"}>
          <FormGroup style={{ paddingLeft: 0, marginTop: 10 }}check className="checkbox">
            <Checkbox
              checked={occasion[i].value}
              onChange={(e) => this.handleCheckBoxChange(i, 'occasion', e)}
              value={occasion[i].name}
              style={{padding:0, marginRight: 10}}
            />
            <Label check className="form-check-label">
              {occasion[i].name}
            </Label>
          </FormGroup>
        </Col>
      );
    }

    return (
      <Row>
        {itemsarray}
      </Row>
    );
  }

  renderFilterModal() {
    return(
    <Modal isOpen={this.state.filterModalOpen} toggle={() => this.toggleFilterModal()}>
      <ModalHeader toggle={() => this.toggleFilterModal()} style={{backgroundColor: 'rgba(211,211,211,0.5)', paddingLeft:30, paddingBottom: 0, paddingTop:10 }}>
        <Label>Select Filter</Label>
      </ModalHeader>
      <ModalBody style={{marginBottom: 20}}>
        <Col>
          <h6
            style={{
              fontWeight: "700",
              color: "black",
              fontSize: 15,
              marginBottom: 10,
              marginTop: 0
            }}
          >
            CUISINE
          </h6>
          {this.renderCuisine()}
          <h6
            style={{
              fontWeight: "700",
              color: "black",
              fontSize: 15,
              marginBottom: 10,
              marginTop: 30
            }}
          >
            OCCASION
          </h6>
          {this.renderOccasion()}
          <h6
            style={{
              fontWeight: "700",
              color: "black",
              fontSize: 15,
              marginBottom: 10,
              marginTop: 30
            }}
          >
            DIETARY CONCERN
          </h6>
          {this.renderDietary()}
          <h6
            style={{
              fontWeight: "700",
              color: "black",
              fontSize: 15,
              marginBottom: 10,
              marginTop: 30
            }}
          >
            PRICE
          </h6>
          {this.renderPrice()}
        </Col>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => this.saveFilter()} style={{fontSize: 17}} color="primary">Save Filter</Button>
      </ModalFooter>
    </Modal>
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
            NO CATERER IS AVAILABLE FOR THIS SEARCH.
          </p>
        </Col>
        <Col style={{ textAlign: "center" }} xs="12">
          <p
            style={{ fontSize: 15, opacity: 0.8, marginTop: 10 }}
            className="big"
          >
            We recommend you to make special request to our team by filling out
            the form below. We will make response to you as soon as possible for
            a tailor-made proposal.
          </p>
        </Col>
        <Col style={{ textAlign: "center" }} xs="12">
          <Button color="primary">Make Request</Button>
        </Col>
      </Row>
    );
  }

  renderLoadingItems() {
    var itemsarray = [];

    for (let i = 0; i < 6; i++) {
      itemsarray.push(
        <Col xs="12" sm="6" md="4" lg="4">
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

  renderFilterItems() {
    var itemsarray = [];

    var filterArray = this.state.filterArray;

    for (let i = 0; i < filterArray.length; i++) {
      itemsarray.push(
        <span
          style={{
            borderWidth: 1.5,
            color: "black",
            borderRadius: 15,
            backgroundColor: "rgba(211,211,211, 0.5)",
            padding: 10,
            textAlign: "center",
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10
          }}
        >
          {filterArray[i]}
          <i onClick={() => this.removeFilterItem(i)} style={{cursor: 'pointer', paddingLeft: 10}} className="fa fa-close"></i>
        </span>
      );
    }

    return (
      <Row
        className="justify-content-center"
        style={{
          marginTop: 10,
          padding: 0
        }}
      >
        {itemsarray}
      </Row>
    );
  }

  renderItems() {
    var itemsarray = [];

    var caterer = this.state.caterer;

    for (let i = 0; i < caterer.length; i++) {
      itemsarray.push(
        <Col xs="12" sm="6" md="4" lg="4">
          <Card
            style={{
              cursor: "pointer",
              backgroudColor: "rgba(220,220,220, 0.5)",
              borderWidth: 0,
              borderColor: "white",
              boxShadow: "none"
            }}
            onClick={() => this.catererClicked()}
          >
            <CardBody style={{ padding: 0 }}>
              <img
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: 150,
                  display: "inline"
                }}
                src={caterer[i].src}
              />

              <b
                style={{
                  marginTop: 10,
                  height: 30,
                  display: "inline-block",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  paddingLeft: 0,
                  maxWidth: 300,
                  width: "100%",
                  textAlign: "start",
                  fontSize: 17
                }}
              >
                {caterer[i].name}
              </b>

              <Row
                style={{ paddingLeft: 15, paddingRight: 0, marginBottom: 5 }}
              >
                <StarRatingComponent
                  name="rate1"
                  emptyStarColor="#D3D3D3"
                  starCount={5}
                  editing={false}
                  value={caterer[i].rating}
                />
                <b style={{ marginLeft: 5, color: "darkorange" }}>
                  {caterer[i].rating}
                </b>
                <Label style={{ marginLeft: 5, color: "darkorange" }}>
                  ({caterer[i].numofreview})
                </Label>
              </Row>

              <Table style={{ margin: 0 }} borderless>
                <tbody>
                  <tr>
                    <td
                      style={{ padding: 0, width: "40%", textAlign: "start" }}
                    >
                      <img
                        style={{
                          objectFit: "cover",
                          width: 20,
                          height: 20,
                          display: "inline",
                          marginRight: 5
                        }}
                        alt={""}
                        src={
                          "https://cdn0.iconfinder.com/data/icons/webshop-essentials/100/shopping-cart-512.png"
                        }
                      />
                      <b style={{ color: "#20a8d8" }}>
                        €{caterer[i].minimumspend}
                      </b>
                    </td>
                    <td
                      style={{ padding: 0, width: "60%", textAlign: "start" }}
                    >
                      <img
                        style={{
                          objectFit: "cover",
                          width: 23,
                          height: 23,
                          display: "inline",
                          marginRight: 5
                        }}
                        alt={""}
                        src={
                          "https://cdn0.iconfinder.com/data/icons/e-commerce-mini-icons/32/Commerce_Mini_Icons-19-512.png"
                        }
                      />
                      <b style={{ color: "green" }}>
                        €{caterer[i].deliveryfee}
                      </b>
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Dotdotdot clamp={2}>
                <p
                  style={{
                    overflow: "hidden",
                    textAlign: "start",
                    marginTop: 10,
                    opacity: 0.8
                  }}
                >
                  {caterer[i].descrip}
                </p>
              </Dotdotdot>
              
            </CardBody>
          </Card>
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

  renderTopSearchBar() {
    return (
      <div className="topsearchbar">
      <Container>
          <Row style={{ paddingTop: 20, paddingBottom: 10}}>
            <Col xs="8">
              <FormGroup>
                <h6>Delivered To</h6>
                <AutoCompleteAddress 
                  borderTopRightRadius={5}
                  borderBottomRightRadius = {5}
                  borderTopLeftRadius={5}
                  borderBottomLeftRadius={5}
                  borderColor = 'rgba(211,211,211, 0.5)'
                  paddingLeft = {10}
                  paddingRight = {10}
                  paddingTop = {5}
                  paddingBottom = {5}
                  fontSize = {15}
                  color = 'black'
                  height = {40}
                  onPlaceChanged={this.showPlaceDetails.bind(this)} />
              </FormGroup>
            </Col>
            <Col xs="4">
              <Button  outline onClick={() => this.searchBarToggle()} block style={{marginTop: 25, height: '50%', fontWeight: '700', }} color="primary"> {this.state.isSearchBarOpen? "SAVE" : "CHANGE"}</Button>
            </Col>
          </Row>

          <Collapse isOpen={this.state.isSearchBarOpen}>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <h6>When</h6>
                  <UncontrolledDropdown isOpen={this.state.dropDownDate}  toggle={() => this.toggleDropDown()}>
                    <DropdownToggle
                      style={{
                        height: 40,
                        width: '100%',
                        color: "rgba(0,0,0, 0.5)",
                        borderColor: "rgba(211,211,211, 0.5)",
                        backgroundColor: "white",
                      }}
                      caret
                    >
                    <Label style={{ cursor: 'pointer', fontSize: 15, paddingLeft:5, textAlign:'start', color: this.state.selectedDate === "" ? 'gray' : 'black', height:12, width: '98%'}}>{this.state.selectedDate === "" ? 'Select Date' : this.state.selectedDate}</Label> 
                    </DropdownToggle>
                    <DropdownMenu >
                      <div >
                        <Calendar
                          onChange={this.handleDateChange.bind(this)}
                          minDate={this.state.maxDate}
                        />
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <h6>Time</h6>
                  <Input value={this.state.selectedTime} onChange={(e) => this.handleTimeChange(e)} style={{cursor: 'pointer', color: this.state.selectedTime === "" ? 'gray': 'black', fontSize: 15, height: 40, }} type="select">
                    <option value='' disabled>Select Time</option>
                    {this.time.map(time =>
                      <option style={{color:'black'}} key={time.value} value={time.value}>{time.value}</option>
                    )}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Collapse>
      </Container>
      <div style={{height: 1, backgroundColor: 'gray', opacity: 0.3}}></div>
      </div>
    )
  }


  render() {

    const cuisinelength = this.state.cuisine.length;
    const slicedCuisine = this.state.cuisine.slice(4, cuisinelength)

    return (
      <div style={{backgroundColor: 'white'}}>
         <NavBar signIn={e=>this.signIn(e)}/>

         {this.renderTopSearchBar()}

      <div className="app align-items-center">
       
        <Container>
          <Row style={{marginTop: 20, marginBottom: 50}} className="justify-content-center">
            <Col className="searchbar" xs="12" md="12">
              <Card style={{backgroundColor: 'rgba(211,211,211,0.1)', boxShadow: '1px 1px 1px #9E9E9E'}}>
              <CardBody style={{paddingTop: 15, paddingBottom: 0,}}>
                <Row>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <h6>Delivered To</h6>
                      <AutoCompleteAddress 
                        borderRadius = {5}
                        borderColor = 'rgba(211,211,211, 0.5)'
                        paddingLeft = {10}
                        paddingRight = {10}
                        paddingTop = {5}
                        paddingBottom = {5}
                        fontSize = {15}
                        color = 'black'
                        height = {40}
                        onPlaceChanged={this.showPlaceDetails.bind(this)} />
                    </FormGroup>
                  </Col>
                  <Col xs="6" md="3">
                    <FormGroup>
                      <h6>When</h6>
                      <UncontrolledDropdown isOpen={this.state.dropDownDate}  toggle={() => this.toggleDropDown()}>
                        <DropdownToggle
                          style={{
                            height: 40,
                            width: '100%',
                            color: "rgba(0,0,0, 0.5)",
                            borderColor: "rgba(211,211,211, 0.5)",
                            backgroundColor: "white",
                          }}
                          caret
                        >
                        <Label style={{ cursor: 'pointer', fontSize: 15, paddingLeft:5, textAlign:'start', color: this.state.selectedDate === "" ? 'gray' : 'black', height:12, width: '98%'}}>{this.state.selectedDate === "" ? 'Select Date' : this.state.selectedDate}</Label> 
                        </DropdownToggle>
                        <DropdownMenu >
                          <div >
                            <Calendar
                              onChange={this.handleDateChange.bind(this)}
                              minDate={this.state.maxDate}
                            />
                          </div>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </FormGroup>
                  </Col>
                  <Col xs="6" md="3">
                    <FormGroup>
                      <h6>Time</h6>
                      <Input value={this.state.selectedTime} onChange={(e) => this.handleTimeChange(e)} style={{cursor: 'pointer', color: this.state.selectedTime === "" ? 'gray': 'black', fontSize: 15, height: 40, }} type="select">
                        <option value='' disabled>Select Time</option>
                        {this.time.map(time =>
                          <option style={{color:'black'}} key={time.value} value={time.value}>{time.value}</option>
                        )}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="2">
                    <Button block style={{marginTop: 25, height: '50%', fontWeight: '600', }} className="bg-primary" color="primary">SEARCH</Button>
                  </Col>
                </Row>
              </CardBody>
              </Card>
            </Col>

            <Col style={{marginTop: 20}} xs="12">
              <h2 style={{ textAlign: 'center', fonWeight:'700', fontSize: 30, paddingLeft:10, paddingRight: 10}}>56 Caterers Available</h2>
            </Col>

            <Col className="searchbarhide" style={{ marginTop: 25}} xs="12" md="4">
              <Form action="" method="post" className="form-horizontal">
                <FormGroup row>
                  <Col md="12">
                    <InputGroup >
                      <Input style={{ borderWidth:1.5, color:'black', fontSize: 15, height: 40, borderTopLeftRadius: 15, borderBottomLeftRadius: 15}} type="text" id="input1-group2" name="input1-group2" placeholder="Caterer, Cuisine etc" />
                      <InputGroupAddon addonType="prepend">
                        <Button style={{borderTopRightRadius: 15, borderBottomRightRadius: 15}}  type="button" color="primary"><i className="fa fa-search"></i></Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>
              </Form>
            </Col>

            <Col className="cuisinebarhide" style={{ marginTop: 20 }} xs="12" md="8">
                <Nav className="float-right" pills>
                  {this.renderNavItem(this.state.cuisine[0])}
                  {this.renderNavItem(this.state.cuisine[1])}
                  {this.renderNavItem(this.state.cuisine[2])}
                  {this.renderNavItem(this.state.cuisine[3])}
                  <NavItem>
                    <UncontrolledDropdown
                      nav
                      isOpen={this.state.cuisineDropDownOpen}
                      toggle={() => {
                        this.toggleCuisineDropDown();
                      }}
                    >
                      <DropdownToggle
                        style={{
                          fontWeight: "600",
                          color: slicedCuisine.includes( this.state.selectedCuisine ) || this.state.cuisineDropDownOpen ? "#20a8d8" : "black",
                          backgroundColor: "white",
                          fontSize: 15
                        }}
                        nav
                        caret
                      >
                        {slicedCuisine.includes(this.state.selectedCuisine) ? this.state.selectedCuisine : "More"}
                      </DropdownToggle>
                      <DropdownMenu right style={{ right: "auto" }}>
                        <Table style={{ margin: 0 }} borderless>
                          <tbody>
                            {this.renderMoreCuisine(4, 10)}
                            {this.renderMoreCuisine(10, 16)}
                            {this.renderMoreCuisine(16, 22)}
                            {this.renderMoreCuisine(22, 28)}
                          </tbody>
                        </Table>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <div
                      style={{
                        height: 2,
                        width: "100%",
                        backgroundColor: slicedCuisine.includes( this.state.selectedCuisine ) ? "#20a8d8" : "transparent"
                      }}
                    />
                  </NavItem>
                </Nav>
              </Col>

              <Col
                className="smallbar"
                style={{ textAlign: "center", marginTop: 15 }}
                xs="12"
              >
                <Row>
                 
                  <Col xs="12" sm="8" md="8" lg="8">
                    <Form action="" method="post" className="form-horizontal">
                      <FormGroup row>
                        <Col md="12">
                          <InputGroup>
                            <Input
                              style={{
                                borderWidth: 1.5,
                                color: "black",
                                fontSize: 15,
                                height: 40,
                                borderTopLeftRadius: 15,
                                borderBottomLeftRadius: 15
                              }}
                              type="text"
                              id="input1-group2"
                              name="input1-group2"
                              placeholder="Caterer, Cuisine etc"
                            />
                            <InputGroupAddon addonType="prepend">
                              <Button
                                style={{
                                  borderTopRightRadius: 15,
                                  borderBottomRightRadius: 15
                                }}
                                type="button"
                                color="primary"
                              >
                                <i className="fa fa-search" />
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>

                  <Col xs="12" sm="4" md="4" lg="4">
                    <Button onClick={() => this.toggleFilterModal()} block style={{ paddingTop:8, paddingBottom:8, borderRadius: 5 }} color="primary">
                      Add Filters &nbsp;
                      <i className="fa fa-filter" />
                    </Button>
                  </Col>
                 
                </Row>
              </Col>

              <Col className="smallbar" style={{ marginTop: 20 }} xs="12">
                {this.state.filterArray.length === 0 ? null : this.renderFilterItems()}
              </Col>

              <Col className="filterbarhide" xs="0" md="2">
                <h6
                  style={{
                    fontWeight: "700",
                    color: "black",
                    fontSize: 15,
                    marginBottom: 10,
                    marginTop: 20
                  }}
                >
                  OCCASION
                </h6>
                {this.renderOccasion()}
                <h6
                  style={{
                    fontWeight: "700",
                    color: "black",
                    fontSize: 15,
                    marginBottom: 10,
                    marginTop: 30
                  }}
                >
                  DIETARY CONCERN
                </h6>
                {this.renderDietary()}
                <h6
                  style={{
                    fontWeight: "700",
                    color: "black",
                    fontSize: 15,
                    marginBottom: 10,
                    marginTop: 30
                  }}
                >
                  PRICE
                </h6>
                {this.renderPrice()}
              </Col>

              <Col style={{ marginTop: 20 }} xs="12" md="10">
                {this.renderItems()}
              </Col>

          </Row>
        </Container>
        {this.renderFilterModal()}
      </div>
      <Footer />
      </div>
    );
  }
}

export default SearchCaterer;
