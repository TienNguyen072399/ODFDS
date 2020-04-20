import React, { Component } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "../components/NavBar";
import DriverDash from "../components/DriverDash";

class DriverOpenOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "driver",
      orders: [],
    };
  }

  componentDidMount() {
    console.log(this.props.user);
    this.getOrders();
  }

  getOrders = () => {
    fetch("http://localhost:5000/api/drivers/orders")
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        this.setState({ orders: res });
      });
  };

  handleAccept = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:5000/api/drivers/order/accept", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: e.target.value,
        driverName: this.props.user.name,
        driverId: this.props.user._id,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
          this.getOrders();
        } else {
          alert(res.success);
          this.getOrders();
        }
      });
  };

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
          <div key={item._id}>
            <center>
              <DriverDash order={item} onAccept={this.handleAccept} />
            </center>
          </div>
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(DriverOpenOrders);
