import React, { Component } from "react";
import Styles from "../pages/popupStyle.module.css";
import "../pages/popupStyle.module.css";
import CustomButtons from "./CustomButtons";

class Popup extends Component {
state = {
  order: this.props.order,
  isActive: false,
};

message = '';

  openPopup = (message = 'Order delivered, please check status') => {
    this.message = message;
    this.setState({ isActive: true }, () => {
      setTimeout(() => {
        this.setState({ isActive: false });
      }, 10000);
      
    });
  }
  render() {
    const { isActive } = this.state;
    return (
      <div className = {isActive ? [Styles.popup, Styles.show].join(" ") : Styles.popup}>
        <div id="dollar">$</div>
        <div id="txtcontainer">You have paid ${this.state.order.cost}. Thank you!</div>
        <div id="txtcontainer"><CustomButtons text="Close Window" color="#5c8eb9" width="100%"fontSize="20px"/></div>    
      </div>
    )
  }
}


export default Popup;