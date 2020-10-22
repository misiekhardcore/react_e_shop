import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import AuthWrapper from "./../AuthWrapper";
import Button from "./../forms/Button";
import Input from "./../forms/Input";

import { signInWthGoogle, auth } from "./../../firebase/utils";
import "./styles.scss";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
      props.history.push("/");
    } catch (err) {
      // console.log(err);
    }
  };

  const configAuthWrapper = {
    headline: "Sign in",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          handleChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          handleChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Sign In</Button>
      </form>
      <form onSubmit={handleSubmit}>
        <Button onClick={signInWthGoogle}>Sign In with Google</Button>
      </form>
      <div className="recoverylink">
        <Link to="/recovery">Forgot password?</Link>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(Signin);
