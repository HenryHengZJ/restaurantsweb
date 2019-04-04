import React, { Component } from "react";
import NavBar1 from "./NavBar1";
import HowItWorks from "./HowItWorks";
import Caterer from "./Caterer";
import Footer from "./Footer";
import Benefit from "./Benefit";

import Banner from "./Banner";

class CatererSignUp extends Component {
  signIn(e) {
    e.preventDefault();
    this.props.history.push("/login");
  }

  render() {
    return (
      <div id="CatererSignUp">
        <NavBar1 signIn={e => this.signIn(e)} />
        <Banner />
        <HowItWorks />
        <Benefit />
        <Caterer />
        <Footer />
      </div>
    );
  }
}

export default CatererSignUp;
