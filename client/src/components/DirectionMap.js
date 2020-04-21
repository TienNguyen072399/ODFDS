import React, { Component } from "react";
import Map from "./map";
import CustomButtons from "./CustomButtons";
import 'mapbox-gl/dist/mapbox-gl.css';
import "../mapbox-gl-directions.css";
import "../pages/TempCSS.css";
import "../mapbox-gl.css";
import "../pages/DashCSS.css";


class DirectionMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
    order: this.props.order,
    start: [],
    end: [],
    zoom: 15,
    directions : {},
    token: 'pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg',
    };

  }
  

  // getStartCoordinates = () => {
  //   navigator.geolocation.watchPosition(function(position) {
  //     //console.log("Latitude is :", position.coords.latitude);
  //     //console.log("Longitude is :", position.coords.longitude);
  //    this.setState({start: position.coords});
  //  });
  // };

  // getEndCoordinates = () => {
  //   var endpoint = 'mapbox.places';
  //   var search_text = '';
  //   if(this.state.order.status === "Waiting for pick up"){
  //     search_text = this.state.order.businessAddress.split(" ").join('%20');
  //   }
  //   else if (this.state.order.status === "Out for delivery") {
  //     search_text = this.state.order.deliveryAddress.split(" ").join('%20');
  //   }
  //   const MAP_API = 'https://api.mapbox.com/geocoding/v5/';
  //   const QUERY = endpoint+'/'+search_text+'.json';
  //   const KEY = '?access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg';
  //   //console.log(`${MAP_API}${QUERY}${KEY}`);
  //   fetch(`${MAP_API}${QUERY}${KEY}`).then((response) => response.json())
  //     .then(data => {
  //       this.setState(() => ({end: data.features[0].geometry.coordinates}))
  //       //console.log(this.state.end);
  //     })
  //    // console.log(this.state.end);
  //     //return "End Coordinates: " + this.state.end[0]+" , "+this.state.end[1]
  // };
  
  // getDirection = () => {
  //   var profile = 'mapbox/driving-traffic';
  //   var coordinates = this.state.start.longitude+','+this.state.start.latitude+';'+this.state.end[0]+','+this.state.end[1];
  //   //var coordinates = this.state.start.longitude+','+this.state.start.latitude+';'+this.state.order.longitude+','+this.state.order.latitude;
  //   const MAP_API = 'https://api.mapbox.com/directions/v5/';
  //   const QUERY = profile+'/'+coordinates;
  //   const KEY = '?geometries=geojson&steps=true&access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg';
  //   console.log(MAP_API + QUERY + KEY);
  //   fetch("https://api.mapbox.com/directions/v5/mapbox/driving/-122.42,37.78;-77.03,38.91?access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg").then((response) => response.json())
  //     .then(data => {
  //       this.setState(() => ({directions: data}))
  //     })
  //     //console.log(this.state.end);
  //     //return "End Coordinates: " + this.state.end[0]+" , "+this.state.end[1]
  // };
  

  componentDidMount(){
    
  };

  handlePickedUp = async (event) => {
    // driver arrived -> change status base on pickup or delivery
    
  };
  handleDelivered = async (event) => {
    // driver arrived -> change status base on pickup or delivery
    console.log(" Deliver");
  };

  handleCancel = async (event) => {
    // trip cancel -> change status base on pickup or delivery
    event.preventDefault();
    alert("cancel");
    
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
      
      return (
       
          <div id = "container" >
            <div id="dash-box">
              <div id="boxtopmap">
                <div id ="titlemap">ID: {this.state.order._id}</div>
                <div id ="titlemap">From: {this.state.order.businessName}</div>
                <div id ="titlemap">Status: {this.state.order.status}</div>
                {this.getButton()}                
            </div>
              <Map order={this.state.order}/><br/>
            </div>
          </div>
        
      );
    }
  }
  
  export default DirectionMap;