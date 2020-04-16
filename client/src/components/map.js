import React, { Component } from "react";
import "../pages/TempCSS.css";
import "../mapbox-gl.css";
class Map extends Component {
  state={
    order: this.props.order,
  };
    componentDidMount(){
        var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
        var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
        mapboxgl.accessToken = 'pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg';
        var map = new mapboxgl.Map({
        container: 'drivermap',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 4,
        center: [4.899, 52.372]
        });
        
        var geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          types: 'poi',
          // see https://docs.mapbox.com/api/search/#geocoding-response-object for information about the schema of each response feature
          render: function(item) {
          // extract the item's maki icon or use a default
          var maki = item.properties.maki || 'marker';
          return (
          "<div class='geocoder-dropdown-item'><img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/" +
          maki +
          "-15.svg'><span class='geocoder-dropdown-text'>" +
          item.text +
          '</span></div>'
          );
          },
          mapboxgl: mapboxgl
          });
          map.addControl(geocoder);
        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());
      }
  
    componentWillUnmount() {
      this.map.remove();
    }
  
    render() {
      const style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        top: 0,
        bottom: 0,
        width: '50%',
        height: '50%'
      };
  
      return (
      <div style={style} id="drivermap"> </div> 
      );
    }
  }
  
  export default Map;