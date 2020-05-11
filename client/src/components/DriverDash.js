import React, { Component } from "react";
import "../pages/DashCSS.css";
import CustomButtons from "../components/CustomButtons";

class DriverDash extends Component {
  state = {
    order: this.props.order,
    start: [],
    end: [],
    directions: null,
    deliveryRoute: null,
  };
  getBusiness = () => {
    if (this.state.order.businessName) {
      return this.state.order.businessName;
    } else {
      return "N/A";
    }
  };

  getDestination = () => {
    switch (this.state.order.status){
      case 'Waiting for Driver':
        return "waiting";
      case 'Waiting for pickup':
        return "Currently on route to "+ this.state.order.businessAddress;
      case 'Out for delivery':
        return this.state.order.deliveryAddress;
      default:
        return "";   
    }
  }

  getDistance = () => {
    // calc the distance from current location to restaurant.
    console.log(this.state.directions)
    if (this.state.directions !== null) {
      if (this.state.directions.message === "Total distance between all coordinates cannot exceed 10000km"){
        return "exceed 6000";
      }
      return Math.round(10*this.state.directions.routes[0].distance * 0.000621371)/10;
    }
    else return;
  };

  getRealTime = () => {
    var currentDay = new Date();
    var currentTime = currentDay.getTime();
    var orderTime = new Date(this.state.order.orderTime);
    var diff = (currentTime - orderTime.getTime()) / 1000;
    diff /= 60;
    var realTime = Math.abs(Math.round(diff));
    return realTime;
  };

  getNumOrder = () => {
    //don't think we need this
    // get number of orders from that restaurant
  };

  getRoute = () => {
    // get number of miles between businessAddress and deliveryAddress
    if (this.state.deliveryRoute){
      return Math.round(10*this.state.deliveryRoute.routes[0].distance * 0.000621371)/10
    }
    else return;
  }
  
  getDeliverRoute = async (event) => {
    if (this.state.order) {
    
      
      const MAP_API = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
      const KEY =
        "?access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg";
<<<<<<< Updated upstream
      // get business address coordinates  
      const QUERY1 =this.state.order.businessAddress.split(" ").join("%20") + ".json";
      
    var business
=======
      // get business address coordinates
      const QUERY1 = this.state.order.businessAddress.split(" ").join("%20") + ".json";
      //const QUERY1 = this.state.order.businessAddress;
      var business;
>>>>>>> Stashed changes
      await fetch(`${MAP_API}${QUERY1}${KEY}`)
        .then((response) => response.json())
        .then((data) => {
          business = data.features[0].geometry.coordinates
        });
      console.log("business: "+business)
      // get delivery address coordinate
      const QUERY2 = this.state.order.deliveryAddress.split(" ").join("%20") + ".json";
<<<<<<< Updated upstream
      var customer
=======
      //const QUERY2 = this.state.order.deliveryAddress;
      var customer;
>>>>>>> Stashed changes
      await fetch(`${MAP_API}${QUERY2}${KEY}`)
        .then((response) => response.json())
        .then((data) => {
          customer = data.features[0].geometry.coordinates
        });
        console.log("customer: "+ customer)
        var direction;
        var profile = "mapbox/driving-traffic";
        var coordinates =
          business[0] +
          "," +
          business[1] +
          ";" +
          customer[0] +
          "," +
          customer[1];
        //var coordinates = this.state.start.longitude+','+this.state.start.latitude+';'+this.state.order.longitude+','+this.state.order.latitude;
        const QUERY3 = profile + "/" + coordinates;
        await fetch("https://api.mapbox.com/directions/v5/" + QUERY3 + "?geometries=geojson&steps=true&access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg")
          .then((response) => response.json())
          .then((data) => {
            this.setState(() => ({deliveryRoute: data }));
            console.log("https://api.mapbox.com/directions/v5/" + QUERY3 + "?geometries=geojson&steps=true&access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg");
          });

    
  }else return;
  };

  handleAccept = async (event) => {
    // accept request - change status to 'onRoutePickup', insert driver to assigned.
    event.preventDefault();
    console.log(event);
  };

  handleDecline = async (event) => {
    // decline request - delete this order request from list.
  };

  getLocationUpdate = async (event) => {
    let currentComponent = this;
    console.log("Get location method");
    console.log(this.state.order);

    //From current location or preset location to restaurant
    if (this.state.order.status === "Waiting for pickup" || this.state.order.status === "Waiting for driver.") {
      console.log("Step 1: Start location for waiting for pickup");
      if (navigator.geolocation) {
        // alert(
        //   "Finding your location. (If prompted by your browser, please say yes.)"
        // );
        navigator.geolocation.watchPosition(function (position) {
          currentComponent.setState({
            start: [position.coords.longitude, position.coords.latitude],
          });
        });
      } else {
        alert("Sorry, browser does not support geolocation!");
        currentComponent.setState({
          start: [-121.88130866919334, 37.336324837847584],
        });
      }
    }

    //From restaurant to delivery address
    else if (this.state.order.status === "Out for delivery") {
      console.log("Step 1: Start location for out for delivery");
      var search_text = this.state.order.businessAddress.split(" ").join("%20");
      //var search_text = this.state.order.businessAddress;
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
    if (this.state.order.status === "Waiting for pickup"||this.state.order.status === "Waiting for driver.") {
      search_text = this.state.order.businessAddress.split(" ").join("%20");
      //search_text = this.state.order.businessAddress;
      console.log("Step 2: Get end coordinates (Restaurant)");
    } else if (this.state.order.status === "Out for delivery") {
      search_text = this.state.order.deliveryAddress.split(" ").join("%20");
      //search_text = this.state.order.deliveryAddress;
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
    console.log("Get Start , End and Direction");
    await this.getLocationUpdate();
    await this.getEndCoordinates();
    await this.getDirection();
    await this.getDeliverRoute();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.order.status !== this.state.order.status) {
      await this.setState({ order: nextProps.order });
      console.log(nextProps.order);
      console.log("Rerender map");
      await this.getLocationUpdate();
      await this.getEndCoordinates();
      await this.getDirection();
      await this.getDeliverRoute();
    }
  }

  render() {
    return (
      <div id="container">
        <div id="dash-box">
          <div id="boxtop">
            
          </div>
          <div id="container">
            <div className="iconcircle"></div>
          </div>
          <div id="titlecontainer">ID: {this.state.order._id}</div>
          <br />
          <div id="titlecontainer">
            <h2>{this.getBusiness()}</h2>
          </div>
          <br />

          <div id="time">{this.getRealTime()} mins ago</div>
          <div id="container">
            <div id="description">
              Requesting {this.getNumOrder()} delivery from {this.getDistance()}{" "}
              miles away
              <br />
              <div id="description">
                Estimate delivery route: {this.getRoute()} miles
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div id="button-container">
            <CustomButtons
              onClick={this.props.onAccept}
              text={"Accept Order"}
              value={this.state.order._id}
              color="#5c8eb9"
              width="100%"
              fontSize="13px"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DriverDash;

/*

<CustomButtons
          text="Accept Order"
          color="#DB3979"
          width="50%"
          //onClick={}
        />{" "}

*/
