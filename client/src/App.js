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

function App() {
  return ( 
    <Router>
    <Header/>
    <Navbar type="business"/>
    <Switch>
    <Route path = "/" exact component = {Login}/>{" "} 
    <Route path = "/users" exact component = {Login}/>{" "} 
    <Route path = "/drivers" exact component = {Login}/>{" "} 
    <Route path = "/restaurant" exact component = {Login}/>{" "} 
    <Route path = "/signup" exact component = {Registration}/>{" "} 
    </Switch> 
    </Router>
  );
}

export default App;