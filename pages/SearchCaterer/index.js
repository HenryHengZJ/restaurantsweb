import React, { Component } from 'react';
import  Link  from 'next/link';
import { Button, Card, CardHeader, CardBody, CardGroup, Col, Container, Form, Modal, ModalBody, ModalHeader, ModalFooter,
  Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label, FormGroup, Popover, PopoverBody, PopoverHeader ,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Nav, NavItem, NavLink, Table, Collapse } from 'reactstrap';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import AutoCompleteAddress from '../../components/AutoCompleteAddress'
import moment from "moment";
import StarRatingComponent from "react-star-rating-component";
import { Calendar } from 'react-date-range';
import ContentLoader, { Facebook } from "react-content-loader";
import Dotdotdot from "react-dotdotdot";
import axios from "axios";
import apis from "../../apis";
import Router, { withRouter } from 'next/router'
import { timeRanges } from  "../../utils"
import NextSeo from 'next-seo';
//import fetch from 'isomorphic-unfetch'
import { server } from '../../config';
//import 'react-date-range/dist/styles.css'; // main style file
//import 'react-date-range/dist/theme/default.css'; // theme css file


class SearchCaterer extends Component {

  static async getInitialProps({query: { occasion, location, cuisine, price_lte, price_gt, date, time, longitude, latitude, catererName }}) {

    var url = `${server}${apis.GETcaterer}`
    var locationquerystring = "";
    var longitudequerystring = "";
    var latitudequerystring = "";
    var cuisinequerystring = "";
    var occasionquerystring = "";
    var price_ltequerystring = "";
    var price_gtquerystring = "";
    var datequerystring = "";
    var timequerystring = "";
    var catererName_querystring = "";
    var selectedPrice = "All";
    var selectedDate = "";
    var selectedTime = "";
    var searchName = "";
    var priceAry = [
      "All",
      "50 (or less)",
      "100 (or less)",
      "200 (or less)",
      "300 (or less)",
      "500 (or less)",
      "More than 500"
    ];
    var occasionAry = [
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
    ];

    if (typeof location !== 'undefined') {
      locationquerystring = "?location=" + location
      url = url + locationquerystring
    }

    if (typeof longitude !== 'undefined') {
      longitudequerystring = "&longitude=" + longitude
      url = url + longitudequerystring
    }

    if (typeof latitude !== 'undefined') {
      latitudequerystring = "&latitude=" + latitude
      url = url + latitudequerystring
    }

    if (typeof cuisine !== 'undefined') {
      cuisinequerystring = "&cuisine=" + cuisine
      url = url + cuisinequerystring
    }

    if (typeof price_lte !== 'undefined') {
      price_ltequerystring = "&price_lte=" + price_lte
      url = url + price_ltequerystring
      var priceindex = priceAry.findIndex(x => x.includes(price_lte));
      selectedPrice = priceAry[priceindex]
    }

    if (typeof price_gt !== 'undefined') {
      price_gtquerystring = "&price_gt=" + price_gt
      url = url + price_gtquerystring
      var priceindex = priceAry.findIndex(x => x.includes(price_lte));
      selectedPrice = priceAry[priceindex]
    }

    if (typeof date !== 'undefined') {
      datequerystring = "&date=" + date
      url = url + datequerystring
      selectedDate = date
    }

    if (typeof time !== 'undefined') {
      timequerystring = "&time=" + time
      url = url + timequerystring
      selectedTime = time
    }

    if (typeof catererName !== 'undefined') {
      catererName_querystring = "&catererName=" + catererName
      url = url + catererName_querystring
      searchName = catererName
    }

    if (typeof occasion !== 'undefined') {
      if (Array.isArray(occasion)) {
        for(var i = 0; i < occasion.length; i++)
        {
          var fixedstr = "&occasion="
          occasionquerystring = occasionquerystring + fixedstr + occasion[i] 

          for(var x = 0; x < occasionAry.length; x++)
          {
            if(occasionAry[x].name === occasion[i])
            {
              occasionAry[x].value = true
            }
          }
        }
        url = url + occasionquerystring
      }
      else {
        for(var i = 0; i < occasionAry.length; i++)
        {
          if(occasionAry[i].name === occasion)
          {
            occasionAry[i].value = true
          }
        }

        occasionquerystring = "&occasion=" + occasion
        url = url + occasionquerystring
      }
    }

   // console.log(url)
    const res = await axios.get(url);
    const data = await res.data;
    console.log(`Show data fetched. Count: ${data.length}`);
    return {
      locationquerystring: locationquerystring,
      longitudequerystring: longitudequerystring,
      latitudequerystring: latitudequerystring,
      cuisinequerystring: cuisinequerystring,
      occasionquerystring: occasionquerystring,
      price_ltequerystring: price_ltequerystring,
      price_gtquerystring: price_gtquerystring,
      datequerystring: datequerystring,
      timequerystring: timequerystring,
      catererName_querystring: catererName_querystring,
      data: data,
      location: location,
      selectedCuisine: typeof cuisine !== 'undefined' ? cuisine : "All Cuisines",
      selectedPrice: selectedPrice,
      occasion: occasionAry,
      selectedTime,
      selectedDate,
      searchName,
    };
  }

