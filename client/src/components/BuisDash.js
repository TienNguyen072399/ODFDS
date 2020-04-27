import React, { Component } from "react";
import "../pages/DashCSS.css";
import CustomButtons from "../components/CustomButtons";
import Rating from "./rating";
import { Link } from "react-router-dom";
//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

class BuisDash extends Component {
  state = {
    order: this.props.order,
  };

  getDriver = () => {
    switch (this.state.order.status) {
      case "Waiting for driver":
        return this.state.order.status;
      case "Waiting for driver.":
        return this.state.order.status;
      case "Waiting for pickup":
        if(this.state.order.assigned) {
          return this.state.order.assigned;
        }else return "Waiting for driver";
        
      case "Out for delivery":
        return this.state.order.assigned;
      default:
        return this.state.order.assigned;
    }
  };

  getDestination = () => {
    switch (this.state.order.status) {
      case "Waiting for Driver.":
        return ;
      case "Waiting for pickup":
        if(this.state.order.assigned) {
          return "Currently on route to " + this.state.order.businessAddress;
        }else return "";
      case "Out for delivery":
        return "Currently on route to " + this.state.order.deliveryAddress;
      default:
        return "";
    }
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

  getCost = () => {
    if(this.state.order.cost){
      switch (this.state.order.status) {
        case "Delivered":
          return `Total cost: $${Math.round(this.state.order.cost*100)/100}`;
        default:
          // try to update real time cost - not finished
          return `Estimate cost: $${Math.round(this.state.order.cost*100)/100}`;
      }
      
    }else return;
  };

  //calculate costs of 1 order
  calc_costs = (miles) => {
  //calculating cost, 5 is base cost
    let cost_order = 5;
    cost_order = cost_order + miles * 2;
    return cost_order;
  }


  render() {
    return (
      <div id="container">
        <div id="dash-box">
          <div id="boxtop">
            <div id="titlecontainer">ID: {this.state.order._id}</div>
            <br />
            <div id="titlecontainer">
              Customer: {this.state.order.customerName}
            </div>
            <br />
          </div>

          <div id="container">
          <div className="iconcircle"><div id ="circleindex">{this.props.index}</div></div>
          </div>
          <div id="status">Status: {this.state.order.status}</div>

          <div id="titlecontainer">
            <h2>Driver: {this.getDriver()}</h2>
          </div>
          <br />
          <div id="time">{this.getRealTime()} mins ago</div>
          <div id="container">
            <br />
            <div id="description"style={{ textAlign: "left", paddingRight: "40%" }}>{this.getDestination()}</div>
            <div id="description"style={{ textAlign: "left", paddingRight: "40%" }}>{this.getCost()}</div>
          </div>
          <br />
          <br />
          <br />
          <div id="starcontainer" >
            <Rating driver={this.state.order.assigned} />
          </div>
          <div id="button-container2">
            <Link
              to={{
                pathname: "/business/order-map",
                state: { order: this.state.order },
              }}
            >
              <CustomButtons
                text="View Driver Location ->"
                color="#5c8eb9"
                width="100%"
                fontSize="20px"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BuisDash;
