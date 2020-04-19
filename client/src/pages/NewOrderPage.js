import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import CustomButtons from "../components/CustomButtons";
import Navbar from "../components/NavBar";
class NewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: "",
      address: "",
      zipCode: "",
      city: "",
      businessName: "",
      deliveryAddress: "",
      timePickUp: "",
      timeDelivered: "",
    };
  }

  handleCustomerName = async (event) => {
    const customerName = event.target.value;
    this.setState({
      customerName,
    });
  };

  handleChangeAddress = async (event) => {
    const deliveryAddress = event.target.value;
    this.setState({
      deliveryAddress,
    });
  };

  handleChangeCity = async (event) => {
    const city = event.target.value;
    this.setState({
      city,
    });
  };

  handleChangeZip = async (event) => {
    const zipCode = event.target.value;
    this.setState({
      zipCode,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.props);
    fetch("http://localhost:5000/api/restaurants/order/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        businessName: this.props.user.businessName,
        businessId: this.props.user._id,
        businessAddress: this.props.user.address,
        customerName: this.state.customerName,
        deliveryAddress:
          this.state.deliveryAddress +
          "," +
          this.state.city +
          ", CA " +
          this.state.zipCode,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          alert(res.success);
          this.setState({
            customerName: "",
            deliveryAddress: "",
            city: "",
            zipCode: "",
          });
        } else {
          alert(res.error);
          this.setState({
            customerName: "",
            deliveryAddress: "",
            city: "",
            zipCode: "",
          });
        }
      });
    // return <Redirect to="/business/dashboard" />;
  };

  render() {
    const {
      customerName,
      address,
      zipCode,
      city,
      businessName,
      deliveryAddress,
      timePickUp,
      timeDelivered,
    } = this.state;

    return (
      <div>
        <Navbar type="business" />

        <form
          className="form-signin"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 30,
            color: "#4E4E4E",
          }}
        >
          <div className="formInput">
            {" "}
            <h1> Create new order </h1> <label>Customer Name </label>
            <input
              type="text"
              id="inputCusName"
              className="form-control"
              placeholder="Customer Name"
              required
              autoFocus
              value={customerName}
              onChange={this.handleCustomerName}
            />{" "}
            <label>Delivery Address </label>{" "}
            <input
              type="text"
              id="inputCusAddress"
              className="form-control"
              placeholder="Street Address"
              required
              value={deliveryAddress}
              onChange={this.handleChangeAddress}
            />{" "}
            <label>City </label>{" "}
            <input
              type="text"
              id="inputCusAddress"
              className="form-control"
              placeholder="City"
              required
              value={city}
              onChange={this.handleChangeCity}
            />{" "}
            <label>Zip code </label>{" "}
            <input
              type="text"
              id="inputCusAddress"
              className="form-control"
              placeholder="Zip code"
              value={zipCode}
              onChange={this.handleChangeZip}
            />{" "}
          </div>
          <div className="formInput">
            <CustomButtons
              text="SUBMIT"
              color="#DB3979"
              width="100%"
              fontSize="30px"
              onClick={this.handleSubmit}
            />
          </div>{" "}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(NewOrder);
