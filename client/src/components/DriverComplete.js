import React, { Component } from "react";
import "../pages/DashCSS.css";
import CustomButtons from "../components/CustomButtons";

class DriverComplete extends Component {
  state = {
    order: this.props.order,
  };

  getRealTime = () => {
    var currentDay = new Date();
    var currentTime = currentDay.getTime();
    var orderTime = new Date(this.state.order.timeDelivered);
    var diff = (currentTime - orderTime.getTime()) / 1000;
    diff /= 60;
    var realTime = Math.abs(Math.round(diff));
    return realTime;
  };

  render() {
    return (
      <div id="container">
        <div id="dash-box">
          <div id="boxtop">
            <div id="titlecontainer">ID: {this.state.order._id}</div>
            <br />
            <div id="titlecontainer">
              Restaurant: {this.state.order.businessName}
            </div>
            <br />
          </div>

          <div id="container">
            <div className="iconcircle"></div>
          </div>

          <div id="titlecontainer">Status: {this.state.order.status}</div>
          <br />
          <div id="time">{this.getRealTime()} mins ago</div>
          <div id="container">
            <br />
            <div
              id="description"
              style={{ textAlign: "left", paddingRight: "30%" }}
            >
              To: {this.state.order.deliveryAddress}
            </div>
          </div>
          <br />
          <div
            id="description"
            style={{ textAlign: "left", paddingRight: "30%" }}
          >
            Cost: ${this.state.order.cost}
          </div>
        </div>
      </div>
    );
  }
}

export default DriverComplete;
