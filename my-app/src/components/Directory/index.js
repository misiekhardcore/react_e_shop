import React from "react";
import "./styles.scss";
import ShopMen from "./../../assets/shopMens.jpg";
import ShopWomen from "./../../assets/shopWomens.jpg";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${ShopMen})` }}>
          <button
            onClick={() => {
              fetch("http://localhost:3000/posts", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }).then(res => res.json())
              .then(json => console.log(json));
            }}
          >
            Shop Mens
          </button>
        </div>
        <div className="item" style={{ backgroundImage: `url(${ShopWomen})` }}>
          <button>Shop Womens</button>
        </div>
      </div>
    </div>
  );
};

export default Directory;
