import orderTypes from "./order.types";
import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  handleGetOrderDetails,
  handleGetOrderHistory,
  handleSaveOrder,
} from "./order.helpers";
import { auth } from "../../firebase/utils";
import { clearCart } from "./../Cart/cart.actions";
import { setOrderDetails, setUserOrderHistory } from "./order.actions";

export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetOrderHistory(payload);
    yield put(setUserOrderHistory(history));
  } catch (err) {
    console.log(err);
  }
}

export function* onGetUserHistoryStart() {
  yield takeLatest(
    orderTypes.GET_USER_ORDER_HISTORY_START,
    getUserOrderHistory
  );
}

export function* saveOrder({ payload }) {
  try {
    const timestamp = new Date();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamp,
    });

    yield put(clearCart());
  } catch (err) {
    // console.log(err)
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(orderTypes.SAVE_ORDER_HISTORY_START, saveOrder);
}

export function* getOrderDetails({ payload }) {
  try {
    const order = yield handleGetOrderDetails(payload);

    yield put(setOrderDetails(order));
  } catch (err) {
    // console.log(err)
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(orderTypes.GET_ORDER_DETAILS_START, getOrderDetails);
}

export default function* orderSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserHistoryStart),
    call(onGetOrderDetailsStart),
  ]);
}
