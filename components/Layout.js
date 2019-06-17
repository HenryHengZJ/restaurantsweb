import Head from 'next/head'
import Link from 'next/link'
import React from "react";
import Router from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/styles.scss'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


class Layout extends React.Component {
  constructor(props) {
    super(props);
    Router.events.on('routeChangeComplete', () => { window.scrollTo(0, 0); });
  }

  render() {

    const {
      children,
      title
    } = this.props;

    return (
      <div>
        <Head>
            <meta charSet="utf-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"/>
            <meta name="author" content="FoodieBee"/>
            <link rel="manifest" href="/manifest.json"/>
            <link rel="shortcut icon" href="/static/favicon.ico"/>
          
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-118965717-3"></script>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFHrZBb72wmg5LTiMjUgI_CLhsoMLmlBk&libraries=places"></script>
            <script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
            <link href="/static/css/9.099cafef.chunk.css" rel="stylesheet"/>
            <link href="/static/css/main.4ac54e74.chunk.css" rel="stylesheet"/>
        </Head>
    
        <div id="main">
          {children}
        </div>

      </div>
    )
  }
}

export default Layout;