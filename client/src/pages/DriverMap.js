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
            businessAddress:"123 Main St Boston MA 02111",
            customerName:"Bane",
            deliveryAddress:"4183 Riverbrook ct Stockton CA 95219",
            __v:0,
            status: "Waiting for pick up"
          },
          {
            _id:"5e9a5d254a288946140e4116",
            orderTime:"Fri Apr 17 2020 18:51:33 GMT-0700 (Pacific Daylight Time)",
            assigned:"",
            timePickUp:"",
            timeDelivered:"",
            businessName:"Go Go Chicken",
            businessId:"5e9a23c75bc9ef5a84b08faa",
            businessAddress:"123 Main St Boston MA 02111",
            customerName:"Harry",
            deliveryAddress:"2320 Lido cir Stockton CA 95207",
            __v:0,
            status: "Out for delivery"
          },
          
        ],
    coordinates: [],
    lng: 5,
    lat: 34,
    zoom: 2
    };
  }

  getCoordinates = (location) => {
    // get location from fetching mapbox api 
    
    //console.log(location);
    //let coordinates;
    
    var endpoint = 'mapbox.places';
    var search_text = location.split(" ").join('%20');
    const MAP_API = 'https://api.mapbox.com/geocoding/v5/';
    const QUERY = endpoint+'/'+search_text+'.json';
    const KEY = '?country=US&access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg';
    console.log(MAP_API + QUERY + KEY);
    fetch(MAP_API + QUERY + KEY).then((response) => response.json())
      .then(data => {
        this.setState(() => ({coordinates: data.features[0].geometry.coordinates}))
        //console.log(coordinates);
        //coordinates = data.features[0].geometry.coordinates;
        //console.log(coordinates);
      })
      console.log(this.state.coordinates);
      return " Coordinates: " + this.state.coordinates[0]+" , "+this.state.coordinates[1]
  };
  
  handleArrived = async (event,order) => {
    // driver arrived -> change status base on pickup or delivery
    
  };
  handleDelivered = async (event,order) => {
    // driver arrived -> change status base on pickup or delivery
  };

  handleCancel = async (event,order) => {
    // trip cancel -> change status base on pickup or delivery
  };

  getButton = (order) =>{
    switch (order.status){
      case 'Waiting for pick up':
        return (
          <div id="button-container-map">
                <CustomButtons onclick= {this.handleArrived(order)}text="Picked up" color="#DB3979" width="60%" fontSize="20px"/>
                <CustomButtons onclick={this.handleCancel(order)} text="Cancel trip" color="#5c8eb9" width="60%"fontSize="20px"/>
          </div>
        );
      case 'Out for delivery':
        return (
          <div id="button-container-map">
                <CustomButtons onclick= {this.handleDelivered(order)}text="Delivered" color="#DB3979" width="60%" fontSize="20px"/>
                <CustomButtons onclick={this.handleCancel(order)} text="Cancel trip" color="#5c8eb9" width="60%"fontSize="20px"/>
          </div>
        );
      default:
        return null;   
    }
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
              {this.getButton(item)}
              
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
