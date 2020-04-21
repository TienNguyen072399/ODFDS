import React, { Component } from "react";
import CustomButtons from "../components/CustomButtons";
import Navbar from "../components/NavBar";
import "../mapbox-gl.css";
import Map from "../components/map";
//import DirectionMap from "../components/DirectionMap";
import "./DashCSS.css";

class OrderMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
        type:'business',
        order: props.location.order,
    };
  }
  componentDidMount () {
    // const { handle } = this.props.match.params
    // const { order } = this.props.location.state

  }
   
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
        <div id = "container" >
          <div id="dash-box">
            <div id="boxtopmap">
              <div id ="titlemap">ID: {this.state.order._id}</div>
              <div id ="titlemap">Driver: {this.state.order.assigned}</div>        
            </div>
            <Map key = {this.state.order._id} order={this.state.order}/><br/>
          </div>
        </div>
      </div>
    );
  }
}
export default OrderMap;