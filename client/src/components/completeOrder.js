import React, { Component } from "react";
import "../pages/completeOrder.css";
import CustomButtons from "../components/CustomButtons";

//Complete Order Component for dashboard
class CompleteOrder extends Component {
  
  state = {
    order: this.props.order,
  };

  getRecievedTime = () => {
    var orderTime = new Date(this.state.order.orderTime);
    return orderTime.toLocaleString();
  }

  getDeliveryTime = () => {
    var deliveredTime = new Date(this.state.order.timeDelivered);
    return deliveredTime.toLocaleString();
  }

  

    render() {
      return (
    <div>
    <div id="dash-box">
    <div id="boxtopcomplete">ORDER COMPLETED</div>
    <br></br>
      <div id ="time">Order recieved at {this.getRecievedTime()}</div><br/>
    <div id="time">Delivered at {this.getDeliveryTime()}</div><br/>
    <div id="container">
    <div id="titlecontainer"><h2>Order for {this.state.order.customerName} was delivered. You owe ${this.state.order.cost}.</h2></div>
    </div>
    <div id="button-container-complete"><CustomButtons onclick = {this.props.onPay} text="PAY NOW" color="#5c8eb9" width="50%"fontSize="25px"/></div>
</div>
</div>  
      );
    }
  }
  //<div id ="titlecontainer"><h2>ORDER RECIEVED</h2></div>
  export default CompleteOrder;
  