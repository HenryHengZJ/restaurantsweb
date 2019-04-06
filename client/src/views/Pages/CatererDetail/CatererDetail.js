import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import StarRatingComponent from "react-star-rating-component";
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import Dotdotdot from "react-dotdotdot";
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';

const glutenfreeIcon = require('../../../assets/img/glutenfree1.png');
const hotIcon = require('../../../assets/img/fire.png');
const spicyIcon = require('../../../assets/img/pepper.png');
const vegeIcon = require('../../../assets/img/lettuce.png');
const healthyIcon = require('../../../assets/img/fruit.png');
const halalicon = require('../../../assets/img/halalsign.png');
const closeIcon = require('../../../assets/img/close.png');

class CatererDetail extends Component {
  constructor(props) {
    super(props);

    this.toggleMenuModal = this.toggleMenuModal.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleSpecialInstruction = this.handleSpecialInstruction.bind(this);

    this.state = {
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
      fetchedmenu: [
        {
          _id: '1',
          title: "Hot Dog",
          categoryname: "Appetizer",
          categorytag: "Appetizer",
          descrip:
            "Tomato sauce, oregano, mozzarella and fresh basil. Home made hot dog with extra cheese plus toppings such as garlic dips",
          dishtype: "single",
          serveperunit: 1,
          minimumquantity: 1,
          markitem: ["Hot", "Spicy"],
          priceperunit: 4.50,
          selection: [
            {
              selectioncategory: "Starter",
              selectionmaxnum: 2,
              selectionitem: [
                {
                  selectionitemtitle: "Pork Rib",
                  selectionitemprice: 2.00
                },
                {
                  selectionitemtitle: "Sring Roll",
                  selectionitemprice: 1.00
                },
                {
                  selectionitemtitle: "Fried Ball",
                  selectionitemprice: 1.00
                },
                {
                  selectionitemtitle: "Hot n Sour Soup",
                  selectionitemprice: 1.50
                }
              ]
            },
            {
              selectioncategory: "Bread",
              selectionmaxnum: 1,
              selectionitem: [
                {
                  selectionitemtitle: "Pita Bread",
                  selectionitemprice: 0.00
                },
                {
                  selectionitemtitle: "Tortilla Bread",
                  selectionitemprice: 0.00
                }
              ]
            }
          ],
        },
        {
          _id: '2',
          title: "Breakfast Prosciutto",
          categoryname: "Appetizer",
          categorytag: "Appetizer",
          descrip: "Tomato sauce, mozzarella, prosciutto",
          dishtype: "bulk",
          serveperunit: 6,
          minimumquantity: 1,
          markitem: ["Halal", "Healthy"],
          priceperunit: 28.00,
        },
        {
          _id: '3',
          title: "Meatball with Swedish Pork Rib",
          categoryname: "Appetizer",
          categorytag: "Appetizer",
          descrip: "Tomato sauce, mozzarella, prosciutto",
          dishtype: "bulk",
          serveperunit: 4,
          minimumquantity: 1,
          markitem: [],
          priceperunit: 15.00,
          selection: [],
        },
        {
          _id: '4',
          title: "Fried Rice Ball",
          categoryname: "Appetizer",
          categorytag: "Appetizer",
          descrip: "Golden fried rice ball with tomato sauce dip",
          dishtype: "bulk",
          serveperunit: 4,
          minimumquantity: 1,
          markitem: ["Vegetarian", "Hot"],
          priceperunit: 15.00,
          selection: [],
        },
        {
          _id: '5',
          title: "Tortilla Wrap",
          categoryname: "Morning wraps",
          categorytag: "Appetizer",
          descrip: "Tomato sauce, oregano, mozzarella and fresh basil",
          dishtype: "bulk",
          serveperunit: 4,
          minimumquantity: 2,
          markitem: ["Hot"],
          priceperunit: 12.00,
          selection: [],
        },
        {
          _id: '6',
          title: "Mexican Burrito",
          categoryname: "Morning wraps",
          categorytag: "Appetizer",
          descrip: "Tomato sauce, mozzarella, prosciutto",
          dishtype: "single",
          serveperunit: 1,
          minimumquantity: 4,
          markitem: ["Spicy", "Hot"],
          priceperunit: 5.00,
          selection: [],
        },
        {
          _id: '7',
          title: "Cheese Egg",
          categoryname: "Supa Breakfast",
          categorytag: "Breakfast",
          descrip:
            "Tomato sauce, oregano, mozzarella and fresh basil. Home made hot dog with extra cheese plus toppings such as garlic dips",
          dishtype: "bulk",
          serveperunit: 4,
          minimumquantity: 1,
          markitem: ["Hot", "Spicy"],
          priceperunit: 10.00,
          selection: [],
        },
        {
          _id: '8',
          title: "English Breakfast with Tea",
          categoryname: "Supa Breakfast",
          categorytag: "Breakfast",
          descrip: "Tomato sauce, mozzarella, prosciutto",
          dishtype: "bulk",
          serveperunit: 6,
          minimumquantity: 1,
          markitem: ["Hot", "Healthy"],
          priceperunit: 22.00,
          selection: [],
        }
      ],
      menu: [
        /*{
          menutitle: "Appetizer",
          menuitem: [
            {
              categoryname: "Appetizer",
              items: [
                {
                  title: "Hot Dog",
                  descrip:
                    "Tomato sauce, oregano, mozzarella and fresh basil. Home made hot dog with extra cheese plus toppings such as garlic dips",
                  dishtype: "single",
                  serveperunit: 1,
                  minimumquantity: 1,
                  markitem: ["Hot", "Spicy"],
                  priceperunit: 4.50,
                  selection: [
                    {
                      selectioncategory: "Starter",
                      selectionmaxnum: 2,
                      selectionitem: [
                        {
                          selectionitemtitle: "Pork Rib",
                          selectionitemprice: 2.00
                        },
                        {
                          selectionitemtitle: "Sring Roll",
                          selectionitemprice: 1.00
                        },
                        {
                          selectionitemtitle: "Fried Ball",
                          selectionitemprice: 1.00
                        },
                        {
                          selectionitemtitle: "Hot n Sour Soup",
                          selectionitemprice: 1.50
                        }
                      ]
                    },
                    {
                      selectioncategory: "Bread",
                      selectionmaxnum: 1,
                      selectionitem: [
                        {
                          selectionitemtitle: "Pita Bread",
                          selectionitemprice: 0.00
                        },
                        {
                          selectionitemtitle: "Tortilla Bread",
                          selectionitemprice: 0.00
                        }
                      ]
                    }
                  ],
                },
                {
                  title: "Breakfast Prosciutto",
                  descrip: "Tomato sauce, mozzarella, prosciutto",
                  dishtype: "bulk",
                  serveperunit: 6,
                  minimumquantity: 1,
                  markitem: ["Halal", "Healthy"],
                  priceperunit: 28.00,
                 
                },
                {
                  title: "Meatball with Swedish Pork Rib",
                  descrip: "Tomato sauce, mozzarella, prosciutto",
                  dishtype: "bulk",
                  serveperunit: 4,
                  minimumquantity: 1,
                  markitem: [],
                  priceperunit: 15.00,
                  selection: [],
                },
                {
                  title: "Fried Rice Ball",
                  descrip: "Golden fried rice ball with tomato sauce dip",
                  dishtype: "bulk",
                  serveperunit: 4,
                  minimumquantity: 1,
                  markitem: ["Vegetarian", "Hot"],
                  priceperunit: 15.00,
                  selection: [],
                }
              ]
            },
            {
              categoryname: "Morning Wraps",
              items: [
                {
                  title: "Tortilla Wraps",
                  descrip: "Tomato sauce, oregano, mozzarella and fresh basil",
                  dishtype: "bulk",
                  serveperunit: 4,
                  minimumquantity: 2,
                  markitem: ["Hot"],
                  priceperunit: 12.00,
                  selection: [],
                },
                {
                  title: "Mexican Bagel",
                  descrip: "Tomato sauce, mozzarella, prosciutto",
                  dishtype: "single",
                  serveperunit: 1,
                  minimumquantity: 4,
                  markitem: ["Spicy", "Hot"],
                  priceperunit: 5.00,
                  selection: [],
                }
              ]
            }
          ]
        },
        {
          menutitle: "Breakfast",
          menuitem: [
            {
              categoryname: "Supa Breakfast",
              items: [
                {
                  title: "Cheese Egg",
                  descrip:
                    "Tomato sauce, oregano, mozzarella and fresh basil. Home made hot dog with extra cheese plus toppings such as garlic dips",
                  dishtype: "bulk",
                  serveperunit: 4,
                  minimumquantity: 1,
                  markitem: ["Hot", "Spicy"],
                  priceperunit: 10.00,
                  selection: [],
                },
                {
                  title: "English Breakfast with Tea",
                  descrip: "Tomato sauce, mozzarella, prosciutto",
                  dishtype: "bulk",
                  serveperunit: 6,
                  minimumquantity: 1,
                  markitem: ["Hot", "Healthy"],
                  priceperunit: 22.00,
                  selection: [],
                }
              ]
            }
          ]
        }*/
      ],
      menutitle: [
        "All Menu",
        "Appetizer",
        "Breakfast",
        "Sandwiches",
        "Salads",
        "Catering",
        "Entrees",
        "Lunches",
        "Pizza",
        "Sides",
        "Desserts",
        "Beverages"
      ],
      cartitem: [
        /*{
          _id: '1',
          quantity: 1,
          title: "Pasta Bolognese with Cheese and Mushroom",
          instruction: 'More spicy please. Extra pepper and chili sauce',
          selection: [
            {
              selectioncategory: "Starter",
              selectionmaxnum: 2,
              selectionitem: [
                {
                  selectionitemtitle: "Pork Rib",
                  selectionitemprice: 2.00
                },
                {
                  selectionitemtitle: "Hot n Sour Soup",
                  selectionitemprice: 2.00
                },
               
              ]
            },
            {
              selectioncategory: "Bread",
              selectionmaxnum: 1,
              selectionitem: [
                {
                  selectionitemtitle: "Pita Bread",
                  selectionitemprice: 0.00
                }
              ]
            }
          ],
          serveperunit: 3,
          totalprice: 12.00
        },
        {
          _id: '2',
          quantity: 2,
          title: "Item",
          serveperunit: 1,
          totalprice: 15.00
        }*/
      ],
      quantity: [1,2,3,4,5,6,7,8,9,10,11,12,13]
    };
  }

