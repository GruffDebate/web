import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { StoreProvider } from 'easy-peasy'
import withReduxStore from '../lib/with-redux-store'
import { theme } from '../lib/theme'

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <ThemeProvider theme={theme}>
        <StoreProvider store={reduxStore}>
          <Component {...pageProps} />
        </StoreProvider>
      </ThemeProvider>
    )
  }
}

export default withReduxStore(MyApp)
