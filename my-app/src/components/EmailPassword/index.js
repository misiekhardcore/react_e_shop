import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./styles.scss";

import AuthWrapper from "./../AuthWrapper";
import Button from "./../forms/Button";
import Input from "./../forms/Input";

import { auth } from "./../../firebase/utils";

const initialState = {
  email: "",
  errors: [],
};

class EmailPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email } = this.state;

      const config = {
        url: "http://localhost:3000/login",
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push("login");
        })
        .catch(() => {
          const err = ["Email not found. Please try again"];
          this.setState({
            errors: err,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { email, errors } = this.state;

    const configAuthWrapper = {
      headline: "Reset with email",
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        {errors.length > 0 && (
          <ul className="error">
            {errors.map((e, i) => {
              return <li key={i}>{e}</li>;
            })}
          </ul>
        )}
        <form onSubmit={this.handleSubmit}>
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <Button type="submit">Reset password</Button>
        </form>
      </AuthWrapper>
    );
  }
}

export default withRouter(EmailPassword);
