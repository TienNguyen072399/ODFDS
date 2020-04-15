import React, { Component } from "react";
import "../pages/DashCSS.css";
import CustomButtons from "../components/CustomButtons";

class DriverDash extends Component {
  state = {};

  render() {
    return <div id = "container">
    <div id="dash-box">
        <div id="boxtop"></div>
        <div id = "container"><div className ="iconcircle"></div></div>
        <div id ="titlecontainer"><h2>Bake-n-Shake</h2></div>
        <div id="time">3 min ago</div>
        <div id="container">
        <div id="description">Requesting [1] delivery [2]mi away</div>
        </div><br/><br/><br/>
        <div id="button-container"><CustomButtons text="Decline Order" color="#DB3979" width="60%" fontSize="13px"/><CustomButtons text="Accept Order ->" color="#5c8eb9" width="60%"fontSize="13px"/></div>
    </div>
    </div>;
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