import React, { Component } from 'react';
import { Button} from 'reactstrap';
import './styles.css'
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};


class Navbar extends Component {

  render() {
    return (
      <nav className="transparent lighten-1">
        <div className="nav-wrapper">
          <a style={{color: 'white', marginTop: 5}} href="" className="brand-logo left brandlogo"><img style={{objectFit: 'cover', height: 70, width: 180}} src={require('../../assets/img/brandlogo_dark.png')}/></a>
          <a href="#" data-activates="mobile-demo" className="button-collapse right">
            <i className="material-icons">menu</i>
          </a>
          <ul id="mobile-demo" className="right hide-on-med-and-down">
            <li>
              <a style={{color: 'white'}} href="">Home</a>
            </li>
            <li>
              <a style={{color: 'white'}} href="">Services</a>
            </li>
            <li>
              <a style={{color: 'white'}} href="">Who we are</a>
            </li>
            <li>
              <a style={{color: 'white'}} href="">Contact</a>
            </li>
            <li>
              <a style={{color: 'white'}} onClick={e => this.props.signIn(e)}>Sign In</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
