import React, { Component } from "react";
import "../pages/DashCSS.css";
import CustomButtons from "../components/CustomButtons";
import Rating from "./rating";

//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

class BuisDash extends Component {
  
  state = {

      order : this.props.order,

  };

  getDriver = () => {
    if (this.state.order.assignedr) {
      return this.state.order.assignedr;
    } else{
      return "Waiting to assigned";
    }
  };

  getDestination = () => {
    switch (this.state.order.status){
      case 'waiting':
        return "N/A";
      case 'onroutePickup':
        return this.state.order.businessAddress;
      case 'onrouteDeli':
        return this.state.order.deliveryAddress;
      case 'delivered':
        return "N/A";
      case 'cancelled':
        return "N/A";
      default:
        return "N/A";   
    }
  }

  getRealTime = () => {
    var currentDay = new Date();
    var currentTime = currentDay.getTime();
    var orderTime = new Date(this.state.order.orderTime);
    var diff =(currentTime - orderTime.getTime()) / 1000;
    diff /= 60;
    var realTime = Math.abs(Math.round(diff));
    return realTime;
  }
  
  render() {

    
    return <div id = "container">
    <div id="dash-box">
        <div id="boxtop"></div>
        <div id = "container"><div className ="iconcircle"></div></div>
        <div id ="titlecontainer">ID: {this.state.order._id}</div><br/>
        <div id ="titlecontainer">Customer: {this.state.order.customerName}</div>
        <div id ="titlecontainer"><h2>Driver: {this.getDriver()}</h2></div>
        <div id="time">{this.getRealTime()} mins ago</div>
        <div id="container">
        <div id="description">Currently on route to {this.getDestination()}</div>
        </div><br/><br/><br/>
        <div id="starcontainer"><Rating driver={this.state.order.assignedr}/></div>
        <div id="button-container2"><CustomButtons text="View Driver Profile ->" color="#5c8eb9" width="100%"fontSize="13px"/></div>
    </div>
    </div>;
  }
}

export default BuisDash;
