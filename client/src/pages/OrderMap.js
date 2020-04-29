import React, { Component } from "react";
import CustomButtons from "../components/CustomButtons";
import Navbar from "../components/NavBar";
import "../mapbox-gl.css";
import Map from "../components/map";
//import DirectionMap from "../components/DirectionMap";
import "./DashCSS.css";
import CompleteOrder from "../components/completeOrder";

class OrderMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
        type:'business',
        order: this.props.location.state.order,
        start: [],
        end: [],
        directions: null,
        driverlocation: this.props.driverlocation, // may changed to this.state.order.driverlocation
    };
  }
  getLocationUpdate = async (event) => {
    let currentComponent = this;
    console.log("Get location method");
    console.log(this.state.order);

    //From current location or preset location to restaurant
    if (this.state.order.status === "Waiting for pickup" || this.state.order.status === "Waiting for driver."||this.state.order.status === "Waiting for driver") {
      console.log("Step 1: Start location for waiting for pickup");
      if (this.state.driverlocation) {
        // driver location is set
          currentComponent.setState({
            start: this.state.driverlocation,
          });
      } else {
        // driver location not set, pretend driver location is at SJSU
        currentComponent.setState({
          start: [-121.88130866919334, 37.336324837847584],
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
          }));
        });
    }
    // }
  };
  
  getEndCoordinates = async () => {
    var endpoint = "mapbox.places";
    var search_text = "";
    if (this.state.order.status === "Waiting for pickup"||this.state.order.status === "Waiting for driver."||this.state.order.status === "Waiting for driver") {
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
    console.log(`${MAP_API}${QUERY}${KEY}`);
    await fetch(`${MAP_API}${QUERY}${KEY}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState(() => ({ end: data.features[0].geometry.coordinates }));
      });
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
  };

  async componentDidMount() {
    if (this.state.order.status !== "Waiting for driver."&&this.state.order.status !== "Waiting for driver"&&this.state.order.status !== "Delivered"){
    console.log("Get Location details");
    await this.getLocationUpdate();
    await this.getEndCoordinates();
    await this.getDirection();
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (this.state.order.status !== "Waiting for driver."&&this.state.order.status !== "Waiting for driver"&&this.state.order.status !== "Delivered"){
      if (nextProps.order.status !== this.state.order.status) {
        await this.setState({ order: nextProps.order });
        console.log(nextProps.order);
        console.log("Updating information");
        await this.getLocationUpdate();
        await this.getEndCoordinates();
        await this.getDirection();
        
      }
    }
  }

  showMap = () => {
    switch (this.state.order.status){
      case 'Waiting for driver.':
        console.log("No map - no driver")
        return <div id="ordermap">Sorry, cannot get Driver location.</div>;
      case 'Waiting for driver':
        console.log("No map - no driver")
        return <div id="ordermap">Sorry, cannot get Driver location.</div>;
      case 'Delivered':
        console.log("No map delivered")
        return <CompleteOrder order = {this.state.order} onPay = {this.handlePay}/>;
      default:
        console.log("map showing")
        return <Map type = "business" key = {this.state.order._id} order={this.state.order}/>;   
    }
  }

  getDistanceTime = () => {
    if (this.state.order.status !== "Waiting for driver."&&this.state.order.status !== "Waiting for driver"&&this.state.order.status !== "Delivered"){
    if (this.state.directions){
      let distancetime = this.state.directions.routes[0].duration;
      return `Driver is ${Math.abs(Math.round(distancetime/60))} mins away`
    } else return;
    }else return;
  }
   
  handlePay = (e) => {
    e.preventDefault();
    alert("Thank you ! This order is paid. ")
  }

  render() {
    console.log(this.state.order)
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
        <div id = "container" >
          <div id="dash-box">
            <div id="boxtopmap">
              <div id ="titlemap">ID: {this.state.order._id}</div>
              <div id="timeaway">{this.getDistanceTime()}</div>
              <div id ="titlemap">Driver: {this.state.order.assigned}</div> 
              
              <div id ="titlemap">Status: {this.state.order.status}</div>       

            </div>
            {this.showMap()}
          </div>
        </div>
      </div>
    );
  }
}
export default OrderMap;
//<div id="ordermap">{this.showMap()}</div>