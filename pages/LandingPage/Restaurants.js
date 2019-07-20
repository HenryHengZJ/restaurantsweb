import React, { Component } from 'react';
import { Button, Row, Col, Card, CardBody } from 'reactstrap';
import './styles.css'
import img from "../../assets/img"
import Router from 'next/router'
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Restaurants extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      occasions:
      [
        {
          title: 'Flannery Restaurant & Pub',
          src: "https://www.cityworksrestaurant.com/minneapolis/wp-content/uploads/sites/2/2015/11/Smokehouse-Burger_600x400.jpg",
          descrip: 'Specialized in American Burger style mealset.',
          alt: 'Specialized in American Burger style mealset from FoodieBee Ireland -  Corporate Catering Services and Marketplace',
          hover: false,
        },
        {
          title: 'Kyoyomari Japanese Dining',
          src: "https://img.grouponcdn.com/deal/5nqMiaVPQsLESRWCmMxPNQ/shutterstock_124581196-1500x900/v1/c700x420.jpg",
          descrip: 'Traditional decor and menu, with an extensive range of sushi, plus European desserts and sake.',
          alt: 'Traditional decor and menu, with an extensive range of sushi, plus European desserts and sake from FoodieBee Ireland -  Corporate Catering Services and Marketplace',
          hover: false,
        },
        {
          title: 'Fishie Shop',
          src: "https://media-cdn.tripadvisor.com/media/photo-p/12/20/b3/da/barton-fish-chips.jpg",
          descrip: 'Long-running institution, serving traditional takeaway fish n chips, plus burgers and kids menu.',
          alt: 'Long-running institution, serving traditional takeaway fish n chips, plus burgers and kids menu from FoodieBee Ireland -  Corporate Catering Services and Marketplace',
          hover: false,
        },
        {
          title: 'Italiano Di Angelo',
          src: "https://mobile-cuisine.com/wp-content/uploads/2013/01/spaghetti-fun-facts-e1451917160731.jpg",
          descrip: 'Best Italian Sandwiches in town. We have a long history since 1964. We are speacialised in pasta.',
          alt: 'Best Italian Sandwiches in town. We have a long history since 1964. We are speacialised in pasta from FoodieBee Ireland -  Corporate Catering Services and Marketplace',
          hover: false,
        },
        {
          title: 'Spade Burger',
          src: "https://du7ybees82p4m.cloudfront.net/578f9fac892d52.19976571.jpg?width=910&height=512",
          descrip: 'Wide variety of burgers with flavourable toppings and addons.',
          alt: 'Wide variety of burgers with flavourable toppings and addons from FoodieBee Ireland -  Corporate Catering Services and Marketplace',
          hover: false,
        },
        {
          title: 'Asian Wok',
          src: "https://media.apnarm.net.au/media/images/2017/01/24/twb240117asian-7aj2fxtt8c9k5lphmn2_ct677x380.jpg",
          descrip: 'Asian style wok dishes and cuisines that will satisfy your tastebuds.',
          alt: 'Asian style wok dishes and cuisines that will satisfy your tastebuds from FoodieBee Ireland -  Corporate Catering Services and Marketplace',
          hover: false,
        },
      ]
    }
  }


  toggle(index) {
    var newoccasions = this.state.occasions
    newoccasions[index].hover = !this.state.occasions[index].hover
    this.setState({ occasions: newoccasions });
  }

  renderItems() {

    var itemsarray = [];

    var occasions = this.state.occasions

    for(let i = 0; i < occasions.length; i++){
      itemsarray.push(
        <Col key={i} xs="12" sm="6" md="6" lg="4">
          <Card onMouseEnter={() => this.toggle(i)} onMouseLeave={() => this.toggle(i)} style={{cursor: 'pointer', marginTop:0,  boxShadow: 'none', borderWidth: 0, backgroundColor: 'transparent'}}  onClick={e => this.props.restaurantClicked(e)}>
            <CardBody style={{position:'relative', padding: 0}}>
              <img style={ { objectFit:'cover', width: '100%', height: 220 }} src={occasions[i].src} alt={occasions[i].alt} />
              <div style={{ backgroundColor: 'black', opacity: occasions[i].hover ? 0.1 : 0.3, position: 'absolute', top: 0, left: 0, width: '100%', height: 220}}> </div> 
              <h5 style={{fontWeight: '600', fontSize: 20, color: 'white', top:95, left:0, right:0, position: 'absolute', width: '100%', textAlign: 'center'}} >{occasions[i].title} </h5>
              <p style={{marginTop: 10}} >{occasions[i].descrip}</p>
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
      <section  style={{backgroundColor: 'rgba(233,245,248,1)', paddingBottom: 50}} id="occasion">
        <div className="container">
          <div style={{margin:0}} className="row">
           
            <div style={{marginTop: 60}} className="center-align">
              <h2 style={{textAlign: 'center', fontSize: 34}}>Options from hundreds of restaurants</h2>
              {this.renderItems()}
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
