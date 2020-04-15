import React, { Component } from "react";
import "../pages/TempCSS.css";
class CustomButtons extends Component {
  state = {};

  render() {
    return (
      <button
        style={{
          fontSize: this.props.fontSize,
          backgroundColor: this.props.color,
          borderColor: this.props.color,
          borderRadius: 5,
          color: "white",
          width: this.props.width,
          marginRight: 10
        }}
        onClick={this.props.onClick}
        value={this.props.text}
      >
        {this.props.text}
      </button>
    );
  }
}

export default CustomButtons;
