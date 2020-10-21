import React from "react";
import "./styles.scss";

const Input = ({ handleChange, label, ...otheProps }) => {
  return (
    <div className="formrow">
      {label && <label>{label}</label>}
      <input className="forminput" onChange={handleChange} {...otheProps} />
    </div>
  );
};

export default Input;
