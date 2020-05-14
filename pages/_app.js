import App, { Container } from 'next/app'
import React from 'react'
import { initializeStore } from '../store'
import { Provider } from 'mobx-react'
import NextSeo from 'next-seo';

// let's create a configuration for next-seo
const DEFAULT_SEO = {
  title: 'Koyomari Sushi Bar - The Japanese Flavour',
  description: 'Koyomari Sushi Bar - The Japanese Flavour',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.restaurant.herokuapp.com',
    title: 'Koyomari Sushi Bar - The Japanese Flavour',
    description: 'Koyomari Sushi Bar - The Japanese Flavour',
    images: [
      {
        url: 'https://foodiebeegeneralphoto.s3-eu-west-1.amazonaws.com/welcome_pic.jpg',
        width: 2896,
        height: 1448,
        alt: 'Koyomari Sushi Bar',
      },
      {
        url: 'https://foodiebeegeneralphoto.s3-eu-west-1.amazonaws.com/FoodieBee_logo.png',
        width: 441,
        height: 387,
        alt: 'Koyomari Sushi Bar',
      },
    ],
    site_name: '',
  },
};

class MyMobxApp extends App {
  static async getInitialProps(appContext) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const mobxStore = initializeStore()
    // Provide the store to getInitialProps of pages
    appContext.ctx.mobxStore = mobxStore

    let appProps = await App.getInitialProps(appContext)

    return {
      ...appProps,
      initialMobxState: mobxStore
    }
  }

  constructor(props) {
    super(props)
    const isServer = !process.browser
    this.mobxStore = isServer
      ? props.initialMobxState
      : initializeStore(props.initialMobxState)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <NextSeo config={DEFAULT_SEO} />
        <Provider store={this.mobxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}
export default MyMobxApp