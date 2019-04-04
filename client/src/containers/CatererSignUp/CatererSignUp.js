import React, { Component } from "react";
import NavBar1 from "./NavBar1";
import HowItWorks from "./HowItWorks";
import Caterer from "./Caterer";
import Footer from "./Footer";
import Benefit from "./Benefit";

import Banner from "./Banner";

class CatererSignUp extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef()   // Create a ref object 
  }

  signIn(e) {
    e.preventDefault();
    this.props.history.push("/login");
  }

  joinNowClicked(e) {
    e.preventDefault();
    this.myRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    return (
      <div id="CatererSignUp">
        <div ref={this.myRef} style={{backgroundColor: 'transparent', height:1, width: '100%'}}></div>
        <NavBar1 signIn={e => this.signIn(e)} />
        <Banner />
        <HowItWorks />
        <Benefit />
        <Caterer joinNowClicked={e=>this.joinNowClicked(e)}/>
        <Footer />
      </div>
    );
  }
}

export default CatererSignUp;
