import React from "react";
import { StoreProvider } from "easy-peasy";
import { ThemeProvider } from "styled-components";
import store from "./src/configureStore";
import { GlobalStyle } from "./src/configureStyle";
import { theme } from "./src/theme";

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <GlobalStyle />
        {element}
      </StoreProvider>
    </ThemeProvider>
  ) 
}