import React, { Component } from "react";
import CustomButtons from "../components/CustomButtons";
import Navbar from "../components/NavBar";
import "../mapbox-gl.css";
import Map from "../components/map";
import DirectionMap from "../components/DirectionMap";
import "./DashCSS.css";
import Popup from "../components/Popup";
import CompleteOrder from "../components/completeOrder";

class BusinessMap extends Component {
  state={
    status : "",
    order : {cost: 10}
  }
  popupRef = React.createRef();

  _showPopupHandler = () => {
    this.popupRef.current.openPopup('Status has changed');
  }

  changeStatus = () => {
    if (this.state.status !== "Delivered"){
      this.setState({status: "Delivered"});
    }else this.setState({status: "not yet"});
    
  }

  render() {
    if (this.state.status === "Delivered"){
      this._showPopupHandler()
    }
    return (
      <div className="App">
        <button onClick = {this.changeStatus}> Click To Change status </button>
        <Popup ref = {this.popupRef} order = {this.state.order}/>
        
      </div>
    );
  }
  
  //<CompleteOrder></CompleteOrder>
  
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //       type:'business',
  //       order: this.props.order,
  //       orders:[
  //         {
  //           _id:"5e9a5c1b4a288946140e4115",
  //           orderTime:"Fri Apr 17 2020 18:47:07 GMT-0700 (Pacific Daylight Time)",
  //           assigned:"Harry",
  //           timePickUp:"",
  //           timeDelivered:"",
  //           businessName:"Go Go Chicken",
  //           businessId:"5e9a23c75bc9ef5a84b08faa",
  //           businessAddress:"301 S 1st St San Jose CA 95113",
  //           customerName:"Bane",
  //           deliveryAddress:"225 W Santa Clara St San Jose CA 95113",
  //           __v:0,
  //           status: "Waiting for pick up",
  //           longitude:-121.877506,
  //           latitude:37.340117
  //         },
  //         {
  //           _id:"5e9a5d254a288946140e4116",
  //           orderTime:"Fri Apr 17 2020 18:51:33 GMT-0700 (Pacific Daylight Time)",
  //           assigned:"Marry",
  //           timePickUp:"",
  //           timeDelivered:"",
  //           businessName:"Go Go Chicken",
  //           businessId:"5e9a23c75bc9ef5a84b08faa",
  //           businessAddress:"301 S 1st St San Jose CA 95113",
  //           customerName:"Harry",
  //           deliveryAddress:"225 W Santa Clara St San Jose CA 95113",
  //           __v:0,
  //           status: "Out for delivery",
  //           longitude:-121.880142,
  //           latitude:37.333672
  //         },
          
  //       ],
  //   };
  // }

   
  // render() {
  //     return (
  //     <div 
  //       style={{
  //         display: "flex",
  //         flexDirection: "column",
  //         alignItems: "center",
  //         fontSize: 20,
  //         color: "#4E4E4E",
  //       }}
  //     >
  //       <Navbar type={this.state.type}/>
  //       {this.state.orders.map(item => (
  //         <div id = "container" >
  //           <div id="dash-box">
  //             <div id="boxtopmap">
  //               <div id ="titlemap">ID: {item._id}</div>
  //               <div id ="titlemap">Driver: {item.assigned}</div>        
  //           </div>
  //           <Map key = {item._id} order={item}/><br/>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }



}
export default BusinessMap;
