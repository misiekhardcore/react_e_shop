import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchProductsStart } from "../../redux/Product/product.actions";
import Select from "./../forms/Select";
import "./styles.scss";

import Product from "./Product";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductResults = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);
  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleSelect = (e) => {
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  };

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

  const configSelect = {
    defaultValue: filterType,
    label: "Order by",
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Mens",
        value: "mens",
      },
      {
        name: "Womens",
        value: "womens",
      },
    ],
    handleChange: handleSelect,
  };

  return (
    <div className="products">
      <h1>Product Browser</h1>

      <Select {...configSelect} />

      {products.map((product, index) => {
        return <Product key={index} {...product} />;
      })}
    </div>
  );
};

export default ProductResults;
