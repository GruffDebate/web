import React from "react"
import { isLoggedIn } from "../utils/auth"
import { navigate } from "gatsby"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/login`) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/`)
    return null
  }

  return isLoggedIn() ? <Component {...rest} /> : null
}

export default PrivateRoute