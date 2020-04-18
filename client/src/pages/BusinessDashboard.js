import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import CustomButtons from "../components/CustomButtons";
import Navbar from "../components/NavBar";
import BuisDash from "../components/BuisDash";
class BusinessDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "business",
      orders: [],
    };
  }

  componentDidMount() {
    console.log(this.props.user);
    fetch("http://localhost:5000/api/restaurants/orders/" + this.props.user._id)
      .then((response) => response.json())
      .then((res) => {
        this.setState({ orders: res });
      });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 20,
          color: "#4E4E4E",
        }}
      >
        <Navbar type={this.state.type} />
        {this.state.orders.map((item) => (
          <div>
            <BuisDash order = {item}/>
          </div>
        ))}
      </div>

//       <div style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         fontSize: 20,
//         color: "#4E4E4E",
//       }}>
//         <Navbar type={this.state.type}/>
        
//         {this.state.orders.map(item => (
          
//           <div>
//           <center><BuisDash order={item}/></center>
          
//           </div> ))}
//         </div>

/* <div>ID: {item.__id}</div>
            <div>Customer Name: {item.customerName}</div>
            <div>Delivery address: {item.deliveryAddress}</div>
            <div>Order Time: {item.orderTime}</div>
            <div>Pick up: {item.timePickUp}</div>
            <div>Delivered: {item.timeDelivered}</div>
            <div>Driver: {item.assignedr}</div> */

    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(BusinessDashboard);
