import React from 'react';
import { Button, Row, Col, Card, CardBody, Table} from 'reactstrap';
import './styles.css'
import PropTypes from 'prop-types';
import Link from 'next/link';
import img from "../../assets/img"

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
      <section style={{backgroundColor: 'white'}} id="Caterer" className="white">
        <div className="container">
          <Row style={{marginTop: 60, marginBottom: 20}}>
            <Col style={{marginTop: 10}} xs="12" md="6" > 
              <h2 style={{fontSize: 40, fontWeight: 700, color: 'black'}}>Who are we?</h2>
              <p style={{marginTop: 30, fontSize: 20, fontWeight: 600, marginRight: 20 }}>
                Japanese food, where the dining experience is not only about the actual food consumed, but also the presentation, the design, the sheer beauty of what you're eating. From the traditional to the modern, from the quick to the drawn-out, we offer you the best Japanese food.
              </p>
   
            </Col>

            <Col xs="12" md="6" >
              <div style={{width: '100%', height: 280, position: 'relative', overflow: 'hidden', borderRadius: '5%'}}>
                <img style={{ objectFit:'cover', width: '100%', height: '100%', }} src={img.welcome_pic_2} alt=""/>
              </div>
            </Col>

          </Row>


        </div>
      </section>
    );
  }
};


Caterer.propTypes = propTypes;
Caterer.defaultProps = defaultProps;

export default Caterer;
