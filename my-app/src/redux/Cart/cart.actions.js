import cartTypes from "./cart.types";

export const addProduct = (nexCartItem) => ({
  type: cartTypes.ADD_TO_CART,
  payload: nexCartItem,
});

export const subtractFromCart = (cartItem) => ({
  type: cartTypes.SUBTRACT_FROM_CART,
  payload: cartItem,
});

export const removeCartItem = (cartItem) => ({
  type: cartTypes.REMOVE_CART_ITEM,
  payload: cartItem,
});

export const clearCart = () => ({
  type: cartTypes.CLEARE_CART,
});