  componentWillMount() {
    this.setState({
      caterer: this.props.data,
      loading: false,
      empty: this.props.data.length > 0 ? false : true,
      location: this.props.location,
      selectedCuisine: this.props.selectedCuisine,
      selectedPrice: this.props.selectedPrice,
      occasion: this.props.occasion,
      locationquerystring: this.props.locationquerystring,
      longitudequerystring: this.props.longitudequerystring,
      latitudequerystring: this.props.latitudequerystring,
      cuisinequerystring: this.props.cuisinequerystring,
      occasionquerystring: this.props.occasionquerystring,
      price_ltequerystring: this.props.price_ltequerystring,
      price_gtquerystring: this.props.price_gtquerystring,
      datequerystring: this.props.datequerystring,
      timequerystring: this.props.timequerystring,
      catererName_querystring: this.props.catererName_querystring,
      selectedTime: this.props.selectedTime !== "" ? this.reformatInput(this.props.selectedTime) : "",
      selectedDate: this.props.selectedDate,
      searchName: this.props.searchName,
    })
  }

  reformatInput = (time) => {
    if (time.length > 3 ) {
      time = time.slice(0, 2) + ":" + time.slice(2, 4)
      
    }
    else {
      time = "0" + time.slice(0, 1) + ":" + time.slice(1, 3)
    }
    return time
  }

  constructor(props) {
    super(props);

    this.refObj = React.createRef();
  
    this.state = {
      baseurl: "/searchcaterer",
      fullapiurl: "",
      locationquerystring: "",
      longitudequerystring: "",
      latitudequerystring: "",
      occasionquerystring: "",
      price_ltequerystring: "",
      price_gtquerystring: "",
      datequerystring: "",
      timequerystring: "",
      catererName_querystring: "",
      location: "",
      selectedOccasion: null,
      isMobile: false,
      loading: true,
      empty: false,
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
      caterer: [],
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
      selectedCuisine: null,
      selectedPrice: null,
      selectedTime: "",
      selectedDate: "",
      searchName: "",
      maxDate: null,
      cuisineDropDownOpen: false,
      dropDownAddress: false,
      dropDownDate: false,
      isSearchBarOpen: false,
      filterModalOpen: false,
      timeEmptyPopoverOpen: false,
      dateEmptyPopoverOpen: false,
      mobile_timeEmptyPopoverOpen: false,
      mobile_dateEmptyPopoverOpen: false,
    }

    this.time  = timeRanges();
  }


  componentDidMount() {
  //  this.getDataFromDb();

    console.log("mount did mount")
  
    var currentDate = moment().toDate();
    this.setState({
      maxDate: currentDate,
    });

    if (window.innerWidth < 900) {
      this.setState({
        isMobile: true
      });
    }

    window.addEventListener(
      "resize",
      () => {
        this.setState({
          isMobile: window.innerWidth < 900
        });
      },
      false
    );


   /* Router.events.on("routeChangeComplete", () => {
      this.setState({
        loading: false,
        caterer: this.props.data,
        empty: this.props.data.length > 0 ? false : true,
        location: this.props.location,
        locationquerystring: this.props.locationquerystring,
        longitudequerystring: this.props.longitudequerystring,
        latitudequerystring: this.props.latitudequerystring,
        occasionquerystring: this.props.occasionquerystring,
        cuisinequerystring: this.props.cuisinequerystring,
        price_ltequerystring: this.props.price_ltequerystring,
        price_gtquerystring: this.props.price_gtquerystring,
        datequerystring: this.props.datequerystring,
        timequerystring: this.props.timequerystring,
        catererName_querystring: this.props.catererName_querystring,
      });
    });*/

  }

  getDataFromDb = (url) => {

    axios.get(url)
    .then((response) => {

      var data = response.data;
     // console.log(data)
      this.setState({
        caterer: data,
        loading: false,
        empty: data.length > 0 ? false : true
      })
    })
    .catch(err => {
      // console.log(err)
       this.setState({
        loading: false,
        empty: true
      })
    });
  };

