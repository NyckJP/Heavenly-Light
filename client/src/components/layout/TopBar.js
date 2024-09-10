import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li className="nav-link" key="products">
      <Link>
        Products
      </Link>
    </li>,
    <li className="nav-link" key="about">
      <Link>
        About
      </Link>
    </li>,
    <li className="nav-link" key="contact">
      <Link>
        Contact
      </Link>
    </li>,
    <li key="Basket">
      <Link>
        <i className="fa-solid fa-basket-shopping" />
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
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar sticky">
      <div className="hide-on-large-screens">
        <Link>
          <i className="fa-solid fa-bars" />
        </Link>
      </div>
      <ul className="menu">
        <li className="menu-text">Heavenly Light</li>
      </ul>
      <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
    </div>
  );
};

export default TopBar;
