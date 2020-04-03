import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          FLY ME FOOD
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/register">
                Register <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/api/driver">
                Driver
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/api/restaurant">
                Restaurant
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="dropdown03"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Log in
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdown03">
                <a className="dropdown-item" href="#">
                  Driver
                </a>
                <a className="dropdown-item" href="#">
                  Restaurant
                </a>
              </div>
            </li>
          </ul>
          <span className="badge badge-pill badge-secondary"></span>
        </div>
      </nav>
    );
  }
}

export default NavBar;
