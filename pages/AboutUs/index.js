import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer'
import Banner from './Banner';
import Introduction from './Introduction';
import Benefit from './Benefit';
import Router from 'next/router'
import Layout from '../../components/Layout'
import NextSeo from 'next-seo';

class LandingPage extends Component {
  
  signIn(e) {
    e.preventDefault()
    Router.push({
      pathname: '/login',
    })
  }


  render() {
    return (
      <Layout title={'About Us'}>
       <NextSeo
        config={{
          title: 'About Us | FoodieBee - Corporate Catering Services and Marketplace | Local Caterers',
        }}
      />
        <div id="app">
          <NavBar theme={'dark'} signIn={e=>this.signIn(e)}/>
          <Banner/>
          <Introduction/>
          <Benefit/>
          <Footer />
        </div>
      </Layout>
    );
  }
};

export default LandingPage;
