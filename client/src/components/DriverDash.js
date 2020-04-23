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
    } else {
      return "N/A";
    }
  };

  getDestination = () => {
    switch (this.state.order.status) {
      case "Waiting":
        return this.state.order.businessAddress;
      case "onroutePickup":
        return this.state.order.businessAddress;
      case "onrouteDeli":
        return this.state.order.deliveryAddress;
      case "delivered":
        return "N/A";
      case "cancelled":
        return "N/A";
      default:
        return this.state.order.businessAddress;
    }
  };

  getDistance = () => {
    // calc the distance from current location to destination.
  };

  getRealTime = () => {
    var currentDay = new Date();
    var currentTime = currentDay.getTime();
    var orderTime = new Date(this.state.order.orderTime);
    var diff = (currentTime - orderTime.getTime()) / 1000;
    diff /= 60;
    var realTime = Math.abs(Math.round(diff));
    return realTime;
  };

  getNumOrder = () => {
    //don't think we need this
    // get number of orders from that restaurant
  };
  getRoute = () => {
    // get number of miles between businessAddress and deliveryAddress
  };

  handleAccept = async (event) => {
    // accept request - change status to 'onRoutePickup', insert driver to assigned.
    event.preventDefault();
    console.log(event);
  };

  handleDecline = async (event) => {
    // decline request - delete this order request from list.
  };

  distance = (lat1, lon1, lat2, lon2, unit) => {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") {
        dist = dist * 1.609344;
      }
      if (unit === "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
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
              {this.getDestination()}
            </div>
          </div>
          <br />
          <div id="button-container2">
            <CustomButtons
              onClick={this.props.onAccept}
              text="Accept Order"
              color="#5c8eb9"
              width="100%"
              fontSize="20px"
              value={this.state.order._id}
            />
          </div>
        </div>
      </div>
    );
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
