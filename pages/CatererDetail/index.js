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
} from "reactstrap";
import './CatererDetail.css'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Dotdotdot from "react-dotdotdot";
import ContentLoader, { Facebook } from "react-content-loader";
import StarRatingComponent from "react-star-rating-component";
import Router from 'next/router'
import axios from "axios";
import apis from "../../apis";
import { server } from '../../config';
import moment from "moment";
import NextSeo from 'next-seo';

const glutenfreeIcon = '/static/glutenfree1.png';
const hotIcon = '/static/fire.png';
const spicyIcon = '/static/pepper.png';
const vegeIcon = '/static/lettuce.png';
const healthyIcon = '/static/fruit.png';
const halalicon = '/static/halalsign.png';
const closeIcon = '/static/close.png';

import { inject, observer } from 'mobx-react'

@inject('store')
@observer

class CatererDetail extends Component {
  
  static async getInitialProps({query: { id }}) {
    return {
      catererID: id,
    };
  }

  componentWillMount() {
    var restaurantInfo = this.state.restaurantInfo
    restaurantInfo.catererID = this.props.catererID
    console.log(this.props.catererID)
    this.setState({
      restaurantInfo: restaurantInfo,
    })
  }


  constructor(props) {
    super(props);

    this.refObj = {}

    this.toggleMenuModal = this.toggleMenuModal.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleSpecialInstruction = this.handleSpecialInstruction.bind(this);

    this.state = {
      cartID: null,
      todayDay: null,
      loading: true,
      cartloading: true,
      orderType: "delivery",
      updateCartItem: false,
      selectedPrice: 0,
      selectedSelection: [],
      selectedQuantity: 1,
      activeMenu: null,
      specialInstructionOpen: false,
      specialInstruction: '',
      menuModalOpen: false,
      selectedMenu: "All Menu",
      menuDropDownOpen: false,
      fetchedmenu: [],
      menu: [],
      menutitle: [],
      cartitem: [],
      cartToBeOrder: [],
      review: [
       /* {
          name: "Kieran",
          location: 'Limerick, Ireland',
          comment: "Everyone was very happy. Hearty sandwiches. Very nice dessert sandwiches",
          time: "5 days ago",
          rating: 5,
        },
        {
          name: "Qiana",
          location: 'Dublin, Ireland',
          comment: "The food smelled pretty good and staff seemed excited because they eat there on their own time. The only downside is they delivered 45 mins. early, which is better than being late. I guess it didn't matter much since we did sandwiches and not something that would be bad if it got cold (i.e., pasta or other hot entree).",
          time: "7 days ago",
          rating: 4,
        },
        {
          name: "Aldo",
          location: 'Limerick, Ireland',
          comment: "Food is on time, great experience, food is delicious",
          time: "8 days ago",
          rating: 5,
        },
        {
          name: "Connie",
          location: 'Limerick, Ireland',
          comment: "The food was delicious and the presentation looked great. Perfect portions. We will order again!",
          time: "15 days ago",
          rating: 4,
        },
        {
          name: "Chandra",
          location: 'Limerick, Ireland',
          comment: "First time ordering from Italian Gourmet for this group. Everything was a big hit--even though they were a bit early.",
          time: "1 month ago",
          rating: 5,
        },*/
      ],
      quantity: [1,2,3,4,5,6,7,8,9,10,11,12,13],
      restaurantInfo: {
        /*catererID: "",
        catererName: "Flannery Restaurant & Pub",
        profilesrc: "https://www.psdgraphics.com/wp-content/uploads/2016/08/restaurant-logo.png",
        coversrc: "http://www.fedracongressi.com/fedra/wp-content/uploads/2016/09/minisandwich.jpg",
        catererDescrip: "Specialized in American Burger style mealset. Our American subs are our specialty, and our Special Grileld with spiced capicola and prosciuttini is the number one customer favorite. Our portions won't leave your stomachs rumbling, and our flavors always go down easy.",
        catererAddress: "30, O'Connell St, Dublin, Ireland",
        rating: "4.7",
        numofreview: "150",
        deliveryhours: "Mon-Fri: 10am-3pm",
        deliveryfee: 3,
        minimumspend: 50*/
      },
      orderNotOverMinSpending: false
    };
  }

  componentDidMount() {
    this.getCatererDetail();
    this.getCatererMenu();
    this.getCustomerCart();
    this.getCatererReview();

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date();
    var dayName = days[d.getDay()];
    this.setState({
      todayDay: dayName
    });
  }

  restructureMenu = () => {
    var finalresult = [];

    var result = this.state.fetchedmenu.reduce(function(r, a) {
      r[a.categorytag] = r[a.categorytag] || [];
      r[a.categorytag].push(a);
      return r;
    }, Object.create(null));

    for (var key in result) {
      var result2 = result[key].reduce(function(r, a) {
        r[a.categoryname] = r[a.categoryname] || [];
        r[a.categoryname].push(a);
        return r;
      }, Object.create(null));

      var parentObject = {
        menutitle: key,
        menuitem: []
      };

      for (var key2 in result2) {
        var childObject = {
          categoryname: key2,
          items: result2[key2]
        };
        parentObject["menuitem"].push(childObject);
      }

      finalresult.push(parentObject);
    }

   // console.log(JSON.stringify(finalresult));

    this.setState({
      menu: finalresult,
      loading: false,
    },() => {
      this.listmenu()
    })
  }

  listmenu = () => {
    var menu = this.state.menu
    var menutitleArray = ["All Menu"];
    for (let i = 0; i < menu.length; i++) { 
      var menutitle = menu[i].menutitle
      menutitleArray.push(menutitle)
    }
    this.setState({
      menutitle: menutitleArray
    })
  }

