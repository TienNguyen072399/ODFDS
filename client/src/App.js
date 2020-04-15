import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Registration from "./pages/RegistrationPage";
import Header from "./components/Header";
import Navbar from "./components/NavBar";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Login from "./pages/LoginPage";
import NewOrder from "./pages/NewOrderPage";
import BusinessDashboard from "./pages/BusinessDashboard";
import DriverDashboard from "./pages/DriverDashboard";
function App() {
  return ( 
    <Router>
    <Header/>
    
    <Switch>
    <Route path = "/" exact component = {Login}/>{" "} 
    <Route path = "/users" exact component = {Login}/>{" "} 
    <Route path = "/drivers" exact component = {Login}/>{" "} 
    <Route path = "/restaurant" exact component = {Login}/>{" "} 
    <Route path = "/signup" exact component = {Registration}/>{" "}
    <Route path = "/restaurant/neworder" exact component = {NewOrder}/> 
    <Route path = "/restaurant/dashboard" exact component = {BusinessDashboard}/> 
    <Route path = "/driver/dashboard" exact component = {DriverDashboard}/>
    </Switch> 
    </Router>
  );
}

export default App;