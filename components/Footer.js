import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';
import './styles/footer.css'

const Footer = () => {
  return (
    <Row style={{padding:15, margin:0, backgroundColor: '#696969'}} className="justify-content-center">
      <p style={{textAlign: 'center'}}>
        <b style={{color:'white'}}>FoodieBee © 2019 All Rights Reserved</b><br />
        <a style={{color:'white'}} href="/termscondition">Terms of Use</a>
        <b style={{color:'white'}}> | </b>
        <a style={{color:'white'}} href="/privacypolicy">Privacy Policy</a>
      </p>
      <Col style={{textAlign: 'center'}} xs="12">
        <a style={{textDecoration:'none', color: 'white', marginLeft: 10, marginRight: 5}} target="_blank" href="https://www.facebook.com/foodiebeeie" className="fa fa-facebook socialfa"></a>
        <a style={{textDecoration:'none',color: 'white', marginLeft: 5, marginRight: 5}} target="_blank" href="https://twitter.com/FoodiebeeIE" className="fa fa-twitter socialfa"></a>   
        <a style={{textDecoration:'none',color: 'white', marginLeft: 5, marginRight: 5}} target="_blank" href="https://www.instagram.com/foodiebeeireland" className="fa fa-instagram socialfa"></a>
        <a style={{textDecoration:'none',color: 'white', marginLeft: 5, marginRight: 10}} target="_blank" href="http://linkedin.com/company/foodiebee-ireland" className="fa fa-linkedin socialfa"></a>         
      </Col>
   
    </Row>
  );
};

export default Footer;
