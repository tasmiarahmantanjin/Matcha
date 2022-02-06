import React from "react";
import logoImage from "../assets/images/logo_matcha.svg";
import "./Nav.css";

const toggleMobileMenu = (menu) => {
  menu.classList.toggle("open");
};

const Nav = () => {
  return (
    <div>
      <header>
        <div id="brand">
          <a href="http://localhost:3000">
            <img width="100" height="80" src={logoImage} alt="Logo" />
          </a>
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
            {/* <li id="login">
              <a href="/login">Login</a>
            </li> */}
            <li id="signup">
              <a href="/signup">Logout</a>
            </li>
          </ul>
        </nav>
        <div id="hamburger-icon" onclick="toggleMobileMenu(this)">
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
          <ul class="mobile-menu">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            {/* <li id="login">
              <a href="/login">Login</a>
            </li> */}
            <li id="signup">
              <a href="/signup">Logout</a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Nav;
