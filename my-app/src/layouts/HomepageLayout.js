import React from "react";
import Header from "./../components/Header";
import "./../../src/default.scss";
import Footer from "./../components/Footer";

const HomepageLayout = (props) => {
  return (
    <div className="fullH">
      <Header />
      <div className="wrapper">{props.children}</div>
      <Footer />
    </div>
  );
};

export default HomepageLayout;
