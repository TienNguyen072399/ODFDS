import React, { Component } from "react";
import "../pages/DashCSS.css";
import CustomButtons from "../components/CustomButtons";
import Rating from "./rating";
import { Link } from "react-router-dom";
//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

class BuisDash extends Component {
  state = {
    order: this.props.order,
    deliveryRoute: null,
  };

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.order.status);
    // console.log(this.state.order.status);
    if (nextProps.order.status !== this.state.order.status) {
      this.setState({ order: nextProps.order });
    }
  }

  getDriver = () => {
    switch (this.state.order.status) {
      case "Waiting for driver":
        return this.state.order.status;
      case "Waiting for driver.":
        return this.state.order.status;
      case "Waiting for pickup":
        if (this.state.order.assigned) {
          return this.state.order.assigned;
        } else return "Waiting for driver";

      case "Out for delivery":
        return this.state.order.assigned;
      default:
        return this.state.order.assigned;
    }
  };

  getDestination = () => {
    switch (this.state.order.status) {
      case "Waiting for Driver.":
        return;
      case "Waiting for pickup":
        if (this.state.order.assigned) {
          return "Currently on route to " + this.state.order.businessAddress;
        } else return "";
      case "Out for delivery":
        return "Currently on route to " + this.state.order.deliveryAddress;
      default:
        return "";
    }
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

  getCost = () => {
    if (this.state.order.cost) {
      switch (this.state.order.status) {
        case "Delivered":
          return `Final cost: $${
            Math.round(this.state.order.cost * 100) / 100
          }`;
        default:
          // estimate cost base on delivery route
          if (this.getRoute() === "invalid address ") return `Cannot calculate cost `;
          return `Estimate cost: $${
            Math.round(this.calc_costs(this.getRoute()) * 100) / 100
          }`;
      }
    } else return;
  };

  //calculate costs of 1 order
  calc_costs = (miles) => {
    //calculating cost, 5 is base cost
    let cost_order = 5 + (miles-1) * 2; // first mile is free
    return cost_order;
  };

  getRoute = () => {
    // get number of miles between businessAddress and deliveryAddress
    if (this.state.deliveryRoute) {
      if (this.state.deliveryRoute.message){
        return "invalid address ";
      }
      return (
        Math.round(
          10 * this.state.deliveryRoute.routes[0].distance * 0.000621371
        ) / 10
      );
    } else return;
  };

  getDistance = () => {
    if (this.state.order) {
      switch (this.state.order.status) {
        case "Delivered":
          if (this.getRoute() === "invalid address ") return `Cannot calculate distance `;
          return `Distance: ${this.getRoute()} miles`;
        default:
          // show distance
          if (this.getRoute() === "invalid address ") return `Cannot calculate distance `;
          return `Distance: ${this.getRoute()} miles`;
      }
    } else return;
  };

  getDeliverRoute = async (event) => {
    if (this.state.order) {
      const MAP_API = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
      const KEY =
        "?access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg";
      // get business address coordinates
      const QUERY1 =
        this.state.order.businessAddress.split(" ").join("%20") + ".json";
      var business;
      await fetch(`${MAP_API}${QUERY1}${KEY}`)
        .then((response) => response.json())
        .then((data) => {
          business = data.features[0].geometry.coordinates;
        });
      console.log("business: " + business);
      // get delivery address coordinate
      const QUERY2 =
        this.state.order.deliveryAddress.split(" ").join("%20") + ".json";
      var customer;
      await fetch(`${MAP_API}${QUERY2}${KEY}`)
        .then((response) => response.json())
        .then((data) => {
          customer = data.features[0].geometry.coordinates;
        });
      console.log("customer: " + customer);
      var direction;
      var profile = "mapbox/driving-traffic";
      var coordinates =
        business[0] + "," + business[1] + ";" + customer[0] + "," + customer[1];
      //var coordinates = this.state.start.longitude+','+this.state.start.latitude+';'+this.state.order.longitude+','+this.state.order.latitude;
      const QUERY3 = profile + "/" + coordinates;
      await fetch(
        "https://api.mapbox.com/directions/v5/" +
          QUERY3 +
          "?geometries=geojson&steps=true&access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg"
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState(() => ({ deliveryRoute: data }));
          console.log(
            "https://api.mapbox.com/directions/v5/" +
              QUERY3 +
              "?geometries=geojson&steps=true&access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg"
          );
        });
    } else return;
  };

  async componentDidMount() {
    console.log("Get Location details");
    await this.getDeliverRoute();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.order.status !== this.state.order.status) {
      await this.setState({ order: nextProps.order });
      console.log(nextProps.order);
      console.log("Updating information");
      await this.getDeliverRoute();
    }
  }

  render() {
    return (
      <div id="container">
        <div id="dash-box">
          <div id="boxtop">
            <div id="titlecontainer">ID: {this.state.order._id}</div>
            <br />
            <div id="titlecontainer">
              Customer: {this.state.order.customerName}
            </div>
            <br />
          </div>

          <div id="container">
            <div className="iconcircle">
              <div id="circleindex">{this.props.index}</div>
            </div>
          </div>
          <div id="status">Status: {this.state.order.status}</div>

          <div id="titlecontainer">
            <h2>Driver: {this.getDriver()}</h2>
          </div>
          <br />
          <div id="time">Recieved: {this.getRealTime()} mins ago</div>
          <div id="container">
            <br />
            <div
              id="description"
              style={{ textAlign: "left", paddingRight: "20%" }}
            >
              {this.getDestination()}
            </div>
            <div
              id="description"
              style={{ textAlign: "left", paddingRight: "20%" }}
            >
              {this.getCost()} , {this.getDistance()}
            </div>
            
          </div>
          <br />
          <br />
          <div id="starcontainer">
            <Rating driver={this.state.order.assigned} />
          </div>
          <div id="button-container2">
            <Link
              to={{
                pathname: "/business/order-map",
                state: { order: this.state.order },
              }}
            >
              <CustomButtons
                text="View Driver Location ->"
                color="#5c8eb9"
                width="100%"
                fontSize="20px"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BuisDash;
