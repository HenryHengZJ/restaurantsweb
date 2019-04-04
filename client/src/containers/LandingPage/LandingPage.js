import React, { Component } from 'react';
import Navbar from './Navbar';
import NavBar1 from './NavBar1';
import Hero from './Hero';
import Occasion from './Occasion';
import Features from './Features';
import Caterer from './Caterer';
import SocialBrand from './SocialBrand';
import Footer from './Footer';
import Shops from './Shops';
import Testimonial from './Testimonial';
import Banner from './Banner';

class LandingPage extends Component {

  signIn(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  searchAddress(e) {
    e.preventDefault()
    this.props.history.push('/searchcaterer')
  }

  findFoodNow(e) {
    e.preventDefault()
    this.props.history.push('/searchcaterer')
  }

  registerCatererClicked(e) {
    e.preventDefault()
    this.props.history.push('/caterersignup')
  }


  render() {
    return (
      <div id="app">
        <NavBar1 signIn={e=>this.signIn(e)}/>
        <Hero searchAddress={e=>this.searchAddress(e)}/>
        <Shops/>
        <Features findFoodNow={e=>this.findFoodNow(e)}/>
        <Occasion />
        <Caterer registerCatererClicked={e=>this.registerCatererClicked(e)}/>
        <Testimonial/>
        <Footer />
      </div>
    );
  }
};

export default LandingPage;
