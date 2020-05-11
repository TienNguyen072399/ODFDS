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
    var deliveryTime = new Date(this.state.order.timeDelivered);
    var diff = (currentTime - deliveryTime.getTime()) / 1000;
    diff /= 60;
    var realTime = Math.round(diff*100)/100;
    if (realTime < 1) return `${Math.abs(Math.round(realTime*60))} seconds`;
    return `${Math.abs(Math.round(realTime))} minutes`;
  };

  getTotaltime = () => {

    if (this.state.order.timeDelivered && this.state.order.timePickUp){
    var deliveryTime = new Date(this.state.order.timeDelivered);
    var pickupTime = new Date(this.state.order.timePickUp);
    let totalTime = Math.round(100*((deliveryTime.getTime() - pickupTime.getTime())/(1000*60)))/100
    
    if (totalTime < 1) return `${Math.abs(Math.round(totalTime*60))} seconds`;
    return  `${Math.abs(Math.round(totalTime))} minutes`;
    }
    else return "N/A"
  }

  render() {
    console.log(this.state.order)
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
            <div className="iconcircle"><div id ="circleindex">{this.props.index}</div></div>
          </div>

          <div id="titlecontainer">Status: {this.state.order.status}</div>
          <br />
          <div id="time">Delivered: {this.getRealTime()} ago</div>
          <div id="container">
            <br />
            <div
              id="description"
              style={{ textAlign: "left", paddingRight: "30%" }}
            >
              
              To: {this.state.order.deliveryAddress}
            </div>
            <div
            id="description"
            style={{ textAlign: "left", paddingRight: "30%" }}
            >
            Total time: {this.getTotaltime()}
            </div>
            <div
            id="description"
            style={{ textAlign: "left", paddingRight: "30%" }}
            >
            Total cost: ${Math.round(this.state.order.cost*100)/100}
            </div>
          </div>
          
          <br/>
          
        </div>
      </div>
    );
  }
}

export default DriverComplete;
