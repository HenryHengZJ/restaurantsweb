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
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Dotdotdot from "react-dotdotdot";
import ContentLoader, { Facebook } from "react-content-loader";
import StarRatingComponent from "react-star-rating-component";
import Router from 'next/router'
import StarRatings from 'react-star-ratings';

const glutenfreeIcon = '/static/glutenfree1.png';
const hotIcon = '/static/fire.png';
const spicyIcon = '/static/pepper.png';
const vegeIcon = '/static/lettuce.png';
const healthyIcon = '/static/fruit.png';
const halalicon = '/static/halalsign.png';
const closeIcon = '/static/close.png';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      updateCartItem: false,
      selectedPrice: 0,
      selectedSelection: [],
      selectedQuantity: 1,
      activeMenu: null,
      specialInstructionOpen: false,
      specialInstruction: '',
      menuModalOpen: false,
      selectedMenu: "Account Info",
      menuDropDownOpen: false,
      deliveryaddresses: [
        {
          fulladdress: "301, the Windmill, Dock Road",
          county: "Limerick"
        },
        {
          fulladdress: "304, Harveys Quay",
          county: "Limerick"
        }
      ],
      menutitle: [
        "Account Info",
        "Orders",
        "Payment Methods",
        "Delivery Addresses",
        "Reviews",
      ], 
      review: [
        {
          catererName: "Madam Mok Restaurant",
          comment: "Everyone was very happy. Hearty sandwiches. Very nice dessert sandwiches",
          time: "5 days ago",
          rating: 5,
        },
        {
          catererName: "Flannerys Pub",
          comment: "The food smelled pretty good and staff seemed excited because they eat there on their own time. The only downside is they delivered 45 mins. early, which is better than being late. I guess it didn't matter much since we did sandwiches and not something that would be bad if it got cold (i.e., pasta or other hot entree).",
          time: "7 days ago",
          rating: 4,
        },
        {
          catererName: "Wok King",
          comment: "Food is on time, great experience, food is delicious",
          time: "8 days ago",
          rating: 5,
        },
        {
          catererName: "Yammamori Japanese Cuisine",
          comment: "The food was delicious and the presentation looked great. Perfect portions. We will order again!",
          time: "15 days ago",
          rating: 4,
        },
        {
          catererName: "Irish Sunrise Breakfast",
          comment: "First time ordering from Italian Gourmet for this group. Everything was a big hit--even though they were a bit early.",
          time: "1 month ago",
          rating: 5,
        },
      ],
      tableitems: [
        {
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
        }
      ],
      restaurantInfo: {
        name: "Flannery Restaurant & Pub",
        profileimg: "https://www.psdgraphics.com/wp-content/uploads/2016/08/restaurant-logo.png",
        coverimg: "http://www.fedracongressi.com/fedra/wp-content/uploads/2016/09/minisandwich.jpg",
        descrip: "Specialized in American Burger style mealset. Our American subs are our specialty, and our Special Grileld with spiced capicola and prosciuttini is the number one customer favorite. Our portions won't leave your stomachs rumbling, and our flavors always go down easy.",
        address: "30, O'Connell St, Dublin, Ireland",
        rating: "4.7",
        numofreview: "150",
        workinghours: "Mon-Fri: 10am-3pm",
        deliveryfee: 3,
        minspending: 50
      }
    };
  }

  componentDidMount() {
    
  }


  signIn(e) {
    e.preventDefault();
    Router.push({
      pathname: '/login'
    })
  }

  navItemClicked = (selectedMenu) => {
    this.setState({
      selectedMenu: selectedMenu,
      menuDropDownOpen: false
    });
  };

  ////////////////////////////////////////////////Render////////////////////////////////////////////////////////
  
  renderNavItem(menutitle) {
    return (
      <NavItem>
        <NavLink
          onClick={() => this.navItemClicked(menutitle)}
          style={{
            cursor: 'pointer',
            paddingRight: 20,
            paddingLeft: menutitle === "Account Info" ? 0 : 20,
            fontWeight: "600",
            color: this.state.selectedMenu === menutitle ? "#20a8d8" : "black",
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
              this.state.selectedMenu === menutitle ? "#20a8d8" : "transparent"
          }}
        />
      </NavItem>
    );
  }

  renderAccountInfo() {
    return (
      <Row style={{flex: 1, display: 'flex'}} >
        <Col style={{  paddingLeft:40, marginTop: 10, marginBottom: 20 }} xs="12">
          <b className="h5">Account Info</b>
        </Col>
        <Col md="9" lg="7" xl="6">
          <Card  style={{boxShadow: 'none', borderWidth: 0}} >
            <CardBody className="p-4">
              <Form>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <a style={{color: 'gray', marginLeft: 2.5, marginRight: 2.5}} className="fa fa-user"></a>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" placeholder="First Name" autoComplete="firstname" />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <a style={{color: 'gray', marginLeft: 2.5, marginRight: 2.5}} className="fa fa-user"></a>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" placeholder="Last Name" autoComplete="lastname" />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>@</InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" placeholder="Email" autoComplete="email" />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <a style={{color: 'gray', marginLeft: 2.5, marginRight: 2.5}} className="fa fa-phone"></a>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="phone" placeholder="Phone Number" autoComplete="phone" />
                </InputGroup>

                <Col style={{  padding: 0, marginTop: 50, marginBottom: 40 }} xs="12">
                  <b className="h5">Reset Password</b>
                </Col>

                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <a style={{color: 'gray', marginLeft: 2.5, marginRight: 2.5}} className="fa fa-lock"></a>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" placeholder="Current Password" autoComplete="new-password" />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <a style={{color: 'gray', marginLeft: 2.5, marginRight: 2.5}} className="fa fa-lock"></a>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" placeholder="New Password" autoComplete="new-password" />
                </InputGroup>
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <a style={{color: 'gray', marginLeft: 2.5, marginRight: 2.5}} className="fa fa-lock"></a>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" placeholder="Repeat New Password" autoComplete="repeat-password" />
                </InputGroup>
                <Button style={{marginTop:20, paddingTop:10, paddingBottom: 10}} color="success" block>Update Profile</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }

  renderDeliveryAddresses() {
    return (
      <Row style={{flex: 1, display: 'flex'}} >
        <Col style={{  paddingLeft:40, marginTop: 10, marginBottom: 20 }} xs="12">
          <b className="h5">Delivery Addresses</b>
        </Col>
        <Col xs="12">
          <Card  style={{boxShadow: 'none', borderWidth: 0}} >
            <CardBody >
              <Form>
                {this.renderAddressesItem()}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }

  renderAddressesItem() {
    var itemsarray = [];

    var deliveryaddresses = this.state.deliveryaddresses

    for (let i = 0; i < deliveryaddresses.length; i++) {
      itemsarray.push(
        <Col xs="12" md="4">
        <Card  style={{marginBottom: 40, boxShadow: '1px 1px 3px #9E9E9E'}}  className="p-4">
          <CardBody style={{margin:0, padding:0, }} >

            <b>{deliveryaddresses[i].county}</b>

            <div style={{marginTop: 10, marginBottom:20}}><Label>{deliveryaddresses[i].fulladdress}</Label></div>

            <Row>
              <Col xs="6">
                <Button style={{paddingTop:10, paddingBottom: 10, fontWeight: '600'}} outline color="success" block>Make Default</Button>
              </Col>
              <Col xs="6">
                <Button style={{paddingTop:10, paddingBottom: 10, fontWeight: '600'}} outline color="primary" block>Edit</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        </Col>
      )
    }

    return (
      <Row>
        {itemsarray}
        <Col xs="12">
          <Button style={{paddingTop:10, paddingBottom: 10}} color="primary" >Add Delivery Address</Button>
        </Col>
      </Row>
    ); 
  }


  renderPaymentMethods() {
    return (
      <Row style={{flex: 1, display: 'flex'}} >
        <Col style={{  paddingLeft:40, marginTop: 10, marginBottom: 20 }} xs="12">
          <b className="h5">Payment Methods</b>
        </Col>
        <Col xs="12">
          <Card  style={{boxShadow: 'none', borderWidth: 0}} >
            <CardBody >
              <Form>
                {this.renderPaymentCard()}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }

  renderPaymentCard() {
    var itemsarray = [];

    var review = this.state.review

    for (let i = 0; i < 2; i++) {
      itemsarray.push(
        <Col xs="12" md="6">
        <Card  style={{marginBottom: 40, boxShadow: 'none', borderWidth: 0}} >
          <CardBody style={{margin:0, padding:0, }} >
            <img style={{objectFit:'cover', width: 80, height: 45 }} src={"/static/visa.png"}  />
            <div style={{ marginTop: 20 }}>
              <Table borderless responsive>
                <tbody>
                  <tr>
                    <td >Cardholder name:</td>
                    <td className="h6">Heng Zhen</td>
                  </tr>
                  <tr>
                    <td >Card number</td>
                    <td className="h6">&#9679;&#9679;&#9679;&#9679; 4567</td>
                  </tr>
                  <tr>
                    <td >Expiration date:</td>
                    <td className="h6">09 / 2023</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <Row>
              <Col xs="6">
                <Button style={{paddingTop:10, paddingBottom: 10, fontWeight: '600'}} outline color="success" block>Make Default</Button>
              </Col>
              <Col xs="6">
                <Button style={{paddingTop:10, paddingBottom: 10, fontWeight: '600'}} outline color="primary" block>Edit</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        </Col>
      )
    }

    return (
      <Row>
        {itemsarray}
        <Col xs="12">
          <Button style={{paddingTop:10, paddingBottom: 10}} color="primary" >Add Payment Card</Button>
        </Col>
      </Row>
    ); 
  }

  renderOrderItems(index) {
    var orderitemarray = [];

    var orderitems = this.state.tableitems[index].orderitems;

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

  renderOrderTableItems() {
    var itemarray = [];

    var tableitems = this.state.tableitems;

    for (let i = 0; i < tableitems.length; i++) {
      itemarray.push(
        <tr>
          <td>{tableitems[i].orderID}</td>
          <td>{tableitems[i].catererName} </td>
          <td>{tableitems[i].time}</td>
          {this.renderOrderItems(i)}
          <td>{tableitems[i].totalprice}</td>
          <td>{tableitems[i].ordertype}</td>
          <td>
            <Badge
              color=
              {
                  tableitems[i].status === "pending"
                  ? "warning"
                  : tableitems[i].status === "accepted"
                  ? "success"
                  : tableitems[i].status === "rejected"
                  ? "danger"
                  : "secondary"
              }
            >
              {tableitems[i].status}
            </Badge>
          </td>
        </tr>
      );
    }

    return <tbody>{itemarray}</tbody>;
  }

  renderOrderTable() {
    return (
      <Row style={{flex: 1, display: 'flex'}} >
        <Col style={{ paddingLeft:40, marginTop: 10, marginBottom: 20 }} xs="12">
          <b className="h5">Orders</b>
        </Col>
        <Col style={{ marginTop:20, paddingLeft:40, paddingRight:40}} xs="12">
          <Table striped responsive>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Caterer</th>
                <th>Time</th>
                <th>Items</th>
                <th>Price (€)</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>

            {this.renderOrderTableItems()}
          </Table>
        </Col>
      </Row>
    );
  }

  renderReviewTableItems() {
    var itemarray = [];

    var tableitems = this.state.review;

    for (let i = 0; i < tableitems.length; i++) {
      itemarray.push(
        <tr>
          <td style={{width: '10%'}}>{tableitems[i].catererName}</td>
          <td style={{width: '15%'}}>{tableitems[i].time}</td>
          <td style={{width: '15%'}}>
            <StarRatings
              starRatedColor='orange'
              starSpacing='0px'
              starDimension='15px'
              rating={tableitems[i].rating}
              numberOfStars={5}
              name='rating'
            />
          </td>
          <td style={{width: '45%'}}>{tableitems[i].comment}</td>
        </tr>
      );
    }

    return <tbody>{itemarray}</tbody>;
  }

  renderReviewTable() {
    return (
      <Row style={{flex: 1, display: 'flex'}} >
        <Col style={{ paddingLeft:40, marginTop: 10, marginBottom: 20 }} xs="12">
          <b className="h5">Reviews</b>
        </Col>
        <Col style={{ marginTop:20, paddingLeft:40, paddingRight:40}} xs="12">
          <Table striped responsive>
            <thead>
              <tr>
                <th>Caterer</th>
                <th>Time</th>
                <th>Rating</th>
                <th>Comment</th>
              </tr>
            </thead>

            {this.renderReviewTableItems()}
          </Table>
        </Col>
      </Row>
    );
  }


  render() {
    const menutitlelength = this.state.menutitle.length;

    return (
      <Layout title={this.state.restaurantInfo.name + ' Caterer Detail FoodieBee - Catering Service'}>
      <div style={{backgroundColor: 'white'}}>
         <NavBar signIn={e=>this.signIn(e)}/>
      <div className="app align-items-center">

          <Container>
            <Row
              style={{ marginTop: 20, marginBottom: 50 }}
              className="justify-content-center"
            >
             

              <Col style={{ paddingLeft: 40, paddingRight: 40, marginTop: 30, marginBottom: 20 }} xs="12" md="12">
                <Nav className="float-left" pills>
                  {this.renderNavItem(this.state.menutitle[0])}
                  {this.renderNavItem(this.state.menutitle[1])}
                  {this.renderNavItem(this.state.menutitle[2])}
                  {this.renderNavItem(this.state.menutitle[3])}
                  {this.renderNavItem(this.state.menutitle[4])}
                </Nav>
              </Col>

              <Col style={{ marginTop: 20 }} xs="12" sm="12" md="12" lg="12">
                {this.state.selectedMenu === "Account Info" ? this.renderAccountInfo() :
                this.state.selectedMenu === "Orders" ? this.renderOrderTable() :
                this.state.selectedMenu === "Payment Methods" ? this.renderPaymentMethods() :
                this.state.selectedMenu === "Delivery Addresses" ? this.renderDeliveryAddresses() :
                this.state.selectedMenu === "Reviews" ? this.renderReviewTable() : null}
              </Col>
              
            </Row>

          </Container>
        </div>
        <Footer />
      </div>
      </Layout>
    );
  }
}

export default UserProfile;
