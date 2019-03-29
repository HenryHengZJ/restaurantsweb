import React from 'react';
import { Button } from 'reactstrap';
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
        <div className="container">
          <div className="row">
            <div className="col m3"></div>
            <div className="center-align">
              <h2 style={{textAlign: 'center', fontSize: 34, paddingLeft:10, paddingRight: 10}}>Order catering service with FoodieBee</h2>
            </div>
            <div className="col m3"></div>
          </div>
          <div style={{textAlign: 'center', paddingTop: 60}} className="row">
            <div className="col m3 center-align">
              <img style={{ objectFit:'cover', width: 80, height: 80 }} src={require('../../assets/img/register.png')}  />
              <h6 style={{fontWeight: '600', fontSize: 18, marginTop: 20}} >Register Account</h6>
            </div>
            <div className="col m3 center-align">
              <img style={{ objectFit:'cover', width: 80, height: 80 }} src={require('../../assets/img/search.png')}  />
              <h6 style={{fontWeight: '600', fontSize: 18, marginTop: 20}}>Search and Filter</h6>
            </div>
            <div className="col m3 center-align">
              <img style={{ objectFit:'cover', width: 80, height: 80 }} src={require('../../assets/img/bank.png')}  />
              <h6 style={{fontWeight: '600', fontSize: 18, marginTop: 20}}>Order and Pay</h6>
            </div>
            <div className="col m3 center-align">
              <img style={{ objectFit:'cover', width: 80, height: 80 }} src={require('../../assets/img/eat.png')}  />
              <h6 style={{fontWeight: '600', fontSize: 18, marginTop: 20}}>Enjoy and Eat</h6>
            </div>
          </div>

          <div style={{textAlign: 'center', marginTop: 20 }} className="center-align">
            <Button onClick={e => this.props.findFoodNow(e)} style={{ fontSize: 20, marginTop: 30, paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20}} className="bg-primary" size="lg" color="primary">Find Food Now</Button>
          </div>
              
        </div>
      </section>
    );
  }
};

Features.propTypes = propTypes;
Features.defaultProps = defaultProps;

export default Features;
