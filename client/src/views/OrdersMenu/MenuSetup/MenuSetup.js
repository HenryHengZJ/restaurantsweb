import React, { Component } from 'react';
import {Badge, Form, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Collapse, FormGroup, FormText, FormFeedback,
  CardBody, Card, CardHeader, Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Input, InputGroup, InputGroupAddon, 
  InputGroupText} from 'reactstrap';
import classnames from 'classnames';
import './MenuSetup.css'
import Dotdotdot from "react-dotdotdot";
import Checkbox from '@material-ui/core/Checkbox';
import CurrencyInput from 'react-currency-input';

const glutenfreeIcon = require('../../../assets/img/glutenfree1.png');
const hotIcon = require('../../../assets/img/fire.png');
const spicyIcon = require('../../../assets/img/pepper.png');
const vegeIcon = require('../../../assets/img/lettuce.png');
const healthyIcon = require('../../../assets/img/fruit.png');
const halalicon = require('../../../assets/img/halalsign.png');
const closeIcon = require('../../../assets/img/close.png');

class MenuSetup extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleNewCategoryModal = this.toggleNewCategoryModal.bind(this);
    this.toggleNewItemModal = this.toggleNewItemModal.bind(this);
    this.handleCategoryNameChange = this.handleCategoryNameChange.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this); 
    this.addNewItem = this.addNewItem.bind(this);
    this.handleSelectionTitleChange = this.handleSelectionTitleChange.bind(this);
    this.handleSelectionDescripChange = this.handleSelectionDescripChange.bind(this);
    this.handleSelectionPriceChange = this.handleSelectionPriceChange.bind(this);
    this.handleSelectionMinQuantityChange = this.handleSelectionMinQuantityChange.bind(this);
    this.handleSelectionServeChange = this.handleSelectionServeChange.bind(this);
    this.handleSelectionCategoryChange = this.handleSelectionCategoryChange.bind(this);
    this.handleSelectionMaxNumChange = this.handleSelectionMaxNumChange.bind(this);
    this.handleSelectionItemTitleChange = this.handleSelectionItemTitleChange.bind(this);
    this.handleSelectionItemPriceChange = this.handleSelectionItemPriceChange.bind(this);

    this.state = {
      activeTab: 'Appetizer',
      menutitle: [
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
      markitem: ['Hot', 'Spicy', 'Halal', 'Gluten Free', 'Vegetarian', 'Healthy'],
      servecount: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,30,40,50,60,70,80,90,100],
      totalTabs: ['appetizer', 'breakfast', 'sandwiches', 'salads', 'catering', 'entrees', 'lunches', 'sides', 'desserts', 'beverages'],
      breakfast: [
        {
          categoryname: 'Breakfast',
          items: [
            {
              title: 'Irish Breakfast',
              descrip: 'Tomato sauce, oregano, mozzarella and fresh basil',
              serve: '1',
              markas: ['Hot'],
              price: '€9.00'
            },
          ]
        }
      ],
      sandwiches: [
        {
          categoryname: 'Sandwiches',
          items: []
        }
      ],
      salads: [
        {
          categoryname: 'Salads',
          items: []
        }
      ],
      catering: [
        {
          categoryname: 'Catering',
          items: []
        }
      ],
      entrees: [
        {
          categoryname: 'Entrees',
          items: []
        }
      ],
      lunches: [
        {
          categoryname: 'Lunches',
          items: []
        }
      ],
      sides: [
        {
          categoryname: 'Sides',
          items: []
        }
      ],
      desserts: [
        {
          categoryname: 'Desserts',
          items: []
        }
      ],
      beverages: [
        {
          categoryname: 'Beverages',
          items: []
        }
      ],
      selectionitems: [],
      items: [
        {
          title: "Chicken Masala",
          descrip: "Tomato sauce, oregano, mozzarella and fresh basil",
          dishtype: "single",
          minimumquantity: 10,
          serveperunit: 1,
          priceperunit: 8.00,
          markitem: ['Hot', 'Spicy'],
          selection: 
          [
            {
              selectioncategory: 'Starter',
              selectionmaxnum: 2,
              selectionitem: 
              [
                {
                  selectionitemtitle: 'Pork Rib',
                  selectionitemprice: 2.00
                },
                {
                  selectionitemtitle: 'Sring Roll',
                  selectionitemprice: 1.00
                },
                {
                  selectionitemtitle: 'Chicken wings',
                  selectionitemprice: 2.00
                },
                {
                  selectionitemtitle: 'Hot & Sour Soup',
                  selectionitemprice: 0
                }
              ]
            },
            {
              selectioncategory: 'Sauce',
              selectionmaxnum: 1,
              selectionitem: 
              [
                {
                  selectionitemtitle: 'Chili',
                  selectionitemprice: 1.00
                },
                {
                  selectionitemtitle: 'Curry',
                  selectionitemprice: 1.50
                },
                {
                  selectionitemtitle: 'Garlic Dip',
                  selectionitemprice: 1.00
                }
              ]
            }
          ]
        },
      ],
      appetizer: [
        {
          categoryname: 'LALA',
          items: [
            {
              title: 'Hot Dog',
              descrip: 'Tomato sauce, oregano, mozzarella and fresh basil',
              serve: 4,
              minquantity: 5,
              markas: ['Hot', 'Spicy'],
              price: '€3.00'
            },
            {
              title: 'Pizza Prosciutto',
              descrip: 'Tomato sauce, mozzarella, prosciutto',
              serve: 6,
              minquantity: 1,
              markas: ['Halal', 'Healthy'],
              price: '€11.00'
            },
            {
              title: 'Pizza Prosciutto',
              descrip: 'Tomato sauce, mozzarella, prosciutto',
              serve: 6,
              minquantity: 1,
              markas: ['Vegetarian', 'Hot'],
              price: '€11.00'
            },
          ],
        },
        {
          categoryname: 'App',
          items: [
            {
              title: 'Hot Dog',
              descrip: 'Tomato sauce, oregano, mozzarella and fresh basil',
              serve: 4,
              minquantity: 5,
              markas: ['Hot'],
              price: '€3.00'
            },
            {
              title: 'Pizza Prosciutto',
              descrip: 'Tomato sauce, mozzarella, prosciutto',
              serve: 6,
              minquantity: 1,
              markas: ['Spicy', 'Hot'],
              price: '€11.00'
            },
            {
              title: 'Pizza Prosciutto',
              descrip: 'Tomato sauce, mozzarella, prosciutto',
              serve: 6,
              minquantity: 1,
              markas: [],
              price: '€11.00'
            },
          ],
        },
        {
          categoryname: 'Appetizer',
          items: [
            {
              title: 'Pizza Margherita',
              descrip: 'Tomato sauce, oregano, mozzarella and fresh basil. Tomato sauce, mozzarella, prosciutto',
              serve: 4,
              minquantity: 2,
              markas: [],
              price: '€7.00'
            },
            {
              title: 'Pizza Prosciutto',
              descrip: 'Tomato sauce, mozzarella, prosciutto',
              serve: 6,
              minquantity: 1,
              markas: ['Vegetarian', 'Hot'],
              price: '€11.00'
            },
          ],
        },
        {
          categoryname: 'Fruity Combo',
          items: [
            {
              title: 'Hot Dog Combo Wombo',
              descrip: 'Tomato sauce, oregano, mozzarella and fresh basil',
              serve: 3,
              minquantity: 3,
              markas: ['Vegetarian', 'Hot', 'Spicy', 'Halal'],
              price: '€12.00'
            },
            {
              title: 'Pizza Prosciutto',
              descrip: 'Tomato sauce, mozzarella, prosciutto',
              serve: 6,
              minquantity: 5,
              markas: [],
              price: '€11.00'
            },
          ],
        },
      ],
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
      menuModalOpen: false,
      categoryModal: false,
      menuModalOpen: false,
      selectionModal: false,
      isNewItemButtonActive: false,
      updateItem: false,
      newCategoryName: '',
      selectedDishType: '',
      selectedItemTitle: '',
      selectedItemDescrip: '',
      selectedItemPrice: 0,
      selectedItemServe: 1,
      selectedItemMinimumQuantity: 1,
      selectedItemSelection: [],
      selectedMarkItemAs: [],
      selectedItemSelectionInnerItems: null,
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
  
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  //Toggle Modal///////////////////////////////////////////////////////////////////////

  toggleNewCategoryModal() {
    this.setState({
      categoryModal: !this.state.categoryModal,
      newCategoryName: ''
    });
  }

  toggleNewItemModal() {
    this.setState({
      menuModalOpen: !this.state.menuModalOpen,
      updateItem: false,
      selectedDishType: '',
      selectedItemTitle: '',
      selectedItemDescrip: '',
      selectedItemPrice: 0,
      selectedItemServe: 1,
      selectedItemMinimumQuantity: 1,
      selectedItemSelection: [],
      selectedMarkItemAs: [],
    });
  }

  editSelection = ( categoryname, maxnum, items) => {
    var selectionitem_new = []
    for (let i = 0; i < items.length; i ++) {
      selectionitem_new.push(items[i])
    }
    
    var inneritems = {
      selectioncategory: categoryname,
      selectionmaxnum: maxnum,
      selectionitem: selectionitem_new
    }

    this.setState({
      selectionModal: !this.state.selectionModal,
      selectedItemSelectionInnerItems: inneritems
    })
  }

  toggleNewSelectionModal = () => {
    this.setState({
      selectionModal: !this.state.selectionModal,
      selectedItemSelectionInnerItems: null,
    });
  }

  //Button Click Event///////////////////////////////////////////////////////////////////////

  navItemClicked = activeTab => {
    this.setState({
      activeTab: activeTab,
    });
  };

  menuItemClicked = (_id) => {
    var itemindex = this.state.fetchedmenu.findIndex(x => x._id==_id);
    if (itemindex >= 0) {
      this.setState({
        menuModalOpen: !this.state.menuModalOpen,
        updateItem: true,
        selectedDishType: this.state.fetchedmenu[itemindex].dishtype,
        selectedItemTitle: this.state.fetchedmenu[itemindex].title,
        selectedItemDescrip: this.state.fetchedmenu[itemindex].descrip,
        selectedItemPrice: this.state.fetchedmenu[itemindex].priceperunit,
        selectedItemServe: this.state.fetchedmenu[itemindex].serveperunit,
        selectedItemMinimumQuantity: this.state.fetchedmenu[itemindex].minimumquantity,
        selectedItemSelection: typeof this.state.fetchedmenu[itemindex].selection == 'undefined' ? [] : this.state.fetchedmenu[itemindex].selection,
        selectedMarkItemAs: typeof this.state.fetchedmenu[itemindex].markitem == 'undefined' ? [] : this.state.fetchedmenu[itemindex].markitem,
      });
    }
  };

  addNewCategory() {
    var menuarray = this.state.menu;
    var menuindex = menuarray.findIndex(x => x.menutitle==this.state.activeTab);
  
    var addItem = {
      categoryname: this.state.newCategoryName,
      items: [],
    }

    if (menuindex >= 0) {
      menuarray[menuindex].menuitem.unshift(addItem)
    }
    else {
      var addMenu = {
        menutitle: this.state.activeTab,
        menuitem: [ addItem ]
      }
      menuarray.unshift(addMenu)
    }

    this.setState({
      menu: menuarray,
      categoryModal: !this.state.categoryModal,
    })
  }

  addNewItem() {
    alert('add new')
  }

  selectDishType = (selectedDishType) => {
    this.setState({
      selectedDishType: selectedDishType,
    })
  }

  addNewSelectionItem = (selectioncategory, selectionmaxnum) => {
    var inneritems = this.state.selectedItemSelectionInnerItems
    var newitem = {
      selectionitemtitle: '',
      selectionitemprice: 0
    }
    var newSelectionItem= {
      selectioncategory: selectioncategory,
      selectionmaxnum: selectionmaxnum,
      selectionitem: [newitem]
    }
    if (inneritems !== null) {
      inneritems.selectionitem.push(newitem)
    }
    else if (inneritems === null) {
      inneritems = newSelectionItem
    }
    
    this.setState({
      selectedItemSelectionInnerItems: inneritems,
    })
  }


  //Other functions///////////////////////////////////////////////////////////////////////

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
 
  checkAllInput = () => {
    const {selectedDishType, selectedItemTitle, selectedItemDescrip, selectedItemPrice, selectedItemServe, selectedItemMinimumQuantity, selectedItemSelection, selectedMarkItemAs} = this.state
    if (selectedItemTitle != "" && selectedItemDescrip != "") {
      //Activate Next Button
      this.setState({ 
        isNewItemButtonActive: true, 
      });
    }
    else {
      this.setState({ 
        isNewItemButtonActive: false, 
      });
    }
  }

  //Handle Input Chaneg//////////////////////////////////////////////////////////////////////

  handleCheckBoxChange = (e, markeditem) => {

    var selectedMarkItemAs = this.state.selectedMarkItemAs
    var index = selectedMarkItemAs.findIndex(x => x==markeditem);
    
    //If selectioncategory exist
    if (index >=0) {
      selectedMarkItemAs.splice(index, 1)
    }
    //If selectioncategory not exist
    else {
      selectedMarkItemAs.push(markeditem)
    }

    this.setState({ 
      selectedMarkItemAs: selectedMarkItemAs, 
    })
  }

  handleCategoryNameChange(e) {
    this.setState({ newCategoryName: e.target.value });
  }

  handleSelectionTitleChange(e) {
    this.setState({ 
      selectedItemTitle: e.target.value,
    },() => {
      this.checkAllInput()
    })
  }

  handleSelectionDescripChange(e) {
    this.setState({ 
      selectedItemDescrip: e.target.value,
    },() => {
      this.checkAllInput()
    })
  }

  handleSelectionPriceChange(e, value) {
    
    this.setState({ 
      selectedItemPrice: Number(value).toFixed(2),
    },() => {
      this.checkAllInput()
    })
  }

  handleSelectionMinQuantityChange(e) {
    this.setState({ 
      selectedItemMinimumQuantity: e.target.value,
    },() => {
      this.checkAllInput()
    })
  }

  handleSelectionServeChange(e) {
    this.setState({ 
      selectedItemServe: e.target.value,
    },() => {
      this.checkAllInput()
    })
  }

  handleSelectionCategoryChange(e) {
    var inneritems = this.state.selectedItemSelectionInnerItems
    var newSelectionItem= {
      selectioncategory: e.target.value,
      selectionmaxnum: 1,
      selectionitem: []
    }
    if (inneritems === null) {
      inneritems = newSelectionItem
    }
    else {
      inneritems.selectioncategory = e.target.value
    }
    this.setState({ 
      selectedItemSelectionInnerItems: inneritems,
    })
  }

  handleSelectionMaxNumChange(e) {
    var inneritems = this.state.selectedItemSelectionInnerItems
    var newSelectionItem= {
      selectioncategory: '',
      selectionmaxnum: e.target.value,
      selectionitem: []
    }
    if (inneritems === null) {
      inneritems = newSelectionItem;
    }
    else {
      inneritems.selectionmaxnum = e.target.value
    }
    this.setState({ 
      selectedItemSelectionInnerItems: inneritems,
    })
  }

  handleSelectionItemTitleChange(e, index) {
    var inneritems = this.state.selectedItemSelectionInnerItems;
    var innerselectionitems = {
      selectionitemtitle: e.target.value,
      selectionitemprice: 0
    }
    var newSelectionItem= {
      selectioncategory: '',
      selectionmaxnum: 1,
      selectionitem: [innerselectionitems]
    } 

    if (inneritems === null) {
      inneritems = newSelectionItem;
    }
    else {
      inneritems.selectionitem[index].selectionitemtitle = e.target.value 
    }
    this.setState({ 
      selectedItemSelectionInnerItems: inneritems,
    })
  }

  handleSelectionItemPriceChange(e, value, index) {
    var inneritems = this.state.selectedItemSelectionInnerItems
    var innerselectionitems = {
      selectionitemtitle: '',
      selectionitemprice: value
    }
    var newSelectionItem= {
      selectioncategory: '',
      selectionmaxnum: 1,
      selectionitem: [innerselectionitems]
    } 

    if (inneritems === null) {
      inneritems = newSelectionItem;
    }
    else {
      inneritems.selectionitem[index].selectionitemprice = value
    }
    this.setState({ 
      selectedItemSelectionInnerItems: inneritems,
    })
  }

  //Render functions///////////////////////////////////////////////////////////////////////

  renderNavItem(menutitle) {
    return (
      <NavItem>
        <NavLink
          onClick={() => this.navItemClicked(menutitle)}
          style={{
            paddingRight: 20,
            paddingLeft: 20,
            fontWeight: "600",
            color: this.state.activeTab === menutitle ? "#20a8d8" : "black",
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
              this.state.activeTab === menutitle ? "#20a8d8" : "transparent"
          }}
        />
      </NavItem>
    );
  }
  
  renderNav() {
    var totaltabsarray = [];
    for (let i = 0; i < this.state.menutitle.length; i++) {
      totaltabsarray.push(
        this.renderNavItem(this.state.menutitle[i])
      )
    }
    return <Nav  style={{padding:20}}  className="float-left" pills>{totaltabsarray}</Nav>;
  }

  renderTabPane() {

    var tabarray = [];

    var menutitle = this.state.menutitle

    for(let i = 0; i < menutitle.length; i++){
      tabarray.push(
        <TabPane tabId={menutitle[i]}>
          <Row>
            <Col style={{marginTop:0, marginBottom: 30}} xs="12">
              <Button style={{fontSize: 17, fontWeight: '600'}} onClick={this.toggleNewCategoryModal} color="primary" className="btn-pill">  <i className="fa fa-plus fa-1x" aria-hidden="true"/>&nbsp; Add New Category</Button>
            </Col>
            <Col xs="12">
            {this.renderMenu(menutitle[i])}
            </Col>
          </Row>
        </TabPane>
      )
    } 

    return(
      <TabContent style={{borderWidth: 0, paddingLeft: 20, paddingRight: 20, paddingTop: 0}} activeTab={this.state.activeTab} >
        {tabarray}
      </TabContent >
    )
  }

  renderMenu(menutitle) {
    var menuindex = this.state.menu.findIndex(x => x.menutitle == menutitle);
    var selectedmenutab;
    var categoryarray = [];
    if (menuindex >= 0) {
      selectedmenutab = this.state.menu[menuindex].menuitem;
      for (let i = 0; i < selectedmenutab.length; i++) {
        categoryarray.push(
          <Col xs="12">
            {this.renderCategoryItems(
              selectedmenutab[i].items,
              selectedmenutab[i].categoryname, 
            )}
          </Col>
        );
      }
    }
    else {
      for (let i = 0; i < 1; i++) {
        categoryarray.push(
          <Col style={{padding: 0}} xs="12">
            <Label style={{marginBottom: 10, marginRight:5, marginLeft:15}} className="h5">{menutitle}</Label>
            <a
              style={{marginTop: -5, cursor: 'pointer', opacity: 0.6}} 
              className="card-header-action"
              onClick={() => alert('Edit Category Name: ' + menutitle)}
            >
              <i className="fa fa-pencil" />
            </a>
            {this.renderEmptyItem()}
          </Col>
        );
      }
    }
    return <Row>{categoryarray}</Row>;
  }

  renderCategoryItems(items, categoryname) {

    var itemsarray = [];

    for(let i = 0; i < items.length; i++){
      itemsarray.push(
        <Col xs="12" sm="6" md="6" lg="4">
          <Card  onClick={() => this.menuItemClicked(items[i]._id)} style={{ cursor: "pointer" }}>
            <CardHeader style={{padding: 0, margin: 0, borderWidth: 0, backgroundColor: 'white', marginRight: 10}}  >
            <div className="card-header-actions">
              <a
                style={{cursor: 'pointer', opacity: 0.6}} 
                className="card-header-action btn btn-close"
                onClick={() => alert('Remove Item')}
              >
                <i className="fa fa-times-thin fa-2x" aria-hidden="true"/>
              </a>
            </div>
            </CardHeader>
            <CardBody style={{cursor: 'pointer', marginTop: 0, marginBottom: 10, padding: 0, height: "100%"}}>
              <Col>
                <div class="row">
                  <div>
                    <Dotdotdot clamp={1}>
                      <h5 style={{ textAlign: "start", marginLeft: 15, marginRight:15,color: '#20a8d8', cursor: "pointer", overflow: "hidden" }}>
                        {items[i].title}
                      </h5>
                    </Dotdotdot>
                  </div>
                  <Col style={{paddingRight: 20,}}>
                    <Label
                      style={{
                        cursor: "pointer",
                        textAlign: "end",
                      }}
                      className="h5 float-right"
                    >
                      €{Number(items[i].priceperunit).toFixed(2)}
                    </Label>
                  </Col>
                </div>
                <div class="row">
                  <Label style={{ opacity: 0.7, cursor: 'pointer', marginLeft: 15, fontfStyle: 'italic',}}> Serves {items[i].serveperunit}</Label>
                  {items[i].minquantity > 1 ? 
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
      )
    }

    return(
      <Row >
        <Col xs="12">
          <Label style={{marginBottom: 10, marginRight:5,}} className="h5">{categoryname}</Label>
          <a
            style={{marginTop: -5, cursor: 'pointer', opacity: 0.6}} 
            className="card-header-action"
            onClick={() => alert('Edit Category Name: ' + categoryname)}
          >
            <i className="fa fa-pencil" />
          </a>
        </Col>
       
        {itemsarray}

         {this.renderEmptyItem()}
      </Row>
    )
  }

  renderMarkAsIcon(markas) {
    var iconarray = [];
    for (let i = 0; i < markas.length; i++) {
      iconarray.push(
        <img
          style={{
            marginLeft: 5, marginBottom: 5,
            height: 20,
            width: 20,
            objectFit: "cover"
          }}
          src={this.findIcon(markas[i])}
          alt=""
        />
      )
    }
    return(
      <Col style={{
        textAlign: 'right',flex: 1}}>
      {iconarray}
      </Col>
    )
  }

  renderEmptyItem() {
    return(
      <Col xs="12" sm="6" md="6" lg="4">
        <Card style={{cursor: 'pointer', borderStyle: 'dashed', borderWidth: 2}} onMouseOver="" onClick={this.toggleNewItemModal}>
          <CardBody style={{marginTop: 20, marginBottom: 10, padding: 0, height: 130}}>
            <div class="col" style={{textAlign: 'center'}}>
              <i style={{color: '#c8ced3', marginTop: 20}} className="fa icon-plus fa-3x text-center"></i>
              <p style={{marginTop: 20}} >Add New Item</p>
            </div>
          </CardBody>
        </Card>
      </Col>
    )
  }

  renderForm() {
    var selectedItemTitle = this.state.selectedItemTitle
    var selectedItemDescrip = this.state.selectedItemDescrip
    var selectedItemPrice = this.state.selectedItemPrice
    var selectedItemServe = this.state.selectedItemServe
    var selectedItemMinimumQuantity = this.state.selectedItemMinimumQuantity
    var selectedItemSelection = this.state.selectedItemSelection
    var selectedMarkItemAs = this.state.selectedMarkItemAs
    var selectedDishType = this.state.selectedDishType
    return (
      <Collapse isOpen={selectedDishType == "" ? false : true}>
        <Form action="" method="post" className="form-horizontal">
          <FormGroup row>
            <Col md="3">
              <h6>Title</h6>
            </Col>
            <Col xs="12" md="9">
              <Input onChange={(e) => this.handleSelectionTitleChange(e)} value={selectedItemTitle} style={{color: 'black'}} type="text" placeholder="Title of the the dish" />
              <FormText className="help-block">
                Please enter title of your dish
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <h6>Description</h6>
            </Col>
            <Col xs="12" md="9">
              <Input onChange={(e) => this.handleSelectionDescripChange(e)} value={selectedItemDescrip} style={{color: 'black'}} type="textarea" rows="3" placeholder="Description of the dish" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="6">
              <FormGroup>
                <h6 htmlFor="appendedPrependedInput">Price</h6>
                <div className="controls">
                  <InputGroup className="input-prepend">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>€</InputGroupText>
                    </InputGroupAddon>
                    <CurrencyInput
                      style={{borderWidth: 1, borderColor: 'rgba(211,211,211,0.3)',paddingLeft:10, color: 'black'}}
                      value={selectedItemPrice}
                      onChange={(e, value) => this.handleSelectionPriceChange(e, value)}
                      placeholder="0.00"
                      required
                    />
                  </InputGroup>
                </div>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <h6>Unit</h6>
                {this.state.selectedDishType == 'bulk' ? 
                <Input style={{color: 'black'}} type="select">
                  <option>per platter</option>
                  <option>per tray</option>
                </Input>
                :
                <Input style={{color: 'black'}} type="select">
                  <option>per plate</option>
                  <option>per box</option>
                </Input>
                }
              </FormGroup>
            </Col>
          </FormGroup>

          {this.state.selectedDishType == 'bulk' ? 
          <FormGroup row>
            <Col xs="6">
              <FormGroup>
                <h6>Serve</h6>
                <Input onChange={(e) => this.handleSelectionServeChange(e)} value={selectedItemServe} style={{color: 'black'}} type="select" placeholder="1">
                  {this.state.servecount.map(serve =>
                    <option style={{color:'black'}} key={serve} value={serve}>{serve}</option>
                  )}
                </Input>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <h6>Unit</h6>
                <Input style={{color: 'black'}} type="select">
                  <option>per platter</option>
                  <option>per tray</option>
                </Input>
              </FormGroup>
            </Col>
          </FormGroup>
          : null }

          {this.state.selectedDishType == 'single' ? 
          <FormGroup row>
            <Col xs="6">
              <FormGroup>
                <h6>Minimum Quantity</h6>
                <Input onChange={(e) => this.handleSelectionMinQuantityChange(e)} value={selectedItemMinimumQuantity} style={{color: 'black'}} type="select" placeholder="1">
                  {this.state.servecount.map(minimumquantity =>
                    <option style={{color:'black'}} key={minimumquantity} value={minimumquantity}>{minimumquantity}</option>
                  )}
                </Input>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <h6>Unit</h6>
                <Input style={{color: 'black'}} type="select">
                  <option>per plate</option>
                  <option>per box</option>
                </Input>
              </FormGroup>
            </Col>
          </FormGroup>
          : null }
          
          {this.renderSelection(selectedItemSelection)}

          <Button block color="primary" onClick={() => this.toggleNewSelectionModal()}>Add Selections (Toppings / Sides)</Button>

          <h6
            style={{
              fontWeight: "600",
              color: "black",
              marginBottom: 10,
              marginTop: 30
            }}
          >
            Mark Item As
          </h6>
          {this.renderFormMarkItem(selectedMarkItemAs)}
        </Form>
      </Collapse>
    );
  }

  renderSelection(selection) {
    var selectionarray = [];
    for (let i = 0; i < selection.length; i++) {
      selectionarray.push(
        <Card>
          {this.renderEditSelectionHeader(selection, i)}
          <CardBody>
            {this.renderSelectionItems(selection[i].selectionitem)}
          </CardBody>
        </Card>
      );
    }
    return <FormGroup>{selectionarray}</FormGroup>;
  }

  renderSelectionHeader(selection, i) {
    return (
      <CardHeader>
        <Label style={{fontWeight: '600', color: 'black'}}>Select {selection[i].selectioncategory}</Label>
        <div className="card-header-actions">
          <a
            style={{cursor: 'pointer'}} onMouseOver=""
            className="card-header-action btn btn-close"
            onClick={() => this.editSelection(selection[i].selectioncategory, selection[i].selectionmaxnum, selection[i].selectionitem)}
          >
            <i className="fa fa-pencil" />
          </a>
        </div>
      </CardHeader>
    )
  }

  renderEditSelectionHeader(selection, i) {
    return (
      <CardHeader>
        <FormGroup row>
          <Col xs="4">
            <h6 style={{marginTop: 5}}>Selection Category</h6>
          </Col>
          <Col xs="8">
            <Input value={selection[i].selectioncategory} style={{color: 'black'}} type="text" placeholder="Selection Category" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="4">
            <h6 style={{marginTop: 5}}>Selection Limit</h6>
          </Col>
          <Col xs="8">
            <Input value={selection[i].selectionmaxnum} style={{color: 'black'}} type="select" placeholder="1" >
              {this.state.servecount.map(limit =>
                <option style={{color:'black'}} key={limit} value={limit}>{limit}</option>
              )}
            </Input>
          </Col>
        </FormGroup>
      </CardHeader>
    )
  }

  renderSelectionItems(selectionitem) {
    var selectionitemarray = [];
    for (let i = 0; i < selectionitem.length; i++) {
      selectionitemarray.push(
        <Col xs="12" sm="6" md="6">
          {selectionitem[i].selectionitemprice === 0 ? (
            <Label>{selectionitem[i].selectionitemtitle}</Label>
          ) : (
            <Label>
              {selectionitem[i].selectionitemtitle} (+€
              {Number(selectionitem[i].selectionitemprice).toFixed(2)})
            </Label>
          )}
        </Col>
      );
    }
    return <Row>{selectionitemarray}</Row>;
  }

  renderFormMarkItem(markeditem) {
    var itemsarray = [];
    var markitem = this.state.markitem
    for (let i = 0; i < markitem.length; i++) {
      itemsarray.push(
        <Col xs="6">
        <FormGroup style={{ paddingLeft: 0, marginTop: 10 }} check className="checkbox">
          <Checkbox
            checked={markeditem.includes(markitem[i])}
            onChange={(e) => this.handleCheckBoxChange(e, markitem[i])}
            value={markitem[i]}
            style={{padding:0, marginRight: 10}}
          />
          <Label check className="form-check-label">
            {markitem[i]}
          </Label>
          <img
            style={{
              marginLeft: 5,
              marginRight: 20,
              height: 25,
              width: 25,
              objectFit: "cover"
            }}
            src={this.findIcon(markitem[i])}
            alt=""
          />
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

  //Render Modal///////////////////////////////////////////////////////////////////////

  renderAddNewCategoryModal() {
    return(
      <Modal isOpen={this.state.categoryModal} toggle={this.toggleNewCategoryModal}>
        <ModalHeader toggle={this.toggleNewCategoryModal}>Add New Category</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Input style={{marginTop: 10, color: 'black'}} value={this.state.newCategoryName} onChange={(e) => this.handleCategoryNameChange(e)} type="text" placeholder={this.state.activeTab} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button disabled={this.state.newCategoryName == '' ? true : false} color="primary" onClick={() => this.addNewCategory()}>Add</Button>
          <Button color="secondary" onClick={this.toggleNewCategoryModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

  renderAddNewItemModal() {
    var selectedDishType = this.state.selectedDishType;
    return(
      <Modal isOpen={this.state.menuModalOpen} toggle={this.toggleNewItemModal}>
        <ModalHeader toggle={this.toggleNewItemModal}>Add New Item</ModalHeader>
        <ModalBody>
          <Label>How do you want to sell your dish?</Label>
          <Row>
            <Col>
              <Card style={{cursor: 'pointer', borderColor: selectedDishType == 'single' ? '#20a8d8' : null}} onMouseOver="" onClick={() => this.selectDishType('single')}>
                <CardHeader>
                  <div class="container">
                    <h6 style={{ textAlign: "center" }}>Plate / Box (Single) </h6>
                  </div>
                </CardHeader>
                <CardBody>
                  <div class="container">
                    <img
                      style={{ height: 80, width: 80, objectFit: "cover" }}
                      src="https://www.goodmealhunting.com/assets/healthy-icon-40124fd3f588b7024ccfff8f60f0288132a9ccbda70f77e6a2619d83a0313114.png"
                      alt=""
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card style={{cursor: 'pointer', borderColor: selectedDishType == 'bulk' ? '#20a8d8' : null}} onMouseOver="" onClick={() => this.selectDishType('bulk')}>
                <CardHeader>
                  <div class="container">
                    <h6 style={{ textAlign: "center" }}>Platter / Tray (Bulk}</h6>
                  </div>
                </CardHeader>
                <CardBody>
                  <div class="container">
                    <img
                      style={{ height: 80, width: 90, objectFit: "cover" }}
                      src="https://mealprepkingz.com/wp-content/uploads/2016/12/icon-wecook.png"
                      alt=""
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {this.renderForm()}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" >
            {this.state.updateItem ? 'Save' : 'Add'}
          </Button>{" "}
          <Button color="secondary" onClick={this.toggleNewItemModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
  
  renderNewSelectionModal() {
    var selectedItemSelectionInnerItems = this.state.selectedItemSelectionInnerItems;

    var selectioncategory = '';
    var selectionmaxnum = 1;
    var selectionitem = [];

    if (selectedItemSelectionInnerItems !== null) {
     // alert(JSON.stringify(selectedItemSelectionInnerItems))
      selectioncategory = selectedItemSelectionInnerItems.selectioncategory
      selectionmaxnum = selectedItemSelectionInnerItems.selectionmaxnum
      selectionitem = selectedItemSelectionInnerItems.selectionitem
    }

    return(
      <Modal isOpen={this.state.selectionModal} toggle={() => this.toggleNewSelectionModal()}>
        <ModalHeader toggle={() => this.toggleNewSelectionModal()}>Add New Selection</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Col md="3">
              <h6 style={{marginTop:5}}>Select</h6>
            </Col>
            <Col xs="12" md="9">
              <Input onChange={(e) => this.handleSelectionCategoryChange(e)} style={{color: 'black'}} value={selectioncategory} type="text" placeholder="Sides / Toppings / Main" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <h6 style={{marginTop:5}}>Selection Limit</h6>
            </Col>
            <Col xs="12" md="9">
              <Input onChange={(e) => this.handleSelectionMaxNumChange(e)} style={{color: 'black'}} value={selectionmaxnum} type="select">
                {this.state.servecount.map(limit =>
                  <option style={{color:'black'}} key={limit} value={limit}>{limit}</option>
                )}
              </Input>
            </Col>
          </FormGroup>
          {this.renderSelectionItemModal(selectionitem)}
          <Button disabled={selectioncategory === '' ? true : false } color="primary" className="btn-pill" onClick={() => this.addNewSelectionItem(selectioncategory, selectionmaxnum)}>Add Selection</Button>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" >Save</Button>
          <Button color="secondary" onClick={() => this.toggleNewSelectionModal()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

  renderSelectionItemModal(selectionitem) {

    var itemsarray = [];

    var selectionitems = selectionitem

    if (selectionitem.length > 0) {
      for(let i = 0; i < selectionitem.length; i++){
        itemsarray.push(
          <Row>
            <Col xs="5">
              <FormGroup>
                <div>
                  <Input onChange={(e) => this.handleSelectionItemTitleChange(e, i)}  value={selectionitems[i] == null ? '' : selectionitems[i].selectionitemtitle} style={{ color:'black'}} type="text" placeholder="Selection 1"></Input>
                </div>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <div>
                  <InputGroup className="input-prepend">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>€</InputGroupText>
                    </InputGroupAddon>
                    <CurrencyInput
                      style={{borderWidth: 1, borderColor: 'rgba(211,211,211,0.3)', paddingLeft:10, color: 'black'}}
                      value={selectionitems[i] == null ? '' : Number(selectionitems[i].selectionitemprice).toFixed(2)}
                      onChange={(e, value) => this.handleSelectionItemPriceChange(e, value, i)}
                      placeholder="0.00"
                      required
                    />
                  </InputGroup>
                </div>
              </FormGroup>
            </Col>

            <Col style={{padding: 0}} xs="1">
              <img
                style={{
                  cursor: "pointer",
                  height: 10,
                  width: 10,
                  objectFit: "cover",
                  marginTop:10,
                }}
             
                src={closeIcon}
                alt=""
              />
            </Col>
            
          </Row>
        )
      }
    }
    else if (selectionitem.length == 0) {
      itemsarray.push(
        <FormGroup row>
          <Col xs="5">
            <FormGroup>
              <div>
                <Input onChange={(e) => this.handleSelectionItemTitleChange(e, -1)} value={''} style={{ color:'black'}} type="text" placeholder="Selection 1"></Input>
              </div>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <div>
                <InputGroup className="input-prepend">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>€</InputGroupText>
                  </InputGroupAddon>
                  <CurrencyInput
                    style={{borderWidth: 1, borderColor: 'rgba(211,211,211,0.3)', paddingLeft:10, color: 'black'}}
                    value={Number(0).toFixed(2)}
                    onChange={(e, value) => this.handleSelectionItemPriceChange(e, value, -1)}
                    placeholder="0.00"
                    required
                  />
                </InputGroup>
              </div>
            </FormGroup>
          </Col>
          <Col style={{padding: 0}} xs="1">
            <img
              style={{
                cursor: "pointer",
                height: 10,
                width: 10,
                objectFit: "cover",
                marginTop:10,
              }}
            
              src={closeIcon}
              alt=""
            />
          </Col>
        </FormGroup>
      )
    }
    

    return(
      <Row style={{marginTop:20}}>
        <Col>
        {itemsarray}
        </Col>
      </Row>
    )
  }


  render() {

    return (
      <div style={{backgroundColor: 'white'}} className="animated fadeIn">
        <Row style={{marginBottom: 30}}>
          <Col xs="12">
            {this.renderNav()}
          </Col>
          <Col xs="12">
            {this.renderTabPane()}
          </Col>
        </Row>

        {this.renderAddNewCategoryModal()}

        {this.renderAddNewItemModal()}

        {this.renderNewSelectionModal()}
        
      </div>
    );
  }
}

export default MenuSetup;
