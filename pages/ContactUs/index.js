import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer'
import Banner from './Banner';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
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
      <Layout title={'Contact Us'}>
        <NextSeo
          config={{
            title: 'Contact Us | FoodieBee - Corporate Catering Services and Marketplace | Local Caterers',
          }}
        />
        <div id="app">
          <NavBar theme={'dark'} signIn={e=>this.signIn(e)}/>
          <Banner/>
          <ContactInfo/>
          <ContactForm/>
          <Footer />
        </div>
      </Layout>
    );
  }
};

export default LandingPage;
