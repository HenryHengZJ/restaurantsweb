// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <html lang="en"></html>
        <Head>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFHrZBb72wmg5LTiMjUgI_CLhsoMLmlBk&libraries=places"></script>
          <script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument