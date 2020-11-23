import cartTypes from "./cart.types";
import {
  handleAddToCart,
  handleRemoveCartItem,
  handleSubtractFromCart,
} from "./cart.utils";

const INITIAL_STATE = {
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: handleAddToCart({
          prevCartItems: state.cartItems,
          nextCartItem: action.payload,
        }),
      };
    case cartTypes.SUBTRACT_FROM_CART:
      return {
        ...state,
        cartItems: handleSubtractFromCart({
          prevCartItems: state.cartItems,
          cartItem: action.payload,
        }),
      };
    case cartTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: handleRemoveCartItem({
          prevCartItems: state.cartItems,
          cartItemToRemove: action.payload,
        }),
      };
    case cartTypes.CLEARE_CART:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default cartReducer;