  findOccasionIndex = () => {
    var selectedOccasion = this.state.selectedOccasion

    var occasion = this.state.occasion.slice()

    if (Array.isArray(selectedOccasion)) {
      for(var x = 0; x < selectedOccasion.length; x++)
      {
        for(var i = 0; i < occasion.length; i++)
        {
          if(occasion[i].name === selectedOccasion[x])
          {
            occasion[i].value = true
          }
        }
      }
    }
    else {
      for(var i = 0; i < occasion.length; i++)
      {
        if(occasion[i].name === selectedOccasion)
        {
          occasion[i].value = true
        }
      }
    }

    this.setState({
      occasion,
    })

  }

  signIn(e) {
    e.preventDefault()

    var url = this.state.baseurl;
    var locationquerystring = this.state.locationquerystring;
    var longitudequerystring = this.state.longitudequerystring;
    var latitudequerystring = this.state.latitudequerystring;
    var cuisinequerystring = this.state.cuisinequerystring;
    var occasionquerystring = this.state.occasionquerystring;
    var price_ltequerystring = this.state.price_ltequerystring;
    var price_gtquerystring = this.state.price_gtquerystring;
    var datequerystring = this.state.datequerystring;
    var timequerystring = this.state.timequerystring;
    var catererName_querystring = this.state.catererName_querystring;
 
    url = url + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring; 

    Router.push({
      pathname: '/login',
      query: {'returnurl': url}
    })
  }

  toggleDropDown = () => {
    this.setState({
      dropDownDate: !this.state.dropDownDate,
      dateEmptyPopoverOpen: false,
      mobile_dateEmptyPopoverOpen: false,
    })
  }

  toggleDropDownAddress = () => {
    this.setState({
      dropDownAddress: !this.state.dropDownAddress
    })
  }

  searchBarToggle = () => {
    this.setState({
      isSearchBarOpen: !this.state.isSearchBarOpen
    })
  }

  showPlaceDetails(address) {
    this.setState({ address });
  }

  saveAddress = () => {
    var address = this.state.address
    
    if (address !== null && address != "") {
      var city = address.address_components[1].long_name
      var formatted_address = address.formatted_address
      var url = this.state.baseurl;
      var locationquerystring = "?location=" + formatted_address;
      var longitudequerystring = "&longitude=" + address.geometry.location.lng();
      var latitudequerystring = "&latitude=" + address.geometry.location.lat();
      var cuisinequerystring = this.state.cuisinequerystring;
      var occasionquerystring = this.state.occasionquerystring;
      var price_ltequerystring = this.state.price_ltequerystring;
      var price_gtquerystring = this.state.price_gtquerystring;
      var datequerystring = this.state.datequerystring;
      var timequerystring = this.state.timequerystring;
      var catererName_querystring = this.state.catererName_querystring;

      url = url + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_ltequerystring + price_gtquerystring + datequerystring + timequerystring + catererName_querystring;
      var fullapiurl = apis.GETcaterer + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;
      
      this.setState({
        dropDownAddress: ! this.state.dropDownAddress,
        loading: true,
        location: formatted_address,
        locationquerystring,
        longitudequerystring,
        latitudequerystring,
        cuisinequerystring,
        occasionquerystring,
        price_ltequerystring,
        price_gtquerystring,
        datequerystring,
        timequerystring,
        catererName_querystring,
        fullapiurl,
      },() => {
        var selectedAddress = {
          formatted_address: formatted_address,
          longitude: address.geometry.location.lng(),
          latitude: address.geometry.location.lat()
        }
        sessionStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
        this.refObj.current.scrollIntoView();
       // Router.replace(url, url, { shallow: true })
        window.history.pushState(null, '', url);    
        this.getDataFromDb(fullapiurl)
      })
    }
  };

  navItemClicked = selectedCuisine => {
    this.setState({
      selectedCuisine: selectedCuisine,
      cuisineDropDownOpen: false
    }, () => {
      this.handleUrlChange('cuisine');
    })
  };

  catererClicked = (_id) => {
    console.log('catererClicked = ', _id)
    if (this.state.selectedDate !== "" && this.state.selectedTime !== "") {
      Router.push(`/catererdetail/${_id}`, `/catererdetail/${_id}`)
    }
    else {
      if (this.state.selectedDate === "") {
        if (this.state.isMobile) {
          this.setState({
            mobile_dateEmptyPopoverOpen: true,
            isSearchBarOpen: true
          })
        }
        else {
          this.setState({
            dateEmptyPopoverOpen: true
          })
        }
      }
      else if (this.state.selectedTime === "") {
        if (this.state.isMobile) {
          this.setState({
            mobile_timeEmptyPopoverOpen: true,
            isSearchBarOpen: true
          })
        }
        else {
          this.setState({
            timeEmptyPopoverOpen: true
          })
        }
      }
      this.refObj.current.scrollIntoView({behavior: 'smooth'});
    }
  };

