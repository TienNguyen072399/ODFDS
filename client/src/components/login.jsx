import React, { Component } from "react";
import PropTypes from "prop-types";
import api from "../api";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      type: "driver"
    };
  }

  handleChangeEmail = async event => {
    const email = event.target.value;
    this.setState({ email });
  };

  handleChangePassword = async event => {
    const password = event.target.value;
    this.setState({ password });
  };

  handleChangeType = async event => {
    const type = event.target.value;
    this.setState({ type });
  };

  handleLogin = async () => {
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
    const { email, password, type } = this.state;
    console.log(type);
    return (
      <form className="form-signin">
        <img
          className="mb-4"
          src="/docs/4.4/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Driver Sign in</h1>
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
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          value={password}
          onChange={this.handleChangePassword}
        />
        <div className="checkbox mb-3">
          <label>
            <input
              onClick={this.handleChangeType}
              type="checkbox"
              value="business"
            />{" "}
            Business Login
          </label>
        </div>
        <button
          onClick={this.handleLogin}
          className="btn btn-lg btn-primary btn-block"
          type="submit"
        >
          Sign in
        </button>
      </form>
    );
  }
}
export default Login;
