import React from "react";
import img from "../../assets/img"
import { Button, Row, Col, Container, Card, CardBody, Table } from "reactstrap";
import "./styles.css";
import Router from 'next/router'

class AboutUs extends React.Component {
    constructor(props) {
      super(props);
    }

    buttonClicked = () => {
        Router.push(`/aboutus`)
    }
  
    render() {
        return (
          <section
            style={{
                paddingTop: 30,
                paddingBottom: 50,
                backgroundSize: 'cover',
                backgroundImage: 'url(' + img.golunch_wallpaper2 + ')'
            }}
            id="Caterer"
            className="white"
            >
            <Container>
                <Row>
                <Col style={{ color:"white", textAlign: "center", marginTop: 50}} xs="12" md="12">
                    <h2 style={{ marginTop: 20,  fontSize: 40, fontWeight: 700 }}>Visit Us</h2>
                    <p style={{ fontSize: 18, letterSpacing: 2, marginTop: 30, }}>
                        30, Origin Street, Dublin, Ireland
                    </p>
                    <p style={{ fontSize: 18, letterSpacing: 2, marginTop: 30, }}>
                        contactme@email.com
                    </p>
                    <p style={{ fontSize: 18, letterSpacing: 2, marginTop: 30, }}>
                        08X-XXXXXXX
                    </p>
                </Col>
                <Col style={{ marginTop: 20, textAlign: "center" }} xs="12" md="6">
                   
                </Col>
              
                </Row>
            </Container>
            </section>
        );
    }
};

export default AboutUs;
