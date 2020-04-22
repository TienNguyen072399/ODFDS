import React, { Component } from "react";
//import styled from "styled-components";
//import { Link, Redirect, useHistory } from "react-router-dom";
//import CustomButtons from "../components/CustomButtons";
import Navbar from "../components/NavBar";
import { connect } from "react-redux";
import "../mapbox-gl.css";
//import Map from "../components/map";
import DirectionMap from "../components/DirectionMap";
//import DirectionMap from "../components/DirectionMap";
import "./DashCSS.css";

class DriverMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "driver",
      orders: [
        // {
        //   orderTime:
        //     "Tue Apr 21 2020 10:05:33 GMT-0700 (Pacific Daylight Time)",
        //   assigned: "Will Smith",
        //   driverId: "5e9f19a48c587135d84eade9",
        //   timePickUp: "",
        //   timeDelivered: "",
        //   status: "Waiting for pickup",
        //   cost: 5,
        //   longitude: -121.880142,
        //   latitude: 37.333672,
        //   distance: 0.7,
        //   _id: "5e9f27ddfa41194708365a6a",
        //   businessName: "Chacho's",
        //   businessId: "5e9ceb0873612a2e08e3bb43",
        //   businessAddress: "87 E San Fernando St, San Jose, CA 95113",
        //   customerName: "Bobby Lee",
        //   deliveryAddress: "1 Washington Sq.,San Jose, CA 95112",
        // },
        // {
        //   _id: "5e9a5d254a288946140e4116",
        //   orderTime:
        //     "Fri Apr 17 2020 18:51:33 GMT-0700 (Pacific Daylight Time)",
        //   assigned: "",
        //   timePickUp: "",
        //   timeDelivered: "",
        //   businessName: "Go Go Chicken",
        //   businessId: "5e9a23c75bc9ef5a84b08faa",
        //   businessAddress: "301 S 1st St San Jose CA 95113",
        //   customerName: "Harry",
        //   deliveryAddress: "225 W Santa Clara St San Jose CA 95113",
        //   __v: 0,
        //   status: "Out for delivery",
        //   longitude: -121.880142,
        //   latitude: 37.333672,
        // },
      ],
      coordinates: [],
      Start: [],
      End: [],
      Direction: [],
    };
  }

  getOrders = async () => {
    await fetch(
      "http://localhost:5000/api/drivers/myorders/" + this.props.user._id
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        this.setState({ orders: res });
      });
  };

  handlePickedUp = async (event) => {
    // driver arrived -> change status base on pickup or delivery
    event.preventDefault();
    console.log(event.target.value);

    fetch("http://localhost:5000/api/drivers/order/pick-up-order", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: event.target.value,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(res.success);
          await this.getOrders();
        }
      });
  };

  handleDelivered = async (event) => {
    // driver delivered order
    event.preventDefault();
    console.log(event.target.value);

    fetch("http://localhost:5000/api/drivers/order/order-delivered", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: event.target.value,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(res.success);
          await this.getOrders();
        }
      });
  };

  componentWillUnmount() {}

  async componentDidMount() {
    await this.getOrders();
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
          <DirectionMap
            key={item._id}
            order={item}
            onPickedUp={this.handlePickedUp}
            onDelivered={this.handleDelivered}
          />
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(DriverMap);
