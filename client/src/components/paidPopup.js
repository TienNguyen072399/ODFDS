import React, { Component } from "react";
import "../pages/popupStyle.css";
class paidPopup extends Component {
 state = {};

  render() {
    return (
        <div className="popupcontainer">
        <div id="dollar">$</div>
        <div id="txtcontainer">You have paid $[X]. Thank you!</div>
        <div id="txtcontainer"><CustomButtons text="Close Window" color="#5c8eb9" width="100%"fontSize="20px"/></div>
    </div>
    );
  }
}

export default paidPopup;