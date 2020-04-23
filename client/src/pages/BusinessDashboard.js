import React, { Component } from "react";
import { connect } from "react-redux";
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
            <center>
              <BuisDash index={this.state.orders.indexOf(item)+1} order={item} />
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

export default connect(mapStateToProps)(BusinessDashboard);
