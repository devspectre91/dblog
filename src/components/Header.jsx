import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          Dblog
          <Link
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Link>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <Link class="navbar-item">Home</Link>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <Link class="button is-primary">
                <strong>Sign up</strong>
              </Link>
              <Link class="button is-light">Log in</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
