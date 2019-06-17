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
import NextSeo from 'next-seo';

class LandingPage extends Component {

  constructor(props) {
    super(props);

    this.refObj = React.createRef();

  }
  
  signIn(e) {
    e.preventDefault()
    Router.push({
      pathname: '/login',
    })
  }

  findFoodNow(e) {
    e.preventDefault()
    this.refObj.current.scrollIntoView({behavior: 'smooth'});
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
        <NextSeo
          config={{
            title: 'FoodieBee - Corporate Catering Services and Marketplace | Local Caterers',
          }}
        />
        <div id="app">
          <div ref={this.refObj} > </div>
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
