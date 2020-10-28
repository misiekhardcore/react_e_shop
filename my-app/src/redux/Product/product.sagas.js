import { takeLatest, put, all, call } from "redux-saga/effects";
import { auth } from "./../../firebase/utils";
import {
  handleAddProduct,
  handleFetchProducts,
  handleDeleteProduct,
} from "./product.helpers";
import { setProducts, fetchProductsStart } from "./product.actions";
import productTypes from "./product.types";

export function* addProduct({
  payload: { productName, productCategory, productPrice, productThumbnail },
}) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      productName,
      productCategory,
      productPrice,
      productThumbnail,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
    yield put(fetchProductsStart());
  } catch (err) {
    // console.log(err)
  }
}

export function* onAddProductStart() {
  yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts({ payload }) {
  try {
    const products = yield handleFetchProducts(payload);
    yield put(setProducts(products));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (err) {
    console.log(err);
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct);
}

export default function* productSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
  ]);
}
