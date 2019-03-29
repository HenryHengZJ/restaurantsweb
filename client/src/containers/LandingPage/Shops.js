import React, { Component } from 'react';
import { Row, Col, Card, CardBody} from 'reactstrap';
import './styles.css'

class Shops extends Component {

  constructor(props) {
    super(props);

    this.state = {
      icons:
      [
        require('../../assets/img/res1.png'),
        require('../../assets/img/res2.jpg'),
        require('../../assets/img/res3.jpg'),
        require('../../assets/img/res4.jpg'),
        require('../../assets/img/res5.png'),
        require('../../assets/img/res6.jpg'),
      ]
    }

  }

  renderItems() {

    var itemsarray = [];

    var icons = this.state.icons

    for(let i = 0; i < icons.length; i++){
      itemsarray.push(
        <Col xs="3" sm="3" md="2" lg="2">
          <Card style={{borderWidth: 0, borderColor: 'white', boxShadow: 'none'}}>
          <CardBody style={{padding: 0, height: 80}}>
            <img className="grayscaleimg" style={{ objectFit:'cover', width: '100%', height: '100%' }} src={icons[i]}  />
          </CardBody>
          </Card>
        </Col>
      )
    }

    return(
      <Row >
        {itemsarray}
      </Row>
    )
  }

  render() {
    return (
      <section style={{ backgroundColor: 'white', padding: 0, paddingTop: 20, paddingBottom: 20}} id="shops" className="white">
        <div className="container">
         {this.renderItems()}
        </div>
      </section>
    );
  }
}

export default Shops;
