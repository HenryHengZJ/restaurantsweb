import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Container,
  CardBody,
  Table,
  Label,
  Button
} from "reactstrap";

class ContactInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      benefits: [
        {
          title: "Call",
          descrip: "+353 83 1861716",
          src:
            "https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/contact_phone.png"
        },
        {
          title: "Text",
          descrip: "+353 83 1861716",
          src:
            "https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/contact_text.png"
        },
        {
          title: "Email",
          descrip: "foodiebeeie@gmail.com",
          src:
            "https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/contact_email.png"
        }
      ]
    };
  }

  openEmail = () => {
    window.location.href = `mailto:support@foodiebee.com`;
  };

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
              {benefits[i].title === "Call" ? (
                <span>
                  <a
                    style={{ fontWeight: "500", color: "#20a8d8" }}
                    href="tel:+353831861716"
                  >
                    {benefits[i].descrip}
                  </a>
                </span>
              ) : benefits[i].title === "Text" ? (
                <span>
                  <a
                    style={{ fontWeight: "500", color: "#20a8d8" }}
                    href="tel:+353831861716"
                  >
                    {benefits[i].descrip}
                  </a>
                </span>
              ) : benefits[i].title === "Email" ? (
                <Button
                  color="link"
                  onClick={() => this.openEmail()}
                  style={{
                    fontWeight: "500",
                    color: "#20a8d8",
                    padding: 0,
                    margin: 0
                  }}
                >
                  <p style={{ padding: 0, margin: 0 }}>support@foodiebee.com</p>
                </Button>
              ) : null}
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
        id="ContactInfo"
        className="white"
      >
        <Container>
          <Row
            style={{ paddingTop: 20, flex: 1, display: "flex" }}
            className="justify-content-center"
          >
            <Col xs="12" style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: 34 }}>Our Contacts</h2>
            </Col>

            {this.renderItems()}
          </Row>
        </Container>
      </section>
    );
  }
}

export default ContactInfo;
