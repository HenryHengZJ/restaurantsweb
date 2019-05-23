import React, { Component } from "react";
import { Row, Col, Card, Container, CardBody, Table, Label } from "reactstrap";

class Benefit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      benefits: [
        {
          title: "Search & Filter",
          descrip: "You can search and filter from wide range of caterers",
          src:
            "https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/search1.png"
        },
        {
          title: "Online Payment",
          descrip: "Seamless online payment gateway integrated.",
          src:
            "https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/bank1.png"
        },
        {
          title: "Quick Ordering",
          descrip: "Easy repeat order from your past favourite caterers.",
          src:
            "https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/delivery.png"
        },
        {
          title: "Free membership",
          descrip: "Free lifetime membership. No hidden charges.",
          src:
            "https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/membership.png"
        },
        {
          title: "Tech Driven",
          descrip:
            "Optimized platform and algorithm to bring ultimate convenience",
          src:
            "https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/performance.png"
        },
        {
          title: "24/7 Support",
          descrip: "We are here to help you and your customers anytime.",
          src:
            "https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/support.png"
        }
      ]
    };
  }

  renderItems() {
    var itemsarray = [];

    var benefits = this.state.benefits;

    for (let i = 0; i < benefits.length; i++) {
      itemsarray.push(
        <Col xs="12" sm="6" md="4" lg="4">
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
          backgroundColor: "white",
          paddingTop: 50,
          paddingBottom: 100
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
              <h2 style={{ fontSize: 34 }}>Why Us</h2>
            </Col>

            {this.renderItems()}
          </Row>
        </Container>
      </section>
    );
  }
}

export default Benefit;
