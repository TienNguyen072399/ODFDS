import React, { Component } from "react";
import "../pages/DashCSS.css";
import CustomButtons from "../components/CustomButtons";
import Rating from "./rating";

//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

class BuisDash extends Component {
  state = {
    order : this.props.order,
  };

  render() {
    return <div id = "container">
    <div id="dash-box">
        <div id="boxtop"></div>
        <div id = "container"><div className ="iconcircle"></div></div>
        <div id ="titlecontainer"><h2>Driver: {this.state.order.driver}</h2></div>
        <div id="time">3 min ago</div>
        <div id="container">
  <div id="description">Currently on route to {this.state.order.deliveryAddress}</div>
        </div><br/><br/><br/>
        <div id="starcontainer"><Rating/></div>
        <div id="button-container2"><CustomButtons text="View Driver Profile ->" color="#5c8eb9" width="100%"fontSize="13px"/></div>
    </div>
    </div>;
  }
}

export default BuisDash;
