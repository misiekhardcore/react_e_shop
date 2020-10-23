import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  resetPassword,
  resetAllAuthForms,
} from ".//../../redux/User/user.actions";
import "./styles.scss";

import AuthWrapper from "./../AuthWrapper";
import Button from "./../forms/Button";
import Input from "./../forms/Input";

const mapState = ({ user }) => ({
  resetPassSuccess: user.resetPassSuccess,
  resetPassError: user.resetPassError,
});

const EmailPassword = (props) => {
  const dispatch = useDispatch();
  const { resetPassSuccess, resetPassError } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPassSuccess) {
      resetForm();
      dispatch(resetAllAuthForms());
      props.history.push("login");
    }
  }, [resetPassSuccess, props.history, dispatch]);

  useEffect(() => {
    if (Array.isArray(resetPassError) && resetPassError.length > 0) {
      setErrors(resetPassError);
    }
  }, [resetPassError]);

  const resetForm = () => {
    setEmail("");
    setErrors([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPassword({ email }));
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
