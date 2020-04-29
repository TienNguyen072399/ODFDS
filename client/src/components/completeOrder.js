import React, { Component } from "react";
import "../pages/completeOrder.css";
import CustomButtons from "../components/CustomButtons";

//Complete Order Component for dashboard
class CompleteOrder extends Component {
  
  state = {
    order: this.props.order,
  };

  
  getDeliveryTime = () => {
    var deliveredTime = new Date(this.state.order.timeDelivered);
    return deliveredTime.toLocaleTimeString();
  }

    render() {
      return (
    <div id = "container">
    <div id="dash-box">
    <div id="boxtop">ORDER COMPLETED</div>
    <br></br>
    <div id ="titlecontainer"><h2>ORDER RECIEVED</h2></div>
    <div id="time">[Delivery Time: {this.getDeliveryTime()}]</div>
    <div id="container">
    <div id="description">Order for {this.state.order.customerName} was delivered. You owe ${this.state.order.cost}.</div>
    </div>
    <div id="button-container"><CustomButtons text="PAY NOW" color="#5c8eb9" width="50%"fontSize="25px"/></div>
</div>
</div>  
      );
    }
  }
  
  export default CompleteOrder;
  