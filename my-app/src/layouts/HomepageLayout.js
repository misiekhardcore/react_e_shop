import React from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import "./../../src/default.scss";

const HomepageLayout = (props) => {
  return (
    <div className="fullH">
      <Header {...props} />
      <div className="wrapper">{props.children}</div>
      <Footer />
    </div>
  );
};

export default HomepageLayout;
