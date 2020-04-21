import React, { Component } from "react";
import Map from "./map";
import CustomButtons from "./CustomButtons";
import 'mapbox-gl/dist/mapbox-gl.css';
import "../mapbox-gl-directions.css";
import "../pages/TempCSS.css";
import "../mapbox-gl.css";
import "../pages/DashCSS.css";


class DirectionMap extends Component {
  state={
    order: this.props.order,
    start: [],
    end: [],
    zoom: 15,
    geojson : {},
    token: 'pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg',
    };

  getStartCoordinates = () => {
    //console.log(this.state.order.businessAddress);
    //var coordinates;
    var endpoint = 'mapbox.places';
    var search_text = this.state.order.businessAddress.split(" ").join('%20');
    const MAP_API = 'https://api.mapbox.com/geocoding/v5/';
    const QUERY = endpoint+'/'+search_text+'.json';
    const KEY = '?access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg';
    //console.log(`${MAP_API}${QUERY}${KEY}`);
    fetch(`${MAP_API}${QUERY}${KEY}`).then((response) => response.json())
      .then(data => {
        this.setState(() => ({start: data.features[0].geometry.coordinates}))
        //console.log(this.state.start);
      })
      //console.log(this.state.start);
      //return "Start Coordinates: " + this.state.start[0]+" , "+this.state.start[1]
  };

  getEndCoordinates = () => {
    //console.log(this.state.order.deliveryAddress);
    //var coordinates;
    var endpoint = 'mapbox.places';
    var search_text = this.state.order.deliveryAddress.split(" ").join('%20');
    const MAP_API = 'https://api.mapbox.com/geocoding/v5/';
    const QUERY = endpoint+'/'+search_text+'.json';
    const KEY = '?access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg';
    //console.log(`${MAP_API}${QUERY}${KEY}`);
    fetch(`${MAP_API}${QUERY}${KEY}`).then((response) => response.json())
      .then(data => {
        this.setState(() => ({end: data.features[0].geometry.coordinates}))
        //console.log(this.state.end);
      })
      //console.log(this.state.end);
      //return "End Coordinates: " + this.state.end[0]+" , "+this.state.end[1]
  };
  
  getDirection = () => {
    //console.log(this.state.order.deliveryAddress);
    //var coordinates;
    this.getStartCoordinates();
    this.getEndCoordinates();
    var profile = 'driving';
    var coordinates = this.state.start[0]+','+this.state.start[1]+';'+this.state.end[0]+','+this.state.end[1];
    const MAP_API = 'https://api.mapbox.com/directions/v5/mapbox/';
    const QUERY = profile+'/'+coordinates;
    const KEY = '?access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg';
    console.log(MAP_API + QUERY + KEY);
    fetch(MAP_API + QUERY + KEY).then((response) => response.json())
      .then(data => {
        this.setState(() => ({directions: data}))
      })
      //console.log(this.state.end);
      //return "End Coordinates: " + this.state.end[0]+" , "+this.state.end[1]
  };
  

  componentDidMount(){
    
  }

  handlePickedUp = async (event) => {
    // driver arrived -> change status base on pickup or delivery
    
  };
  handleDelivered = async (event) => {
    // driver arrived -> change status base on pickup or delivery
  };

  handleCancel = async (event) => {
    // trip cancel -> change status base on pickup or delivery
  };

  getButton = () =>{
    switch (this.state.order.status){
      case 'Waiting for pick up':
        return (
          <div id="button-container-map">
                <CustomButtons onclick= {this.handlePickedUp}text="Picked up" color="#DB3979" width="60%" fontSize="20px"/>
                <CustomButtons onclick={this.handleCancel} text="Cancel trip" color="#5c8eb9" width="60%"fontSize="20px"/>
          </div>
        );
      case 'Out for delivery':
        return (
          <div id="button-container-map">
                <CustomButtons onclick= {this.handleDelivered}text="Delivered" color="#DB3979" width="60%" fontSize="20px"/>
                <CustomButtons onclick={this.handleCancel} text="Cancel trip" color="#5c8eb9" width="60%"fontSize="20px"/>
          </div>
        );
      default:
        return null;   
    }
  };


    render() {
    //   this.getStartCoordinates();
    // this.getEndCoordinates();
    this.getDirection();
      return (
       
          <div id = "container" >
            <div id="dash-box">
              <div id="boxtopmap">
      
                <div id ="titlemap">ID: {this.state.order._id}</div>
                <div id ="titlemap">From: {this.state.order.businessName}</div>
                {this.getButton()}                
            </div>
              <Map order={this.state.order} start={this.state.start} end={this.state.end}/><br/>
            </div>
          </div>
        
      );
    }
  }
  
// <div>{this.getStartCoordinates()}</div>
//       <div>{this.getEndCoordinates()}</div>
  
  export default DirectionMap;