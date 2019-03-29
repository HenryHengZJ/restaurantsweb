import React from 'react';
import './styles.css'

const SocialBrand = () => {
  return (
    <section id="social" className="grey lighten-4">
      <div className="container center-align">
        <h2 style={{fontSize: 34, marginBottom: 20}}>Follow Us</h2>
        <a style={{color: 'white', marginLeft: 10, marginRight: 5}} href="#" className="fa fa-facebook socialfa brandlogo"></a>
        <a style={{color: 'white', marginLeft: 5, marginRight: 5}} href="#" className="fa fa-twitter socialfa brandlogo"></a>   
        <a style={{color: 'white', marginLeft: 5, marginRight: 5}} href="#" className="fa fa-instagram socialfa brandlogo"></a>
        <a style={{color: 'white', marginLeft: 5, marginRight: 10}} href="#" className="fa fa-linkedin socialfa brandlogo"></a>         
       
      </div>
    </section>
  );
};

export default SocialBrand;
