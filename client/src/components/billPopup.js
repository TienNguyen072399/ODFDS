import React, { Component } from "react";
import "../pages/popupStyle.css";
class billPopup extends Component {
state = {};

  render() {
    return (
        <div className="popupcontainer">
        <div id="dollar">$</div>
        <div id="txtcontainer">You owe $[X].</div>
        <div id="txtcontainer"> <CustomButtons text="PAY NOW" color="#5c8eb9" width="100%"fontSize="20px"/></div>
        <div id="txtcontainer"> <CustomButtons text="PAY LATER" color="#5c8eb9" width="100%"fontSize="20px"/></div>
    </div>
    );
  }
}

export default billPopup;