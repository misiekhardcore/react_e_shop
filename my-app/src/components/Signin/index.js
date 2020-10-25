import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  emailSignInStart,
  googleSignInStart,
} from "./../../redux/User/user.actions";
import "./styles.scss";

import AuthWrapper from "./../AuthWrapper";
import Button from "./../forms/Button";
import Input from "./../forms/Input";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Signin = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser, history, dispatch]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
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

export default Signin;
