import React, { Component } from 'react';
import NavBar from './NavBar';
import Hero from './Hero';
import Occasion from './Occasion';
import Features from './Features';
import Caterer from './Caterer';
import Footer from './Footer';
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

  searchAddress(e) {
    e.preventDefault()
    Router.push(`/searchcaterer?occasion=All`, `/searchcaterer/All`)
    /*Router.push({
      pathname: '/searchcaterer',
      query: { occasion: 'All' }
    })*/
  }

  findFoodNow(e) {
    e.preventDefault()
    Router.push(`/searchcaterer?occasion=All`, `/searchcaterer/All`)
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
          <NavBar signIn={e=>this.signIn(e)}/>
          <Hero searchAddress={e=>this.searchAddress(e)}/>
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
