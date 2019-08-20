import React from "react"
import { Router } from "@reach/router" 
import Claims from "./claims"
import Home from "./index" 
import Claim from "./claim" 
import Contexts from "./contexts" 
import PrivateRoute from "../components/PrivateRoute"
import Login from "./login"

// remember everything in /app/* is dynamic now!

const App = () => {
  return (
    <Router>
      <PrivateRoute path="/app/claims" component={Claims} />
      <PrivateRoute path="/app/contexts" component={Contexts} />
      <PublicRoute path="/">
        <Home path="/" />
        <Claim path="/c/:key"/>
        <Login path="/login" />
      </PublicRoute>
    </Router>
  )
}

function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default App