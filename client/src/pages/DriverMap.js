import React, { Component } from "react";
//import styled from "styled-components";
//import { Link, Redirect, useHistory } from "react-router-dom";
//import CustomButtons from "../components/CustomButtons";
import Navbar from "../components/NavBar";
import "../mapbox-gl.css";
//import Map from "../components/map";
import DirectionMap from "../components/DirectionMap";
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
            businessAddress:"301 S 1st St San Jose CA 95113",
            customerName:"Bane",
            deliveryAddress:"225 W Santa Clara St San Jose CA 95113",
            __v:0,
            status: "Waiting for pick up",
            longitude:-121.877506,
            latitude:37.340117
          },
          {
            _id:"5e9a5d254a288946140e4116",
            orderTime:"Fri Apr 17 2020 18:51:33 GMT-0700 (Pacific Daylight Time)",
            assigned:"",
            timePickUp:"",
            timeDelivered:"",
            businessName:"Go Go Chicken",
            businessId:"5e9a23c75bc9ef5a84b08faa",
            businessAddress:"301 S 1st St San Jose CA 95113",
            customerName:"Harry",
            deliveryAddress:"225 W Santa Clara St San Jose CA 95113",
            __v:0,
            status: "Out for delivery",
            longitude:-121.880142,
            latitude:37.333672
          },
          
        ],
    coordinates: [],
    Start: [],
    End: [],
    Direction: [],
    };
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
        <Navbar type={this.state.type}/>
        {this.state.orders.map(item => (
          
          <DirectionMap key = {item._id} order={item}/>
          
           ))}
      </div>
    );
  }
}
export default DriverMap;
