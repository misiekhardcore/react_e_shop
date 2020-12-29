import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./User/user.reducer";
import productReducer from "./Product/product.reducer";
import cartReducer from "./Cart/cart.reducer";
import orderReducer from "./Order/order.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  productsData: productReducer,
  cartData: cartReducer,
  orderData: orderReducer,
});

const configStorage = {
  key: "root",
  storage,
  whitelist: ["cartData"],
};

export default persistReducer(configStorage, rootReducer);
