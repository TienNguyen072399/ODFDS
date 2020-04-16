import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../pages/TempCSS.css";

class Navbar extends Component {
  state = {
    type: this.props.type,
  };

  render() {
    if (this.state.type === "driver") {
      return (
        <div class="navcontainer">
          <div class="navbar">
            <a href="/driver/setting"> Settings </a>
            <a href="/driver/map"> Order Map </a>
            <a href="/driver/dashboard"> Current Orders </a>
            <a href="/"> Log Out </a>
          </div>{" "}
        </div>
      );
    } else {
      return (
        <div class="navcontainer">
          <div class="navbar">
            {/* <a href="/business/setting">Settings</a> */}
            <Link to="neworder">New Order</Link>
            <Link to="dashboard">Current Orders</Link>
            <a href="/">Log Out</a>
          </div>{" "}
        </div>
      );
    }
  }
}

export default Navbar;
