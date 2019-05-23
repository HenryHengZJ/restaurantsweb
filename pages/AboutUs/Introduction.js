import React from "react";
import { Button, Row, Col, Container, Card, CardBody, Table } from "reactstrap";

const Introduction = () => {
  return (
    <section
      style={{
        paddingTop: 50,
        paddingBottom: 50,
        backgroundColor: "white"
      }}
      id="Introduction"
      className="white"
    >
      <Container>
        <Row>
          <Col style={{ textAlign: "start", marginTop: 50 }} xs="12" md="6">
            <h2 style={{ fontSize: 34 }}>Our Story</h2>
            <p style={{ marginTop: 40, fontSize: 16 }}>
              FoodieBee was founded in May 2019 in Limerick, Ireland, and is the
              first online platform to enter Ireland’s marketplace for corporate
              catering.
            </p>
            <p style={{ marginTop: 40, fontSize: 16 }}>
              We enable customers to easily order food online for your office,
              parties, celebrations and etc. Customers can place orders for all
              types of occasions such as routine office lunches, offsite client
              meetings, school events and the list goes on. FoodieBee not only
              connects businesspeople, but also families and friends to reliable
              local caterers and restaurants across Ireland.
            </p>
            <p style={{ marginTop: 40, fontSize: 16 }}>
              Other than having the open marketplace, we also work with number
              of caterers to provide customized catering packages based on
              subscription models, tailored to your company or individual needs.
              We also have a team of professional customer support who are ready
              to help in any situations.
            </p>
          </Col>
          <Col style={{ marginTop: 20, textAlign: "center" }} xs="12" md="6">
            <img
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              src={"https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/aboutUs.jpg"}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Introduction;
