import React, { Component } from "react";
import PropTypes from "prop-types";
import api from "../api";

class DriverReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      vehicle: "",
      password: "",
      bankAccount: ""
    };
  }

  handleChangeName = async event => {
    const name = event.target.name;
    this.setState({ name });
  };

  handleChangeVehicle = async event => {
    const vehicle = event.target.vehicle;
    this.setState({ vehicle });
  };

  handleChangeEmail = async event => {
    const email = event.target.value;
    this.setState({ email });
  };

  handleChangePassword = async event => {
    const password = event.target.value;
    this.setState({ password });
  };

  handleChangeBank = async event => {
    const bankAccount = event.target.bankAccount;
    this.setState({ bankAccount });
  };

  handleRegister = async () => {
    const { email, password, type } = this.state;
    const user = { email, password, type };
    console.log("handleLogin");
    await api.postLogin(user).then(res => {
      window.alert(`Login successfully`);
      // this.setState({
      //   email: "",
      //   password: "",
      //   type: "driver"
      // });
    });
  };

  render() {
    const { name, email, vehicle, password, bankAccount } = this.state;
    console.log(name);
    return (
      <form className="form-signin">
        <img
          className="mb-4"
          src="/docs/4.4/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Driver Register</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Name
        </label>
        <input
          type="text"
          id="inputName"
          className="form-control"
          placeholder="Driver name"
          required
          autoFocus
          value={name}
          onChange={this.handleChangeName}
        />
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
          autoFocus
          value={email}
          onChange={this.handleChangeEmail}
        />
        <label htmlFor="inputEmail" className="sr-only">
          Vehicle
        </label>
        <input
          type="text"
          id="inputVehicle"
          className="form-control"
          placeholder="Driver vehicle"
          required
          autoFocus
          value={name}
          onChange={this.handleChangeVehicle}
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="text"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          value={password}
          onChange={this.handleChangePassword}
        />
        <label htmlFor="inputPassword" className="sr-only">
          bankAccount
        </label>
        <input
          type="text"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          value={password}
          onChange={this.handleChangeBank}
        />

        <button
          onClick={this.handleRegister}
          className="btn btn-lg btn-primary btn-block"
          type="submit"
        >
          Register
        </button>
      </form>
    );
  }
}
export default DriverReg;
