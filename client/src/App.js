import React from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import Counters from "./components/counters";
import {
  Component
} from "react";
import Login from "./components/login";
import DriverReg from "./components/driverReg";
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'



class App extends Component {
  state = {

  };

  // handleIncrement = counter => {
  //   const counters = [...this.state.counters];
  //   const index = counters.indexOf(counter);
  //   counters[index] = {
  //     ...counter
  //   };
  //   counters[index].value++;
  //   this.setState({
  //     counters
  //   });
  // };

  // handleDelete = counterId => {
  //   const counters = this.state.counters.filter(c => c.id !== counterId);
  //   this.setState({
  //     counters
  //   });
  // };

  // handleReset = () => {
  //   const counters = this.state.counters.map(c => {
  //     c.value = 0;
  //     return c;
  //   });
  //   this.setState({
  //     counters
  //   });
  // };
  render() {
    return ( <
      Router >
      <
      NavBar / >
      <
      Switch >
      <
      Route path = "/users"
      exact component = {
        Login
      }
      />  <
      Route path = "/drivers"
      exact component = {
        Login
      }
      /> <
      Route path = "/restaurant"
      exact component = {
        Login
      }
      />  < /
      Switch >

      <
      main className = "container" >
      <
      Login / >
      <
      /main >  < /
      Router >
    );
  }
}

export default App;

// <
//       Counters counters = {
//         this.state.counters
//       }
//       onReset = {
//         this.handleReset
//       }
//       onDelete = {
//         this.handleDelete
//       }
//       onIncrement = {
//         this.handleIncrement
//       }
//       />{" "}