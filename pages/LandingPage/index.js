import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import Hero from './Hero';
import Occasion from './Occasion';
import Features from './Features';
import Caterer from './Caterer';
import Footer from '../../components/Footer'
import Shops from './Shops';
import Testimonial from './Testimonial';
import Router from 'next/router'
import Layout from '../../components/Layout'

class LandingPage extends Component {

  signIn(e) {
    e.preventDefault()
    Router.push({
      pathname: '/login'
    })
  }

  findFoodNow(e) {
    e.preventDefault()
    Router.push(`/searchcaterer?location=Dublin&occasion=All`, `/searchcaterer`)
  }

  registerCatererClicked(e) {
    e.preventDefault()
    Router.push({
      pathname: '/caterersignup'
    })
  }


  render() {
    return (
      <Layout>
        <div id="app">
          <NavBar theme={'dark'} signIn={e=>this.signIn(e)}/>
          <Hero/>
          <Shops/>
          <Features findFoodNow={e=>this.findFoodNow(e)}/>
          <Occasion />
          <Caterer registerCatererClicked={e=>this.registerCatererClicked(e)}/>
          <Testimonial/>
          <Footer />
        </div>
      </Layout>
    );
  }
};

export default LandingPage;
