import React, { Component } from "react";
import Styles from "../pages/popupStyle.module.css";
import "../pages/popupStyle.module.css";
import CustomButtons from "./CustomButtons";

class Popup extends Component {
state = {
  cost: 100,
  isActive: false,
};

message = '';

  openPopup = (message = 'Something went wrong...') => {
    this.message = message;
    this.setState({ isActive: true }, () => {
      // setTimeout(() => {
      //   this.setState({ isActive: false });
      // }, 30000);
      
    });
  }
  render() {
    const { isActive } = this.state;
    return (
      <div className = {isActive ? [Styles.popup, Styles.show].join(" ") : Styles.popup}>
        
          <div id="dollar">$</div>
        
          <div id="txtcontainer">You owe ${this.state.cost}.</div>
          <div id="txtcontainer"> <CustomButtons onclick = {this.props.onPayNow} text="PAY NOW" color="#5c8eb9" width="100%"fontSize="20px"/></div>
          <div id="txtcontainer"> <CustomButtons onclick = {this.props.onPayLater} text="PAY LATER" color="#5c8eb9" width="100%"fontSize="20px"/></div>
        
        
      </div>
    )
  }
}


export default Popup;