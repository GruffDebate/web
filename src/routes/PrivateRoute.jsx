import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { isLoggedIn } from "../utils/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { auth, cachedAuth } = useAuth();
  const isAuth =
    !!get(auth, "token", false) || !!get(cachedAuth, "token", false);

  if (!isAuth && location.pathname !== `/login`) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/`)
    return null
  }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute