import React from "react";
import {
  Button,
  Row,
  Col,
  FormGroup,
  FormFeedback,
  Form,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Card,
  CardBody
} from "reactstrap";
import "./styles.css";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.handleRestaurantNameChange = this.handleRestaurantNameChange.bind(
      this
    );
    this.handleRestaurantPhoneNumber = this.handleRestaurantPhoneNumber.bind(
      this
    );
    this.handleRestaurantAddress = this.handleRestaurantAddress.bind(this);
    this.handleRestaurantEmail = this.handleRestaurantEmail.bind(this);

    this.state = {
      restaurantName: "",
      isNameEmpty: false,
      restaurantAddress: "",
      isAddressEmpty: false,
      restaurantEmail: "",
      isEmailEmpty: false,
      restaurantPhoneNumber: "",
      isPhoneNumberEmpty: false,
      isMobile: false
    };
  }

  componentDidMount() {
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
  }

  handleRestaurantNameChange(e) {
    this.setState({
      restaurantName: e.target.value,
      isNameEmpty: e.target.value === "" ? true : false
    });
  }

  handleRestaurantPhoneNumber(e) {
    if (isNaN(e.target.value)) {
      //Letters
    } else {
      //Valid Number
      this.setState({
        restaurantPhoneNumber: e.target.value,
        isPhoneNumberEmpty: e.target.value === "" ? true : false
      });
    }
  }

  handleRestaurantAddress(e) {
    this.setState({
      restaurantAddress: e.target.value,
      isAddressEmpty: e.target.value === "" ? true : false
    });
  }

  handleRestaurantEmail(e) {
    this.setState({
      restaurantEmail: e.target.value,
      isEmailEmpty: e.target.value === "" ? true : false
    });
  }

  onGetStartedClick = () => {
    alert(this.state.isMobile);
    const {
      restaurantName,
      restaurantPhoneNumber,
      restaurantEmail,
      restaurantAddress
    } = this.state;
    if (restaurantName === "") {
      this.setState({
        isNameEmpty: true
      });
    } else if (restaurantPhoneNumber === "") {
      this.setState({
        isPhoneNumberEmpty: true
      });
    } else if (restaurantEmail === "") {
      this.setState({
        isEmailEmpty: true
      });
    } else if (restaurantAddress === "") {
      this.setState({
        isAddressEmpty: true
      });
    }
  };

  render() {
    const { isMobile } = this.state;

    return (
      <section
        id="hero"
        style={{
          height: isMobile ? 800 : 600,
          marginTop: -70,
          backgroundImage: "url(" + '/static/caterer_wallpaper.png' + ")",
          backgroundSize: "cover"
        }}
      >
        <Row
          className="justify-content-center"
          style={{ margin: 0, display: "flex" }}
        >
          {isMobile ? null : <Col xs="1" />}
          <Col
            style={{
              textAlign: isMobile ? "center" : "start",
              marginTop: isMobile ? 50 : 150,
              color: "white"
            }}
            xs={isMobile ? "12" : "6"}
          >
            <h2 style={{ fontSize: 40 }}>Caterers, join us now!</h2>
            <h6 style={{ lineHeight:2, fontSize: 18, letterSpacing: 2, marginTop: 20 }}>
              Orders management, marketting channels, reviews and feedback.
              There are much more benefits when you join us.
            </h6>
          </Col>

          <Col style={{ marginTop: 50 }} xs={isMobile ? "10" : "4"}>
            <Card>
              <CardBody>
                <FormGroup>
                  <Label>Restaurant Name *</Label>
                  <Input
                    style={{ color: "black" }}
                    value={this.state.restaurantName}
                    onChange={e => this.handleRestaurantNameChange(e)}
                    type="text"
                    placeholder="Restaurant name"
                    invalid={this.state.isNameEmpty ? true : false}
                  />
                  <FormFeedback>Please enter restaurant name</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Address *</Label>
                  <Input
                    style={{ color: "black" }}
                    value={this.state.restaurantAddress}
                    onChange={e => this.handleRestaurantAddress(e)}
                    type="text"
                    placeholder="Restaurant address"
                    invalid={this.state.isAddressEmpty ? true : false}
                  />
                  <FormFeedback>Please enter restaurant address</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Email *</Label>
                  <Input
                    style={{ color: "black" }}
                    value={this.state.restaurantEmail}
                    onChange={e => this.handleRestaurantEmail(e)}
                    type="text"
                    placeholder="Owner email address"
                    invalid={this.state.isEmailEmpty ? true : false}
                  />
                  <FormFeedback>Please enter owner email address</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Phone Number *</Label>
                  <Input
                    style={{ color: "black" }}
                    value={this.state.restaurantPhoneNumber}
                    onChange={e => this.handleRestaurantPhoneNumber(e)}
                    type="text"
                    placeholder="Owner phone number"
                    invalid={this.state.isPhoneNumberEmpty ? true : false}
                  />
                  <FormFeedback>Please enter owner phone number</FormFeedback>
                </FormGroup>
                <Button
                  style={{ marginTop: 30, paddingTop: 10, paddingBottom: 10 }}
                  color="primary"
                  block
                  onClick={() => this.onGetStartedClick()}
                >
                  Get Started
                </Button>
              </CardBody>
            </Card>
          </Col>
          {isMobile ? null : <Col xs="1" />}
        </Row>
      </section>
    );
  }
}

Banner.propTypes = propTypes;
Banner.defaultProps = defaultProps;

export default Banner;
