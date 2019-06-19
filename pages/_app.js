import App, { Container } from 'next/app'
import React from 'react'
import { initializeStore } from '../store'
import { Provider } from 'mobx-react'
import NextSeo from 'next-seo';

// let's create a configuration for next-seo
const DEFAULT_SEO = {
  title: 'FoodieBee - Corporate Catering Services and Marketplace | Local Caterers',
  description: 'FoodieBee, Ireland first catering marketplace platform. We provide wide ranges of restaurants and local caterers suitable for corporate caterings such as breakfast, lunch, events, and meetings. Order online for free through FoodieBee.',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.foodiebee.eu',
    title: 'FoodieBee - Corporate Catering Services and Marketplace | Local Caterers',
    description: 'FoodieBee, Ireland first catering marketplace platform. We provide wide ranges of restaurants and local caterers suitable for corporate caterings such as breakfast, lunch, events, and meetings. Order online for free through FoodieBee.',
    images: [
      {
        url: 'https://foodiebeegeneralphoto.s3-eu-west-1.amazonaws.com/FoodieBee_coverphoto.jpg',
        width: 2896,
        height: 1448,
        alt: 'FoodieBee Catering',
      },
      {
        url: 'https://foodiebeegeneralphoto.s3-eu-west-1.amazonaws.com/FoodieBee_logo.png',
        width: 441,
        height: 387,
        alt: 'FoodieBee Logo',
      },
    ],
    site_name: 'FoodieBee.eu',
  },
  twitter: {
    handle: '@FoodiebeeIE',
    site: '@FoodiebeeIE',
    cardType: 'summary_large_image',
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