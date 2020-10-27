import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/Product/product.actions";
import "./styles.scss";

import Product from "./Product";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductResults = ({}) => {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  if (!Array.isArray(products)) {
    return null;
  }
  if (products.length < 1) {
    return (
      <div className="products">
        <p>No search results</p>
      </div>
    );
  }
  return (
    <div className="products">
      {products.map((product, index) => {
        return <Product {...product} />;
      })}
    </div>
  );
};

export default ProductResults;
