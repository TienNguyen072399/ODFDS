import React, { Component } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "../mapbox-gl-directions.css";
import "../pages/TempCSS.css";
import "../mapbox-gl.css";
import CustomButtons from "./CustomButtons";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.order,
      start: [-121.88130866919334, 37.336324837847584],
      end: null,
      directions: {
        routes: [
          {
            geometry: {
              type: "LineString",
              coordinates: [this.start],
            },
          },
        ],
      },
      driverlocation: null,// store driver coordinates, can use this to update info in order.driverlocation field
      type: this.props.type,
    };
  }

  getLocationUpdate = async (event) => {
    let currentComponent = this;
    console.log("Get location method");
    console.log(this.state.order);
    
    // if display this map on business side, set starting point to driverlocation
    if (this.state.type === "business"){
      console.log("type is business")
      if (this.state.driverlocation){
        currentComponent.setState({start: this.state.driverlocation})
      }else {
        currentComponent.setState({start: [-121.88130866919334, 37.336324837847584]})
      }
      
    }
    else {
      //if display this map on driver side

      //From current location or preset location to restaurant
      if (this.state.order.status === "Waiting for pickup") {
        console.log("Step 1: Start location for waiting for pickup");
        if (navigator.geolocation) {
          alert(
            "Finding your location. (If prompted by your browser, please say yes.)"
          );
          navigator.geolocation.watchPosition(function (position) {
            currentComponent.setState({
              start: [position.coords.longitude, position.coords.latitude],
              driverlocation: this.state.start //update driver location
            });
          });
        } else {
          alert("Sorry, browser does not support geolocation!");
          currentComponent.setState({
            start: [-121.88130866919334, 37.336324837847584],
            driverlocation: this.state.start //update driverlocation
          });
        }
      }

      //From restaurant to delivery address
      else if (this.state.order.status === "Out for delivery") {
        console.log("Step 1: Start location for out for delivery");
        var search_text = this.state.order.businessAddress.split(" ").join("%20");
        var endpoint = "mapbox.places";
        const MAP_API = "https://api.mapbox.com/geocoding/v5/";
        const QUERY = endpoint + "/" + search_text + ".json";
        const KEY =
          "?access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg";

        await fetch(`${MAP_API}${QUERY}${KEY}`)
          .then((response) => response.json())
          .then((data) => {
            this.setState(() => ({
              start: data.features[0].geometry.coordinates,
              driverlocation: this.state.start //update driver location
            }));
          });
      }
    }
  };

  getEndCoordinates = async () => {
    var endpoint = "mapbox.places";
    var search_text = "";
    if (this.state.order.status === "Waiting for pickup") {
      search_text = this.state.order.businessAddress.split(" ").join("%20");
      console.log("Step 2: Get end coordinates (Restaurant)");
    } else if (this.state.order.status === "Out for delivery") {
      search_text = this.state.order.deliveryAddress.split(" ").join("%20");
      console.log("Step 2: Get end coordinates (Delivery Address)");
    }
    const MAP_API = "https://api.mapbox.com/geocoding/v5/";
    const QUERY = endpoint + "/" + search_text + ".json";
    const KEY =
      "?access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg";
    //console.log(`${MAP_API}${QUERY}${KEY}`);
    await fetch(`${MAP_API}${QUERY}${KEY}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState(() => ({ end: data.features[0].geometry.coordinates }));
        //console.log(this.state.end);
      });
    // console.log(this.state.end);
    //return "End Coordinates: " + this.state.end[0]+" , "+this.state.end[1]
  };

  getDirection = async (event) => {
    console.log("Step 3: Getting Direction");
    var profile = "mapbox/driving-traffic";
    var coordinates =
      this.state.start[0] +
      "," +
      this.state.start[1] +
      ";" +
      this.state.end[0] +
      "," +
      this.state.end[1];
    //var coordinates = this.state.start.longitude+','+this.state.start.latitude+';'+this.state.order.longitude+','+this.state.order.latitude;
    const MAP_API = "https://api.mapbox.com/directions/v5/";
    const QUERY = profile + "/" + coordinates;
    const KEY =
      "?geometries=geojson&steps=true&access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg";

    await fetch(MAP_API + QUERY + KEY)
      .then((response) => response.json())
      .then((data) => {
        this.setState(() => ({ directions: data }));
        console.log(MAP_API + QUERY + KEY);
      });

    //console.log(this.state.end);
    //return "End Coordinates: " + this.state.end[0]+" , "+this.state.end[1]
  };

  async componentDidMount() {
    console.log("Loading map");
    await this.getLocationUpdate();
    await this.getEndCoordinates();
    await this.getDirection();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.order.status !== this.state.order.status) {
      await this.setState({ order: nextProps.order });
      console.log(nextProps.order);
      console.log("Rerender map");
      await this.getLocationUpdate();
      await this.getEndCoordinates();
      await this.getDirection();
    }
  }

  componentDidUpdate() {
    if (this.state.directions) {
      var mapdirection = this.state.directions;
    }
    var mapstart = this.state.start;

    var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
    //var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
    //var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');
    mapboxgl.accessToken =
      "pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg";
    if (this.state.start) {
      console.log("draw map here")
      var map = new mapboxgl.Map({
        container: "drivermap" + this.state.order._id,
        style: "mapbox://styles/mapbox/streets-v11",
        center: mapstart,
        zoom: 15,
      });
      var size = 150;
      // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
      var pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // get rendering context for the map canvas when layer is added to the map
        onAdd: function () {
          var canvas = document.createElement("canvas");
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext("2d");
        },

        // called once before every frame where the icon will be used
        render: function () {
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
          context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")";
          context.fill();

          // draw inner circle
          context.beginPath();
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
          context.fillStyle = "rgba(255, 100, 100, 1)";
          context.strokeStyle = "white";
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();

          // update this image's data with data from the canvas
          this.data = context.getImageData(0, 0, this.width, this.height).data;

          // continuously repaint the map, resulting in the smooth animation of the dot
          map.triggerRepaint();

          // return `true` to let the map know that the image was updated
          return true;
        },
      };

      map.on("load", function () {
        map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
        // add route layer
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: mapdirection.routes[0].geometry,
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
        // add current point to layer
        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: mapstart, //get to starting point
                },
              },
            ],
          },
        });

        map.addLayer({
          id: "points",
          type: "symbol",
          source: "points",
          layout: {
            "icon-image": "pulsing-dot",
          },
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
          trackUserLocation: true,
        })
      );
    }
  }

  render() {
    const style = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      top: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
    };

    return (
      <>
        
        <div style={style} id={"drivermap" + this.state.order._id}></div>
      </>
    );
  }
}

export default Map;
//<button onClick={this.getDirection}>Load directions</button>
//  <button onClick={this.getLocationUpdate}>Load current location</button>