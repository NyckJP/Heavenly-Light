import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import SignOutButton from "../authentication/SignOutButton"

const TopBar = ({ user, basketCount }) => {
  const [renderNav, setRenderNav] = useState(false)
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  let renderBasketCount
  if(basketCount > 0) {
    renderBasketCount = (
        <div className="basket-count-bubble">
          {basketCount}
        </div>
    )
  } else {
    renderBasketCount = <></>
  }

  const unauthenticatedListItems = [
    <li className="nav-link" key="products">
      <a href="/#products">
        Products
      </a>
    </li>,
    <li className="nav-link" key="about">
      <Link to="/about">
        About
      </Link>
    </li>,
    <li className="nav-link" key="contact">
      <Link to="/">
        Contact
      </Link>
    </li>,
    <li key="Basket">
      <Link to="/basket">
        <i className="fa-solid fa-basket-shopping basket-button" />
        {renderBasketCount}
      </Link>
    </li>,
    // <li key="sign-in">
    //   <Link to="/user-sessions/new">Sign In</Link>
    // </li>,
    // <li key="sign-up">
    //   <Link to="/users/new" className="button">
    //     Sign Up
    //   </Link>
    // </li>
  ]

  const authenticatedListItems = [
    <li className="nav-link" key="products">
      <a href="/#products">
        Products
      </a>
    </li>,
    <li className="nav-link" key="about">
      <Link to="/about">
        About
      </Link>
    </li>,
    <li className="nav-link" key="contact">
      <Link to="/">
        Contact
      </Link>
    </li>,
    <li key="Basket">
      <Link to="/basket">
        <i className="fa-solid fa-basket-shopping basket-button" />
        {renderBasketCount}
      </Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>
  ]

  const dropDownMenuItems = [
    <li key="products">
      <a href="/#products">
        Products
      </a>
    </li>,
    <li key="about">
      <a href="/about">
        About
      </a>
    </li>,
    <li key="contact">
      <Link to="/">
        Contact
      </Link>
    </li>
  ]

  let topBarStyling = "top-bar sticky"
  let dropDownStyling = "drop-down-menu hide-on-large-screens sticky"
  if (atTop) {
    topBarStyling = "top-bar sticky at-top"
    dropDownStyling = "drop-down-menu hide-on-large-screens sticky at-top"
  }

  let dropDownNav
  if(renderNav) {
    dropDownNav = (
      <div className={dropDownStyling}>
        <ul className="menu menu-links">
          {dropDownMenuItems}
        </ul>
      </div>
    )
  }

  return (
    <>
      {dropDownNav}
      <div className={topBarStyling}>
        <div className="hide-on-large-screens">
          <i className="fa-solid fa-bars menu-bars" onClick={() => {setRenderNav(!renderNav)}}/>
        </div>
        <ul className="menu">
          <li className="menu-text">
            <a href="/">Heavenly Light</a>
          </li>
        </ul>
         <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </>
  )
}

export default TopBar
