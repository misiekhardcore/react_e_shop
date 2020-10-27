import React from "react";
import Button from "./../../forms/Button";

const Product = ({
  productName,
  productThumbnail,
  productCategory,
  productPrice,
}) => {
  if (
    !productCategory ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;

  const configAddToCartButton = {
    type: "button",
  };

  return (
    <div className="product">
      <div className="thumb">
        <img src={productThumbnail} alt={productName} />
      </div>
      <div className="details">
        <ul>
          <li>
            <span className="productName"> {productName} </span>
          </li>
          <li>
            <span className="productPrice"> ${productPrice} </span>
          </li>
          <li>
            <Button {...configAddToCartButton}>Add to cart</Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
