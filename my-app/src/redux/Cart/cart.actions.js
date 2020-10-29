import cartTypes from "./cart.types";

export const addProduct = (nexCartItem) => ({
  type: cartTypes.ADD_TO_CART,
  payload: nexCartItem,
});
