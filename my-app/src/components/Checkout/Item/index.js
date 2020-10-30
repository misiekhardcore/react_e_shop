import React from "react";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  addProduct,
  subtractFromCart,
} from "./../../../redux/Cart/cart.actions";

const Item = (item) => {
  const dispatch = useDispatch();
  const {
    productThumbnail,
    productName,
    quantity,
    productPrice,
    documentID,
  } = item;

  const handleRemoveCartItem = (documentID) => {
    dispatch(removeCartItem({ documentID }));
  };

  const handleAddProduct = (item) => {
    dispatch(addProduct(item));
  };

  const handleSubtractProduct = (item) => {
    dispatch(subtractFromCart(item));
  };

  return (
    <table className="cartItem" border="0" cellSpacing="10" cellSpacing="0">
      <tbody>
        <tr>
          <td>
            <img src={productThumbnail} alt={productName} />
          </td>
          <td>{productName}</td>
          <td>
            <span
              className="cartBtn"
              onClick={() => handleSubtractProduct(item)}
            >{`< `}</span>
            <span>{quantity}</span>
            <span
              className="cartBtn"
              onClick={() => handleAddProduct(item)}
            >{` >`}</span>
          </td>
          <td>${productPrice}</td>
          <td align="center">
            <span
              className="cartBtn"
              onClick={() => handleRemoveCartItem(documentID)}
            >
              x
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Item;
