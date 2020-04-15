import React, { Component } from "react";
import styled from "styled-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import CustomButtons from "../components/CustomButtons";
import Navbar from "../components/NavBar";
import BuisDash from "../components/BuisDash";
class BusinessDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "business",
      orders: [{businessName: "Restaurant 1",
      address: "123 Green St",
      customerName: "Mark",
      deliveryAddress: "456 Baker ct",
      timePickUp: "12:50",
      timeDelivered: "13:10",
      driver: "Jack",
      __id: 1,
    },      
      {businessName: "Restaurant 1",
      address: "123 Green St",
      customerName: "Jack",
      deliveryAddress: "456 Hoover ct",
      timePickUp: "13:30",
      timeDelivered: "13:40",
      driver: "David",
      __id: 2,
    },
    ],
    };
  }

  render() {
    
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: 20,
        color: "#4E4E4E",
      }}>
        <Navbar type={this.state.type}/>
        <center><BuisDash/></center>
        {this.state.orders.map(item => (<div>
          <div>ID: {item.__id}</div>
          <div>Customer Name: {item.customerName}</div>
          <div>Delivery address: {item.deliveryAddress}</div>
          <div>Pick up: {item.timePickUp}</div>
          <div>Delivered: {item.timeDelivered}</div>
          <div>Driver: {item.driver}</div>
          </div> ))}
        </div>
    );
  }
}
export default BusinessDashboard;
