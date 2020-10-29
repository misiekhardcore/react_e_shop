import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "./../../redux/Product/product.actions";
import Button from "./../forms/Button";
import "./styles.scss";

const mapState = (state) => ({
  product: state.productsData.product,
});

const ProductCard = ({}) => {
  const dispatch = useDispatch();
  const { productID } = useParams();
  const { product } = useSelector(mapState);
  const {
    productName,
    productPrice,
    productThumbnail,
    productDescription,
  } = product;

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const configAddToCartButton = {
    type: "button",
  };

  return (
    <div className="productCard">
      <div className="hero">
        <img src={productThumbnail} alt={productName} />
      </div>
      <div className="productDetails">
        <div className="row">
          <h1 className="productName">{productName}</h1>
          <div className="addToCart">
            <p className="productPrice">${productPrice}</p>
            <Button {...configAddToCartButton}>Add to cart</Button>
          </div>
        </div>
        <div
          className="productInfo"
          dangerouslySetInnerHTML={{ __html: productDescription }}
        ></div>
      </div>
    </div>
  );
};

export default ProductCard;
