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
import moment from "moment";
import { DateRangePicker, DateRange } from 'react-date-range';
import {server} from "../../config"
import { format, addDays, subDays } from 'date-fns';

class Order extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orderModal: false,
      selectedOrderItem: null,
      empty: false,
      maxDate: null,
      currentDate: null,
      previousDate: null,
      dropDownDate: false,
      dropDownStatus: false,
      dropDownType: false,
      dateRangePicker: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      },
      dateArray: [],
      dateRange: '',
      tableitems: [
         /* {
          orderID: "334567",
          time: "29 Aug, 2018, 4:35PM",
          orderitems: [
              {
              title: "Chicken Masala Platter",
              quantity: "2"
              },
              {
              title: "Fish & Chips Catering",
              quantity: "2"
              }
          ],
          totalprice: "89.00",
          ordertype: "Delivery",
          status: "pending",
          payment: "Cash",
          catererName: "Madam Mok Restaurant"
          },
          {
          orderID: "111423",
          time: "27 Aug, 2018, 8:20PM",
          orderitems: [
              {
              title: "Tan tan chicken",
              quantity: "1"
              }
          ],
          totalprice: "25.99",
          ordertype: "Delivery",
          status: "accepted",
          payment: "Card",
          catererName: "Flannerys Pub"
          },
          {
          orderID: "178123",
          time: "26 Aug, 2018, 11:37AM",
          orderitems: [
              {
              title: "Pasta Chili",
              quantity: "1"
              }
          ],
          totalprice: "15.00",
          ordertype: "Pickup",
          status: "accepted",
          payment: "Cash",
          catererName: "Wok King"
          },
          {
          orderID: "178123",
          time: "21 Aug, 2018, 5:35PM",
          orderitems: [
              {
              title: "Sandwich Trio Platter",
              quantity: "1"
              },
              {
              title: "Croissant Combo",
              quantity: "3"
              }
          ],
          totalprice: "65.50",
          ordertype: "Pickup",
          status: "rejected",
          payment: "Cash",
          catererName: "Yammamori Japanese Cuisine"
          },
          {
          orderID: "775421",
          time: "20 Aug, 2018, 7:21PM",
          orderitems: [
              {
              title: "Irish Sunrise Breakfast",
              quantity: "2"
              },
          ],
          totalprice: "25.00",
          ordertype: "Pickup",
          status: "cancelled",
          payment: "Card",
          catererName: "Bar Grill Pub"
          }*/
      ],
    };
  }

  getSessionStorage = () => {
    
    var currentDateString;
    var previousDateString;

    var currentDateString = sessionStorage.getItem("currentOrderDateString")
    var previousDateString = sessionStorage.getItem("previousOrderDateString")

    this.getOrder(currentDateString, previousDateString)
    
  }

  componentDidMount() {

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

  getOrder = (currentDateString, previousDateString) => {
    
    var finalOrderSelectionDateString = previousDateString + ' - ' + currentDateString
  
    var headers = {
      'Content-Type': 'application/json',
    }

    var url = apis.GETorder + "?lteDate=" + currentDateString + "&gteDate=" + previousDateString;

    //var url = `${server}${apis.GETorder}?lteDate=${currentDateString}&gteDate=${previousDateString}`
    console.log('getorderurl = ', url)

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

  toggleDropDown = () => {
    this.setState({
      dropDownDate: !this.state.dropDownDate
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


  handleRangeChange(which, payload) {
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload,
      },
    })
  }

  selectDateRange = () => {
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

  tableItemClicked = (_id) => {
    
    var itemindex = this.state.tableitems.findIndex(x => x._id == _id);

    this.setState({
      selectedOrderItem: this.state.tableitems[itemindex]
    }, () => {
      this.toggleOrderModal()
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

  renderDateAction() {
    return (
      <Row style={{marginBottom: 10, marginRight: 10}}>
        <Col>
        
        <Button
          style={{ marginLeft: 10 }}
          outline
          color="primary"
          onClick={() => this.selectDateRange()}
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
                color: "#20a8d8",
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
                borderColor: "#20a8d8"
              }}
            >
              <CardBody style={{ margin: 0, padding: 10 }}>
                <h6
                  style={{
                    marginTop: 5,
                    textAlign: "center",
                    color: "#20a8d8"
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

  render() {
    return (
      <Row>
      <Col>
        <Card>
          <CardHeader>
            <Row >
              <Col>
                <Label style={{ marginTop: 10 }} className="h6">
                  Orders
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
                  backgroundColor: "#20a8d8"
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
      </Col>
      {this.state.selectedOrderItem !== null ? this.renderOrderModal() : null}
    </Row>
    );
  }
}

export default Order;
