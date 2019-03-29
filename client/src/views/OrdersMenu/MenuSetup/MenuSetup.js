import React, { Component } from 'react';
import {Badge, Form, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Collapse, FormGroup, FormText, FormFeedback,
  CardBody, Card, CardHeader, Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Input, InputGroup, InputGroupAddon, 
  InputGroupText} from 'reactstrap';
import classnames from 'classnames';
import './MenuSetup.css'
import Dotdotdot from "react-dotdotdot";


const glutenfreeIcon = require('../../../assets/img/glutenfree1.png');
const hotIcon = require('../../../assets/img/fire.png');
const spicyIcon = require('../../../assets/img/pepper.png');
const vegeIcon = require('../../../assets/img/lettuce.png');
const healthyIcon = require('../../../assets/img/fruit.png');
const halalicon = require('../../../assets/img/halalsign.png');

class MenuSetup extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleNewCategoryModal = this.toggleNewCategoryModal.bind(this);
    this.toggleNewItemModal = this.toggleNewItemModal.bind(this);
    this.toggleNewSelectionModal = this.toggleNewSelectionModal.bind(this);
    this.handleCategoryNameChange = this.handleCategoryNameChange.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this); 
    this.addNewItem = this.addNewItem.bind(this);
    this.addNewSelectionItem = this.addNewSelectionItem.bind(this);

    this.state = {
      activeTab: 'appetizer',
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
      categoryModal: false,
      newItemModal: false,
      selectionModal: false,
      newCategoryName: '',
      dishtype: '',
    };
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
      newItemModal: !this.state.newItemModal,
      dishtype: ''
    });
  }

  toggleNewSelectionModal() {
    this.setState({
      selectionModal: !this.state.selectionModal,
    });
  }

  //Button Click Event///////////////////////////////////////////////////////////////////////

  addNewCategory() {
    var activeArray = this.findActiveArray(this.state.activeTab)
    var addItem = {
      categoryname: this.state.newCategoryName,
      items: [],
    }
    activeArray.unshift(addItem)

    this.setState({
      categoryModal: !this.state.categoryModal,
    })
  }

  addNewItem() {
    alert('add new')
  }

  selectDishType = (dishtype) => {
    this.setState({
      dishtype: dishtype,
    })
  }

  addNewSelectionItem() {
    var newitem = {
      selectionitemtitle: '',
      selectionitemprice: ''
    }
    var newselectionarray = this.state.selectionitems
    newselectionarray.unshift(newitem)

    this.setState({
      selectionitems: newselectionarray,
    })
  }

  //Other functions///////////////////////////////////////////////////////////////////////

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  findActiveArray = (activeTab) => {
    var arrayToReturn;
    if (activeTab == 'appetizer') { arrayToReturn = this.state.appetizer }
    else if (activeTab == 'breakfast') { arrayToReturn = this.state.breakfast }
    else if (activeTab == 'sandwiches') { arrayToReturn = this.state.sandwiches }
    else if (activeTab == 'salads') { arrayToReturn = this.state.salads }
    else if (activeTab == 'catering') { arrayToReturn = this.state.catering }
    else if (activeTab == 'entrees') { arrayToReturn = this.state.entrees }
    else if (activeTab == 'lunches') { arrayToReturn = this.state.lunches }
    else if (activeTab == 'sides') { arrayToReturn = this.state.sides }
    else if (activeTab == 'desserts') { arrayToReturn = this.state.desserts }
    else if (activeTab == 'beverages') { arrayToReturn = this.state.beverages }
    return arrayToReturn
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

  handleCategoryNameChange(e) {
    this.setState({ newCategoryName: e.target.value });
  }

  //Render functions///////////////////////////////////////////////////////////////////////

  renderTabPane(activeTab) {

    var tabToDisplay = this.findActiveArray(activeTab)

    var categoryarray = [];

  //  alert(tabToDisplay.length)

    for(let i = 0; i < tabToDisplay.length; i++){
      categoryarray.push(
        <TabPane tabId={i + 1}>
          {this.renderCategoryItems(tabToDisplay[i].items, tabToDisplay[i].categoryname)}
        </TabPane>
      )
    } 

    return(
      <Row >
        <Col style={{marginLeft: 15, marginRight: 15}} >
          <Button style={{marginLeft: 15, marginTop: 20, marginBottom: 10}} onClick={this.toggleNewCategoryModal} color="primary" className="btn-pill">Add New Category</Button>
          {categoryarray}
        </Col>
      </Row>
    )
  }

  renderCategoryItems(items, categoryname) {

    var itemsarray = [];

    for(let i = 0; i < items.length; i++){
      itemsarray.push(
        <Col xs="12" sm="6" md="6" lg="4">
          <Card>
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
            <CardBody style={{cursor: 'pointer', marginTop: 0, marginBottom: 10, padding: 0, height: "100%"}} onMouseOver="" onClick={() => alert(items[i] + ' + ' + categoryname)}>
              <Col>
                <div class="row">
                  <Col style={{padding: 0,}}>
                    <Label style={{ display: "inline-block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: 150, width: "100%", textAlign: "start",cursor: 'pointer', marginLeft: 15, color: '#20a8d8'}} className="h5">{items[i].title}</Label>
                  </Col>
                  <Col style={{paddingRight: 20,}}>
                    <Label
                      style={{
                        cursor: "pointer",
                        textAlign: "end",
                        marginLeft: 15,
                      }}
                      className="h5 float-right"
                    >
                      {items[i].price}
                    </Label>
                  </Col>
                </div>
                <div class="row">
                  <Label style={{ opacity: 0.7, cursor: 'pointer', marginLeft: 15, fontfStyle: 'italic',}}> Serves {items[i].serve}</Label>
                  {items[i].minquantity > 1 ? 
                    <Label
                      style={{
                        opacity: 0.7,
                        cursor: "pointer",
                        marginLeft: 5,
                        fontfStyle: "italic"
                      }}
                    >
                    | Minimum {items[i].minquantity}
                    </Label>
                    :
                    null
                  }
                  {this.renderMarkAsIcon(items[i].markas)}
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

  renderAddNewCategoryModal() {
    return(
      <Modal isOpen={this.state.categoryModal} toggle={this.toggleNewCategoryModal}>
        <ModalHeader toggle={this.toggleNewCategoryModal}>Add New Category</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Input style={{marginTop: 10, color: 'black'}} value={this.state.newCategoryName} onChange={(e) => this.handleCategoryNameChange(e)} type="text" placeholder={this.capitalizeFirstLetter(this.state.activeTab)} />
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
    return(
      <Modal isOpen={this.state.newItemModal} toggle={this.toggleNewItemModal}>
        <ModalHeader toggle={this.toggleNewItemModal}>Add New Item</ModalHeader>
        <ModalBody>
          <Label>How do you want to sell your dish?</Label>
          <Row>
            <Col>
              <Card style={{cursor: 'pointer', borderColor: this.state.dishtype == 'single' ? '#20a8d8' : null}} onMouseOver="" onClick={() => this.selectDishType('single')}>
                <CardHeader>
                  <div class="container">
                    <h6 style={{ textAlign: "center" }}>Single Dish</h6>
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
              <Card style={{cursor: 'pointer', borderColor: this.state.dishtype == 'bulk' ? '#20a8d8' : null}} onMouseOver="" onClick={() => this.selectDishType('bulk')}>
                <CardHeader>
                  <div class="container">
                    <h6 style={{ textAlign: "center" }}>Platter / Tray</h6>
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
            Add
          </Button>{" "}
          <Button color="secondary" onClick={this.toggleNewItemModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  }

  renderForm() {
    return (
      <Collapse isOpen={this.state.dishtype == ""? false : true}>
        <Form action="" method="post" className="form-horizontal">
          <FormGroup row>
            <Col md="3">
              <Label>Title</Label>
            </Col>
            <Col xs="12" md="9">
              <Input style={{color: 'black'}} type="text" placeholder="Title of the the dish" />
              <FormText className="help-block">
                Please enter title of your dish
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label>Description</Label>
            </Col>
            <Col xs="12" md="9">
              <Input style={{color: 'black'}} type="textarea" rows="3" placeholder="Description of the dish" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="6">
              <FormGroup>
                <Label htmlFor="appendedPrependedInput">Price</Label>
                <div className="controls">
                  <InputGroup className="input-prepend">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>€</InputGroupText>
                    </InputGroupAddon>
                    <Input style={{color: 'black'}} size="16" type="text" placeholder="8"/>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText> . </InputGroupText>
                    </InputGroupAddon>
                    <Input size="16" type="text" placeholder="00"/>
                  </InputGroup>
                </div>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label>Unit</Label>
                {this.state.dishtype == 'bulk' ? 
                <Input style={{color: 'black'}} type="select">
                  <option>per platter</option>
                  <option>per tray</option>
                </Input>
                :
                <Input style={{color: 'black'}} disabled type="select">
                  <option>per dish</option>
                </Input>
                }
              </FormGroup>
            </Col>
          </FormGroup>

          {this.state.dishtype == 'bulk' ? 
          <FormGroup row>
            <Col xs="6">
              <FormGroup>
                <Label>Serve</Label>
                <Input style={{color: 'black'}} type="text" placeholder="1"></Input>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label>Unit</Label>
                <Input style={{color: 'black'}} type="select">
                  <option>per platter</option>
                  <option>per tray</option>
                </Input>
              </FormGroup>
            </Col>
          </FormGroup>
          : null }

          {this.state.dishtype == 'single' ? 
          <FormGroup row>
            <Col xs="6">
              <FormGroup>
                <Label>Minimum Quantity</Label>
                <Input style={{color: 'black'}} type="text" placeholder="1"></Input>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label>Unit</Label>
                <Input style={{color: 'black'}} disabled type="select">
                  <option>per order</option>
                </Input>
              </FormGroup>
            </Col>
          </FormGroup>
          : null }
          
          {this.renderSelection(this.state.items[0].selection)}
          {this.renderMarkAs()}
        </Form>
        <Button outline color="primary" className="btn-pill" onClick={this.toggleNewSelectionModal}>Add Toppings / Sides</Button>
      </Collapse>
    );
  }
  
  renderMarkAs() {
    return (
      <FormGroup row>
        <Col md="12">
          <Label>Mark Item As</Label>
        </Col>
        <Col md="12">
          <FormGroup style={{ marginBottom: 10 }} check inline>
            <Input
              className="form-check-input"
              type="checkbox"
              id="inline-checkbox1"
              name="inline-checkbox1"
              value="option1"
            />
            <Label
              className="form-check-label"
              check
              htmlFor="inline-checkbox1"
            >
              Hot
            </Label>
            <img
              style={{
                marginLeft: 5,
                marginRight: 20,
                height: 25,
                width: 25,
                objectFit: "cover"
              }}
              src={hotIcon}
              alt=""
            />
          </FormGroup>
          <FormGroup style={{ marginBottom: 10 }} check inline>
            <Input
              className="form-check-input"
              type="checkbox"
              id="inline-checkbox2"
              name="inline-checkbox2"
              value="option2"
            />
            <Label
              className="form-check-label"
              check
              htmlFor="inline-checkbox2"
            >
              Spicy
            </Label>
            <img
              style={{
                marginLeft: 5,
                marginRight: 20,
                height: 25,
                width: 25,
                objectFit: "cover"
              }}
              src={spicyIcon}
              alt=""
            />
          </FormGroup>
          <FormGroup style={{ marginBottom: 10 }} check inline>
            <Input
              className="form-check-input"
              type="checkbox"
              id="inline-checkbox3"
              name="inline-checkbox3"
              value="option3"
            />
            <Label
              className="form-check-label"
              check
              htmlFor="inline-checkbox3"
            >
              Vegetarian
            </Label>
            <img
              style={{
                marginLeft: 5,
                marginRight: 20,
                height: 25,
                width: 25,
                objectFit: "cover"
              }}
              src={vegeIcon}
              alt=""
            />
          </FormGroup>
          <FormGroup style={{ marginBottom: 10 }} check inline>
            <Input
              className="form-check-input"
              type="checkbox"
              id="inline-checkbox4"
              name="inline-checkbox4"
              value="option4"
            />
            <Label
              className="form-check-label"
              check
              htmlFor="inline-checkbox4"
            >
              Healthy
            </Label>
            <img
              style={{
                marginLeft: 5,
                marginRight: 20,
                height: 25,
                width: 25,
                objectFit: "cover"
              }}
              src={healthyIcon}
              alt=""
            />
          </FormGroup>
          <FormGroup check inline>
            <Input
              className="form-check-input"
              type="checkbox"
              id="inline-checkbox5"
              name="inline-checkbox5"
              value="option5"
            />
            <Label
              className="form-check-label"
              check
              htmlFor="inline-checkbox5"
            >
              Gluten Free
            </Label>
            <img
              style={{
                marginLeft: 5,
                marginRight: 20,
                height: 25,
                width: 25,
                objectFit: "cover"
              }}
              src={glutenfreeIcon}
              alt=""
            />
          </FormGroup>
          <FormGroup style={{ marginBottom: 10 }} check inline>
            <Input
              className="form-check-input"
              type="checkbox"
              id="inline-checkbox6"
              name="inline-checkbox6"
              value="option6"
            />
            <Label
              className="form-check-label"
              check
              htmlFor="inline-checkbox6"
            >
              Halal
            </Label>
            <img
              style={{
                marginLeft: 5,
                marginRight: 20,
                height: 25,
                width: 25,
                objectFit: "cover"
              }}
              src={halalicon}
              alt=""
            />
          </FormGroup>
        </Col>
      </FormGroup>
    )
  }

  renderNewSelectionModal() {
   
    return(
      <Modal isOpen={this.state.selectionModal} toggle={this.toggleNewSelectionModal}>
        <ModalHeader toggle={this.toggleNewSelectionModal}>Add New Selection</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Col md="2">
              <Label>Select</Label>
            </Col>
            <Col xs="12" md="10">
              <Input type="text" placeholder="Sides / Toppings / Main" />
            </Col>
          </FormGroup>
          {this.renderSelectionItemModal(this.state.selectionitems)}
          <Button outline color="primary" className="btn-pill" onClick={() => this.addNewSelectionItem()}>Add Selection</Button>
        </ModalBody>
        <ModalFooter>
          <Button disabled={this.state.newCategoryName == '' ? true : false} color="primary" >Save</Button>
          <Button color="secondary" onClick={this.toggleNewSelectionModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

  renderSelectionItemModal(selectionitems) {

    var itemsarray = [];

    if (selectionitems.length > 0) {
      for(let i = 0; i < selectionitems.length; i++){
        itemsarray.push(
          <FormGroup row>
            <Col xs="6">
              <FormGroup>
                <Col style={{padding: 0, margin: 0}}>
                  <Input style={{marginBottom: 10}} type="text" placeholder="Selection 1"></Input>
                </Col>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Col style={{padding: 0, margin: 0}}>
                  <Input style={{marginBottom: 10}} type="text" placeholder="0"></Input>
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>
        )
      }
    }
    else {
      itemsarray.push(
        <FormGroup row>
          <Col xs="6">
            <FormGroup>
              <Label>Selections</Label>
              <Col style={{padding: 0, margin: 0}}>
                <Input style={{marginBottom: 10}} type="text" placeholder="Selection 1"></Input>
              </Col>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label>Price</Label>
              <Col style={{padding: 0, margin: 0}}>
                <Input style={{marginBottom: 10}} type="text" placeholder="0"></Input>
              </Col>
            </FormGroup>
          </Col>
        </FormGroup>
      )
    }

    return(
      <Row>
        <Col>
        {itemsarray}
        </Col>
      </Row>
    )
  }

  renderSelection(selection) {
    var selectionarray = [];
    for (let i = 0; i < selection.length; i++) {
      selectionarray.push(
        <Card>
          <CardHeader>
            Select {selection[i].selectioncategory}
            <div className="card-header-actions">
              <a
                style={{cursor: 'pointer'}} onMouseOver=""
                className="card-header-action btn btn-close"
                onClick={() => alert('Selection')}
              >
                <i className="fa fa-pencil" />
              </a>
            </div>
          </CardHeader>
          <CardBody>
            {this.renderSelectionItems(selection[i].selectionitem)}
          </CardBody>
        </Card>
      );
    }
    return <FormGroup>{selectionarray}</FormGroup>;
  }

  renderSelectionItems(selectionitem) {
    var selectionitemarray = [];
    for (let i = 0; i < selectionitem.length; i++) {
      selectionitemarray.push(
        <Col xs="12" sm="6" md="6">
          {selectionitem[i].selectionitemprice === "" ? (
            <Label>{selectionitem[i].selectionitemtitle}</Label>
          ) : (
            <Label>
              {selectionitem[i].selectionitemtitle} (+
              {selectionitem[i].selectionitemprice})
            </Label>
          )}
        </Col>
      );
    }
    return <Row>{selectionitemarray}</Row>;
  }
  
  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'appetizer' })}
                  onClick={() => { this.toggle('appetizer'); }}
                >
                  Appetizer
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'breakfast' })}
                  onClick={() => { this.toggle('breakfast'); }}
                >
                  Breakfast
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'sandwiches' })}
                  onClick={() => { this.toggle('sandwiches'); }}
                >
                  Sandwiches
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'salads' })}
                  onClick={() => { this.toggle('salads'); }}
                >
                  Salads
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'catering' })}
                  onClick={() => { this.toggle('catering'); }}
                >
                  Catering
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'entrees' })}
                  onClick={() => { this.toggle('entrees'); }}
                >
                  Entrees
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'lunches' })}
                  onClick={() => { this.toggle('lunches'); }}
                >
                  Lunches
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'sides' })}
                  onClick={() => { this.toggle('sides'); }}
                >
                  Sides
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'desserts' })}
                  onClick={() => { this.toggle('desserts'); }}
                >
                  Desserts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'beverages' })}
                  onClick={() => { this.toggle('beverages'); }}
                >
                  Beverages
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              {this.renderTabPane(this.state.activeTab)}
            </TabContent>
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
