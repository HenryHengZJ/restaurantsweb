import React, { Component } from "react";
import { Row, Col, Card, Container, CardBody, Table, Label } from "reactstrap";
import "./styles.css";

class Benefit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      benefits: [
        {
          title: "Orders management",
          descrip:
            "We help you to organize your orders, sales, customers, etc.",
          src: require("../../assets/img/orders.png")
        },
        {
          title: "Performance Analytics",
          descrip: "Have insight into how well your dishes are selling",
          src: require("../../assets/img/performance.png")
        },
        {
          title: "Feedback & Review",
          descrip: "Know your customers' thoughts of your restaurant",
          src: require("../../assets/img/feedback.png")
        },
        {
          title: "Free membership",
          descrip: "Free lifetime membership. No hidden charges.",
          src: require("../../assets/img/membership.png")
        },
        {
          title: "Wider audience",
          descrip: "Your restaurant will be exposed to a wider audience",
          src: require("../../assets/img/audience.png")
        },
        {
          title: "24/7 Support",
          descrip: "We are here to help you and your customers anytime.",
          src: require("../../assets/img/support.png")
        }
      ]
    };
  }

  renderItems() {
    var itemsarray = [];

    var benefits = this.state.benefits;

    for (let i = 0; i < benefits.length; i++) {
      itemsarray.push(
        <Col xs="10" sm="6" md="4" lg="4">
          <Card
            style={{
              backgroudColor: "white",
              boxShadow: "0px 2px 2px #9E9E9E",
              marginTop: 30
            }}
          >
            <CardBody>
              <img
                style={{ objectFit: "cover", width: 40, height: 40 }}
                src={benefits[i].src}
              />
              <h6 style={{ marginTop: 20, fontWeight: "600", fontSize: 17 }}>
                {benefits[i].title}
              </h6>
              <span>{benefits[i].descrip}</span>
            </CardBody>
          </Card>
        </Col>
      );
    }

    return (
      <Row
        style={{
          marginTop: 20,
          flex: 1,
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {itemsarray}
      </Row>
    );
  }

  render() {
    return (
      <section
        style={{
          backgroundColor: "rgba(211,211,211,0.1)",
          paddingTop: 50,
          paddingBottom: 50
        }}
        id="Benefit"
        className="white"
      >
        <Container>
          <Row
            style={{ paddingTop: 20, flex: 1, display: "flex" }}
            className="justify-content-center"
          >
            <Col xs="12" style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: 34 }}>Why Join FoodieBee</h2>
            </Col>

            {this.renderItems()}
          </Row>
        </Container>
      </section>
    );
  }
}

export default Benefit;
