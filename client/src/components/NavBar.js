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
            <Link to="openorders">Open Orders</Link>
            <Link to="map">Order Map</Link>
            <Link to="complete">Delivered Orders</Link>
            <Link to="">Log Out</Link>
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
            <Link to="">Log Out</Link>
          </div>{" "}
        </div>
      );
    }
  }
}

export default Navbar;
