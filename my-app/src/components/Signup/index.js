import "./styles.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singUpUser, resetAllAuthForms } from "./../../redux/User/user.actions";
import { withRouter } from "react-router-dom";

import AuthWrapper from "./../AuthWrapper";
import Button from "./../../components/forms/Button";
import Input from "./../../components/forms/Input";

const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError,
});

const Signup = (props) => {
  const dispatch = useDispatch();
  const { signUpSuccess, signUpError } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (signUpSuccess) {
      resetForm();
      dispatch(resetAllAuthForms());
      props.history.push("/");
    }
  }, [signUpSuccess, props.history, dispatch]);

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError);
    }
  }, [signUpError]);

  const resetForm = () => {
    setEmail("");
    setDisplayName("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(singUpUser({ displayName, email, password, confirmPassword }));
  };

  const configAuthWrapper = {
    headline: "Sign up",
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
          type="text"
          name="displayName"
          value={displayName}
          placeholder="Full name"
          handleChange={(e) => setDisplayName(e.target.value)}
        />
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
        <Input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Repeat Password"
          handleChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </AuthWrapper>
  );
};

export default withRouter(Signup);
