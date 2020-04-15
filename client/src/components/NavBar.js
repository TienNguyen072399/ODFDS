import React, { Component } from "react";
import "../pages/TempCSS.css";

class Navbar extends Component {
    state = {};

    render() {
        return ( 
            <div class = "navcontainer" > 
            <div class = "navbar" >
            <a > Settings </a> 
            <a > Order Map </a> 
            <a > Current Orders </a> 
            <a > Log Out </a> 
            </div> </div >
        )
    }
}

export default Navbar;