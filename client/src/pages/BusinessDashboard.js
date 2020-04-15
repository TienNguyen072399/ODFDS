import React, { Component } from "react";
import styled from "styled-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import CustomButtons from "../components/CustomButtons";
import Navbar from "../components/NavBar";
class BusinessDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "business"
    };
  }

  render() {
    
    return (
      <Navbar type={this.type}/>
      
    );
  }
}
export default BusinessDashboard;
