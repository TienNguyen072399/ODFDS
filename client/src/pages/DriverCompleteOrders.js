import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../components/NavBar";
import DriverDash from "../components/DriverDash";
import DriverComplete from "../components/DriverComplete";
import BuisDash from "../components/BuisDash";
import billPopup from "../components/billPopup";
import CustomButtons from "../components/CustomButtons";
class DriverCompletOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "driver",
      orders: [],
    };
  }

  componentDidMount() {
    console.log(this.props.user);
    fetch(
      "http://localhost:5000/api/drivers/mycompletedorders/" +
        this.props.user._id
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        this.setState({ orders: res });
      });
  }

  handleAccept = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  handleRefresh = () => {
    fetch(
      "http://localhost:5000/api/drivers/mycompletedorders/" +
        this.props.user._id
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        this.setState({ orders: res });
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
        <center>
          <CustomButtons
            text="Refresh"
            color="#5c8eb9"
            width="100%"
            fontSize="20px"
            onClick={this.handleRefresh}
          />
        </center>
        {this.state.orders.map((item) => (
          <div key={item._id}>
            <center>
              <billPopup
                onPayNow={this.handlePayNow}
                onPayLater={this.handlePayLater}
              />
              <DriverComplete index={this.state.orders.indexOf(item)+1} order={item} />
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

export default connect(mapStateToProps)(DriverCompletOrders);
