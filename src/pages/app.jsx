import React from "react"
import { Router } from "@reach/router" 
import Claims from "./claims"
import Home from "./index" 
import PrivateRoute from "../components/PrivateRoute"
import Login from "./login"

// remember everything in /app/* is dynamic now!

const App = () => {
  return (
    <Router>
      <PrivateRoute path="/app/claims" component={Claims} />
      <PublicRoute path="/">
        <Home path="/" component={Home} />
        <Login path="/login" />
      </PublicRoute>
    </Router>
  )
}

function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default App