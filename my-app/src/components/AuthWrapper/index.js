import React from "react";
import "./styles.scss";

const AuthWrapper = ({ headline, children }) => {
  return (
    <div className="authWrapper">
      {headline && <h2>{headline}</h2>}
      {children && children}
    </div>
  );
};

export default AuthWrapper;
