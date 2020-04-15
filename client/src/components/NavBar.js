import React, { Component } from "react";
import "../pages/TempCSS.css";

class Navbar extends Component {
    state = {
        type: this.props.type,
    };

    render() {
        
            if (this.type == "business"){
                return (
                <div class = "navcontainer" > 
                <div class = "navbar" >
                <a href=""> Settings </a> 
                <a href=""> Order Map </a> 
                <a href=""> Current Orders </a> 
                <a href=""> Log Out </a> 
                </div> </div >)
            }
            else{
                return (
                <div class = "navcontainer" > 
                <div class = "navbar" >
                <a href="">Settings</a>
                <a href="">New Order</a>
                <a href="">Current Orders</a>
                <a href="">Log Out</a>
                </div> </div >)
            }
            
        
    }
}

export default Navbar;