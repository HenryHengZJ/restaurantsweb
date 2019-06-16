import App, { Container } from 'next/app'
import React from 'react'
import { initializeStore } from '../store'
import { Provider } from 'mobx-react'
import NextSeo from 'next-seo';

// let's create a configuration for next-seo
const DEFAULT_SEO = {
  title: 'FoodieBee - Corporate Catering Services and Marketplace | Local Caterers',
  description: 'FoodieBee provides wide range of restaurants and local caterers suitable for corporate caterings such as breakfast, lunch, events, and meetings. Order online for free through FoodieBee.',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.foodiebee.eu',
    title: 'FoodieBee - Corporate Catering Services and Marketplace | Local Caterers',
    description: 'FoodieBee provides wide range of restaurants and local caterers suitable for corporate caterings such as breakfast, lunch, events, and meetings. Order online for free through FoodieBee.',
    image:'https://s3-eu-west-1.amazonaws.com/foodiebeegeneralphoto/brandlogo_light.png',
    site_name: 'FoodieBee.eu',
    imageWidth: 1200,
    imageHeight: 1200
  }
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