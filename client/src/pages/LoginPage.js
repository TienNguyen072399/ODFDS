import React, {
  Component
} from "react";
import styled from "styled-components";
import {
  Link,
  Redirect,
  useHistory
} from "react-router-dom";
import CustomButtons from "../components/CustomButtons";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      type: "driver",
    };
  }

  handleChangeEmail = async (event) => {
    const email = event.target.value;
    this.setState({
      email
    });
  };

  handleChangePassword = async (event) => {
    const password = event.target.value;
    this.setState({
      password
    });
  };

  handleChangeType = async (event) => {
    const type = event.target.value;
    console.log(event.target.value);
    this.setState({
      type
    });
  };

  handleLogin = async () => {
    const {
      email,
      password,
      type
    } = this.state;
    const user = {
      email,
      password,
      type
    };
    console.log("handleLogin");
  };

  render() {
    const {
      email,
      password,
      type
    } = this.state;
    console.log(type);
    return ( <
      form className = "form-signin"
      style = {
        {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 30,
          color: "#4E4E4E",
        }
      } >
      <
      div className = "loginInput" > <
      h1 > Driver Sign in < /h1> <
      label >
      Email address <
      /label> <
      input type = "email"
      id = "inputEmail"
      className = "form-control"
      placeholder = "Email address"
      required autoFocus value = {
        email
      }
      onChange = {
        this.handleChangeEmail
      }
      /> <
      label >
      Password <
      /label> <
      input type = "password"
      id = "inputPassword"
      className = "form-control"
      placeholder = "Password"
      required value = {
        password
      }
      onChange = {
        this.handleChangePassword
      }
      /> <
      div >
      <
      label >
      <
      input onClick = {
        this.handleChangeType
      }
      type = "checkbox"
      value = "business" /
      >
      {
        " "
      }
      Business Login <
      /label> < /
      div > < /
      div >
      <
      div className = "registrationInput" >
      <
      CustomButtons text = "Sign in"
      color = "#DB3979"
      width = "100%"
      onClick = {
        this.handleLogin
      }
      />    <
      Link to = "signup" > < CustomButtons text = "Sign up"
      color = "#DB3979"
      width = "100%"
      onClick = {
        this.handleSignup
      }
      /></Link > < /div> < /
      form >
    );
  }
}
export default Login;