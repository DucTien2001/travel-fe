import { all } from "redux-saga/effects";
import { enterpriseSagas } from "./Enterprise";
import { tourSagas } from "./Tour";
import { userSagas } from "./User";


// Register all your watchers
export const rootSaga = function* root() {
  yield all([userSagas(), enterpriseSagas(), tourSagas()]);
  
};
