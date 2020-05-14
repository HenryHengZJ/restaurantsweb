import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';
import './styles/footer.css'
import color from '../assets/color'

const Footer = () => {
  return (
    <Row style={{padding:15, margin:0, backgroundColor: color.primary}} className="justify-content-center">
      <p style={{textAlign: 'center'}}>
        <b style={{color:'white'}}>Restaurant © 2020 All Rights Reserved</b><br />
        <a style={{color:'white'}} href="/">Terms of Use</a>
        <b style={{color:'white'}}> | </b>
        <a style={{color:'white'}} href="/">Privacy Policy</a>
      </p>
      <Col style={{textAlign: 'center'}} xs="12">
        <a style={{textDecoration:'none', color: 'white', marginLeft: 10, marginRight: 5}} target="_blank" href="" className="fa fa-facebook socialfa"></a>
        <a style={{textDecoration:'none',color: 'white', marginLeft: 5, marginRight: 5}} target="_blank" href="" className="fa fa-twitter socialfa"></a>   
        <a style={{textDecoration:'none',color: 'white', marginLeft: 5, marginRight: 5}} target="_blank" href="" className="fa fa-instagram socialfa"></a>
        <a style={{textDecoration:'none',color: 'white', marginLeft: 5, marginRight: 10}} target="_blank" href="" className="fa fa-linkedin socialfa"></a>         
      </Col>
   
    </Row>
  );
};

export default Footer;
