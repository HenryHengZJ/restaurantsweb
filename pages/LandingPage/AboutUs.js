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
                    <h2 style={{ marginTop: 20, fontSize: 34 }}>About FoodieBee</h2>
                    <p style={{ fontSize: 18, letterSpacing: 2, marginTop: 30, }}>
                    FoodieBee is the first corporate catering marketplace platform in Ireland
                    that specialize in connecting corporate clients with restaurant
                    catering services. We are revolutionizing the traditional catering market with virtual catering.
                    </p>

                    <div className="text-center">
                    <Button
                        style={{
                        fontSize: 18,
                        height: 50,
                        marginTop: 30,
                        marginBottom: 30
                        }}
                        className="bg-primary"
                        size="lg"
                        color="primary"
                        href="/aboutus"
                        onClick={() => this.buttonClicked()}
                    >
                        Learn More
                    </Button>
                    </div>
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
