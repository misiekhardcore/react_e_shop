import React, { Component } from "react";
import { Link } from "react-router-dom";

import AuthWrapper from "./../AuthWrapper";
import Button from "./../forms/Button";
import Input from "./../forms/Input";

import { signInWthGoogle, auth } from "./../../firebase/utils";
import "./styles.scss";

const initialState = {
  email: "",
  password: "",
  errors: [],
};

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;

    const configAuthWrapper = {
      headline: "Sign in",
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <Input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.handleChange}
          />
          <Button type="submit">Sign In</Button>
        </form>
        <form onSubmit={this.handleSubmit}>
          <Button onClick={signInWthGoogle}>Sign In with Google</Button>
        </form>
        <div className="recoverylink">
          <Link to="/recovery">Forgot password?</Link>
        </div>
      </AuthWrapper>
    );
  }
}

export default Signin;
