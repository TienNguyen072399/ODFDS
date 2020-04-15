import React, { Component } from "react";
import styled from "styled-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import CustomButtons from "../components/CustomButtons";
import Navbar from "../components/NavBar";
class DriverDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    
    return (
      <Navbar/>
      
    );
  }
}
export default DriverDashboard;
