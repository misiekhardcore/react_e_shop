import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./styles.scss";

import AuthWrapper from "./../AuthWrapper";
import Button from "./../forms/Button";
import Input from "./../forms/Input";

import { auth } from "./../../firebase/utils";

const EmailPassword = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const resetForm = () => {
    setEmail("");
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "http://localhost:3000/login",
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push("login");
          resetForm()
        })
        .catch(() => {
          const err = ["Email not found. Please try again"];
          setErrors(err);
        });
    } catch (err) {
      // console.log(err);
    }
  };

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
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          handleChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">Reset password</Button>
      </form>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