  componentDidMount() {
    this.restructureMenu();
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

    console.log(JSON.stringify(finalresult));

    this.setState({
      menu: finalresult
    });
  }

  signIn(e) {
    e.preventDefault();
    this.props.history.push("/login");
  }

  navItemClicked = selectedMenu => {
    this.setState({
      selectedMenu: selectedMenu,
      menuDropDownOpen: false
    });
  };

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
    this.props.history.push('deliveryconfirmation')
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

  cartItemDelete = index => {
    var newcart = this.state.cartitem;
    newcart.splice(index, 1);
    this.setState({
      cartitem: newcart
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
    const {cartitem} = this.state
    var cartTotalPrice = 0;

    for (let i = 0; i < cartitem.length; i++) { 
      cartTotalPrice =  cartTotalPrice + cartitem[i].totalprice;
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

  addToCart = () => {
    const {selectedPrice, selectedSelection, selectedQuantity, activeMenu, specialInstruction} = this.state;
 
    var addToCartItem = {
      _id: activeMenu._id,
      quantity: selectedQuantity,
      title: activeMenu.title,
      serveperunit: activeMenu.serveperunit,
      totalprice: selectedPrice === 0 ? activeMenu.priceperunit : selectedPrice,
    }

    if (specialInstruction !== '') {
      addToCartItem.instruction = specialInstruction
    }

    if (selectedSelection.length !== 0) {
      addToCartItem.selection = selectedSelection
    }

    var newCartItem = this.state.cartitem;
    newCartItem.push(addToCartItem);

    this.setState({
      cartitem: newCartItem
    },() => {
      this.toggleMenuModal()
    })
  }

  updateCart = () => {
    const {selectedPrice, selectedSelection, selectedQuantity, activeMenu, specialInstruction} = this.state;

    var index = this.state.cartitem.findIndex(x => x._id==activeMenu._id);

    var updateCartItem = {
      _id: activeMenu._id,
      quantity: selectedQuantity,
      title: activeMenu.title,
      serveperunit: activeMenu.serveperunit,
      totalprice: selectedPrice === 0 ? activeMenu.priceperunit : selectedPrice,
    }

    if (specialInstruction !== '') {
      updateCartItem.instruction = specialInstruction
    }

    if (selectedSelection.length !== 0) {
      updateCartItem.selection = selectedSelection
    }

    var newCartItem = this.state.cartitem;
    newCartItem.splice(index, 1, updateCartItem)

    this.setState({
      cartitem: newCartItem
    },() => {
      this.toggleMenuModal()
    })
  }

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

 
  renderNavItem(menutitle) {
    return (
      <NavItem>
        <NavLink
          onClick={() => this.navItemClicked(menutitle)}
          style={{
            paddingRight: 20,
            paddingLeft: menutitle === "All Menu" ? 0 : 20,
            fontWeight: "600",
            color: this.state.selectedMenu === menutitle ? "#20a8d8" : "black",
            fontSize: 15
          }}
          href="#"
        >
          {" "}
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

          <p style={{ fontWeight: '700', marginTop:10, fontSize: 14, opacity: 0.8}}>Serves: <b style={{color: 'green'}}>{activeMenu.serveperunit}</b> | Minimum order: <b style={{color: 'darkorange'}}>{activeMenu.minimumquantity}</b></p>

          <div style={{ marginTop: 10 }}>
            <span>
              {activeMenu.descrip}
            </span>
          </div>

          {typeof activeMenu.markitem === 'undefined' || activeMenu.markitem.length === 0 ? null : this.renderIcon(activeMenu.markitem)} 

          <div style={{ marginTop: 20 }}>
            <FormGroup>
              <Label>Select Quantity</Label>
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
              <span> <b style={{fontSize: 19, fontWeight: '600'}}>€{Number(this.state.selectedPrice === 0 ? activeMenu.priceperunit : this.state.selectedPrice).toFixed(2)}</b> <Label style={{fontStyle: 'italic'}}>(€{this.calculatePricePerPerson(this.state.selectedPrice === 0 ? activeMenu.priceperunit : this.state.selectedPrice, activeMenu.serveperunit)} / person)</Label></span>
              :
              <span> <b style={{fontSize: 19, fontWeight: '600'}}>€{Number(this.state.selectedPrice === 0 ? activeMenu.priceperunit : this.state.selectedPrice).toFixed(2)}</b> <Label style={{fontStyle: 'italic'}}>/ person</Label></span>
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
        <Card>
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
        <Col xs="12" sm="6" md="6">
          {selectionitem[i].selectionitemprice === 0 ? 
          (
            <FormGroup style={{ paddingLeft: 0, marginTop: 10 }}check className="checkbox">
              <Radio
                checked={this.findSelectionIndex(selectioncategory, selectionitem[i].selectionitemtitle)}
                onChange={(e) => this.handleRadioBoxChange(e, selectioncategory, selectionitem[i].selectionitemtitle, selectionitem[i].selectionitemprice, priceperunit)}
                value={selectionitem[i].selectionitemtitle}
                name={selectionitem[i].selectionitemtitle}
                style={{padding:0, marginRight: 10}}
              />
              <Label check className="form-check-label">
                {selectionitem[i].selectionitemtitle}
              </Label>
            </FormGroup>
          ) 
          : 
          (
            <FormGroup style={{ paddingLeft: 0, marginTop: 10 }}check className="checkbox">
              <Radio
                checked={this.findSelectionIndex(selectioncategory, selectionitem[i].selectionitemtitle)}
                onChange={(e) => this.handleRadioBoxChange(e, selectioncategory, selectionitem[i].selectionitemtitle, selectionitem[i].selectionitemprice, priceperunit)}
                value={selectionitem[i].selectionitemtitle}
                name={selectionitem[i].selectionitemtitle}
                style={{padding:0, marginRight: 10}}
              />
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
        <Col xs="12" sm="6" md="6">
          {selectionitem[i].selectionitemprice === 0 ? 
          (
            <FormGroup style={{ paddingLeft: 0, marginTop: 10 }}check className="checkbox">
              <Checkbox
                checked={this.findSelectionIndex(selectioncategory, selectionitem[i].selectionitemtitle)}
                onChange={(e) => this.handleCheckBoxChange(e, selectioncategory, selectionmaxnum, selectionitem[i].selectionitemtitle, selectionitem[i].selectionitemprice, priceperunit)}
                value={selectionitem[i].selectionitemtitle}
                style={{padding:0, marginRight: 10}}
              />
              <Label check className="form-check-label">
                {selectionitem[i].selectionitemtitle}
              </Label>
            </FormGroup>
          ) 
          : 
          (
            <FormGroup style={{ paddingLeft: 0, marginTop: 10 }}check className="checkbox">
              <Checkbox
                checked={this.findSelectionIndex(selectioncategory, selectionitem[i].selectionitemtitle)}
                onChange={(e) => this.handleCheckBoxChange(e, selectioncategory, selectionmaxnum, selectionitem[i].selectionitemtitle, selectionitem[i].selectionitemprice, priceperunit)}
                value={selectionitem[i].selectionitemtitle}
                style={{padding:0, marginRight: 10}}
              />
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
        <p style={{textSize: 13, opacity: 0.7, margin: 0 }}>
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
        <p style={{ textSize: 13, opacity: 0.7, margin: 0 }}>
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
        <tr style={{cursor: 'pointer',}} onClick={() => this.cartItemClicked(cartitem[i]._id, cartitem[i].quantity, cartitem[i].selection, cartitem[i].totalprice, cartitem[i].instruction)}>
          <td style={{  fontWeight: "500" }}>
            {cartitem[i].quantity}
          </td>
          <td style={{  textAlign: "start" }}>
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

          <td style={{ width: "20%", textAlign: "start" }}>
            €{Number(cartitem[i].totalprice).toFixed(2)}
          </td>
          <td
            style={{
              padding: 0,
              paddingTop: 10,
              textAlign: "start"
            }}
          >
            <img
              style={{
                cursor: "pointer",
                height: 15,
                width: 15,
                objectFit: "cover"
              }}
              onClick={() => this.cartItemDelete(i)}
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

        <div>
        <Label
          style={{
            marginTop: 20,
            color: "gray",
            textAlign: "center",
            fontSize: 15
          }}
        >
          Minimum Order Value: €50.00
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
          Minimum Order Value: €50.00
        </Label>
        </div>
      </CardBody>
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
      menuarray.push(
        <Col xs="12">
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

    return <Row>{menuarray}</Row>;
  }

  renderCategory(menuitem) {
    var categoryarray = [];

    var categorytab = menuitem;

    for (let i = 0; i < categorytab.length; i++) {
      categoryarray.push(
        <Col xs="12">
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
        <Col xs="12" sm="12" md="12" lg="6">
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
                        maxWidth: 180,
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

  renderIcon(markitem) {
    var iconarray = [];
    for (let i = 0; i < markitem.length; i++) {
      iconarray.push(
        <span style={{opacity: 0.8}}>
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

  render() {
    const menutitlelength = this.state.menutitle.length;

    return (
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
                src={
                  "http://www.fedracongressi.com/fedra/wp-content/uploads/2016/09/minisandwich.jpg"
                }
              />

              <Col xs="0" sm="1" md="3" lg="3" />

              <Col xs="12" sm="10" md="6" lg="6">
                <Card
                  style={{ textAlign: "center", marginTop: -250 }}
                >
                  <CardBody>
                    <img
                      style={{ objectFit: "cover", width: 80, height: 80 }}
                      src={
                        "https://www.psdgraphics.com/wp-content/uploads/2016/08/restaurant-logo.png"
                      }
                    />
                    <Label style={{ marginLeft: 10 }} className="h4">
                      Flannery Restaurant & Pub
                    </Label>

                    <Row className="justify-content-center">
                      <StarRatingComponent
                        name="rate1"
                        emptyStarColor="#D3D3D3"
                        starCount={5}
                        editing={false}
                        value={4.7}
                      />
                      <b style={{ marginLeft: 5, color: "darkorange" }}>4.7</b>
                      <Label style={{ fontWeight: '500', marginLeft: 5, color: "darkorange" }}>
                        (150) Reviews
                      </Label>
                    </Row>

                    <Label style={{ marginTop: 10 }} className="h6">
                      30, O'Connell St, Dublin, Ireland
                    </Label>

                  </CardBody>
                </Card>
              </Col>

              <Col xs="0" sm="1" md="3" lg="3" />

              <Col style={{ marginTop: 30, marginBottom: 20 }} xs="12" md="12">
                <Nav className="float-left" pills>
                  {this.renderNavItem(this.state.menutitle[0])}
                  {this.renderNavItem(this.state.menutitle[1])}
                  {this.renderNavItem(this.state.menutitle[2])}
                  {this.renderNavItem(this.state.menutitle[3])}
                  {this.renderNavItem(this.state.menutitle[4])}
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
                              .slice(5, menutitlelength)
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
                          .slice(5, menutitlelength)
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
                          .slice(5, menutitlelength)
                          .includes(this.state.selectedMenu)
                          ? "#20a8d8"
                          : "transparent"
                      }}
                    />
                  </NavItem>
                </Nav>
              </Col>

              <Col style={{ marginTop: 20 }} xs="12" sm="12" md="7" lg="7">
                {this.renderMenu()}
              </Col>

              <Col style={{ marginTop: 20 }} xs="0" sm="0" md="5" lg="5">
                {this.renderCart()}
              </Col>
            </Row>

            {this.state.menuModalOpen ? this.renderMenuModal() : null}
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default CatererDetail;
