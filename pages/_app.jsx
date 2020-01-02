import App from 'next/app'
import React from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import { StoreProvider } from 'easy-peasy'
import withReduxStore from '../lib/with-redux-store'
import { theme } from '../lib/theme'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <ThemeProvider theme={theme}>
        <StoreProvider store={reduxStore}>
          <Helmet
            htmlAttributes={{ lang: 'en' }}
            title="Gruff Debate"
            meta={[
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
              { property: 'og:title', content: 'Gruff Debate' },
            ]}
          />
          <Component {...pageProps} />
        </StoreProvider>
      </ThemeProvider>
    )
  }
}

export default withReduxStore(MyApp)
