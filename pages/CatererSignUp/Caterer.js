import React from "react";
import { Button, Row, Col, Container, Card, CardBody, Table } from "reactstrap";
import "./styles.css";
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Caterer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section
        style={{
          paddingTop: 50,
          paddingBottom: 50,
          backgroundColor: "white"
        }}
        id="Caterer"
        className="white"
      >
        <Container>
          <Row style={{margin: 0, flex: 1, display: 'flex'}}>
            <Col style={{ textAlign: "start", marginTop: 50 }} xs="12" md="6">
              <h2 style={{ fontSize: 34 }}>Catering has never been so easy</h2>
              <p style={{ marginTop: 30, fontSize: 16 }}>
                You can put all your effort perfecting your dishes. We handle the
                rest for you. Using FoodieBee caterer_ingredients platform, you
                can enjoy tonnes of benefits.
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
                  onClick={e => this.props.joinNowClicked(e)}
                >
                  Join Now
                </Button>
              </div>
            </Col>
            <Col style={{ marginTop: 20, textAlign: "center" }} xs="12" md="6">
              <img
                style={{ objectFit: "cover", width: 300, height: 300 }}
                src={'/static/caterer_ingredients.png'}
              />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
};

Caterer.propTypes = propTypes;
Caterer.defaultProps = defaultProps;
export default Caterer;