  getCatererDetail= () => {
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
          restaurantInfo.deliveryhours = typeof response.data[0].deliveryhours !== 'undefined' ? response.data[0].deliveryhours : [];
          this.setState({
            restaurantInfo: restaurantInfo
          })
        } 
      })
      .catch((error) => {
      });
  }

  getCatererMenu= () => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETmenu + "/" + this.state.restaurantInfo.catererID;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            fetchedmenu: response.data,
          },() => {
            this.restructureMenu();
          })
        } 
      })
      .catch((error) => {
      });
  }

  getCatererReview= () => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETcaterer_review + "?catererID=" + this.state.restaurantInfo.catererID;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            review: response.data,
          })
        } 
      })
      .catch((error) => {
      });
  }

  
  getCustomerCart= () => {
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETcart + "?catererID=" + this.state.restaurantInfo.catererID;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
       // alert(response.data)
        if (response.status === 200) {
          this.setState({
            cartID: response.data.length > 0 ? response.data[0]._id : null,
            cartToBeOrder: response.data.length > 0 ? response.data : [],
            cartitem: response.data.length > 0 ? response.data[0].cartitem.length > 0 ? response.data[0].cartitem : [] : [],
            orderType: response.data.length > 0 ? typeof response.data[0].orderType !== 'undefined' ? response.data[0].orderType : "" : "",
            cartloading: false,
          })
        } 
      })
      .catch((error) => {
        this.getSessionStorage()
      });
  }


  signIn(e) {
    e.preventDefault()
    Router.push({
      pathname: '/login',
      query: {'returnurl': `/catererdetail/${this.state.restaurantInfo.catererID}`}
    })
  }


  navItemClicked = selectedMenu => {
    this.setState({
      selectedMenu: selectedMenu,
      menuDropDownOpen: false
    }, () => {
      var index = this.state.menu.findIndex(x => x.menutitle === selectedMenu);
      if (index > 0) {
        this.refObj[index].current.scrollIntoView({behavior: 'smooth'});
      }
    })
  };

  selectOrderType = (orderType) => {
    this.setState({
      orderType,
    },() => {
      this.updateOrderType()
      this.calculateCartTotalPrice()
    })
  }

  menuItemClicked = (_id) => {
    var menuindex = this.state.fetchedmenu.findIndex(x => x._id==_id);
    this.setState({
      menuModalOpen: !this.state.menuModalOpen,
      activeMenu: this.state.fetchedmenu[menuindex]
    });
  };

  cartItemClicked = (_id, quantity, selection, totalprice, instruction) => {
    var menuindex = this.state.fetchedmenu.findIndex(x => x._id==_id);
    this.setState({
      menuModalOpen: !this.state.menuModalOpen,
      activeMenu: this.state.fetchedmenu[menuindex],
      selectedPrice: totalprice,
      selectedSelection: typeof selection === 'undefined' ? [] : selection,
      selectedQuantity: quantity,
      specialInstructionOpen: typeof instruction === 'undefined' ? false : true,
      specialInstruction: typeof instruction === 'undefined' ? '' : instruction,
      updateCartItem: true,
    });
  };

  checkOutClicked = () => {

    var totalcartprice = this.calculateCartTotalPrice() - this.state.restaurantInfo.deliveryfee

    if (totalcartprice >= this.state.restaurantInfo.minimumspend) {
      var cartObjectId;
      var url = ""
      if (!this.state.cartID) {
        cartObjectId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
        url = `/checkout/${cartObjectId}/${this.state.restaurantInfo.catererID}`
      }
      else {
        url = `/checkout/${this.state.cartID}/${this.state.restaurantInfo.catererID}`
      }
      Router.push(url, url)
    }
    else {
      this.setState({
        orderNotOverMinSpending: true
      })
    }

  }

  toggleCuisineDropDown = () => {
    this.setState({
      menuDropDownOpen: !this.state.menuDropDownOpen
    });
  };

  toggleMenuModal() {
    this.setState({
      menuModalOpen: !this.state.menuModalOpen,
      selectedPrice: 0,
      selectedSelection: [],
      selectedQuantity: 1,
      specialInstructionOpen: false,
      specialInstruction: '',
      updateCartItem: false,
    });
  }

  toggleSpecialInstruction = () => {
    this.setState({
      specialInstructionOpen: !this.state.specialInstructionOpen
    });
  };

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

  calculateCartTotalPrice = () => {
    const {cartitem, orderType, restaurantInfo, fetchedmenu} = this.state
    var cartTotalPrice = 0;
    for (let i = 0; i < cartitem.length; i++) { 
      var index = fetchedmenu.findIndex(x => x._id===cartitem[i].menuID);
      if (index >= 0) {
        var singlemenuprice = fetchedmenu[index].priceperunit
        var quantitychosen = cartitem[i].quantity
       // cartTotalPrice =  cartTotalPrice + (quantitychosen * singlemenuprice);
        cartTotalPrice =  cartTotalPrice + cartitem[i].totalprice;
      }
      else {
        cartTotalPrice =  cartTotalPrice;
      }
    }

    if (orderType === "delivery") {
      cartTotalPrice =  cartTotalPrice + restaurantInfo.deliveryfee
    }

    return (Number(cartTotalPrice).toFixed(2));
  }

  calculatePricePerPerson = (bulkprice, serves) => {
    return (Number(bulkprice/serves).toFixed(2));
  }

  calculateMenuTotalPrice = (priceperunit) => {
    const {selectedQuantity, selectedSelection, selectedPrice} = this.state
    var totalprice = selectedPrice;
    var totalSelectedSelectionPrice = 0;

    for (let i = 0; i < selectedSelection.length; i++) { 
      for (let x = 0; x < selectedSelection[i].selectionitem.length; x++) { 
        totalSelectedSelectionPrice =  totalSelectedSelectionPrice + selectedSelection[i].selectionitem[x].selectionitemprice;
      } 
    }

    priceperunit = priceperunit + totalSelectedSelectionPrice;
    totalprice = priceperunit * selectedQuantity;
  
    this.setState({
      selectedPrice: totalprice
    })
  }

  calculateCartReadyToBeOrderPrice = (newitemprice) => {
    const {cartitem, orderType, restaurantInfo, fetchedmenu} = this.state
    var cartTotalPrice = 0;
    for (let i = 0; i < cartitem.length; i++) { 
      var index = fetchedmenu.findIndex(x => x._id===cartitem[i].menuID);
      if (index >= 0) {
        var singlemenuprice = fetchedmenu[index].priceperunit
        var quantitychosen = cartitem[i].quantity
       // cartTotalPrice =  cartTotalPrice + (quantitychosen * singlemenuprice);
        cartTotalPrice =  cartTotalPrice + cartitem[i].totalprice;
      }
      else {
        cartTotalPrice =  cartTotalPrice;
      }
    }

    if (orderType === "delivery") {
      cartTotalPrice =  cartTotalPrice + restaurantInfo.deliveryfee
    }

    cartTotalPrice = cartTotalPrice + newitemprice

    return (Number(cartTotalPrice).toFixed(2));
  }

  findSelectionIndex = (selectioncategory, selectionitemtitle) => {
    var returnval;
    var index = this.state.selectedSelection.findIndex(x => x.selectioncategory==selectioncategory);

    if (index >= 0) {
      var itemindex = this.state.selectedSelection[index].selectionitem.findIndex(x => x.selectionitemtitle==selectionitemtitle)
      if (itemindex >= 0) {
        returnval = true
      }
      else {
        returnval = false
      }
    }
    else {
      returnval = false
    }
    return (returnval)
  }

  findQuantityRange = (minimumquantity) => {
    var index = this.state.quantity.findIndex(x => x==minimumquantity);
    var quantityrange = this.state.quantity.slice(index, this.state.quantity.length)
    return quantityrange
  }
 
  handleQuantityChange(e, priceperunit) {
    this.setState({ 
      selectedQuantity: e.target.value, 
    } ,() => {
      this.calculateMenuTotalPrice(priceperunit)
    })
  }

  handleSpecialInstruction(e) {
    this.setState({ 
      specialInstruction: e.target.value, 
    })
  }

  getSessionStorage = () => {
    if (sessionStorage.getItem(this.state.restaurantInfo.catererID) !== null) {
      var sessionStorageCartToBeOrder = JSON.parse(sessionStorage.getItem(this.state.restaurantInfo.catererID));
      this.setState({
        cartToBeOrder: sessionStorageCartToBeOrder.length > 0 ? sessionStorageCartToBeOrder : [],
        cartitem: sessionStorageCartToBeOrder.length > 0 ? sessionStorageCartToBeOrder[0].cartitem.length > 0 ? sessionStorageCartToBeOrder[0].cartitem : [] : [],
        orderType: sessionStorageCartToBeOrder.length > 0 ? typeof sessionStorageCartToBeOrder[0].orderType !== 'undefined' ? sessionStorageCartToBeOrder[0].orderType : "" : "",
        cartloading: false
      })
    }
    else {
      this.setState({
        cartloading: false
      })
    }
  }

  addToSessionStorage = () => {

    var cartReadyToOrder = [{
      orderType: this.state.orderType,
      catererID: this.state.restaurantInfo.catererID,
      cartitem: this.state.cartitem,
      totalOrderPrice: this.calculateCartTotalPrice(),
      deliveryfee: this.state.restaurantInfo.deliveryfee
    }]

    sessionStorage.setItem(this.state.restaurantInfo.catererID, JSON.stringify(cartReadyToOrder));
  }

  deleteSessionStorage = () => {
    sessionStorage.removeItem(this.state.restaurantInfo.catererID);
  }

  addToCart = () => {

    this.setState({
      cartloading: true
    })

    const {selectedPrice, selectedSelection, selectedQuantity, activeMenu, specialInstruction, restaurantInfo, orderType, cartToBeOrder} = this.state;
    
    var itemprice = selectedPrice === 0 ? activeMenu.priceperunit : selectedPrice

    var cartInnerItem = {
      title: activeMenu.title,
      serveperunit: activeMenu.serveperunit,
      menuID: activeMenu._id,
      quantity: selectedQuantity,
      totalprice: itemprice,
    }

    if (specialInstruction !== '') {
      cartInnerItem.instruction = specialInstruction
    }

    if (selectedSelection.length !== 0) {
      cartInnerItem.selection = selectedSelection
    }

    //Push to CartItem Array

    var newCartItem = this.state.cartitem.slice()
    newCartItem.push(cartInnerItem)

    //To Be Order Cart Item
    var cartReadyToOrder = {
      orderType: orderType === "" ? "delivery" : orderType,
      catererID: restaurantInfo.catererID,
      cartitem: newCartItem,
      totalOrderPrice: this.calculateCartReadyToBeOrderPrice(itemprice),
      deliveryfee: this.state.restaurantInfo.deliveryfee
    }

   // alert(JSON.stringify(cartReadyToOrder))

    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.UPDATEcart;

    if (cartToBeOrder.length > 0) {
      url = url + "?_id=" + cartToBeOrder[0]._id;
    }

    axios.put(url, cartReadyToOrder, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 201) {
         // alert(JSON.stringify(response.data))
          this.toggleMenuModal()
          this.getCustomerCart()
        } 
      })
      .catch((error) => {
        if (error) {
          this.setState({
            cartitem: newCartItem,
            cartloading: false
          },() => {
            this.toggleMenuModal()
            this.addToSessionStorage()
          })
        } 
      });
  }

  updateOrderType = () => {

    this.setState({
      cartloading: true
    })

    const {selectedPrice, selectedSelection, selectedQuantity, activeMenu, specialInstruction, cartToBeOrder, orderType, restaurantInfo} = this.state;
    
    //To Be Order Cart Item
    var cartReadyToOrder = {
      orderType: orderType,
      totalOrderPrice: this.calculateCartReadyToBeOrderPrice(0),
      deliveryfee: this.state.restaurantInfo.deliveryfee
    }

    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.UPDATEcart;

    if (cartToBeOrder.length > 0) {
      url = url + "?_id=" + cartToBeOrder[0]._id;
    }

    axios.put(url, cartReadyToOrder, {withCredentials: true}, {headers: headers})
      .then((response) => {
       
        if (response.status === 201) {
          this.getCustomerCart()
        } 
      })
      .catch((error) => {
        if (error) {
          this.setState({
            cartloading: false
          },() => {
            this.addToSessionStorage()
          })
        } 
      }); 
  }

  updateCart = () => {

    this.setState({
      cartloading: true
    })

    const {selectedPrice, selectedSelection, selectedQuantity, activeMenu, specialInstruction, cartToBeOrder, orderType, restaurantInfo} = this.state;

    var index = this.state.cartitem.findIndex(x => x.menuID==activeMenu._id);

    var updateCartInnerItem = this.state.cartitem[index];

    if (selectedQuantity !== 0) {
      updateCartInnerItem.quantity = selectedQuantity
    }

    if (selectedSelection.selectedPrice === 0) {
      updateCartInnerItem.totalprice = activeMenu.priceperunit
    }
    else {
      updateCartInnerItem.totalprice = selectedPrice
    }

    if (specialInstruction !== '') {
      updateCartInnerItem.instruction = specialInstruction
    }

    if (selectedSelection.length !== 0) {
      updateCartInnerItem.selection = selectedSelection
    }

    //Update CartItem Array

    var newCartItem = this.state.cartitem.slice();
    newCartItem.splice(index, 1, updateCartInnerItem)
    
    //To Be Order Cart Item

    var cartReadyToOrder = {
      orderType: orderType,
      catererID: restaurantInfo.catererID,
      cartitem: newCartItem,
      totalOrderPrice: this.calculateCartReadyToBeOrderPrice(updateCartInnerItem.totalprice),
      deliveryfee: this.state.restaurantInfo.deliveryfee
    }

  //  alert(JSON.stringify(cartReadyToOrder))

    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.UPDATEcart;

    if (cartToBeOrder.length > 0) {
      url = url + "?_id=" + cartToBeOrder[0]._id;
    }

    axios.put(url, cartReadyToOrder, {withCredentials: true}, {headers: headers})
      .then((response) => {
     
        if (response.status === 201) {
          this.toggleMenuModal()
          this.getCustomerCart()
        } 
      })
      .catch((error) => {
        if (error) {
          this.setState({
            cartitem: newCartItem,
            cartloading: false
          },() => {
            this.toggleMenuModal()
            this.addToSessionStorage()
          })
        } 
      }); 
  }

  deleteCart = (index) => {

    this.setState({
      cartloading: true
    })
    
    const {selectedPrice, selectedSelection, selectedQuantity, activeMenu, specialInstruction, cartToBeOrder, orderType, restaurantInfo} = this.state;

    var itemprice = 0 - this.state.cartitem[index].totalprice
    var newCartItem = this.state.cartitem.slice();
    newCartItem.splice(index, 1)

     //To Be Order Cart Item
    var cartReadyToOrder = {
      orderType: orderType,
      catererID: restaurantInfo.catererID,
      cartitem: newCartItem,
      totalOrderPrice: this.calculateCartReadyToBeOrderPrice(itemprice),
      deliveryfee: this.state.restaurantInfo.deliveryfee
    }

  //  alert(JSON.stringify(cartReadyToOrder))

    var headers = {
      'Content-Type': 'application/json',
    }

    if (newCartItem.length > 0) {
     
      var url = apis.UPDATEcart;

      if (cartToBeOrder.length > 0) {
        url = url + "?_id=" + cartToBeOrder[0]._id;
      }

      axios.put(url, cartReadyToOrder, {withCredentials: true}, {headers: headers})
        .then((response) => {
         
          if (response.status === 201) {
            //this.toggleMenuModal()
            this.getCustomerCart()
          } 
        })
        .catch((error) => {
          if (error) {
            this.setState({
              cartitem: newCartItem,
              cartloading: false
            },() => {
             // this.toggleMenuModal()
              this.addToSessionStorage()
            })
          } 
        }); 
    }
    else {
      var url = apis.DELETEcart;

      if (cartToBeOrder.length > 0) {
        url = url + "?_id=" + cartToBeOrder[0]._id;
      }

      axios.delete(url, {withCredentials: true}, {headers: headers})
        .then((response) => {
        
          if (response.status === 200) {
            this.getCustomerCart()
          } 
        })
        .catch((error) => {
          if (error) {
            this.setState({
              cartitem: newCartItem,
              cartloading: false
            },() => {
                this.deleteSessionStorage()
            })
          } 
        }); 
    }
  };

  handleRadioBoxChange = (e, selectioncategory, selectionitemtitle, selectionitemprice, priceperunit) => {

    var selectedSelection = this.state.selectedSelection
    var index = selectedSelection.findIndex(x => x.selectioncategory==selectioncategory);

    if (index >=0) {
      var addSelectionItem = {
        selectionitemtitle: selectionitemtitle,
        selectionitemprice: selectionitemprice,
      }
      selectedSelection[index].selectionitem.splice(0, 1)
      selectedSelection[index].selectionitem.push(addSelectionItem)
    }
    else {
      var addSelection = {
        selectioncategory: selectioncategory,
        selectionitem: [
          {
            selectionitemtitle: selectionitemtitle,
            selectionitemprice: selectionitemprice,
          }
        ]
      }
      selectedSelection.push(addSelection) 
    }

    this.setState({ 
      selectedSelection: selectedSelection, 
    } ,() => {
      this.calculateMenuTotalPrice(priceperunit)
    })
  }

  checkBoxFull = (selectionmaxnum, selectioncategory) => {
    var returnval = false;
    var selectedSelection = this.state.selectedSelection
    var index = selectedSelection.findIndex(x => x.selectioncategory==selectioncategory);

    if (index >= 0) {
      if (selectedSelection[index].selectionitem.length === selectionmaxnum) {
        returnval = true
      }
    }

    return returnval;
  }

  handleCheckBoxChange = (e, selectioncategory, selectionmaxnum, selectionitemtitle, selectionitemprice, priceperunit) => {

    var selectedSelection = this.state.selectedSelection
    var index = selectedSelection.findIndex(x => x.selectioncategory==selectioncategory);

    //If selectioncategory exist
    if (index >=0) {
      var selectionitemindex = selectedSelection[index].selectionitem.findIndex(x => x.selectionitemtitle==selectionitemtitle);

      //If selectionitemtitle exist, uncheck
      if (selectionitemindex >=0) {
        selectedSelection[index].selectionitem.splice(selectionitemindex, 1)

        if (selectedSelection[index].selectionitem.length === 0) {
          selectedSelection.splice(index, 1)
        }
      }
      //If selectionitemtitle not exist, check
      else {
        var addSelectionItem = {
            selectionitemtitle: selectionitemtitle,
            selectionitemprice: selectionitemprice,
        }
        if (selectedSelection[index].selectionitem.length < selectionmaxnum) {
          selectedSelection[index].selectionitem.push(addSelectionItem)
        }
      }
    }
    //If selectioncategory not exist
    else {
      var addSelection = {
        selectioncategory: selectioncategory,
        selectionmaxnum: selectionmaxnum,
        selectionitem: [
          {
            selectionitemtitle: selectionitemtitle,
            selectionitemprice: selectionitemprice,
          }
        ]
      }
      selectedSelection.push(addSelection)
    }

    this.setState({ 
      selectedSelection: selectedSelection, 
    } ,() => {
      this.calculateMenuTotalPrice(priceperunit)
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
 
  renderNavItem() {

    var itemsarray = [];

    var menutitle = this.state.menutitle;

    for (let i = 0; i < menutitle.length; i++) {
      if(i > 4 && i < menutitle.length) {
        itemsarray.push(
          <NavItem>
            <UncontrolledDropdown
              nav
              isOpen={this.state.menuDropDownOpen}
              toggle={() => {
                this.toggleCuisineDropDown();
              }}
            >
              <DropdownToggle
                style={{
                  fontWeight: "600",
                  color:
                    this.state.menutitle
                      .slice(5, menutitle.length)
                      .includes(this.state.selectedMenu) ||
                    this.state.menuDropDownOpen
                      ? "#20a8d8"
                      : "black",
                  backgroundColor: "white",
                  fontSize: 15
                }}
                nav
                caret
              >
                {this.state.menutitle
                  .slice(5, menutitle.length)
                  .includes(this.state.selectedMenu)
                  ? this.state.selectedMenu
                  : "More"}
              </DropdownToggle>
              <DropdownMenu right style={{ right: "auto" }}>
                <Table style={{ margin: 0 }} borderless>
                  <tbody>{this.renderMoreMenu(5, 12)}</tbody>
                </Table>
              </DropdownMenu>
            </UncontrolledDropdown>
            <div
              style={{
                height: 2,
                width: "100%",
                backgroundColor: this.state.menutitle
                  .slice(5, menutitle.length)
                  .includes(this.state.selectedMenu)
                  ? "#20a8d8"
                  : "transparent"
              }}
            />
          </NavItem>
        )
        break
      }
      else {
        itemsarray.push(
          <NavItem>
            <NavLink
              onClick={() => this.navItemClicked(menutitle[i])}
              style={{
                paddingRight: 20,
                paddingLeft: menutitle[i] === "All Menu" ? 0 : 20,
                fontWeight: "600",
                color: this.state.selectedMenu === menutitle[i] ? "#20a8d8" : "black",
                fontSize: 15
              }}
              href="#"
            >
              {" "}
              {menutitle[i]}
            </NavLink>
            <div
              style={{
                height: 2,
                width: "100%",
                backgroundColor:
                  this.state.selectedMenu === menutitle[i] ? "#20a8d8" : "transparent"
              }}
            />
          </NavItem>
        );
      }
    }

    return  <Nav className="float-left" pills>{itemsarray}</Nav>;

  }

  renderMoreMenu(startindex, lastindex) {
    var itemsarray = [];

    var menutitle = this.state.menutitle;

    for (let i = startindex; i < lastindex; i++) {
      itemsarray.push(
        <td>
          <Button
            onClick={() => this.navItemClicked(menutitle[i])}
            block
            color="ghost-link"
          >
            {menutitle[i]}
          </Button>
        </td>
      );
    }

    return <tr>{itemsarray}</tr>;
  }

  /////////////////////////////////////////Menu Modal Rendering//////////////////////////////////////////////////////////////

  renderMenuModal() {

    var activeMenu = this.state.activeMenu

    return (
      <Modal isOpen={this.state.menuModalOpen} toggle={this.toggleMenuModal}>
        <ModalBody>
          <b style={{ color: "#20a8d8", fontSize: 19 }}>{activeMenu.title}</b>

          <p style={{ fontStyle: 'italic', fontWeight: '500', marginTop:5, fontSize: 14, opacity: 0.5}}>Serves: {activeMenu.serveperunit}, Minimum order: {activeMenu.minimumquantity}</p>

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
 
          <div style={{ marginTop: 20 }}>
            {typeof activeMenu.selection === 'undefined' || activeMenu.selection.length === 0? null : this.renderSelection(activeMenu.selection, activeMenu.priceperunit)} 
          </div>

          <Button onClick={() => {this.toggleSpecialInstruction()}} outline color="primary" className="btn-pill" ><i className={this.state.specialInstructionOpen ? "fa fa-minus" : "fa fa-plus"} ></i>&nbsp;&nbsp;Add Special Instruction</Button>

          <Collapse style={{paddingTop: 20}} isOpen={this.state.specialInstructionOpen}>
            <Input value={this.state.specialInstruction} onChange={(e) => this.handleSpecialInstruction(e)} style={{color: 'black'}} type="textarea" rows="3" placeholder="Add your special instructions here.." />
          </Collapse>
          
          <div style={{marginTop:20, marginBottom:20, height:1, backgroundColor: 'gray', opacity: 0.3, width: '100%'}}/>

          <Row>
            <Col xs="6">

              {activeMenu.dishtype === 'bulk' ? 
              <span> <b style={{fontSize: 19, fontWeight: '600'}}>€{Number(this.state.selectedPrice === 0 ? activeMenu.priceperunit : this.state.selectedPrice).toFixed(2)}</b> <Label style={{fontStyle: 'italic'}}>/ {this.state.selectedQuantity > 1 ? this.state.selectedQuantity + " trays" : " tray"}</Label></span>
              :
              <span> <b style={{fontSize: 19, fontWeight: '600'}}>€{Number(this.state.selectedPrice === 0 ? activeMenu.priceperunit : this.state.selectedPrice).toFixed(2)}</b> <Label style={{fontStyle: 'italic'}}>/ {this.state.selectedQuantity > 1 ? this.state.selectedQuantity + " people" : " person"}</Label></span>
              }

            </Col>
          
            <Col style={{textAlign:'end',}} xs="6">
              <Button style={{fontSize: 17, padding: 10}} onClick={() => this.state.updateCartItem ? this.updateCart() : this.addToCart()} color="primary">
                {this.state.updateCartItem ? "Update Cart" : "Add to Cart"}
              </Button>
            </Col>  
          </Row>
        </ModalBody>
       
      </Modal>
    );
  }

  renderSelection(selection, priceperunit) {
    var selectionarray = [];
    for (let i = 0; i < selection.length; i++) {
      selectionarray.push(
        <Card key={i} >
          <CardHeader style={{fontWeight: '600'}}>
            Select {selection[i].selectionmaxnum} {selection[i].selectioncategory}
          </CardHeader>
          <CardBody>
            {selection[i].selectionmaxnum === 1 ? this.renderRadioboxSelectionItems(selection[i].selectioncategory, selection[i].selectionitem, priceperunit) : this.renderCheckboxSelectionItems(selection[i].selectioncategory, selection[i].selectionmaxnum, selection[i].selectionitem, priceperunit)}
          </CardBody>
        </Card>
      );
    }
    return <FormGroup>{selectionarray}</FormGroup>;
  }

  renderRadioboxSelectionItems(selectioncategory, selectionitem, priceperunit) {
    var selectionitemarray = [];
    for (let i = 0; i < selectionitem.length; i++) {
      selectionitemarray.push(
        <Col key={i} xs="12" sm="6" md="6">
          {selectionitem[i].selectionitemprice === 0 ? 
          (
            <FormGroup style={{ paddingLeft: 0, marginTop: 10 }}check className="radio">
              <div class="pretty p-default p-round">
                <input 
                  type="radio" 
                  name="radio1"
                  checked={this.findSelectionIndex(selectioncategory, selectionitem[i].selectionitemtitle)}
                  onChange={(e) => this.handleRadioBoxChange(e, selectioncategory, selectionitem[i].selectionitemtitle, selectionitem[i].selectionitemprice, priceperunit)}
                  value={selectionitem[i].selectionitemtitle}
                  name={selectionitem[i].selectionitemtitle}
                  style={{padding:0, marginRight: 10}} />
                <div class="state p-success-o">
                    <label></label>
                </div>
              </div>

              <Label check className="form-check-label">
                {selectionitem[i].selectionitemtitle}
              </Label>
            </FormGroup>
          ) 
          : 
          (
            <FormGroup style={{ paddingLeft: 0, marginTop: 10 }}check className="radio">
              <div class="pretty p-default p-round">
                <input 
                  type="radio" 
                  name="radio2"
                  checked={this.findSelectionIndex(selectioncategory, selectionitem[i].selectionitemtitle)}
                  onChange={(e) => this.handleRadioBoxChange(e, selectioncategory, selectionitem[i].selectionitemtitle, selectionitem[i].selectionitemprice, priceperunit)}
                  value={selectionitem[i].selectionitemtitle}
                  name={selectionitem[i].selectionitemtitle}
                  style={{padding:0, marginRight: 10}} />
                <div class="state p-success-o">
                    <label></label>
                </div>
              </div>

              <Label check className="form-check-label">
                {selectionitem[i].selectionitemtitle} (+€
                {Number(selectionitem[i].selectionitemprice).toFixed(2)})
              </Label>
            </FormGroup>
          )}
        </Col>
      );
    }
    return <Row>{selectionitemarray}</Row>;
  }

  renderCheckboxSelectionItems(selectioncategory, selectionmaxnum, selectionitem, priceperunit) {
    var selectionitemarray = [];
    for (let i = 0; i < selectionitem.length; i++) {
      selectionitemarray.push(
        <Col key={i} xs="12" sm="6" md="6">
          {selectionitem[i].selectionitemprice === 0 ? 
          (
            <FormGroup style={{ paddingLeft: 0, marginTop: 10 }}check className="checkbox">
              <div class="pretty p-svg p-curve">
                <input 
                  type="checkbox"
                  checked={this.findSelectionIndex(selectioncategory, selectionitem[i].selectionitemtitle)}
                  onChange={(e) => this.handleCheckBoxChange(e, selectioncategory, selectionmaxnum, selectionitem[i].selectionitemtitle, selectionitem[i].selectionitemprice, priceperunit)}
                  value={selectionitem[i].selectionitemtitle}
                  style={{padding:0, marginRight: 10}} />
                <div class="state p-success">
                    <svg class="svg svg-icon" viewBox="0 0 20 20">
                        <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style={{stroke: 'white', fill: 'white'}}></path>
                    </svg>
                    <label></label>
                </div>
              </div>
             
              <Label check className="form-check-label">
                {selectionitem[i].selectionitemtitle}
              </Label>
            </FormGroup>
          ) 
          : 
          (
            <FormGroup style={{ paddingLeft: 0, marginTop: 10 }}check className="checkbox">
              <div class="pretty p-svg p-curve">
                <input 
                  type="checkbox"
                  checked={this.findSelectionIndex(selectioncategory, selectionitem[i].selectionitemtitle)}
                  onChange={(e) => this.handleCheckBoxChange(e, selectioncategory, selectionmaxnum, selectionitem[i].selectionitemtitle, selectionitem[i].selectionitemprice, priceperunit)}
                  value={selectionitem[i].selectionitemtitle}
                  style={{padding:0, marginRight: 10}} />
                <div class="state p-success">
                    <svg class="svg svg-icon" viewBox="0 0 20 20">
                        <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style={{stroke: 'white', fill: 'white'}}></path>
                    </svg>
                    <label></label>
                </div>
              </div>
             
              <Label check className="form-check-label">
                {selectionitem[i].selectionitemtitle} (+€
                {Number(selectionitem[i].selectionitemprice).toFixed(2)})
              </Label>
            </FormGroup>
          )}
        </Col>
      );
    }
    return <Row>
    {selectionitemarray}
    {this.checkBoxFull(selectionmaxnum, selectioncategory) ? <Col style={{marginTop: 20}} xs="12"><Label style={{fontWeight: '600', color: 'darkorange'}}>Maximum {selectionmaxnum} selections</Label></Col> : null}
    </Row>;
  }

  /////////////////////////////////////////Cart Rendering//////////////////////////////////////////////////////////////

  renderCartSelectionItem(selectionitem) {
    var itemstext = '';

    for (let i = 0; i < selectionitem.length; i++) {
      if (i == 0) {
        itemstext = selectionitem[i].selectionitemtitle
      }
      else {
        itemstext = itemstext + ', ' + selectionitem[i].selectionitemtitle
      }
    }
    return <div><Label style={{ cursor: 'pointer', opacity: 0.7, }}>{itemstext}</Label></div>;
  }

  renderCartSelection(selection) {
    var itemsarray = [];

    for (let i = 0; i < selection.length; i++) {
      itemsarray.push(
        <p key={i} style={{textSize: 13, opacity: 0.7, margin: 0 }}>
          <span>&#8226;</span> {selection[i].selectioncategory}:
          {this.renderCartSelectionItem(selection[i].selectionitem)}
        </p>
      );
    }

    return <div>{itemsarray}</div>;
  }

  renderInstruction(instruction) {
    var itemsarray = [];

    for (let i = 0; i < 1; i++) {
      itemsarray.push(
        <p key={i} style={{ textSize: 13, opacity: 0.7, margin: 0 }}>
          <span>&#8226;</span> Instruction:
          <div>
            <Label style={{ cursor: 'pointer', opacity: 0.7, }}>
              {instruction}
            </Label>
          </div>
        </p>
      );
    }

    return <div>{itemsarray}</div>;
  }

  renderTableItems() {
    var itemarray = [];

    var cartitem = this.state.cartitem;

    for (let i = 0; i < cartitem.length; i++) {
      itemarray.push(
        <tr style={{cursor: 'pointer',}}>
          <td style={{  fontWeight: "500", cursor: 'pointer' }} onClick={() => this.cartItemClicked(cartitem[i].menuID, cartitem[i].quantity, cartitem[i].selection, cartitem[i].totalprice, cartitem[i].instruction)}>
            {cartitem[i].quantity}
          </td>
          <td style={{  textAlign: "start", cursor: 'pointer' }} onClick={() => this.cartItemClicked(cartitem[i].menuID, cartitem[i].quantity, cartitem[i].selection, cartitem[i].totalprice, cartitem[i].instruction)}>
            <Dotdotdot clamp={2}>
              <p
                style={{
                  marginBottom: 5,
                  fontWeight: "500",
                  color: "#20a8d8",
                  overflow: "hidden"
                }}
              >
                {cartitem[i].title}
              </p>
            </Dotdotdot>
            <p style={{ fontStyle: 'italic', marginBottom: 5, textSize: 13, opacity: 0.7 }}>
              serves {cartitem[i].serveperunit}
            </p>
            {
              typeof cartitem[i].selection === 'undefined' ? null : 
              this.renderCartSelection(cartitem[i].selection)
            }
            {
              typeof cartitem[i].instruction === 'undefined' ? null : 
                this.renderInstruction(cartitem[i].instruction)
            }
          </td>

          <td style={{ width: "20%", textAlign: "start", cursor: 'pointer' }} onClick={() => this.cartItemClicked(cartitem[i].menuID, cartitem[i].quantity, cartitem[i].selection, cartitem[i].totalprice, cartitem[i].instruction)}>
            €{Number(cartitem[i].totalprice).toFixed(2)}
          </td>
          <td
            style={{
              padding: 0,
              paddingTop: 10,
              textAlign: "start",
              cursor: 'pointer'
            }}
            onClick={() => this.deleteCart(i)}
          >
            <img
              style={{
                height: 15,
                width: 15,
                objectFit: "cover"
              }}
              src={closeIcon}
              alt=""
            />
          </td>
        </tr>
      );
    }

    return <tbody>{itemarray}</tbody>;
  }

  renderNotEmptyCart() {
    return (
      <CardBody style={{ textAlign: "center" }}>
        <Table borderless>{this.renderTableItems()}</Table>

        <Row>
          <Col>
            <Card
              style={{
                cursor: "pointer",
                borderColor: this.state.orderType === "delivery" ? "#20a8d8" : null
              }}
              onMouseOver=""
              onClick={() => this.selectOrderType("delivery")}
            >
              <CardBody style={{margin: 0, padding:10}}>
                <h6 style={{ marginTop: 5, textAlign: "center", color: this.state.orderType === "delivery" ? "#20a8d8" : null }}>
                  Delivery
                </h6>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                cursor: "pointer",
                borderColor: this.state.orderType === "pickup" ? "#20a8d8" : null
              }}
              onMouseOver=""
              onClick={() => this.selectOrderType("pickup")}
            >
              <CardBody style={{margin: 0, padding:10}}>
                <h6 style={{ marginTop: 5, textAlign: "center", color: this.state.orderType === "pickup" ? "#20a8d8" : null }}>
                  Pick Up
                </h6>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Collapse isOpen={this.state.orderType === "delivery"} >
          <Table borderless>
            <tbody>
              <tr>
                <td
                  style={{ fontSize: 16, textAlign: "start" }}
                >
                  Delivery Fee
                </td>
                <td style={{ fontSize: 16, textAlign: "end" }}>
                  €{Number(this.state.restaurantInfo.deliveryfee).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </Table>
        </Collapse>

        <div
          style={{
            height: 1,
            backgroundColor: "gray",
            opacity: 0.5,
            width: "100%"
          }}
        />

        <Table borderless>
          <tbody>
            <tr>
              <td
                style={{ fontSize: 16, fontWeight: "600", textAlign: "start" }}
              >
                TOTAL
              </td>
              <td style={{ fontSize: 16, fontWeight: "600", textAlign: "end" }}>
                €{this.calculateCartTotalPrice()}
              </td>
            </tr>
          </tbody>
        </Table>

        <Button
          style={{
            color: "white",
            backgroundColor: "#ff7043",
            marginTop: 30,
            padding: 15,
            fontWeight: "600",
            fontSize: 16
          }}
          onClick={() => this.checkOutClicked()}
          block
        >
          Checkout
        </Button>

        {this.state.orderNotOverMinSpending ? 
        <div>
        <Label
          style={{
            marginTop: 20,
            color: "red",
            textAlign: "center",
            fontSize: 15
          }}
        >
          Total order price has to be more than minimum order €{Number(this.state.restaurantInfo.minimumspend).toFixed(2)}
        </Label>
        </div>
        : null }

        <div>
        <Label
          style={{
            marginTop: 20,
            color: "gray",
            textAlign: "center",
            fontSize: 15
          }}
        >
          Minimum Order Value: €{Number(this.state.restaurantInfo.minimumspend).toFixed(2)}
        </Label>
        </div>

      </CardBody>
    );
  }

  renderEmptyCart() {
    return (
      <CardBody style={{ textAlign: "center" }}>
        <img
          style={{
            objectFit: "cover",
            width: 150,
            height: 150,
            opacity: 0.3,
            display: "inline"
          }}
          src={
            "https://cdn4.iconfinder.com/data/icons/shopping-21/64/shopping-02-512.png"
          }
        />
        <div>
        <Label
          style={{
            marginTop: 20,
            color: "gray",
            textAlign: "center",
            fontSize: 15
          }}
        >
          You have 0 item in your cart.
        </Label>
        </div>
        <div>
        <Label
          style={{
            marginTop: 10,
            color: "gray",
            textAlign: "center",
            fontSize: 15
          }}
        >
          Select a menu item to start your order.
        </Label>
        </div>
        <Button
          style={{
            color: "white",
            backgroundColor: "#ff7043",
            marginTop: 30,
            padding: 15,
            fontWeight: "600",
            fontSize: 16
          }}
          disabled
          block
        >
          Checkout
        </Button>
        <div>
        <Label
          style={{
            marginTop: 20,
            color: "gray",
            textAlign: "center",
            fontSize: 15
          }}
        >
           Minimum Order Value: €{Number(this.state.restaurantInfo.minimumspend).toFixed(2)}
        </Label>
        </div>
      </CardBody>
    );
  }

  renderCartLoadingItems() {
    var itemsarray = [];

    for (let i = 0; i < 4; i++) {
      itemsarray.push(
        <tr>
          <td >
            <ContentLoader height="250">
              <rect x="0" y="0" rx="4" ry="4" width="50" height="20" />
            </ContentLoader> 
          </td>
          <td >
            <ContentLoader height="250">
              <rect x="0" y="0" rx="4" ry="4" width="300" height="20" />
              <rect x="0" y="40" rx="4" ry="4" width="200" height="20" />
            </ContentLoader> 
          </td>
          <td >
            <ContentLoader height="250">
              <rect x="0" y="0" rx="4" ry="4" width="50" height="20" />
            </ContentLoader> 
          </td>
          <td >
            <ContentLoader height="250">
              <rect x="0" y="0" rx="4" ry="4" width="50" height="20" />
            </ContentLoader> 
          </td>
        </tr>
      );
    }

    return (
    <Card
        style={{
          boxShadow: "0px 3px 1px #9E9E9E",
          borderWidth: 0
        }}
      >
        <CardHeader
          style={{
            backgroundColor: "rgba(13, 152, 186, 0.8)",
            textAlign: "center"
          }}
        >
          <Label style={{ fontWeight: "600", color: "white", fontSize: 15 }}>
            Your Cart
          </Label>
        </CardHeader>

        <CardBody style={{ textAlign: "center" }}>
        <Table>
         <tbody>
          {itemsarray}
         </tbody>
        </Table>
        <Button
          style={{
            color: "white",
            backgroundColor: "#ff7043",
            marginTop: 30,
            padding: 15,
            fontWeight: "600",
            fontSize: 16
          }}
          disabled
          block
        >
          Checkout
        </Button>
      </CardBody>
    </Card>
 
    );
  }

  renderCart() {
    return (
      <Card
        style={{
          boxShadow: "0px 2px 2px #9E9E9E",
          borderWidth: 0
        }}
      >
        <CardHeader
          style={{
            backgroundColor: "rgba(13, 152, 186, 0.8)",
            textAlign: "center"
          }}
        >
          <Label style={{ fontWeight: "600", color: "white", fontSize: 17 }}>
            Your Cart
          </Label>
        </CardHeader>

        {this.state.cartitem.length === 0
          ? this.renderEmptyCart()
          : this.renderNotEmptyCart()}
      </Card>
    );
  }

  /////////////////////////////////////////Menu Rendering//////////////////////////////////////////////////////////////

  renderMenu() {
    var menuarray = [];

    var menutab = this.state.menu;

    for (let i = 0; i < menutab.length; i++) {
      this.refObj[i] = React.createRef();
      menuarray.push(
        <Col key={i} xs="12">
          <div ref={this.refObj[i]} > </div>
          {i === 0 ? null : (
            <div
              style={{
                marginTop: 20,
                marginBottom: 30,
                height: 1,
                backgroundColor: "gray",
                opacity: 0.2,
                width: "100%"
              }}
            />
          )}
          {this.renderCategory(menutab[i].menuitem, i)}
        </Col>
      );
    }

    return (
    <Row >
      {menuarray}
    </Row>
    );
  }

  renderCategory(menuitem) {
    var categoryarray = [];

    var categorytab = menuitem;

    for (let i = 0; i < categorytab.length; i++) {
      categoryarray.push(
        <Col key={i} xs="12">
          {this.renderCategoryItems(
            categorytab[i].items,
            categorytab[i].categoryname,
          )}
        </Col>
      );
    }

    return <Row>{categoryarray}</Row>;
  }

  renderCategoryItems(items, categoryname) {
    var itemsarray = [];

    for (let i = 0; i < items.length; i++) {
      itemsarray.push(
        <Col key={i} xs="12" sm="12" md="12" lg="6">
          <Card className="card-1" onClick={() => this.menuItemClicked(items[i]._id)} style={{ cursor: "pointer" }}>
            <CardBody
              style={{
                cursor: "pointer",
                marginTop: 15,
                marginBottom: 10,
                padding: 0,
                height: "100%"
              }}
            >
              <Col>
                <div class="row">
                  <Col style={{padding: 0,}}>
                    <Label
                      style={{
                        display: "inline-block",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        maxWidth: 160,
                        width: "100%",
                        textAlign: "start",
                        cursor: "pointer",
                        marginLeft: 15,
                        color: "#20a8d8"
                      }}
                      className="h5"
                    >
                      {items[i].title}
                    </Label>
                  </Col>
                  <Col style={{paddingRight: 20,}}>
                    <Label
                      style={{
                        cursor: "pointer",
                        textAlign: "end",
                        marginLeft: 15
                      }}
                      className="h5 float-right"
                    >
                      €{Number(items[i].priceperunit).toFixed(2)}
                    </Label>
                  </Col>
                </div>
                <div class="row">
                  <Label
                    style={{
                      opacity: 0.7,
                      cursor: "pointer",
                      marginLeft: 15,
                      fontfStyle: "italic"
                    }}
                  >
                    Serves {items[i].serveperunit}
                  </Label>
                  {items[i].minimumquantity > 1 ? 
                    <Label
                      style={{
                        opacity: 0.7,
                        cursor: "pointer",
                        marginLeft: 5,
                        fontfStyle: "italic"
                      }}
                    >
                    | Minimum {items[i].minimumquantity}
                    </Label>
                    :
                    null
                  }
                  {typeof items[i].markitem === 'undefined' ? null : this.renderMarkAsIcon(items[i].markitem)}
                </div>
                <div style={{ marginTop: 10 }}>
                  <Dotdotdot clamp={2}>
                    <p style={{ cursor: "pointer", overflow: "hidden" }}>
                      {items[i].descrip}
                    </p>
                  </Dotdotdot>
                </div>
              </Col>
            </CardBody>
          </Card>
        </Col>
      );
    }

    return (
      <Row>
        <Col xs="12">
          <Label style={{ marginBottom: 10, marginRight: 5 }} className="h5">
            {categoryname}
          </Label>
        </Col>
        {itemsarray}
      </Row>
    );
  }

  renderReview() {
    var itemsarray = [];

    var review = this.state.review

    for (let i = 0; i < review.length; i++) {
      itemsarray.push(
        <Col key={i} xs="12">
          <Card style={{boxShadow: 'none', borderWidth: 0}}>
            <CardBody
              style={{ padding: 0,}}
            >
              <Row>
                <Col xs="12">
                  <Label
                    className="h5"
                  >
                    {review[i].customerFirstName}
                  </Label>
                </Col>

                <Col xs="12">
                  <Label>
                    {review[i].customerCity}
                  </Label>
                </Col>

                <Col xs="12">
                  <Row style={{marginLeft:0}} className="justify-content">
                  <StarRatingComponent
                    name="rating"
                    emptyStarColor="#D3D3D3"
                    starCount={5}
                    editing={false}
                    value={review[i].customerRating}
                  />
                  <Label
                    style={{
                      opacity: 0.7,
                      marginLeft: 15,
                      fontfStyle: "italic"
                    }}
                  >
                    {moment(review[i].createdAt).format("DD MMM, YYYY")}
                  </Label>
                  </Row>
                </Col>

                <Col xs="12">
                  <p style={{ overflow: "hidden" }}>
                    {review[i].customerComment}
                  </p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      );
    }

    return (
      <Row>
        <Col xs="12">
          <Label style={{ marginBottom: 30, fontSize: 19, }} className="h5">
            Reviews for {this.state.restaurantInfo.catererName}
          </Label>
        </Col>
        {itemsarray}
        <Col xs="12">
          <Label style={{ color: '#20a8d8', cursor: 'pointer' }} className="h5">
            See More
          </Label>
        </Col>
      </Row>
    );
  }

  renderAbout() {
    var restaurantInfo = this.state.restaurantInfo
    return (
      <Row>
        <div style={{ marginLeft: 10, width: 80, height: 80, position: 'relative', overflow: 'hidden', borderRadius: '50%'}}>
          <img style={{ objectFit:'cover', width: 'auto', height: '100%', display: 'inline' }} src={this.state.restaurantInfo.profilesrc}/>
        </div>
              
        <Col xs="12">
          <Label style={{ marginTop: 20 }} className="h4">
            {restaurantInfo.catererName}
          </Label>
        </Col>

        <Col xs="12">
          <Label style={{ marginTop:10, fontWeight: '600' }}>
            {restaurantInfo.catererAddress}
          </Label>
        </Col>

        <Col xs="12">
        <Row style={{marginLeft:0 }} className="justify-content">
          <StarRatingComponent
            name="rate1"
            emptyStarColor="#D3D3D3"
            starCount={5}
            editing={false}
            value={restaurantInfo.rating}
          />
          {restaurantInfo.rating === 0 ? null : <b style={{ marginLeft: 5, color: "darkorange" }}>{restaurantInfo.rating}</b> }
          {restaurantInfo.numofreview === 0 ? 
          <Label style={{ fontWeight: '500', marginLeft: 5, color: "darkorange" }}>
            No Ratings Yet
          </Label>
          :
          <Label style={{ fontWeight: '500', marginLeft: 5, color: "darkorange" }}>
            ({restaurantInfo.numofreview}) Reviews
          </Label>}
        </Row>
        </Col>

        <Col xs="12">
          <p style={{ marginTop: 10, overflow: "hidden" }}>
            {restaurantInfo.catererDescrip}
          </p>
        </Col>
        <Col style={{margin: 0, padding : 0}} xs="12">
          <Table style={{margin: 0, padding : 0}} borderless>
            <tbody>
              <tr>
                <td><p style={{padding: 0, margin: 0, fontWeight: '600'}}>Delivery Fee:</p></td>
                <td><p style={{padding: 0, margin: 0}}>€{Number(restaurantInfo.deliveryfee).toFixed(2)}</p></td>
              </tr>
              <tr>
                <td><p style={{padding: 0, margin: 0, fontWeight: '600'}}>Minimum Spending:</p></td>
                <td><p style={{padding: 0, margin: 0}}>€{Number(restaurantInfo.minimumspend).toFixed(2)}</p></td>
              </tr>
              <tr>
                <td><p style={{padding: 0, margin: 0, fontWeight: '600'}}>Delivery Hours:</p></td>
                <td><p style={{padding: 0, margin: 0}}>{this.renderOpeningHours()}</p></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }

  renderOpeningHours() {
    var itemsarray = [];

    var deliveryhours = this.state.restaurantInfo.deliveryhours;

    if (typeof this.state.restaurantInfo.deliveryhours !== 'undefined') {
      if (deliveryhours.length > 0) {
        for (let i = 0; i < deliveryhours.length; i++) {
          itemsarray.push(
            <Col xs="6" sm="6" md="4" lg="4">
              <span style={{fontWeight: this.state.todayDay === deliveryhours[i].day ? '700' : null}}>
                {deliveryhours[i].starttime === 0 && deliveryhours[i].closetime === 0 ? 
                 <p style={{margin: 0, marginBottom: 10}}>Off</p>
                 :
                <p style={{margin: 0, marginBottom: 10}}>
                  {this.reformatInput(deliveryhours[i].starttime.toString())}&nbsp;-&nbsp;{this.reformatInput(deliveryhours[i].closetime.toString())}
                </p>
                }
              </span>
            </Col>
          );
        }
      }
    }

    return (
      <Row
      >
        {itemsarray}
      </Row>
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

  renderMarkAsIcon(markitem) {
    var iconarray = [];
    for (let i = 0; i < markitem.length; i++) {
      iconarray.push(
        <img
          key={i} 
          style={{
            marginLeft: 5,
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
          textAlign: "end",
          flex: 1
        }}
      >
        {iconarray}
      </Col>
    );
  }

  renderLoadingItems() {
    var itemsarray = [];

    for (let i = 0; i < 6; i++) {
      itemsarray.push(
        <Col key={i} xs="12" sm="6" md="6" lg="6">
          <ContentLoader height="350">
            <rect x="0" y="0" rx="6" ry="6" width="100%" height="220" />
            <rect x="0" y="240" rx="4" ry="4" width="300" height="13" />
            <rect x="0" y="265" rx="3" ry="3" width="100%" height="20" />
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

  render() {
    const menutitlelength = this.state.menutitle.length;

    return (
      <Layout title= {typeof this.state.restaurantInfo.catererName !== 'undefined' ? this.state.restaurantInfo.catererName + ' Caterer Details' : 'Caterer Details'}>
       <NextSeo
        config={{
          title: typeof this.state.restaurantInfo.catererName !== 'undefined' ? this.state.restaurantInfo.catererName + ' Caterer Details' : 'Caterer Details'
        }}
      />
      
      <div style={{backgroundColor: 'white'}}>
         <NavBar signIn={e=>this.signIn(e)}/>
      <div className="app align-items-center">

          <Container>
            <Row
              style={{ marginTop: 20, marginBottom: 50 }}
              className="justify-content-center"
            >
              <img
                style={{ objectFit: "cover", width: "100%", height: 300 }}
                src={this.state.restaurantInfo.coversrc}
              />

              <Col xs="0" sm="1" md="3" lg="3" />

              <Col xs="12" sm="10" md="6" lg="6">
                <Card
                  style={{ textAlign: "center", marginTop: -250 }}
                >
                  <CardBody>

                    <div style={{width: 80, height: 80, position: 'relative', margin: 'auto', overflow: 'hidden', borderRadius: '50%'}}>
                      <img style={{ objectFit:'cover', width: 'auto', height: '100%', display: 'inline' }} src={this.state.restaurantInfo.profilesrc}/>
                    </div>
                
                    <Label style={{ marginTop:10, marginLeft: 10 }} className="h4">{this.state.restaurantInfo.catererName}</Label>
  
                    <Row className="justify-content-center">
                      <StarRatingComponent
                        name="rate1"
                        emptyStarColor="#D3D3D3"
                        starCount={5}
                        editing={false}
                        value={this.state.restaurantInfo.rating}
                      />
                      {this.state.restaurantInfo.rating === 0 ? null : <b style={{ marginLeft: 5, color: "darkorange" }}>{this.state.restaurantInfo.rating}</b> }
                      {this.state.restaurantInfo.numofreview === 0 ? 
                      <Label style={{ fontWeight: '500', marginLeft: 5, color: "darkorange" }}>
                        No Ratings Yet
                      </Label>
                      :
                      <Label style={{ fontWeight: '500', marginLeft: 5, color: "darkorange" }}>
                        ({this.state.restaurantInfo.numofreview}) Reviews
                      </Label>}
                    </Row>

                    <Label style={{ marginTop: 10 }} className="h6">
                      {this.state.restaurantInfo.catererAddress}
                    </Label>

                  </CardBody>
                </Card>
              </Col>

              <Col xs="0" sm="1" md="3" lg="3" />

              <Col style={{ marginTop: 30, marginBottom: 20 }} xs="12" md="12">
                {this.renderNavItem()}
                
              </Col>

              <Col style={{ marginTop: 20 }} xs="12" sm="12" md="7" lg="7">
                {this.state.loading ? this.renderLoadingItems() : this.renderMenu()}
              </Col>

              <Col style={{ marginTop: 20 }} xs="0" sm="0" md="5" lg="5">
                {this.state.cartloading ? this.renderCartLoadingItems() : this.renderCart()}
              </Col>

              <div style={{marginTop:30, marginBottom:20, height:1, backgroundColor: 'gray', opacity: 0.3, width: '100%'}}/>

              <Col style={{ marginTop: 20 }} xs="12" sm="12" md="7" lg="7">
                {this.renderReview()}
              </Col>

              <Col style={{ marginTop: 20 }} xs="0" sm="0" md="5" lg="5"></Col>

              <div style={{marginTop:30, marginBottom:20, height:1, backgroundColor: 'gray', opacity: 0.3, width: '100%'}}/>

              <Col style={{ marginTop: 20 }} xs="12" sm="12" md="7" lg="7">
                {this.renderAbout()}
              </Col>

              <Col style={{ marginTop: 20 }} xs="0" sm="0" md="5" lg="5"></Col>
              
            </Row>

            {this.state.menuModalOpen ? this.renderMenuModal() : null}
          </Container>
        </div>
        <Footer />
      </div>
      </Layout>
    );
  }
}

export default CatererDetail;
