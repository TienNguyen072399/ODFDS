import React, { Component } from "react";
import styled from "styled-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import CustomButtons from "../components/CustomButtons";
import Navbar from "../components/NavBar";
class DriverDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        type:'driver',
        orders: [{businessName: "Restaurant 1",
      address: "123 Green St",
      customerName: "Mark",
      deliveryAddress: "456 Baker ct",
      timePickUp: "12:50",
      timeDelivered: "13:10",
      driver: "Jack",
      __id: 1,
    },      
      {businessName: "Restaurant 2",
      address: "123 Blue St",
      customerName: "Jack",
      deliveryAddress: "456 Hoover ct",
      timePickUp: "13:30",
      timeDelivered: "13:40",
      driver: "Jack",
      __id: 2,
    },
    ],
    };
  }

  render() {
    
    return (
        <div>
        <Navbar type={this.state.type}/>
        {this.state.orders.map(item => (<div>
          <div>ID: {item.__id}</div>
          <div>Business Name: {item.businessName}</div>
          <div>Business address: {item.address}</div>
          <div>Customer Name: {item.customerName}</div>
          <div>Delivery address: {item.deliveryAddress}</div>
          <div>Pick up: {item.timePickUp}</div>
          <div>Delivered: {item.timeDelivered}</div>
          
          </div> ))}
        </div>
    );
  }
}
export default DriverDashboard;
