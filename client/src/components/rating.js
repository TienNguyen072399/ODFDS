import React, { Component } from "react";
import "../pages/DashCSS.css";
import CustomButtons from "../components/CustomButtons";
import Rater from 'react-rater';
import PropTypes from 'prop-types';

//https://openbase.io/js/react-rater
//
//npm install react-rater

class Rating extends Component {
  state = {
    driver : this.props.driver,
  };

  render() {
    return <Rater rating={3} total={5} interactive={false}></Rater>;
  }
}
//return <Rater rating={this.state.driver.rating} total={5} interactive={false}></Rater>;
export default Rating;
