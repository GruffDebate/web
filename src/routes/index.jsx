import React from "react";
import { Router, Link } from "@reach/router";

// import PrivateRoute from "./PrivateRoute";
import Home from "../pages/home";

import HomeIcon from "../assets/icons/home-page.svg";
// import ScaleIcon from "../assets/icons/scale.svg";
// import DietIcon from "../assets/icons/diet.svg";

// const privateRoute = [
//   {
//     path: "/",
//     name: "Home",
//     description: "Home",
//     icon: HomeIcon
//   },
//   {
//     path: "/unidades",
//     name: "Unidades",
//     description: "Unidades",
//     icon: ScaleIcon
//   },
//   {
//     path: "/ingredientes",
//     name: "Ingredientes",
//     description: "Ingredientes",
//     icon: DietIcon
//   },
//   {
//     path: "/categorias",
//     name: "Categorias",
//     description: "Categorias",
//     icon: DietIcon
//   }
// ];

// const RestrictedArea = () => {
//   return (
//     <Switch>
//       <PrivateRoute exact path="/" component={Home} />
//       <PrivateRoute exact path="/unidades" component={Unit} />
//       <PrivateRoute exact path="/ingredientes" component={Ingredient} />
//       <PrivateRoute exact path="/categorias" component={Category} />
//       <PrivateRoute exact path="/perfil" component={Account} />
//     </Switch>
//   );
// };

const Routes = () => (
  <Router>
    <Home path="/" />
  </Router>
  // <Router history={history}>
  //   <Layout routes={privateRoute}>
  //     <Switch>
  //       <Route exact path="/lostPassword" component={LostPassword}
  //       {/* <Route exact path="/lostPassword" component={LostPassword} />
  //       <Route exact path="/register" component={Register} />
  //       <Route exact path="/login" component={Login} /> */}
  //       {/* <PrivateRoute path="/" component={() => RestrictedArea()} /> */}
  //     </Switch>
  //   </Layout>
  // </Router>
);

export default Routes;
