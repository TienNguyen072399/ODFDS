import React, { Component } from "react";


import 'mapbox-gl/dist/mapbox-gl.css'
import "../mapbox-gl-directions.css";
import "../pages/TempCSS.css";
import "../mapbox-gl.css";
//import { usePosition } from 'use-position';
//import {useState, useEffect} from 'react';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.order,
      start: [-121.88130866919334,37.336324837847584],
      end: [0,0],
      directions: {},
      zoom: 15,
      geojson: {},
      token:
        "pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg",
    };
    this.getEndCoordinates = this.getEndCoordinates.bind(this);
    this.getDirection = this.getDirection.bind(this)
  }
  
  getLocationUpdate =() =>{
    let currentComponent=this;
    
    if(navigator.geolocation){
      alert("browser are located to your location!")
      navigator.geolocation.watchPosition(function(position) {
          //console.log("Latitude is :", position.coords.latitude);
          //console.log("Longitude is :", position.coords.longitude);
         currentComponent.setState({start: position.coords});
        });
    } else {
       alert("Sorry, browser does not support geolocation!");
       currentComponent.setState({start: [-121.88130866919334,37.336324837847584]})
    }
 }
  
  getEndCoordinates = () => {
    var endpoint = 'mapbox.places';
    var search_text = '';
    if(this.state.order.status === "Waiting for pick up"){
      search_text = this.state.order.businessAddress.split(" ").join('%20');
    }
    else if (this.state.order.status === "Out for delivery") {
      search_text = this.state.order.deliveryAddress.split(" ").join('%20');
    }
    const MAP_API = 'https://api.mapbox.com/geocoding/v5/';
    const QUERY = endpoint+'/'+search_text+'.json';
    const KEY = '?access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg';
    //console.log(`${MAP_API}${QUERY}${KEY}`);
    fetch(`${MAP_API}${QUERY}${KEY}`).then((response) => response.json())
      .then(data => {
        this.setState(() => ({end: data.features[0].geometry.coordinates}))
        //console.log(this.state.end);
      })
     // console.log(this.state.end);
      //return "End Coordinates: " + this.state.end[0]+" , "+this.state.end[1]
  };
  
  getDirection = () => {
    var profile = 'mapbox/driving-traffic';
    var coordinates = this.state.start[0]+','+this.state.start[1]+';'+this.state.end[0]+','+this.state.end[1];
    //var coordinates = this.state.start.longitude+','+this.state.start.latitude+';'+this.state.order.longitude+','+this.state.order.latitude;
    const MAP_API = 'https://api.mapbox.com/directions/v5/';
    const QUERY = profile+'/'+coordinates;
    const KEY = '?geometries=geojson&steps=true&access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg';
    console.log(MAP_API + QUERY + KEY);
    fetch("https://api.mapbox.com/directions/v5/mapbox/driving/-122.42,37.78;-77.03,38.91?access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg").then((response) => response.json())
      .then(data => {
        this.setState(() => ({directions: data}))
      })
      //console.log(this.state.end);
      //return "End Coordinates: " + this.state.end[0]+" , "+this.state.end[1]
  };
  

componentWillMount(){
  let currentComponent=this;
    //currentComponent.getLocationUpdate();
    if(currentComponent.state.order){
      currentComponent.getEndCoordinates();
      if(currentComponent.state.start && currentComponent.state.end){
        currentComponent.getDirection();
      }
    }

}  

componentDidUpdate(){
  console.log(this.state.start)
  console.log(this.state.end)
  console.log(this.state.directions)
  
  // let currentComponent=this;
  // navigator.geolocation.watchPosition(function(position) {
  //   //console.log("Latitude is :", position.coords.latitude);
  //   //console.log("Longitude is :", position.coords.longitude);
  //  currentComponent.setState({start: position.coords});
  // });

  // if(this.state.start && this.state.end){
  //   this.getDirection();
  // }
  
  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  //var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
  //var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');
  mapboxgl.accessToken = 'pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg';      
  if(this.state.start){
    var map = new mapboxgl.Map({
      container: 'drivermap'+ this.state.order._id,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.start[0], this.state.start[1]],
      zoom: 15,
    });
    var size = 150;
    // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
    // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
    var pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),
        
      // get rendering context for the map canvas when layer is added to the map
      onAdd: function() {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },
          
      // called once before every frame where the icon will be used
      render: function() {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;
              
        var radius = (size / 2) * 0.3;
        var outerRadius = (size / 2) * 0.7 * t + radius;
        var context = this.context;
              
        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
        context.fill();
            
        // draw inner circle
        context.beginPath();
        context.arc(
          this.width / 2,
          this.height / 2,
          radius,
          0,
          Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();
            
        // update this image's data with data from the canvas
        this.data = context.getImageData(
          0,
          0,
          this.width,
          this.height
        ).data;
            
        // continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();
            
        // return `true` to let the map know that the image was updated
        return true;
      }
    };
          
    map.on('load', function() {
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
      
      map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
          'type': 'LineString',
          'coordinates': [[-121.881699,37.33688],[-121.882232,37.337626],[-121.892506,37.332763],[-121.894288,37.335213]]
          }
          }
        });

        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 8,
          },
        });
        
        map.addSource('points', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-121.88130866919334, 37.336324837847584] //try to get to starting point [this.state.start[0],this.state.start[1]]
                }
              }
            ]
          }
        });
        
        map.addLayer({
          'id': 'points',
          'type': 'symbol',
          'source': 'points',
          'layout': {
            'icon-image': 'pulsing-dot'
          }
        });
    });
    

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());
  // Add geolocate control to the map.
  map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true
    })
    );

  }
       // var directions = new MapboxDirections({
        //   accessToken: mapboxgl.accessToken,
        //   });
        // map.addControl(
        //   directions,
        //   'top-left'
        //   );
}
  
  
  
    render() {
     
      const style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%'
      };

      
      return (
      
       <div style={style} id={"drivermap"+this.state.order._id}> 
       </div> 
       
       
      
      );
    }
  }
  

  
  export default Map;

