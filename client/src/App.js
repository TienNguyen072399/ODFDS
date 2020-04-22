import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Registration from "./pages/RegistrationPage";
import Header from "./components/Header";
import Navbar from "./components/NavBar";
import styled from "styled-components";
import "./mapbox-gl.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import store from "./redux/stores";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";

import Login from "./pages/LoginPage";
import NewOrder from "./pages/NewOrderPage";
import BusinessDashboard from "./pages/BusinessDashboard";
import DriverCompleteOrders from "./pages/DriverCompleteOrders";
import DriverMap from "./pages/DriverMap";
import DriverOpenOrders from "./pages/DriverOpenOrders";
import { createStore } from "redux";

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />

        <Switch>
          <Route path="/" exact component={Login} />{" "}
          <Route path="/signup" exact component={Registration} />{" "}
          <Route path="/business/neworder" exact component={NewOrder} />
          <Route
            path="/business/dashboard"
            exact
            component={BusinessDashboard}
          />
          <Route
            path="/driver/complete"
            exact
            component={DriverCompleteOrders}
          />
          <Route path="/driver/map" exact component={DriverMap} />
          <Route path="/driver/openorders" exact component={DriverOpenOrders} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
