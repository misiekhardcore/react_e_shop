import { combineReducers } from "redux";

import userReducer from "./User/user.reducer";
import productReducer from "./Product/product.reducer";
import cartReducer from "./Cart/cart.reducer";

export default combineReducers({
  user: userReducer,
  productsData: productReducer,
  cartData: cartReducer,
});
