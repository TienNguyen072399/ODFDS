import React, { Component } from "react";
import "../pages/DashCSS.css";
import CustomButtons from "../components/CustomButtons";

class DriverDash extends Component {
  state = {
    order: this.props.order,
  };
  getBusiness = () => {
    if (this.state.order.businessName) {
      return this.state.order.businessName;
    } else{
      return "N/A";
    }
  };

  getDestination = () => {
    switch (this.state.order.status){
      case 'waiting':
        return this.state.order.businessAddress;
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

  getDistance = () => {
    // calc the distance from current location to destination.
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

  handleAccept = async (event) => {
    // accept request - change status to 'onRoutePickup'.
  }

  handleDecline = async (event) => {
    // decline request - delete this order request from list.
  }

  render() {
    return <div id = "container">
    <div id="dash-box">
        <div id="boxtop"></div>
        <div id = "container"><div className ="iconcircle"></div></div>
        <div id ="titlecontainer"><h2>{this.getBusiness()}</h2></div>
        <div id="time">{this.getRealTime()} mins ago</div>
        <div id="container">
  <div id="description">Requesting {this.getNumOrder()} delivery {this.getDistance()} miles away at {this.getDestination()}</div>
        </div><br/><br/><br/>
        <div id="button-container"><CustomButtons onclick= {this.handleDecline()}text="Decline Order" color="#DB3979" width="60%" fontSize="13px"/><CustomButtons onclick={this.handleAccept()} text="Accept Order ->" color="#5c8eb9" width="60%"fontSize="13px"/></div>
    </div>
    </div>;
  }
}

export default DriverDash;


/*

<CustomButtons
          text="Accept Order"
          color="#DB3979"
          width="50%"
          //onClick={}
        />{" "}

*/