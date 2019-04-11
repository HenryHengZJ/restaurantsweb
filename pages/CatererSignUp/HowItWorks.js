import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import "./styles.css";

class HowItWorks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section
        style={{ backgroundColor: "white" }}
        id="features"
        className="white"
      >
        <Container>
          <Row
            style={{ marginTop: 20, flex: 1, display: "flex" }}
            className="justify-content-center"
          >
            <Col xs="12" style={{ textAlign: "center" }}>
              <h2
                style={{
                  textAlign: "center",
                  fontSize: 34,
                  paddingLeft: 10,
                  paddingRight: 10
                }}
              >
                How It Works for Cateres
              </h2>
            </Col>

            <Col style={{ marginTop: 30 }} xs="12" />

            <Col xs="6" md="3" style={{ marginTop: 30, textAlign: "center" }}>
              <img
                style={{ objectFit: "cover", width: 80, height: 80 }}
                src={"/static/register.png"}
              />
              <h6 style={{ fontWeight: "600", fontSize: 18, marginTop: 20 }}>
                Register Account
              </h6>
              <span>
                Reach out to our support team via phone or email to register a
                caterer's account.
              </span>
            </Col>
            <Col xs="6" md="3" style={{ marginTop: 30, textAlign: "center" }}>
              <img
                style={{
                  opacity: 0.7,
                  objectFit: "cover",
                  width: 80,
                  height: 80
                }}
                src={"/static/setupprofile.png"}
              />
              <h6 style={{ fontWeight: "600", fontSize: 18, marginTop: 20 }}>
                Setup Profile
              </h6>
              <span>
                Setup your restaurant details, such as name, address, operating
                hours, menu and etc.
              </span>
            </Col>
            <Col xs="6" md="3" style={{ marginTop: 30, textAlign: "center" }}>
              <img
                style={{
                  opacity: 0.7,
                  objectFit: "cover",
                  width: 80,
                  height: 80
                }}
                src={"/static/receiveorders.png"}
              />
              <h6 style={{ fontWeight: "600", fontSize: 18, marginTop: 20 }}>
                Receive Order
              </h6>
              <span>
                You will receive orders via phone calls and email for every
                orders placed.
              </span>
            </Col>
            <Col xs="6" md="3" style={{ marginTop: 30, textAlign: "center" }}>
              <img
                style={{
                  opacity: 0.7,
                  objectFit: "cover",
                  width: 80,
                  height: 80
                }}
                src={"/static/paymentontime.png"}
              />
              <h6 style={{ fontWeight: "600", fontSize: 18, marginTop: 20 }}>
                Payment On-Time
              </h6>
              <span>
                You are paid within a guaranteed time directly to your bank
                account.{" "}
              </span>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default HowItWorks;
