import React from 'react';
import { Button, Col, Row, Container} from 'reactstrap';
import './styles.css'
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Features extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
    }
  }

  showPlaceDetails(address) {
    this.setState({ address });
  }

  render() {
    return (
      <section style={{backgroundColor: 'white',}} id="features" className="white">
        <Container>
          <Row style={{marginTop: 20, flex: 1, display: 'flex'}} className="justify-content-center">

            <Col xs="12" style={{textAlign: 'center'}}>
              <h2 style={{textAlign: 'center', fontSize: 34, paddingLeft:10, paddingRight: 10}}>Order catering service with FoodieBee</h2>
            </Col>

            <Col style={{marginTop:50}}xs="12"></Col>
         
            <Col xs="6" md="3" style={{marginTop: 10, textAlign: 'center'}}>
              <img style={{ objectFit:'cover', width: 80, height: 80 }} src={'/static/register1.png'}  />
              <h6 style={{fontWeight: '600', fontSize: 18, marginTop: 20}} >Register Account</h6>
              <p style={{marginTop: 10}} >Join our community to enjoy more benefits and rewards</p>
            </Col>
            <Col xs="6" md="3" style={{marginTop: 10, textAlign: 'center'}}>
              <img style={{ objectFit:'cover', width: 80, height: 80 }} src={'/static/search1.png'}  />
              <h6 style={{fontWeight: '600', fontSize: 18, marginTop: 20}}>Search and Filter</h6>
              <p style={{marginTop: 10}} >Find your favourite food caterers and perfect catering service.</p>
            </Col>
            <Col xs="6" md="3" style={{marginTop: 10, textAlign: 'center'}}>
              <img style={{ objectFit:'cover', width: 80, height: 80 }} src={'/static/bank1.png'}  />
              <h6 style={{fontWeight: '600', fontSize: 18, marginTop: 20}}>Order and Pay</h6>
              <p style={{marginTop: 10}} >Effortless online ordering and secure transactions.</p>
            </Col>
            <Col xs="6" md="3" style={{marginTop: 10, textAlign: 'center'}}>
              <img style={{ objectFit:'cover', width: 80, height: 80 }} src={'/static/eat1.png'}  />
              <h6 style={{fontWeight: '600', fontSize: 18, marginTop: 20}}>Enjoy and Eat</h6>
              <p style={{marginTop: 10}} >Wait for your food to be delivered or pickup at counter. Bon Appetite!</p>
            </Col>
         
            <div style={{textAlign: 'center', marginTop: 20 }} className="center-align">
              <Button onClick={e => this.props.findFoodNow(e)} style={{ fontSize: 20, marginTop: 30, paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20}} className="bg-primary" size="lg" color="primary">Find Food Now</Button>
            </div>
              
          </Row>
        </Container>
      </section>
    );
  }
};

Features.propTypes = propTypes;
Features.defaultProps = defaultProps;

export default Features;
