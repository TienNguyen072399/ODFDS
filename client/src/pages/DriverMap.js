import React, { Component } from "react";
import styled from "styled-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import CustomButtons from "../components/CustomButtons";
import Navbar from "../components/NavBar";
import "../mapbox-gl.css";
import Map from "../components/map";
//import DirectionMap from "../components/DirectionMap";
import "./DashCSS.css";

class DriverMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
        type:'driver',
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
    lng: 5,
    lat: 34,
    zoom: 2
    };
  }

  handleArrived = async (event) => {
    // driver arrived -> change status base on pickup or delivery
  };

  handleCancel = async (event) => {
    // trip cancel -> change status base on pickup or delivery
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
        <Navbar type={this.state.type}/>
                  
        {this.state.orders.map(item => (
        <div id = "container" >
          <div id="dash-box">
            <div id="boxtopmap">
              <div id ="titlemap">ID: {item._id}</div>
              <div id ="titlemap">From: {item.businessName}</div>
              <div id="button-container-map">
              <CustomButtons onclick= {this.handleArrived()}text="Arrived" color="#DB3979" width="60%" fontSize="20px"/>
              <CustomButtons onclick={this.handleCancel()} text="Cancel trip" color="#5c8eb9" width="60%"fontSize="20px"/>
              </div>
          </div>
            <Map order={item}/><br/>
          </div>
        </div>
        ))}
      </div>
    );
  }
}
export default DriverMap;
