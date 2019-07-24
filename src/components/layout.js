import React from "react";
import styled from "styled-components";
import Navbar from "./navbar";

import HomeIcon from "../assets/icons/home-page.svg";

const Layout = ({ children }) => {
  const routes = [
    {
      path: "/",
      name: "Home",
      description: "Home",
      icon: HomeIcon
    },
  ];

  // useEffect(() => {
  //   if (isAuth) {
  //     getMe();
  //   }
  // }, [window.location.pathname]);

  return (
    <Grid>
      <GridHeader>
        <Navbar
          routes={routes}
        />
      </GridHeader>
      <GridContent>{children}</GridContent>
    </Grid>
  )
};

export default Layout

const Grid = styled.div`
  height: 100%;
  overflow: none;
`;

const GridHeader = styled.div`
  display: grid;
`;

const GridContent = styled.main`
  overflow: auto;
  grid-area: content;
  padding: 0 3.5em;
  max-width: 1290px;
  margin: 2em auto;
`;
