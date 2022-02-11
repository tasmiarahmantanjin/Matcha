import React from "react";

import logoImage from "../../assets/images/logo_matcha.svg";

// https://dev.to/javascriptacademy/responsive-navigation-bar-with-mobile-menu-using-html-css-2hpd

import "./Nav.css";

const Nav = () => {
  return (
    <div>
      <header>
        <div id="brand">
          <a href="/">MyCompany</a>
        </div>

        <nav>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li id="login">
              <a href="/login">Login</a>
            </li>
            <li id="signup">
              <a href="/signup">Signup</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
