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
import color from "../../assets/color"
import moment from "moment";
import { DateRangePicker, DateRange } from 'react-date-range';
import {server} from "../../config"
import { format, addDays, subDays } from 'date-fns';

class Order extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orderModal: false,
      orderLunchModal: false,
      selectedOrderItem: null,
      selectedLunchOrderItem: null,
      empty: false,
      lunchempty: false,
      maxDate: null,
      currentDate: null,
      previousDate: null,
      currentLunchDate: null,
      previousLunchDate: null,
      dropDownDate: false,
      dropDownDateForLunch: false,
      dropDownStatus: false,
      dropDownStatusForLunch: false,
      dropDownType: false,
      dropDownTypeForLunch: false,
      dateRangePicker: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      },
      dateRangePickerForLunch: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      },
      dateArray: [],
      dateRange: '',
      tableitems: [],
      dateArrayForLunch: [],
      dateRangeForLunch: '',
      lunchtableitems: [],
      selectedOrderTable: "Lunch Orders",
    };
  }

  getLunchSessionStorage = () => {

    //Lunch
    var currentDateStringForLunch;
    var previousDateStringForLunch;

    var currentDateStringForLunch = sessionStorage.getItem("currentLunchOrderDateString")
    var previousDateStringForLunch = sessionStorage.getItem("previousLunchOrderDateString")

    this.getLunchOrder(currentDateStringForLunch, previousDateStringForLunch)

  }

  getSessionStorage = () => {

    //Catering
    var currentDateString;
    var previousDateString;

    var currentDateString = sessionStorage.getItem("currentOrderDateString")
    var previousDateString = sessionStorage.getItem("previousOrderDateString")

    this.getOrder(currentDateString, previousDateString)
    
  }

  componentDidMount() {

    //Lunch
    if (sessionStorage.getItem("currentLunchOrderDateString") !== null && sessionStorage.getItem("previousLunchOrderDateString") !== null) {
      this.getLunchSessionStorage()
    }
    else {

      var currentDateStringForLunch;
      var previousDateStringForLunch;
   
      var dateNow = moment().toDate();
      currentDateStringForLunch = moment(dateNow).format("DD MMM, YYYY")
      previousDateStringForLunch =  moment(subDays(new Date(), 7)).format("DD MMM, YYYY");
      
      this.getLunchOrder(currentDateStringForLunch, previousDateStringForLunch)
    }

    //Catering
    if (sessionStorage.getItem("currentOrderDateString") !== null && sessionStorage.getItem("previousOrderDateString") !== null) {
      this.getSessionStorage()
    }
    else {

      var currentDateString;
      var previousDateString;
   
      var dateNow = moment().toDate();
      currentDateString = moment(dateNow).format("DD MMM, YYYY")
      previousDateString =  moment(subDays(new Date(), 7)).format("DD MMM, YYYY");
      
      this.getOrder(currentDateString, previousDateString)
    }

  }

  getLunchOrder = (currentDateStringForLunch, previousDateStringForLunch) => {
    
    var finalOrderSelectionDateString = previousDateStringForLunch + ' - ' + currentDateStringForLunch
  
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETlunchorder + "?lteDate=" + currentDateStringForLunch + "&gteDate=" + previousDateStringForLunch;

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          console.log('order data =', response.data)
          this.setState({
            maxDate: new Date(),
            lunchtableitems: response.data,
            dateRangeForLunch: finalOrderSelectionDateString,
            lunchempty: response.data.length > 0 ? false : true
          })
        } 
      })
      .catch((error) => {
      });
  }

  getOrder = (currentDateString, previousDateString) => {
    
    var finalOrderSelectionDateString = previousDateString + ' - ' + currentDateString
  
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETorder + "?lteDate=" + currentDateString + "&gteDate=" + previousDateString;

    //var url = `${server}${apis.GETorder}?lteDate=${currentDateString}&gteDate=${previousDateString}`

    axios.get(url, {withCredentials: true}, {headers: headers})
      .then((response) => {
        if (response.status === 200) {
          console.log('order data =', response.data)
          this.setState({
            maxDate: new Date(),
            tableitems: response.data,
            dateRange: finalOrderSelectionDateString,
            empty: response.data.length > 0 ? false : true
          })
        } 
      })
      .catch((error) => {
      });
  }

  toggleDropDownForLunch = () => {
    this.setState({
      dropDownDateForLunch: !this.state.dropDownDateForLunch
    })
  }

  toggleDropDown = () => {
    this.setState({
      dropDownDate: !this.state.dropDownDate
    })
  }

  toggleStatusForLunch = () => {
    this.setState({
      dropDownStatusForLunch: !this.state.dropDownStatusForLunch
    })
  }

  toggleStatus = () => {
    this.setState({
      dropDownStatus: !this.state.dropDownStatus
    })
  }

  toggleType = () => {
    this.setState({
      dropDownType: !this.state.dropDownType
    })
  }

  handleRangeChangeForLunch(which, payload) {
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload,
      },
    })
  }

  handleRangeChange(which, payload) {
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload,
      },
    })
  }

  selectDateRange = (type) => {

    if (type === "lunch") {
      var startDate = moment(this.state.dateRangePickerForLunch.selection.startDate).format("DD MMM, YYYY")
      var endDate = moment(this.state.dateRangePickerForLunch.selection.endDate).format("DD MMM, YYYY")
      var finalDate = startDate + ' - ' + endDate

      this.setState({
        dateRangeForLunch: finalDate,
        dropDownDateForLunch: !this.state.dropDownDateForLunch,
      }, () => {
        sessionStorage.setItem('currentLunchOrderDateString', endDate)
        sessionStorage.setItem('previousLunchOrderDateString', startDate)
        this.getLunchOrder(endDate, startDate)
      })
    }
    else {
      var startDate = moment(this.state.dateRangePicker.selection.startDate).format("DD MMM, YYYY")
      var endDate = moment(this.state.dateRangePicker.selection.endDate).format("DD MMM, YYYY")
      var finalDate = startDate + ' - ' + endDate

      this.setState({
        dateRange: finalDate,
        dropDownDate: !this.state.dropDownDate,
      }, () => {
        sessionStorage.setItem('currentOrderDateString', endDate)
        sessionStorage.setItem('previousOrderDateString', startDate)
        this.getOrder(endDate, startDate)
      })
    }
  }

  lunchTableItemClicked = (_id) => {
    
    var itemindex = this.state.lunchtableitems.findIndex(x => x._id == _id);

    this.setState({
      selectedLunchOrderItem: this.state.lunchtableitems[itemindex]
    }, () => {
      this.toggleLunchOrderModal()
    })
  }

  tableItemClicked = (_id) => {
    
    var itemindex = this.state.tableitems.findIndex(x => x._id == _id);

    this.setState({
      selectedOrderItem: this.state.tableitems[itemindex]
    }, () => {
      this.toggleOrderModal()
    })
  }

  toggleLunchOrderModal = () => {
    this.setState({
      orderLunchModal: !this.state.orderLunchModal
    })
  }

  toggleOrderModal = () => {
    this.setState({
      orderModal: !this.state.orderModal
    })
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderDateActionForLunch() {
    return (
      <Row style={{marginBottom: 10, marginRight: 10}}>
        <Col>
        
        <Button
          style={{ marginLeft: 10 }}
          outline
          color="primary"
          onClick={() => this.selectDateRange("lunch")}
        >
          Select
        </Button>
        <Button
          style={{ marginLeft: 10, opacity: 0.6 }}
          outline
          color="dark"
          onClick={() => this.toggleDropDownForLunch()}
        >
          Cancel
        </Button>
        </Col>
      </Row>
    );
  }

  renderDateAction() {
    return (
      <Row style={{marginBottom: 10, marginRight: 10}}>
        <Col>
        
        <Button
          style={{ marginLeft: 10 }}
          outline
          color="primary"
          onClick={() => this.selectDateRange("catering")}
        >
          Select
        </Button>
        <Button
          style={{ marginLeft: 10, opacity: 0.6 }}
          outline
          color="dark"
          onClick={() => this.toggleDropDown()}
        >
          Cancel
        </Button>
        </Col>
      </Row>
    );
  }

  renderSelectedOrderSelectionItem(selectionitem) {
    var itemstext = "";

    for (let i = 0; i < selectionitem.length; i++) {
      if (i == 0) {
        itemstext = selectionitem[i].selectionitemtitle;
      } else {
        itemstext = itemstext + ", " + selectionitem[i].selectionitemtitle;
      }
    }
    return (
      <div>
        <Label style={{ cursor: "pointer", opacity: 0.7 }}>{itemstext}</Label>
      </div>
    );
  }

  renderSelectedOrderSelection(selection) {
    var itemsarray = [];

    for (let i = 0; i < selection.length; i++) {
      itemsarray.push(
        <p key={i} style={{ textSize: 13, opacity: 0.7, margin: 0 }}>
          <span>&#8226;</span> {selection[i].selectioncategory}:
          {this.renderSelectedOrderSelectionItem(selection[i].selectionitem)}
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
            <Label style={{ cursor: "pointer", opacity: 0.7 }}>
              {instruction}
            </Label>
          </div>
        </p>
      );
    }

    return <div>{itemsarray}</div>;
  }

  renderSelectedOrderTableItems() {
    const { selectedOrderItem } = this.state;

    var itemarray = [];

    var orderItem = selectedOrderItem.orderItem;

    for (let i = 0; i < orderItem.length; i++) {
      itemarray.push(
        <tr>
          <td style={{ fontWeight: "500" }}>{orderItem[i].quantity}</td>
          <td style={{ textAlign: "start" }}>
            <p
              style={{
                marginBottom: 5,
                fontWeight: "500",
                color: color.primary,
                overflow: "hidden"
              }}
            >
              {orderItem[i].title}
            </p>

            <p
              style={{
                fontStyle: "italic",
                marginBottom: 5,
                textSize: 13,
                opacity: 0.7
              }}
            >
              serves {orderItem[i].serveperunit}
            </p>
            {typeof orderItem[i].selection === "undefined"
              ? null
              : this.renderSelectedOrderSelection(orderItem[i].selection)}
            {typeof orderItem[i].instruction === "undefined"
              ? null
              : this.renderInstruction(orderItem[i].instruction)}
          </td>

          <td style={{ width: "20%", textAlign: "start" }}>
            €{Number(orderItem[i].totalprice).toFixed(2)}
          </td>
        </tr>
      );
    }

    return <tbody>{itemarray}</tbody>;
  }

  rendeSelectedOrderItems() {
    const { selectedOrderItem } = this.state;
    return (
      <div style={{ textAlign: "start" }}>
        <Table responsive className="mb-0 d-none d-sm-table">
          <thead className="thead-light">
            <tr>
              <th>Qty</th>
              <th>Items</th>
              <th>Price</th>
            </tr>
          </thead>
          {this.renderSelectedOrderTableItems()}
        </Table>

        <Row style={{ marginTop: 20 }}>
          <Col>
            <Card
              style={{
                borderColor: color.primary
              }}
            >
              <CardBody style={{ margin: 0, padding: 10 }}>
                <h6
                  style={{
                    marginTop: 5,
                    textAlign: "center",
                    color: color.primary
                  }}
                >
                  {this.capitalizeFirstLetter(selectedOrderItem.orderType)}
                </h6>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Table borderless>
          <tbody>
            {selectedOrderItem.orderType === "delivery" ? 
              <tr>
                <td style={{ fontSize: 16, textAlign: "start" }}>
                  Delivery Fee
                </td>
                <td style={{ fontSize: 16, textAlign: "end" }}>
                  €{Number(selectedOrderItem.deliveryfee).toFixed(2)}
                </td>
              </tr>
              :
              null
            }
            <tr>
              <td style={{ fontSize: 16, textAlign: "start" }}>
                Delivery Date
              </td>
              <td style={{ fontSize: 16, textAlign: "end" }}>
                {moment(selectedOrderItem.deliverydate).format("DD MMM, YYYY")}
              </td>
            </tr>
            <tr>
              <td style={{ fontSize: 16, textAlign: "start" }}>
                Delivery Time
              </td>
              <td style={{ fontSize: 16, textAlign: "end" }}>
                {selectedOrderItem.deliverytime}
              </td>
            </tr>
          </tbody>
        </Table>

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
                €{Number(selectedOrderItem.totalOrderPrice).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
  
  renderOrderModal() {
    const { selectedOrderItem } = this.state;
    return (
      <Modal
        isOpen={this.state.orderModal}
        toggle={() => this.toggleOrderModal()}
      >
        <ModalHeader toggle={() => this.toggleOrderModal()}>
          Order #{selectedOrderItem._id}
        </ModalHeader>
        <ModalBody>{this.rendeSelectedOrderItems()}</ModalBody>
        <ModalFooter style={{padding: 0}}>
        
          {selectedOrderItem.orderStatus === "pending" ? 
          <Button style={{opacity: 1, padding: 10, fontSize: 17, fontWeight: '600'}} disabled block color="secondary">
            Pending
          </Button>
          :
          selectedOrderItem.orderStatus === "accepted" ? 
          <Button style={{opacity: 1, padding: 10, fontSize: 17, fontWeight: '600'}} disabled block color="success">
            Accepted
          </Button>
          :
          selectedOrderItem.orderStatus === "rejected" ? 
          <Button style={{opacity: 1, padding: 10, fontSize: 17, fontWeight: '600'}} disabled block color="danger">
            Rejected
          </Button>
          : 
          null
          }
         
        </ModalFooter>
      </Modal>
    );
  }

  renderSelectedLunchOrderTableItems() {
    const { selectedLunchOrderItem } = this.state;

    var itemarray = [];

    var orderItem = selectedLunchOrderItem.orderItem;

    for (let i = 0; i < orderItem.length; i++) {
      itemarray.push(
        <tr>
          <td style={{ textAlign: "start" }}>
            <p
              style={{
                marginBottom: 5,
                fontWeight: "500",
                color: color.primary,
                overflow: "hidden"
              }}
            >
              {orderItem[i].title}
            </p>

            <p
              style={{
                fontStyle: "italic",
                marginBottom: 5,
                textSize: 13,
                opacity: 0.7
              }}
            >
             {orderItem[i].descrip}
            </p>
          </td>

          <td style={{ width: "20%", textAlign: "start" }}>
            €{Number(orderItem[i].totalprice).toFixed(2)}
          </td>
        </tr>
      );
    }

    return <tbody>{itemarray}</tbody>;
  }

  rendeSelectedLunchOrderItems() {
    const { selectedLunchOrderItem } = this.state;
    return (
      <div style={{ textAlign: "start" }}>
        <Table responsive className="mb-0 d-none d-sm-table">
          <thead className="thead-light">
            <tr>
              <th>Item</th>
              <th>Price</th>
            </tr>
          </thead>
          {this.renderSelectedLunchOrderTableItems()}
        </Table>

        <Table borderless>
          <tbody>
            <tr>
              <td style={{ fontSize: 16, textAlign: "start" }}>
                Ordered Date
              </td>
              <td style={{ fontSize: 16, textAlign: "end" }}>
                {moment(selectedLunchOrderItem.createdAt).format("DD MMM, YYYY")}
              </td>
            </tr>
          </tbody>
        </Table>

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
                €{Number(selectedLunchOrderItem.totalOrderPrice).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

  renderLunchOrderModal() {
    const { selectedLunchOrderItem } = this.state;
    return (
      <Modal
        isOpen={this.state.orderLunchModal}
        toggle={() => this.toggleLunchOrderModal()}
      >
        <ModalHeader toggle={() => this.toggleLunchOrderModal()}>
          Order #{selectedLunchOrderItem._id}
        </ModalHeader>
        <ModalBody>{this.rendeSelectedLunchOrderItems()}</ModalBody>
        <ModalFooter style={{padding: 0}}>
        
          {selectedLunchOrderItem.orderStatus === "pending" ? 
          <Button style={{opacity: 1, padding: 10, fontSize: 17, fontWeight: '600'}} disabled block color="secondary">
            Pending
          </Button>
          :
          selectedLunchOrderItem.orderStatus === "accepted" ? 
          <Button style={{opacity: 1, padding: 10, fontSize: 17, fontWeight: '600'}} disabled block color="success">
            Accepted
          </Button>
          :
          selectedLunchOrderItem.orderStatus === "rejected" ? 
          <Button style={{opacity: 1, padding: 10, fontSize: 17, fontWeight: '600'}} disabled block color="danger">
            Rejected
          </Button>
          : 
          null
          }
         
        </ModalFooter>
      </Modal>
    );
  }

  renderLunchTableItems() {
    var itemarray = [];

    var tableitems = this.state.lunchtableitems;

    for (let i = 0; i < tableitems.length; i++) {
      itemarray.push(
        <tr style={{cursor: 'pointer'}} onClick={() => this.lunchTableItemClicked(tableitems[i]._id)}>
          <td>{tableitems[i]._id}</td>
          <td>{moment(tableitems[i].createdAt).format("DD MMM, YYYY")}</td>
          <td>{tableitems[i].orderItem[0].title}</td>
          <td>{Number(tableitems[i].totalOrderPrice).toFixed(2)}</td>
          <td>
            <Badge
              color=
              {
                  tableitems[i].orderStatus === "pending"
                  ? "warning"
                  : tableitems[i].orderStatus === "accepted"
                  ? "success"
                  : tableitems[i].orderStatus === "rejected"
                  ? "danger"
                  : "secondary"
              }
            >
              {this.capitalizeFirstLetter(tableitems[i].orderStatus)}
            </Badge>
          </td>
        </tr>
      );
    }

    return <tbody>{itemarray}</tbody>;
  }

  renderOrderItems(index) {
    var orderitemarray = [];

    var orderitems = this.state.tableitems[index].orderItem;

    for (let i = 0; i < orderitems.length; i++) {
      orderitemarray.push(
        <Row>
          <Label>
            {orderitems[i].quantity} x {orderitems[i].title}
          </Label>
        </Row>
      );
    }

    return <td>{orderitemarray}</td>;
  }

  renderTableItems() {
    var itemarray = [];

    var tableitems = this.state.tableitems;

    for (let i = 0; i < tableitems.length; i++) {
      itemarray.push(
        <tr style={{cursor: 'pointer'}} onClick={() => this.tableItemClicked(tableitems[i]._id)}>
          <td>{tableitems[i]._id}</td>
          <td>{moment(tableitems[i].createdAt).format("DD MMM, YYYY")}</td>
          <td>{tableitems[i].deliverytime}</td>
          <td>{moment(tableitems[i].deliverydate).format("DD MMM, YYYY")}</td>
          <td>{this.capitalizeFirstLetter(tableitems[i].orderType)}</td>
          <td>{tableitems[i].deliveryaddress}</td>
          {this.renderOrderItems(i)}
          <td>{Number(tableitems[i].totalOrderPrice).toFixed(2)}</td>
          <td>
            <Badge
              color=
              {
                  tableitems[i].orderStatus === "pending"
                  ? "warning"
                  : tableitems[i].orderStatus === "accepted"
                  ? "success"
                  : tableitems[i].orderStatus === "rejected"
                  ? "danger"
                  : "secondary"
              }
            >
              {this.capitalizeFirstLetter(tableitems[i].orderStatus)}
            </Badge>
          </td>
        </tr>
      );
    }

    return <tbody>{itemarray}</tbody>;
  }

  
  renderEmptyItems() {
    return (
      <Row style={{ marginTop: 90 }}>
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
              "https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/empty.png"
            }
          />
        </Col>
        <Col style={{ textAlign: "center" }} xs="12">
          <p
            style={{ fontSize: 18, letterSpacing: 2, marginTop: 30 }}
            className="big"
          >
            You have 0 items ordered.
          </p>
        </Col>
      </Row>
    );
  }

  renderLunchTable() {
    return (
      <div>
        <Table striped responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Ordered Date</th>
              <th>Items</th>
              <th>Price (€)</th>
              <th>
                <Row style={{marginLeft: 0}}> 
                  Status
                  <Dropdown isOpen={this.state.dropDownStatusForLunch} toggle={() => this.toggleStatusForLunch()} size="sm">
                    <DropdownToggle style={{margin:0, padding:0, paddingRight: 5, backgroundColor: 'white', borderWidth: 0}} caret />
                    <DropdownMenu>
                      <DropdownItem>Pending</DropdownItem>
                      <DropdownItem>Accepted</DropdownItem>
                      <DropdownItem>Rejected</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Row>
              </th>
              
            </tr>
          </thead>

          {this.state.lunchempty ? null : this.renderLunchTableItems()}
        </Table>
        {this.state.lunchempty ? this.renderEmptyItems() : null }
      </div>
    );
  }

  renderTable() {
    return (
      <div>
        <Table striped responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Ordered Date</th>
              <th>Delivery Time</th>
              <th>Delivery Date</th>
              <th>
                <Row style={{marginLeft: 0}}> 
                  Type
                  <Dropdown isOpen={this.state.dropDownType} toggle={() => this.toggleType()} size="sm">
                    <DropdownToggle style={{margin:0, padding:0, paddingRight: 5, backgroundColor: 'white', borderWidth: 0}} caret />
                    <DropdownMenu>
                      <DropdownItem onClick={() => alert('Delivery Clicked')}>Delivery</DropdownItem>
                      <DropdownItem onClick={() => alert('Pickup Clicked')}>Pickup</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Row>
              </th>
              <th>Delivery Address</th>
              <th>Items</th>
              <th>Price (€)</th>
              <th>
                <Row style={{marginLeft: 0}}> 
                  Status
                  <Dropdown isOpen={this.state.dropDownStatus} toggle={() => this.toggleStatus()} size="sm">
                    <DropdownToggle style={{margin:0, padding:0, paddingRight: 5, backgroundColor: 'white', borderWidth: 0}} caret />
                    <DropdownMenu>
                      <DropdownItem onClick={() => alert('Pending Clicked')}>Pending</DropdownItem>
                      <DropdownItem onClick={() => alert('Accepted Clicked')}>Accepted</DropdownItem>
                      <DropdownItem onClick={() => alert('Rejected Clicked')}>Rejected</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Row>
              </th>
              
            </tr>
          </thead>

          {this.state.empty ? null : this.renderTableItems()}
        </Table>
        {this.state.empty ? this.renderEmptyItems() : null }
      </div>
    );
  }

  navItemClicked = (selectedMenu) => {
    this.setState({
      selectedOrderTable: selectedMenu,
    });
  };

  renderNavItem(menutitle) {
    return (
      <NavItem>
        <NavLink
          onClick={() => this.navItemClicked(menutitle)}
          style={{
            cursor: 'pointer',
            paddingRight: 20,
            paddingLeft: menutitle === "Lunch Orders" ? 0 : 20,
            fontWeight: "600",
            color: this.state.selectedOrderTable === menutitle ? color.secondary : "black",
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
              this.state.selectedOrderTable === menutitle ? color.secondary : "transparent"
          }}
        />
      </NavItem>
    );
  }

  render() {
    return (
      <Row>
        <Col style={{marginLeft: 20, marginRight: 20}} xs="12">
          <Nav className="float-left" pills>
            {this.renderNavItem("Lunch Orders")}
            {this.renderNavItem("Catering Orders")}
          </Nav>
        </Col>
        {this.state.selectedOrderTable === "Lunch Orders" ?
        <Col style={{marginTop: 20, marginLeft: 20, marginRight: 20}} xs="12">
        <Card>
          <CardHeader>
            <Row >
              <Col>
                <Label style={{ marginTop: 10 }} className="h6">
                  Lunch Orders
                </Label>
              </Col>
              
            </Row>
          </CardHeader>
          <CardBody>
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              {this.renderLunchTable()
               }
            </div>
            <UncontrolledDropdown style={{marginTop: 10}} isOpen={this.state.dropDownDateForLunch}  toggle={() => this.toggleDropDownForLunch()}>
              <DropdownToggle
                style={{
                  color: "#fff",
                  borderColor: "#fff",
                  backgroundColor: color.primary
                }}
                caret
              >
                {this.state.dateRangeForLunch}
              </DropdownToggle>
              <DropdownMenu>
                <div >
                  <DateRange
                     onChange={this.handleRangeChangeForLunch.bind(this, 'dateRangePickerForLunch')}
                     showSelectionPreview={true}
                     moveRangeOnFirstSelection={false}
                     className={'PreviewArea'}
                     months={1}
                     ranges={[this.state.dateRangePickerForLunch.selection]}
                     direction="horizontal"
                     maxDate={this.state.maxDate}
                  />
                  
                </div>
                 <div className="float-right">
                  {this.renderDateActionForLunch()}     
                 </div>
              </DropdownMenu>
            </UncontrolledDropdown>
          </CardBody>
        </Card>
      </Col>
      :
      <Col style={{marginTop: 20, marginLeft: 20, marginRight: 20}} xs="12">
        <Card>
          <CardHeader>
            <Row >
              <Col>
                <Label style={{ marginTop: 10 }} className="h6">
                  Catering Orders
                </Label>
              </Col>
              
            </Row>
          </CardHeader>
          <CardBody>
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              {this.renderTable()
               }
            </div>
            <UncontrolledDropdown style={{marginTop: 10}} isOpen={this.state.dropDownDate}  toggle={() => this.toggleDropDown()}>
              <DropdownToggle
                style={{
                  color: "#fff",
                  borderColor: "#fff",
                  backgroundColor: color.primary
                }}
                caret
              >
                {this.state.dateRange}
              </DropdownToggle>
              <DropdownMenu>
                <div >
                  <DateRange
                     onChange={this.handleRangeChange.bind(this, 'dateRangePicker')}
                     showSelectionPreview={true}
                     moveRangeOnFirstSelection={false}
                     className={'PreviewArea'}
                     months={1}
                     ranges={[this.state.dateRangePicker.selection]}
                     direction="horizontal"
                     maxDate={this.state.maxDate}
                  />
                  
                </div>
                 <div className="float-right">
                  {this.renderDateAction()}     
                 </div>
              </DropdownMenu>
            </UncontrolledDropdown>
          </CardBody>
        </Card>
      </Col>}
      {this.state.selectedOrderItem !== null ? this.renderOrderModal() : null}
      {this.state.selectedLunchOrderItem !== null ? this.renderLunchOrderModal() : null}
    </Row>
    );
  }
}

export default Order;
