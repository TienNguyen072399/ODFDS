import React, { Component } from "react";
import "../pages/popupStyle.css";
import CustomButtons from "../components/CustomButtons";
class billPopup extends Component {
state = {
  cost: 0,

};

  render() {
    return (
        <div className="popupcontainer">
        <div id="dollar">$</div>
        <div id="txtcontainer">You owe ${this.state.cost}.</div>
        <div id="txtcontainer"> <CustomButtons onclick = {this.props.onPayNow} text="PAY NOW" color="#5c8eb9" width="100%"fontSize="20px"/></div>
        <div id="txtcontainer"> <CustomButtons onclick = {this.props.onPayLater} text="PAY LATER" color="#5c8eb9" width="100%"fontSize="20px"/></div>
    </div>
    );
  }
}

export default billPopup;