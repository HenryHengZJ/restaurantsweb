import React, { Component } from 'react';
import { Button, Row, Col, Card, CardBody } from 'reactstrap';
import './styles.css'
import img from "../../assets/img"
import color from "../../assets/color"
import Router from 'next/router'
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Restaurants extends Component {

  constructor(props) {
    super(props);

    this.state = {
      occasions:
      [
        {
          title: 'Sushi Nigiri',
          src: img.sushi1,
          alt: 'Sushi Nigiri',
        },
        {
          title: 'Salmon Maki Roll',
          src: img.sushi2,
          alt: 'Salmon Maki Roll',
        },
        {
          title: 'Sashimi Sushi',
          src: img.sushi3,
          alt: 'Sashimi Sushi',
        },
        {
          title: 'Sushi Burito',
          src: img.sushi4,
          alt: 'Sushi Burito',
        },
        {
          title: 'Temaki Sushi',
          src: img.sushi5,
          alt: 'Temaki Sushi',
        },
        {
          title: 'Ginza Sushi',
          src: img.sushi6,
          alt: 'Ginza Sushi',
        },
      ]
    }
  }

  getStarted = () => {
    Router.push(`/menudetail`, `/menudetail`)
  }

  renderItems() {

    var itemsarray = [];

    var occasions = this.state.occasions

    for(let i = 0; i < occasions.length; i++){
      itemsarray.push(
        <Col key={i} xs="12" sm="6" md="6" lg="4">
          <Card style={{cursor: 'pointer', marginTop:0,  boxShadow: 'none', borderWidth: 0, backgroundColor: 'transparent'}}  onClick={() => this.getStarted()}>
            <CardBody style={{  position:'relative', padding: 0, margin: 20}}>
              <img style={{ borderRadius: 10, objectFit:'cover', width: '100%', height: 250 }} src={occasions[i].src} alt={occasions[i].alt} />
              <p style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, marginTop: 10}} >{occasions[i].title}</p>
            </CardBody>
          </Card>
        </Col>
      )
    }

    return(
      <Row style={{marginTop: 50}}>
        {itemsarray}
      </Row>
    )
  }

  render() {
    return (
      <section  style={{paddingBottom: 50, backgroundColor: 'white'}}>
        <div className="container">
          <div style={{margin:0}} className="row">
           
            <div style={{marginTop: 60, marginBottom: 50}} className="center-align">
              <h2 style={{fontSize: 40, fontWeight: 700, textAlign: 'center', color: 'black'}}>Our Menus</h2>
              {this.renderItems()}
              <div style={{textAlign: 'center'}}> 
              <Button
                style={{
                  height: "100%",
                  fontWeight: 600,
                  color: 'white',
                  fontSize: 18,
                  borderRadius: 10,
                  backgroundColor: color.primary,
                  padding: 15
                }}
                onClick={() => this.getStarted()}
              >
                VIEW FULL MENU
              </Button> 
            </div>
            </div>


          </div>
        </div>
      </section>
    );
  }
};

Restaurants.propTypes = propTypes;
Restaurants.defaultProps = defaultProps;

export default Restaurants;
