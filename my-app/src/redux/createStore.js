import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const middlewares = [thunk, sagaMiddleware, logger];

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };
