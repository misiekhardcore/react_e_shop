import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "./../../redux/Product/product.actions";
import { addProduct } from "./../../redux/Cart/cart.actions";
import Button from "./../forms/Button";
import "./styles.scss";

const mapState = (state) => ({
  product: state.productsData.product,
});

const ProductCard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
  }, [dispatch, productID]);

  const configAddToCartButton = {
    type: "button",
  };

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
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
            <Button
              {...configAddToCartButton}
              onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </Button>
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
