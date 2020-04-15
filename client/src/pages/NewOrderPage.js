import React, { Component } from "react";
import styled from "styled-components";
import "../App.css";
import { Link, Redirect, useHistory } from "react-router-dom";
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
      timeDelivered:"",
      
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
    const city = event.target.value;
    this.setState({
        city,
    });
  };


  handleSubmit = async (e) => {
    return <Redirect to='/restaurant/dashboard' />
  };

  render() {
    const { customerName, address, zipCode,city, businessName,deliveryAddress,timePickUp,timeDelivered} = this.state;
    
    return (
        <div><Navbar type="business"/>
    
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
          <input type="text" id="inputCusName" className="form-control"
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
export default NewOrder;
