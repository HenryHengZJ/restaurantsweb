import React, { Component } from "react";
import NavBar from '../../components/NavBar';
import HowItWorks from "./HowItWorks";
import Caterer from "./Caterer";
import Footer from "../../components/Footer";
import Benefit from "./Benefit";
import Banner from "./Banner";
import Layout from "../../components/Layout";
import Router from 'next/router'

class CatererSignUp extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef()   // Create a ref object 
  }

  signIn(e) {
    e.preventDefault();
    Router.push({
      pathname: '/login'
    })
  }

  joinNowClicked(e) {
    e.preventDefault();
    this.myRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    return (
      <Layout title={'Caterer Sign Up FoodieBee - Catering Service'}>
      <div id="CatererSignUp">
        <div ref={this.myRef} style={{backgroundColor: 'transparent', height:1, width: '100%'}}></div>
        <NavBar theme={'dark'} signIn={e => this.signIn(e)} />
        <Banner />
        <HowItWorks />
        <Benefit />
        <Caterer joinNowClicked={e=>this.joinNowClicked(e)}/>
        <Footer />
      </div>
      </Layout>
    );
  }
}

export default CatererSignUp;
