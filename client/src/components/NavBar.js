import React, { Component } from "react";
import "../pages/TempCSS.css";

class Navbar extends Component {
    state = {
        type: this.props.type
    };

    render() {
        
            if (this.state.type === "driver"){
                return (
                <div class = "navcontainer" > 
                <div class = "navbar" >
                <a href="/driver/setting"> Settings </a> 
                <a href="/driver/map"> Order Map </a> 
                <a href="/driver/dashboard"> Current Orders </a> 
                <a href="/"> Log Out </a> 
                </div> </div >)
            }
            else{
                return (
                <div class = "navcontainer" > 
                <div class = "navbar" >
                <a href="/restaurant/setting">Settings</a>
                <a href="/restaurant/neworder">New Order</a>
                <a href="/restaurant/dashboard">Current Orders</a>
                <a href="/">Log Out</a>
                </div> </div >)
            }
            
        
    }
}

export default Navbar;