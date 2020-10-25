import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  resetPasswordSatrt,
  resetUserState,
} from ".//../../redux/User/user.actions";
import "./styles.scss";

import AuthWrapper from "./../AuthWrapper";
import Button from "./../forms/Button";
import Input from "./../forms/Input";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userError: user.userErr,
});

const EmailPassword = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { resetPasswordSuccess, userError } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push("login");
    }
  }, [resetPasswordSuccess, history, dispatch]);

  useEffect(() => {
    if (Array.isArray(userError) && userError.length > 0) {
      setErrors(userError);
    }
  }, [userError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordSatrt({ email }));
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

export default EmailPassword;