  handleTimeChange(e) {
    this.setState({ 
      selectedTime: e.target.value,
      timeEmptyPopoverOpen: false,
      mobile_timeEmptyPopoverOpen: false
    },() => {
      var selectedTime = Number(this.state.selectedTime.replace(":", ""))
      this.handleTimeSearch(selectedTime)
      sessionStorage.setItem('selectedTime', this.state.selectedTime);
    })
  }

  handlePriceChange = event => {
    this.setState(
      {
        selectedPrice: event.target.value 
      }, () => {
        this.handleUrlChange('pricerange')
      }
    );
  };

  handleCuisineChange = event => {
    this.setState(
      { 
        selectedCuisine: event.target.value 
      }, () => {
        this.handleUrlChange('cuisine');
      }
    )
  };

  handleCheckBoxChange = (index, statename, event) => {

    var newArray = this.state[statename]

    if (newArray[index].value) {
      newArray[index].value = false
    }
    else {
      newArray[index].value = true
    }
   
    this.setState(
      { 
        [statename]: newArray 
      }, () => {
        if (statename === "occasion") {
          this.handleUrlChange('occasion')
        }
      }
    )
  };

  searchNameClicked = () => {
    var url = this.state.baseurl;
    var searchName = this.state.searchName
    var locationquerystring = this.state.locationquerystring;
    var longitudequerystring = this.state.longitudequerystring;
    var latitudequerystring = this.state.latitudequerystring;
    var cuisinequerystring = this.state.cuisinequerystring;
    var occasionquerystring = this.state.occasionquerystring;
    var price_ltequerystring = this.state.price_ltequerystring;
    var price_gtquerystring = this.state.price_gtquerystring;
    var datequerystring = this.state.datequerystring;
    var timequerystring = this.state.timequerystring;
    var catererName_querystring = this.state.catererName_querystring;
    
    if (searchName === "") {
      catererName_querystring = ""
    }
    else {
      catererName_querystring = "&catererName=" + searchName;
    }
 
    url = url + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring; 
    var fullapiurl = apis.GETcaterer + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;

    this.setState({
      loading: true,
      locationquerystring,
      longitudequerystring,
      latitudequerystring,
      cuisinequerystring,
      occasionquerystring,
      price_ltequerystring,
      price_gtquerystring,
      datequerystring,
      timequerystring,
      catererName_querystring,
      fullapiurl,
    },() => {
      this.refObj.current.scrollIntoView();
      window.history.pushState(null, '', url);    
      this.getDataFromDb(fullapiurl)
     // Router.replace(url, url, { shallow: true })
    })
  }

  handleTimeSearch = (selectedTime) => {
    var url = this.state.baseurl;
    var searchName = this.state.searchName
    var locationquerystring = this.state.locationquerystring;
    var longitudequerystring = this.state.longitudequerystring;
    var latitudequerystring = this.state.latitudequerystring;
    var cuisinequerystring = this.state.cuisinequerystring;
    var occasionquerystring = this.state.occasionquerystring;
    var price_ltequerystring = this.state.price_ltequerystring;
    var price_gtquerystring = this.state.price_gtquerystring;
    var datequerystring = this.state.datequerystring;
    var timequerystring = this.state.timequerystring;
    var catererName_querystring = this.state.catererName_querystring;

    timequerystring = "&time=" + selectedTime;

    if (searchName === "") {
      catererName_querystring = ""
    }
    
    url = url + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring; 
    var fullapiurl = apis.GETcaterer + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;

    this.setState({
      loading: true,
      locationquerystring,
      longitudequerystring,
      latitudequerystring,
      cuisinequerystring,
      occasionquerystring,
      price_ltequerystring,
      price_gtquerystring,
      datequerystring,
      timequerystring,
      catererName_querystring,
      fullapiurl,
    },() => {
      this.refObj.current.scrollIntoView();
      window.history.pushState(null, '', url);    
      this.getDataFromDb(fullapiurl)
     // Router.replace(url, url)
    })
  }

