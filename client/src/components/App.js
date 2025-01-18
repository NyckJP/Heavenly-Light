import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/main.scss"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import LandingPage from "./LandingPage"
import ProductShowPage from "./ProductShowPage"
import BasketPage from "./BasketPage"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [basketCount, setBasketCount] = useState(0)

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  const getBasketCount = async () => {
    try {
      const response = await fetch("/api/v1/baskets/count")
      const parsedResponse = await response.json()
      setBasketCount(parsedResponse.basketCount)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
    getBasketCount()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} basketCount={basketCount} />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/products/:id" render={props => <ProductShowPage getBasketCount={getBasketCount} {...props} />} />
        <Route exact path="/basket" render={() => <BasketPage getBasketCount={getBasketCount} />} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  )
}

export default hot(App);
