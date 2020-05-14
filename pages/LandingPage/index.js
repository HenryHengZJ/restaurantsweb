import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import Hero from './Hero';
import Menu from './Menu';
import VisitUs from './VisitUs';
import Footer from '../../components/Footer'
import AboutUs from './AboutUs';
import Router from 'next/router'
import Layout from '../../components/Layout'
import NextSeo from 'next-seo';

class LandingPage extends Component {

  constructor(props) {
    super(props);

    this.refObj1 = React.createRef();
    this.refObj2 = React.createRef();
    this.refObj3 = React.createRef();

  }
  
  signIn(e) {
    e.preventDefault()
    Router.push({
      pathname: '/login',
    })
  }

  aboutUsClicked(e) {
    e.preventDefault()
    this.refObj1.current.scrollIntoView({behavior: 'smooth'});
  }

  menuClicked(e) {
    e.preventDefault()
    this.refObj2.current.scrollIntoView({behavior: 'smooth'});
  }

  contactClicked(e) {
    e.preventDefault()
    this.refObj3.current.scrollIntoView({behavior: 'smooth'});
  }

  render() {
    return (
      <Layout>
        <NextSeo
          config={{
            title: 'Restaurant',
          }}
        />
        <div id="app">
          <NavBar theme={'dark'} aboutUsClicked={e=>this.aboutUsClicked(e)} menuClicked={e=>this.menuClicked(e)} contactClicked={e=>this.contactClicked(e)} signIn={e=>this.signIn(e)}/>
          <Hero/>
          <div ref={this.refObj1} > </div>
          <AboutUs />
          <div ref={this.refObj2} > </div>
          <Menu />
          <div ref={this.refObj3} > </div>
          <VisitUs/>
          <Footer />
        </div>
      </Layout>
    );
  }
};

export default LandingPage;
