import { all } from "redux-saga/effects";
import getAllTours from "./getAllTours";

export const enterpriseSagas = function* root() {
  yield all([getAllTours()]);
};
