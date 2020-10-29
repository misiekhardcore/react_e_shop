import React from "react";
import { Link } from "react-router-dom";
import Button from "./../../forms/Button";

const Product = ({
  documentID,
  productName,
  productThumbnail,
  productCategory,
  productPrice,
}) => {
  if (
    !documentID ||
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
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>
      <div className="details">
        <ul>
          <li>
            <span className="productName">
              <Link to={`/product/${documentID}`}> {productName} </Link>
            </span>
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
