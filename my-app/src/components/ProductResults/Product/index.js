import React from "react";
import { Link } from "react-router-dom";
import Button from "./../../forms/Button";
import { useDispatch } from "react-redux";
import { addProduct } from "./../../../redux/Cart/cart.actions";

const Product = (product) => {
  const dispatch = useDispatch();
  const {
    documentID,
    productName,
    productThumbnail,
    productCategory,
    productPrice,
  } = product;

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

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
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
            <Button
              {...configAddToCartButton}
              onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