  handleDateSearch = (selectedDate) => {
    var url = this.state.baseurl;
    var searchName = this.state.searchName
    var locationquerystring = this.state.locationquerystring;
    var longitudequerystring = this.state.longitudequerystring;
    var latitudequerystring = this.state.latitudequerystring;
    var cuisinequerystring = this.state.cuisinequerystring;
    var occasionquerystring = this.state.occasionquerystring;
    var price_ltequerystring = this.state.price_ltequerystring;
    var price_gtquerystring = this.state.price_gtquerystring;
    var datequerystring = this.state.datequerystring;
    var timequerystring = this.state.timequerystring;
    var catererName_querystring = this.state.catererName_querystring;
   
    datequerystring = "&date=" + selectedDate;

    if (searchName === "") {
      catererName_querystring = ""
    }
    
    url = url + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring; 
    var fullapiurl = apis.GETcaterer + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;

    this.setState({
      loading: true,
      locationquerystring,
      longitudequerystring,
      latitudequerystring,
      cuisinequerystring,
      occasionquerystring,
      price_ltequerystring,
      price_gtquerystring,
      datequerystring,
      timequerystring,
      catererName_querystring,
      fullapiurl,
    },() => {
     // Router.replace(url, url, { shallow: true })
      this.refObj.current.scrollIntoView();
      window.history.pushState(null, '', url);    
      this.getDataFromDb(fullapiurl)
    })
  }

  handleUrlChange = (queryname) => {
    var url = this.state.baseurl;
    var locationquerystring = this.state.locationquerystring;
    var longitudequerystring = this.state.longitudequerystring;
    var latitudequerystring = this.state.latitudequerystring;
    var cuisinequerystring = this.state.cuisinequerystring;
    var occasionquerystring = this.state.occasionquerystring;
    var price_ltequerystring = this.state.price_ltequerystring;
    var price_gtquerystring = this.state.price_gtquerystring;
    var datequerystring = this.state.datequerystring;
    var timequerystring = this.state.timequerystring;
    var catererName_querystring = this.state.catererName_querystring;
    var selectedArray;

    if (queryname === 'occasion') {
      occasionquerystring = "";
      selectedArray = this.state.occasion;
      for(var i = 0; i < selectedArray.length; i++)
      {
        if(selectedArray[i].value == true)
        {
          var fixedstr = "&occasion="
          occasionquerystring = occasionquerystring + fixedstr + selectedArray[i].name 
        }
      }
    }

    if (queryname === 'cuisine') {
      cuisinequerystring = "";
      if (this.state.selectedCuisine !== "All Cuisines") {
        cuisinequerystring = "&cuisine=" + this.state.selectedCuisine;
      }
    }

    if (queryname === 'pricerange') {
      var selectedPrice = this.state.selectedPrice
      if (selectedPrice !== "All") {
        if (selectedPrice === "More than 500") {
          price_gtquerystring = "";
          var pricenumber = selectedPrice.split("than ")[1];
          price_gtquerystring = "&price_gt=" + pricenumber;
          price_ltequerystring = "";
        }
        else {
          var pricenumber = selectedPrice.split(" (")[0];
          price_ltequerystring = "&price_lte=" + pricenumber;
          price_gtquerystring = "";
        }
      }
      else {
        price_gtquerystring = "";
        price_ltequerystring = "";
      }
    }

    url = url + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;
    var fullapiurl = apis.GETcaterer + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;

    this.setState({
      loading: true,
      locationquerystring,
      longitudequerystring,
      latitudequerystring,
      cuisinequerystring,
      occasionquerystring,
      price_ltequerystring,
      price_gtquerystring,
      datequerystring,
      timequerystring,
      catererName_querystring,
      fullapiurl: fullapiurl,
    },() => {
    //  Router.replace(url, url, { shallow: true })
      this.refObj.current.scrollIntoView();
      window.history.pushState(null, '', url);    
      this.getDataFromDb(fullapiurl)
    })
  }

  handleSearchNameChange(e) {
    this.setState({
      searchName: e.target.value,
    });
  }

