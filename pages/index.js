
import LandingPage from './LandingPage';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './styles.scss'
import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';


class App extends Component {
  render() {
    return (
      
      <div className="App">
        <LandingPage/>
      </div>
      
    );
  }
}

export default App;