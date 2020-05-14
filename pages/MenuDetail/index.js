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
  Badge,
} from "reactstrap";
import './MenuDetail.css'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Dotdotdot from "react-dotdotdot";
import ContentLoader, { Facebook } from "react-content-loader";
import StarRatingComponent from "react-star-rating-component";
import Router from 'next/router'
import axios from "axios";
import apis from "../../apis";
import img from "../../assets/img"
import color from "../../assets/color"
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

class MenuDetail extends Component {

  constructor(props) {
    super(props);

    this.refObj = {}

    this.toggleMenuModal = this.toggleMenuModal.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleSpecialInstruction = this.handleSpecialInstruction.bind(this);

    this.state = {
      cartID: null,
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
      menu: [],
      menutitle: [],
      cartitem: [],
      cartToBeOrder: [],
      fetchedmenu: [
        {
          title: "Ebi Furai",
          category: 'Side Dishes',
          descrip: "Deep fried king prawns coated in seasonal breadcrumbs served with sweet Japanese sauce",
          markitem: [],
          priceperunit: 5.9,
        },
        {
          title: "Yasai Gyoza",
          category: 'Side Dishes',
          descrip: "Finely chopped seasonal vegetables dumpling steamed and then pan fried, served with traditional gyoza sauce",
          markitem: [],
          priceperunit: 6.8,
        },
        {
          title: "Yakitori",
          category: 'Side Dishes',
          descrip: "Chicken and spring onion grilled on skewer served with yakitori sauce",
          markitem: [],
          priceperunit: 6.9,
        },
        {
          title: "Sake / Salmon Nigiri",
          category: 'Sushi Nigiri',
          descrip: "Rice ball served with a slice of filling (2 pcs)",
          markitem: [],
          priceperunit: 4,
        },
        {
          title: "Suzuki / Sea Bass Nigiri",
          category: 'Sushi Nigiri',
          descrip: "Rice ball served with a slice of filling. (2 pcs)",
          markitem: [],
          priceperunit: 5,
        },
        {
          title: "Ebi / Prawn Nigiri",
          category: 'Sushi Nigiri',
          descrip: "Rice ball served with a slice of filling. (2 pcs)",
          markitem: [],
          priceperunit: 4,
        },
        {
          title: "Yasai Tempura Set",
          category: 'Tempura Set',
          descrip: "Sweet potato, aubergine, shitake mushroom, asparagus, carrot, lotus roots, green paper and onion coated in a light crispy batter. Served with steamed rice, miso soup",
          markitem: [],
          priceperunit: 12.9,
        },
        {
          title: "Seafood Tempura",
          category: 'Tempura Set',
          descrip: "Fresh mix seafood coated in a light crispy batter served with steamed rice, miso soup",
          markitem: [],
          priceperunit: 13.9,
        },
        {
          title: "Tempura Moriawase",
          category: 'Tempura Set',
          descrip: "Assorted mix vegetable and fresh seafood coated in a light crispy batter served with steam rice, miso soup",
          markitem: [],
          priceperunit: 13.9,
        },
        {
          title: "Teppan Chicken Teriyaki",
          category: 'Teppan Teriyaki',
          descrip: "Grilled 8oz of chicken breast served with stir fried vegetables and sweet teriyaki sauce",
          markitem: [],
          priceperunit: 13.9,
        },
        {
          title: "Teppan Salmon Teriyaki",
          category: 'Teppan Teriyaki',
          descrip: "Grilled fresh supreme of salmon served with stir fried vegetables and sweet teriyaki sauce",
          markitem: [],
          priceperunit: 15.9,
        },
        {
          title: "Teppan Beef Teriyaki",
          category: 'Teppan Teriyaki',
          descrip: "Grilled 9oz prime Irish strip loin steak served with stir fried vegetables and sweet teriyaki sauce",
          markitem: [],
          priceperunit: 15.9,
        },
      ],
      quantity: [1,2,3,4,5,6,7,8,9,10,11,12,13],
      restaurantInfo: {
        catererID: "abc",
        catererName: "Flannery Restaurant & Pub",
        profilesrc: "https://www.psdgraphics.com/wp-content/uploads/2016/08/restaurant-logo.png",
        coversrc: "http://www.fedracongressi.com/fedra/wp-content/uploads/2016/09/minisandwich.jpg",
        catererDescrip: "Specialized in American Burger style mealset. Our American subs are our specialty, and our Special Grileld with spiced capicola and prosciuttini is the number one customer favorite. Our portions won't leave your stomachs rumbling, and our flavors always go down easy.",
        catererAddress: "30, O'Connell St, Dublin, Ireland",
        deliveryhours: "Mon-Fri: 10am-3pm",
        deliveryfee: 3,
        minimumspend: 50
      },
      orderNotOverMinSpending: false
    };
  }

