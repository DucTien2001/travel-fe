import createSagaMiddleware from "redux-saga";
import createRootReducer from "./reducers";
import { rootSaga } from "./sagas";
import { configureStore } from "@reduxjs/toolkit";
import middlewares from "./middlewares";

const sagaMiddleware = createSagaMiddleware();

export const makeStore = (context) => {
  const store = configureStore({
    reducer: createRootReducer(),
    middleware: (getDefaultMiddleware) => {
      return [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware, ...middlewares()];
    },
    devTools: process.env.NODE_ENV !== "production",
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = makeStore;