  handleDateChange(date){
		this.setState({ 
      selectedDate : moment(date).format("dddd, DD/MM/YY") 
    }, () => {
      this.toggleDropDown()
      this.handleDateSearch(this.state.selectedDate)
      sessionStorage.setItem('selectedDate', this.state.selectedDate);
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
        <td key={i}>
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
        <Col key={i} xs={this.state.filterModalOpen ? "6" : "12"}>
        <FormGroup style={{ paddingLeft: 0, marginTop: 10 }} check className="radio">
          <div className="pretty p-default p-round">
            <input 
              type="radio" 
              name="radio1"
              checked={this.state.selectedCuisine === cuisine[i]}
              onChange={this.handleCuisineChange}
              value={cuisine[i]}
              name={cuisine[i]}
              style={{padding:0, marginRight: 10}} />
            <div className="state p-success-o">
                <label></label>
            </div>
          </div>
           
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
        <Col key={i} xs={this.state.filterModalOpen ? "6" : "12"}>
        <FormGroup style={{ paddingLeft: 0, marginTop: 10 }} check className="radio">

          <div className="pretty p-default p-round">
            <input 
              type="radio" 
              name="radio2"
              checked={this.state.selectedPrice === price[i]}
              onChange={this.handlePriceChange}
              value={price[i]}
              name={price[i]}
              style={{padding:0, marginRight: 10}} />
            <div className="state p-success-o">
                <label></label>
            </div>
          </div>
           
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
        <Col key={i} xs={this.state.filterModalOpen ? "6" : "12"}>
        <FormGroup style={{ paddingLeft: 0, marginTop: 10 }} check className="checkbox">
          <div className="pretty p-svg p-curve">
            <input 
              type="checkbox"
              checked={dietary[i].value}
              onChange={(e) => this.handleCheckBoxChange(i, 'dietary', e)}
              value={dietary[i].name}
              style={{padding:0, marginRight: 10}} />
            <div className="state p-success">
                <svg className="svg svg-icon" viewBox="0 0 20 20">
                    <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style={{stroke: 'white', fill: 'white'}}></path>
                </svg>
                <label></label>
            </div>
          </div>
          
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
        <Col key={i} xs={this.state.filterModalOpen ? "6" : "12"}>
          <FormGroup style={{ paddingLeft: 0, marginTop: 10 }}check className="checkbox">
            <div className="pretty p-svg p-curve">
              <input 
                type="checkbox"
                checked={occasion[i].value}
                onChange={(e) => this.handleCheckBoxChange(i, 'occasion', e)}
                value={occasion[i].name}
                style={{padding:0, marginRight: 10}} />
              <div className="state p-success">
                  <svg className="svg svg-icon" viewBox="0 0 20 20">
                      <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style={{stroke: 'white', fill: 'white'}}></path>
                  </svg>
                  <label></label>
              </div>
            </div>
            
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
            style={{ fontSize: 15, opacity: 0.8, marginTop: 10, paddingLeft:20, paddingRight: 20 }}
            className="big"
          >
            We recommend you to make special request to our team by contacting us at foodiebeeie@gmail.com. We will make response to you as soon as possible.
          </p>
        </Col>
      
      </Row>
    );
  }

  renderLoadingItems() {
    var itemsarray = [];

    for (let i = 0; i < 6; i++) {
      itemsarray.push(
        <Col key={i} xs="12" sm="6" md="4" lg="4">
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
          key={i} 
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
        <Col key={i} xs="12" sm="6" md="4" lg="4">
          <Card
            style={{
              cursor: "pointer",
              backgroudColor: "rgba(220,220,220, 0.5)",
              borderWidth: 0,
              borderColor: "white",
              boxShadow: "none"
            }}
            onClick={() => this.catererClicked(caterer[i]._id)}
          >
            <CardBody style={{ padding: 0 }}>
              <img
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: 150,
                  display: "inline"
                }}
                src={typeof caterer[i].coversrc !== 'undefined' ? caterer[i].coversrc : "https://stmed.net/sites/default/files/food-wallpapers-28249-101905.jpg" }
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
                {caterer[i].catererName}
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
                {typeof caterer[i].rating === 'undefined' || caterer[i].rating === 0 ?  null : 
                <b style={{ marginLeft: 5, color: "darkorange" }}>
                  {caterer[i].rating}
                </b>}
                {typeof caterer[i].numofreview === 'undefined' || caterer[i].numofreview === 0 ?  
                <Label style={{ fontWeight: '500', marginLeft: 5, color: "darkorange" }}>
                  No Ratings Yet
                </Label>
                :
                <Label style={{ fontWeight: '500', marginLeft: 5, color: "darkorange" }}>
                  ({caterer[i].numofreview})
                </Label>}
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
                        €{Number(caterer[i].minimumspend).toFixed(2)}
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
                        €{Number(caterer[i].deliveryfee).toFixed(2)}
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
                  {caterer[i].catererDescrip}
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
      <div>
      <Container>
          <Row style={{ paddingTop: 20, paddingBottom: 10}}>
            <Col xs="8">
              <FormGroup>
                <h6>Delivered To</h6>
                <UncontrolledDropdown isOpen={this.state.dropDownAddress}  toggle={() => this.toggleDropDownAddress()}>
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
                  
                  <Label style={{ padding:0, margin: 0, cursor: "pointer", overflow: "hidden", fontSize: 15, marginRight:5, textAlign:'start', color: this.state.location === "" ? 'gray' : 'black', width: '90%' }}>
                  {this.state.location}
                  </Label>
                  
                  </DropdownToggle>
                  <DropdownMenu style={{width: '100%'}}>
                    <Row style={{width: '100%'}}>
                      <Col style={{paddingRight: 0}} xs="10">
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
                      </Col>
                      <Col xs="2">
                        <Button onClick={() => this.saveAddress()} style={{ height: '100%'}} className="bg-primary" color="primary">Save</Button>
                      </Col>
                    </Row>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </FormGroup>
            </Col>
            <Col xs="4">
              <Button  outline onClick={() => this.searchBarToggle()} block style={{marginTop: 25, height: '50%', fontWeight: '700', }} color="primary"> {this.state.isSearchBarOpen? "HIDE" : "SHOW"}</Button>
            </Col>
          </Row>

          <Collapse isOpen={this.state.isSearchBarOpen}>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <h6>When</h6>
                  <UncontrolledDropdown id="Popover2" isOpen={this.state.dropDownDate}  toggle={() => this.toggleDropDown()}>
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

                       <Label style={{ padding:0, margin: 0, cursor: "pointer", overflow: "hidden", fontSize: 15, marginRight:5, textAlign:'start', color: this.state.selectedDate === "" ? 'gray' : 'black', width: '90%' }}>
                        {this.state.selectedDate === "" ? 'Select Date' : this.state.selectedDate}
                      </Label>

                    </DropdownToggle>
                    <DropdownMenu>
                      <div >
                        <Calendar
                          onChange={this.handleDateChange.bind(this)}
                          minDate={this.state.maxDate}
                        />
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  <Popover placement="bottom" isOpen={this.state.mobile_dateEmptyPopoverOpen} target="Popover2" >
                    <PopoverHeader style={{color: 'red'}}>Select Date</PopoverHeader>
                    <PopoverBody>Please select date of catering event</PopoverBody>
                  </Popover>

                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <h6>Time</h6>
                  <Input id="Popover1" value={this.state.selectedTime} onChange={(e) => this.handleTimeChange(e)} style={{cursor: 'pointer', color: this.state.selectedTime === "" ? 'gray': 'black', fontSize: 15, height: 40, backgroudColor: 'white'}} type="select">
                    <option value='' disabled>Select Time</option>
                    {this.time.map(time =>
                      <option style={{color:'black'}} key={time} value={time}>{time}</option>
                    )}
                  </Input>
                </FormGroup>
                <Popover placement="bottom" isOpen={this.state.mobile_timeEmptyPopoverOpen} target="Popover1" >
                  <PopoverHeader style={{color: 'red'}}>Select Time</PopoverHeader>
                  <PopoverBody>Please select the arrival time of caterings</PopoverBody>
                </Popover>
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
      <Layout title={this.state.location === "" || typeof this.state.location === "undefined" ? 'Caterers Nearby' : this.state.location + " Caterers Nearby"}>
      <NextSeo
        config={{
          title: this.state.location === "" || typeof this.state.location === "undefined" ? 'Caterers Nearby' : this.state.location + " Caterers Nearby",
        }}
      />
      
      <div ref={this.refObj} style={{backgroundColor: 'white'}}>
         <NavBar signIn={e=>this.signIn(e)}/>

         {this.state.isMobile ? this.renderTopSearchBar() : null}

      <div className="app align-items-center">
       
        <Container>
          <Row style={{marginTop: 20, marginBottom: 50}} className="justify-content-center">
            {!this.state.isMobile ? 
            <Col xs="12" md="12">
              <Card style={{backgroundColor: 'rgba(211,211,211,0.1)', boxShadow: '1px 1px 1px #9E9E9E'}}>
              <CardBody style={{paddingTop: 15, paddingBottom: 0,}}>
                <Row>
                  <Col xs="12" md="5">
                    <FormGroup>
                      <h6>Delivered To</h6>
                      <UncontrolledDropdown isOpen={this.state.dropDownAddress}  toggle={() => this.toggleDropDownAddress()}>
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
                       
                          <Label style={{ padding:0, margin: 0, cursor: "pointer", overflow: "hidden", fontSize: 15, marginRight:5, textAlign:'start', color: this.state.location === "" ? 'gray' : 'black', width: '90%' }}>
                          {this.state.location}
                          </Label>
                        
                        </DropdownToggle>
                        <DropdownMenu style={{width: '100%'}}>
                          <Row style={{width: '100%'}}>
                            <Col style={{paddingRight: 0}} xs="10">
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
                            </Col>
                            <Col xs="2">
                              <Button onClick={() => this.saveAddress()} style={{ height: '100%'}} className="bg-primary" color="primary">Save</Button>
                            </Col>
                          </Row>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      
                    </FormGroup>
                  </Col>
                  <Col xs="6" md="4">
                    <FormGroup>
                      <h6>When</h6>
                      <UncontrolledDropdown id="Popover2" isOpen={this.state.dropDownDate}  toggle={() => this.toggleDropDown()}>
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

                         <Label style={{ padding:0, margin: 0, cursor: "pointer", overflow: "hidden", fontSize: 15, marginRight:5, textAlign:'start', color: this.state.selectedDate === "" ? 'gray' : 'black', width: '90%' }}>
                         {this.state.selectedDate === "" ? 'Select Date' : this.state.selectedDate}
                        </Label>

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

                     <Popover placement="bottom" isOpen={this.state.dateEmptyPopoverOpen} target="Popover2" >
                      <PopoverHeader style={{color: 'red'}}>Select Date</PopoverHeader>
                      <PopoverBody>Please select date of catering event</PopoverBody>
                    </Popover>

                  </Col>
                  <Col xs="6" md="3">
                    <FormGroup >
                      <h6>Time</h6>
                      <Input id="Popover1" value={this.state.selectedTime} onChange={(e) => this.handleTimeChange(e)} style={{cursor: 'pointer', color: this.state.selectedTime === "" ? 'gray': 'black', fontSize: 15, height: 40, backgroudColor: 'white'}} type="select">
                        <option value='' disabled>Select Time</option>
                        {this.time.map(time =>
                          <option style={{color:'black'}} key={time} value={time}>{time}</option>
                        )}
                      </Input>
                    </FormGroup>

                    <Popover placement="bottom" isOpen={this.state.timeEmptyPopoverOpen} target="Popover1" >
                      <PopoverHeader style={{color: 'red'}}>Select Time</PopoverHeader>
                      <PopoverBody>Please select the arrival time of caterings</PopoverBody>
                    </Popover>

                  </Col>
                
                </Row>
              </CardBody>
              </Card>
            </Col>
            :
            null}

            <Col style={{marginTop: 20}} xs="12">
              <h2 style={{ textAlign: 'center', fonWeight:'700', fontSize: 30, paddingLeft:10, paddingRight: 10}}>6 Caterers Available</h2>
            </Col>

            {!this.state.isMobile ? 
            <Col style={{ marginTop: 25}} xs="12" md="4">
              <Form action="" method="post" className="form-horizontal">
                <FormGroup row>
                  <Col md="12">
                    <InputGroup >
                      <Input onChange={e => this.handleSearchNameChange(e)} value={this.state.searchName} style={{ borderWidth:1.5, color:'black', fontSize: 15, height: 40, borderTopLeftRadius: 15, borderBottomLeftRadius: 15}} type="text" id="input1-group2" name="input1-group2" placeholder="Caterer, Cuisine etc" />      
                      <InputGroupAddon addonType="prepend">
                        <Button onClick={() => this.searchNameClicked()} style={{borderTopRightRadius: 15, borderBottomRightRadius: 15}}  type="button" color="primary"><i className="fa fa-search"></i></Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>
              </Form>
            </Col>
            : 
            null}

            {!this.state.isMobile ? 
            <Col style={{ marginTop: 20, }} xs="12" md="8">
                <Nav style={{paddingLeft:50,}} className="float-right" pills>
                  {this.renderNavItem(this.state.cuisine[0])}
                  {this.renderNavItem(this.state.cuisine[1])}
                  {this.renderNavItem(this.state.cuisine[2])}
                  {this.renderNavItem(this.state.cuisine[3])}
 
                  <NavItem>
                    <Dropdown
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
                      <DropdownMenu right style={{ right: 0, left: 'auto' }}>
                        <Table style={{ marginRight: 0 }} borderless>
                          <tbody>
                            {this.renderMoreCuisine(4, 10)}
                            {this.renderMoreCuisine(10, 16)}
                            {this.renderMoreCuisine(16, 22)}
                            {this.renderMoreCuisine(22, 28)}
                          </tbody>
                        </Table>
                      </DropdownMenu>
                    </Dropdown>
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
              : 
              null}

              {this.state.isMobile ? 
              <Col
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
                              onChange={e => this.handleSearchNameChange(e)} 
                              value={this.state.searchName}
                            />
                            <InputGroupAddon addonType="prepend">
                              <Button
                                style={{
                                  borderTopRightRadius: 15,
                                  borderBottomRightRadius: 15
                                }}
                                type="button"
                                color="primary"
                                onClick={() => this.searchNameClicked()} 
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
              :
              null}

              {this.state.isMobile ? 
              <Col style={{ marginTop: 20 }} xs="12">
                {this.state.filterArray.length === 0 ? null : this.renderFilterItems()}
              </Col>
              :
              null}

              {!this.state.isMobile ? 
              <Col xs="0" md="2">
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
                  PRICE
                </h6>
                {this.renderPrice()}
              </Col>
              :
              null}

              <Col style={{ marginTop: 20 }} xs="12" md="10">
                {this.state.loading ? this.renderLoadingItems() : this.state.empty ?  this.renderEmptyItems() : this.renderItems()}
              </Col>

          </Row>
        </Container>
        {this.renderFilterModal()}
      </div>
      <Footer />
      </div>
      </Layout>
    );
  }
}

export default withRouter(SearchCaterer);