  componentDidMount() {
   
    this.getCatererMenu();
    this.getCustomerCart();

  }

  restructureMenu = () => {
    var finalresult = [];

    var result = this.state.fetchedmenu.reduce(function(r, a) {
      r[a.category] = r[a.category] || [];
      r[a.category].push(a);
      return r;
    }, Object.create(null));

    for (var key in result) {
     
      var parentObject = {
        menutitle: key,
        menuitem: result[key],
      };

      finalresult.push(parentObject);
    }

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

  getCatererMenu= () => {
    /*var headers = {
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
        this.restructureMenu();
      });*/
      this.restructureMenu();
  }

  
  getCustomerCart= () => {
    /*var headers = {
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
      });*/
      this.getSessionStorage()
  }


  signIn(e) {
    e.preventDefault()
    Router.push({
      pathname: '/login',
      query: {'returnurl': `/menudetail`}
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

  menuItemClicked = (index, categoryname) => {
    var menuindex = this.state.menu.findIndex(x => x.menutitle == categoryname);
    if (menuindex >= 0 && index >= 0) {
      this.setState({
        menuModalOpen: !this.state.menuModalOpen,
        activeMenu: this.state.menu[menuindex].menuitem[index]
      });
    }
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
 
  handleQuantityChange(type, priceperunit) {
    this.setState({ 
      selectedQuantity: type === "add" ? this.state.selectedQuantity + 1 : this.state.selectedQuantity - 1 > 0 ? this.state.selectedQuantity - 1 : 1, 
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

    /*var headers = {
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
      */
     this.setState({
      cartitem: newCartItem,
      cartloading: false
    },() => {
      this.toggleMenuModal()
      this.addToSessionStorage()
    })
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

    /*var headers = {
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
      });*/

      this.setState({
        cartloading: false
      },() => {
        this.addToSessionStorage()
      }) 
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

    /*var headers = {
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
      }); */

      this.setState({
        cartitem: newCartItem,
        cartloading: false
      },() => {
        this.toggleMenuModal()
        this.addToSessionStorage()
      })
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

    var headers = {
      'Content-Type': 'application/json',
    }

    if (newCartItem.length > 0) {
     
      /*var url = apis.UPDATEcart;

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
        }); */

        this.setState({
          cartitem: newCartItem,
          cartloading: false
        },() => {
         // this.toggleMenuModal()
          this.addToSessionStorage()
        })
    }
    else {
      /*var url = apis.DELETEcart;

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
        }); */

        this.setState({
          cartitem: newCartItem,
          cartloading: false
        },() => {
            this.deleteSessionStorage()
        })
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
                      ? color.primary
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
                  ? color.primary
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
                fontWeight: 700,
                color: this.state.selectedMenu === menutitle[i] ? color.primaryLight : "black",
                fontSize: 20
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
                  this.state.selectedMenu === menutitle[i] ? color.primaryLight : "transparent"
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
          <b style={{ color: color.primary, fontSize: 19 }}>{activeMenu.title}</b>

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
              <div style={{marginLeft: 5, marginRight: 5, marginTop: 10}} className="row">
                  <Button
                    onClick={() => this.handleQuantityChange("minus", activeMenu.priceperunit)}
                    style={{
                      height: "100%",
                      fontWeight: "600",
                      fontSize: 14,
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      backgroundColor: color.secondary,
                      color: 'white'
                    }}
                  >
                    -
                  </Button>
              
                  <p style={{paddingLeft: 20, paddingRight: 20, marginTop: 5, color: color.secondary, fontSize: 18, fontWeight: '600'}}>
                    {this.state.selectedQuantity}
                  </p>
              
                  <Button
                    onClick={() => this.handleQuantityChange("add", activeMenu.priceperunit)}
                    style={{
                      height: "100%",
                      fontWeight: "600",
                      fontSize: 14,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      backgroundColor: color.secondary,
                      color: 'white'
                    }}
                  >
                    +
                  </Button>
               
              </div>
           
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

              <span> <b style={{fontSize: 19, fontWeight: '600'}}>€{Number(this.state.selectedPrice === 0 ? activeMenu.priceperunit : this.state.selectedPrice).toFixed(2)}</b></span>
 
            </Col>
          
            <Col style={{textAlign:'end',}} xs="6">
              <Button style={{fontSize: 17, padding: 10, backgroundColor: color.primary, color: 'white'}} onClick={() => this.state.updateCartItem ? this.updateCart() : this.addToCart()}>
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
        <Col key={i} xs="12" sm="12" md="12">
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
                {selectionitem[i].selectionitemtitle}
                <span style={{fontStyle: 'italic', fontWeight: 500, opacity: 0.5}} > (+€{Number(selectionitem[i].selectionitemprice).toFixed(2)})</span>
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
        <Col key={i} xs="12" sm="12" md="12">
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
                {selectionitem[i].selectionitemtitle}
                <span style={{fontStyle: 'italic', fontWeight: 500, opacity: 0.5}} > (+€{Number(selectionitem[i].selectionitemprice).toFixed(2)})</span>
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
          <td style={{  fontWeight: "500", cursor: 'pointer', fontSize: 16 }} onClick={() => this.cartItemClicked(cartitem[i].menuID, cartitem[i].quantity, cartitem[i].selection, cartitem[i].totalprice, cartitem[i].instruction)}>
            {cartitem[i].quantity}
          </td>
          <td style={{  textAlign: "start", cursor: 'pointer' }} onClick={() => this.cartItemClicked(cartitem[i].menuID, cartitem[i].quantity, cartitem[i].selection, cartitem[i].totalprice, cartitem[i].instruction)}>
            <Dotdotdot clamp={2}>
              <p
                style={{
                  marginBottom: 5,
                  fontWeight: "500",
                  color: color.primary,
                  overflow: "hidden",
                  fontSize: 16
                }}
              >
                {cartitem[i].title}
              </p>
            </Dotdotdot>
           
            {
              typeof cartitem[i].selection === 'undefined' ? null : 
              this.renderCartSelection(cartitem[i].selection)
            }
            {
              typeof cartitem[i].instruction === 'undefined' ? null : 
                this.renderInstruction(cartitem[i].instruction)
            }
          </td>

          <td style={{ width: "20%", textAlign: "start", cursor: 'pointer', fontWeight: '500', color: 'black', fontSize: 16 }} onClick={() => this.cartItemClicked(cartitem[i].menuID, cartitem[i].quantity, cartitem[i].selection, cartitem[i].totalprice, cartitem[i].instruction)}>
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
                borderColor: this.state.orderType === "delivery" ? color.primary : null
              }}
              onMouseOver=""
              onClick={() => this.selectOrderType("delivery")}
            >
              <CardBody style={{margin: 0, padding:10}}>
                <h6 style={{ marginTop: 5, textAlign: "center", color: this.state.orderType === "delivery" ? color.primary : null }}>
                  Delivery
                </h6>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                cursor: "pointer",
                borderColor: this.state.orderType === "pickup" ? color.primary : null
              }}
              onMouseOver=""
              onClick={() => this.selectOrderType("pickup")}
            >
              <CardBody style={{margin: 0, padding:10}}>
                <h6 style={{ marginTop: 5, textAlign: "center", color: this.state.orderType === "pickup" ? color.primary : null }}>
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
                  style={{ fontSize: 16, textAlign: "start", fontWeight: '500', color: 'black' }}
                >
                  Delivery Fee
                </td>
                <td style={{ fontSize: 16, textAlign: "end", fontWeight: '500', color: 'black' }}>
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
                style={{ fontSize: 18, fontWeight: "600", textAlign: "start" }}
              >
                TOTAL
              </td>
              <td style={{ fontSize: 18, fontWeight: "600", textAlign: "end" }}>
                €{this.calculateCartTotalPrice()}
              </td>
            </tr>
          </tbody>
        </Table>

        <Button
          style={{
            color: "white",
            background: `linear-gradient(to right, ${color.secondary}, ${color.secondaryLight})`,
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
            color: "black",
            fontWeight: 600,
            textAlign: "center",
            fontSize: 15,
            opacity: 0.8
          }}
        >
          Free delivery charge for orders above €{Number(this.state.restaurantInfo.minimumspend).toFixed(2)}
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
          src={img.shopping_cart}
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
            background: `linear-gradient(to right, ${color.secondary}, ${color.secondaryLight})`,
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
          Free delivery charge for orders above €{Number(this.state.restaurantInfo.minimumspend).toFixed(2)}
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
            backgroundColor: color.secondary,
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
            background: `linear-gradient(to right, ${color.primary}, ${color.primaryLight})`,
            textAlign: "center"
          }}
        >
          <Label style={{ fontWeight: "600", color: "white", fontSize: 17, marginTop: 5 }}>
            Cart Items
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
          {this.renderCategoryItems(menutab[i].menuitem, menutab[i].menutitle)}
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
          <Card className="card-1" onClick={() => this.menuItemClicked(i, categoryname)} style={{ cursor: "pointer" }}>
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
              <Col style={{ marginTop: 15, marginBottom: 10,}} xs={items[i].src ? "8" : "12"}>
                <div style={{paddingRight: 10}} class="row">
                  <Dotdotdot clamp={1}>
                    <p className="h5" style={{ cursor: "pointer", marginLeft: 15, color: color.primaryLight, overflow: "hidden" }}>
                      {items[i].title}
                    </p>
                  </Dotdotdot>
                </div>
             
                <div class="row">
                  {typeof items[i].markitem === 'undefined' ? null : this.renderMarkAsIcon(items[i].markitem)}
                </div>
                
                <div style={{ marginTop: 10 }}>
                  <Dotdotdot clamp={2}>
                    <p style={{ cursor: "pointer", overflow: "hidden" }}>
                      {items[i].descrip}
                    </p>
                  </Dotdotdot>
                </div>

                <div class="row" style={{ marginTop: 10, }}>
                  <Label
                    style={{
                      cursor: "pointer",
                      marginLeft: 15, 
                    }}
                    className="h5 float-left"
                  >
                    €{Number(items[i].priceperunit).toFixed(2)}
                  </Label>
                </div>

              </Col>

              {items[i].src ?
                <Col xs="4" style={{padding: 0,}}>
                  <div style={{ objectFit:'cover', width: 'auto', height: '100%', }}>
                    <img style={{ objectFit:'cover', width: '100%', height: '100%', }} src={items[i].src}/>
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

    return (
      <Layout title= {'Menu'}>
       <NextSeo
        config={{
          title: 'Menu | Restaurant'
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

              <Col style={{ marginTop: 30, marginBottom: 50 }} xs="12" md="12">
                {this.renderNavItem()}
                
              </Col>

              <Col style={{ marginTop: 20 }} xs="12" sm="12" md="7" lg="7">
                {this.state.loading ? this.renderLoadingItems() : this.renderMenu()}
              </Col>

              <Col style={{ marginTop: 20 }} xs="0" sm="0" md="5" lg="5">
                {this.state.cartloading ? this.renderCartLoadingItems() : this.renderCart()}
              </Col>

    
              
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

export default MenuDetail;
