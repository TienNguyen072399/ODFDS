import React, { Component } from "react";


import 'mapbox-gl/dist/mapbox-gl.css'
import "../mapbox-gl-directions.css";
import "../pages/TempCSS.css";
import "../mapbox-gl.css";
//import { usePosition } from 'use-position';
//import {useState, useEffect} from 'react';

class Map extends Component {
  state = {
    order: this.props.order,
    latitude: 0,
    longitude: 0,
    timestamp: 0,
    accuracy: 0,
    error: "",
    start: [-122.486052, 37.830348],
    end: [-122.49378204345702, 37.83368330777276],
    zoom: 15,
    geojson: {},
    token:
      "pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg",
    viewport: {
      width: "50vw",
      height: "50vh",
      latitude: 37.83368330777276,
      longtitude: -122.49378204345702,
      zoom: 5,
    },
    searchResultLayer: null,
  };


  getCoordinates = (location) => {
    console.log(location);
    var coordinates;
    var endpoint = 'mapbox.places';
    var search_text = location;
    const MAP_API = 'https://api.mapbox.com/geocoding/v5/';
    const QUERY = endpoint+'/'+search_text+'.json';
    const KEY = '?access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg';
    fetch(MAP_API + QUERY + KEY, {
      method: "GET",
      }).then((response) => response.json())
      .then((result) => {coordinates = result})
      console.log(coordinates);
      return coordinates;
  };
  
// getCurrentLocation = () => {
//   const watch = true;
//   const {
//     latitude,
//     longitude,
//     timestamp,
//     accuracy,
//     error,
//   } = usePosition(watch);
 
//   return (
//     <code>
//       latitude: {latitude}<br/>
//       longitude: {longitude}<br/>
//       timestamp: {timestamp}<br/>
//       accuracy: {accuracy && `${accuracy}m`}<br/>
//       error: {error}
//     </code>
//   );
    
// };
  
    componentDidMount(){
        var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
        var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
        var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');
        mapboxgl.accessToken = 'pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg';
        
        
        var map = new mapboxgl.Map({
          container: 'drivermap'+ this.state.order._id,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-122.48369693756104, 37.83381888486939],
          zoom: 15,
          
        });

        // var geocoder = new MapboxGeocoder({
        //   accessToken: mapboxgl.accessToken,
        //   types: 'poi',
        //   // see https://docs.mapbox.com/api/search/#geocoding-response-object for information about the schema of each response feature
        //   render: function(item) {
        //   // extract the item's maki icon or use a default
        //   var maki = item.properties.maki || 'marker';
        //   return (
        //   "<div class='geocoder-dropdown-item'><img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/" +
        //   maki +
        //   "-15.svg'><span class='geocoder-dropdown-text'>" +
        //   item.text +
        //   '</span></div>'
        //   );
        //   },
        //   mapboxgl: mapboxgl
        //   });
        //   map.addControl(geocoder);

        // Add zoom and rotation controls to the map.
        //map.addControl(new mapboxgl.NavigationControl());

        map.on('load', function() {
          map.addSource('route', {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
            'type': 'LineString',
            'coordinates': [
            [-122.48369693756104, 37.83381888486939],
            [-122.48348236083984, 37.83317489144141],
            [-122.48339653015138, 37.83270036637107],
            [-122.48356819152832, 37.832056363179625],
            [-122.48404026031496, 37.83114119107971],
            [-122.48404026031496, 37.83049717427869],
            [-122.48348236083984, 37.829920943955045],
            [-122.48356819152832, 37.82954808664175],
            [-122.48507022857666, 37.82944639795659],
            [-122.48610019683838, 37.82880236636284],
            [-122.48695850372314, 37.82931081282506],
            [-122.48700141906738, 37.83080223556934],
            [-122.48751640319824, 37.83168351665737],
            [-122.48803138732912, 37.832158048267786],
            [-122.48888969421387, 37.83297152392784],
            [-122.48987674713133, 37.83263257682617],
            [-122.49043464660643, 37.832937629287755],
            [-122.49125003814696, 37.832429207817725],
            [-122.49163627624512, 37.832564787218985],
            [-122.49223709106445, 37.83337825839438],
            [-122.49378204345702, 37.83368330777276]
            ]
            }
            }
          });
          map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
          'line-join': 'round',
          'line-cap': 'round'
          },
        },
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
    });

    // Add geolocate control to the map.
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },

        trackUserLocation: true
        })
        );
        
        var directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          });
        map.addControl(
          directions,
          'top-left'
          );
      }
  
    // componentWillUnmount() {
    //   this.map.remove();
    // }
  
    render() {
      const geolocateStyle = {
        float: 'left',
        margin: '50px',
        padding: '10px'
      };

      const style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%'
      };

      const { viewport, searchResultLayer, token} = this.state
      
      return (
      
       <div style={style} id={"drivermap"+this.state.order._id}> 
       </div> 
       
       
      
      );
    }
  }
  

  
  export default Map;

