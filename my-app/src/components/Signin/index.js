import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  signInUser,
  signInWthGoogle,
  resetAllAuthForms,
} from "./../../redux/User/user.actions";
import "./styles.scss";

import AuthWrapper from "./../AuthWrapper";
import Button from "./../forms/Button";
import Input from "./../forms/Input";

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess,
});

const Signin = (props) => {
  const { signInSuccess } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      dispatch(resetAllAuthForms());
      props.history.push("/");
    }
  }, [signInSuccess, props.history, dispatch]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWthGoogle());
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

        <Button type="button" onClick={handleGoogleSignIn}>
          Sign In with Google
        </Button>
      </form>
      <div className="recoverylink">
        <Link to="/recovery">Forgot password?</Link>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(Signin);
