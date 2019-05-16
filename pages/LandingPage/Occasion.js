import React, { Component } from 'react';
import { Button, Row, Col, Card, CardBody } from 'reactstrap';
import './styles.css'
import img from "../../assets/img"
import Router from 'next/router'

class Occasion extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      occasions:
      [
        {
          title: 'Breakfast',
          src: img.landingpage_breakfast,
          descrip: 'Select wide variety of breakfast to kickstart your fresh new day.',
          hover: false,
        },
        {
          title: 'Event',
          src: img.landingpage_events,
          descrip: 'Choose your ideal food catering service for different types of occasions.',
          hover: false,
        },
        {
          title: 'Lunch',
          src: img.landingpage_lunch,
          descrip: 'Check out our wide variety of meals from different cuisines and categories. ',
          hover: false,
        },
        {
          title: 'Finger Food',
          src: img.landingpage_fingerfood,
          descrip: 'Finger lickin good snacks to temporarily satisfy your cravings.',
          hover: false,
        },
        {
          title: 'Buffet',
          src: img.landingpage_buffet,
          descrip: 'Order your perfect buffets choice according to your budgets, headcounts, etc.',
          hover: false,
        },
        {
          title: 'Office Daily',
          src: img.landingpage_officedaily,
          descrip: 'Check out our food catering package and platters for your daily office lunch and breakfast.',
          hover: false,
        },
      ]
    }
  }

  handleSelectedCardClick = (title) => {
    Router.push(`/searchcaterer?location=County%20Limerick&occasion=${title}`)
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
          <Card onMouseEnter={() => this.toggle(i)} onMouseLeave={() => this.toggle(i)} style={{cursor: 'pointer', marginTop:0,  boxShadow: 'none', borderWidth: 0}}  onClick={() => this.handleSelectedCardClick(occasions[i].title)}>
            <CardBody style={{position:'relative', padding: 0}}>
              <img style={ { objectFit:'cover', width: '100%', height: 220 }} src={occasions[i].src}  />
              <div style={{ backgroundColor: 'black', opacity: occasions[i].hover ? 0.1 : 0.3, position: 'absolute', top: 0, left: 0, width: '100%', height: 220}}> </div> 
              <h5 style={{fontWeight: '600', fontSize: 20, color: 'white', top:95, left:0, right:0, position: 'absolute', width: '100%', textAlign: 'center'}} >{occasions[i].title} </h5>
              <p style={{marginTop: 10}} >{occasions[i].descrip}</p>
              <p style={{fontWeight: '600', color: '#20a8d8'}} >View {occasions[i].title}</p>
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
      <section  style={{backgroundColor: 'white'}} id="occasion" className="white">
        <div className="container">
          <div style={{margin:0}} className="row">
            <div style={{height:1, opacity: 0.2, backgroundColor: 'black', borderWidth: 1}} className="col l1"></div>
            <div style={{marginTop: 60}} className="center-align">
              <h2 style={{textAlign: 'center', fontSize: 34}}>Catering for various occasions</h2>
              {this.renderItems()}
            </div>
            <div style={{height:1, marginTop:50, opacity: 0.2, backgroundColor: 'gray', borderWidth: 1}} className="col l1"></div>
          </div>
        </div>
      </section>
    );
  }
};

export default Occasion;
