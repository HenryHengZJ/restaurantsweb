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
                backgroundColor: 'white'
            }}
            id="Caterer"
            className="white"
            >
            <Container>
                <Row>
                <Col style={{ textAlign: "start", marginTop: 50}} xs="12" md="6">
                    <h2 style={{ fontSize: 34 }}>About FoodieBee</h2>
                    <p style={{ marginTop: 30, fontSize: 16, paddingRight:20 }}>
                    FoodieBee is the first catering marketplace platform in Ireland
                    that specialize in connecting corporate clients with restaurant
                    catering services. Caterings are suitable for multiple occasions
                    such as daily meals, meetings, celebrations, events and etc. We
                    believe, great food fosters better rapport between co-workers,
                    which in turns help creating a more vibrant and energetic work
                    culture.
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
                        onClick={() => this.buttonClicked()}
                    >
                        Learn More
                    </Button>
                    </div>
                </Col>
                <Col style={{ marginTop: 20, textAlign: "center" }} xs="12" md="6">
                    <img
                        style={{ objectFit: "cover", width: 370, height: 370 }}
                        src={img.caterer_ingredients}
                        alt="Food Ingredients"
                    />
                </Col>
                
                <div style={{height: 1, marginTop:70, opacity: 0.2, backgroundColor: 'gray', borderWidth: 1}} className="col l1"></div>

                </Row>
            </Container>
            </section>
        );
    }
};

export default AboutUs;
