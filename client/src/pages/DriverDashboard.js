import React, { Component } from "react";
import styled from "styled-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import CustomButtons from "../components/CustomButtons";
import Navbar from "../components/NavBar";
import DriverDash from "../components/DriverDash";

class DriverDashboard extends Component {
  constructor(props) {
    super(props);

    
    this.state = {
      type: "driver",
      orders: [
        {
          _id:"5e9a5c1b4a288946140e4115",
          orderTime:"Fri Apr 17 2020 18:47:07 GMT-0700 (Pacific Daylight Time)",
          assigned:"",
          timePickUp:"",
          timeDelivered:"",
          businessName:"Go Go Chicken",
          businessId:"5e9a23c75bc9ef5a84b08faa",
          businessAddress:"125 Lido st",
          customerName:"Bane",
          deliveryAddress:"123 Hoover st,San Jose, CA 94123",
          __v:0,
        },
        {
          _id:"5e9a5d254a288946140e4116",
          orderTime:"Fri Apr 17 2020 18:51:33 GMT-0700 (Pacific Daylight Time)",
          assigned:"",
          timePickUp:"",
          timeDelivered:"",
          businessName:"Go Go Chicken",
          businessId:"5e9a23c75bc9ef5a84b08faa",
          businessAddress:"125 Lido st",
          customerName:"Harry",
          deliveryAddress:"456 Barry st,Santa Clara, CA 91242",
          __v:0,
        },
      ],
    };
  }

  render() {
    const listOrders = this.state.orders.map((order) => (
      <div>
        <div>ID: order.__id}</div>
        <div>Business Name: order.businessName}</div>
        <div>Business address: order.address}</div>
        <div>Customer Name: order.customerName}</div>
        <div>Delivery address: order.deliveryAddress}</div>
        <div>Pick up: order.timePickUp}</div>
        <div>Delivered: order.timeDelivered}</div>
      </div>
    ));
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 20,
          color: "#4E4E4E",

        }}>
        <Navbar type={this.state.type}/>
        
        {this.state.orders.map(item => (<div>
          <center><DriverDash order = {item}/></center>
        
          
          </div> ))}
        </div>
    );
  }
}
export default DriverDashboard;
