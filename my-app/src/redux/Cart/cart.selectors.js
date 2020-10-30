import { createSelector } from "reselect";

export const selectCartData = (state) => state.cartData;

export const selectCartIems = createSelector(
  [selectCartData],
  (cartData) => cartData.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartIems],
  (cartItems) =>
    cartItems.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartIems], (cartItems) =>
  cartItems.reduce(
    (quantity, cartItem) =>
      quantity + cartItem.quantity * cartItem.productPrice,
    0
  )
);
