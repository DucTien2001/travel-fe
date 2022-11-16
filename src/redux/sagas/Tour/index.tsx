import { all } from "redux-saga/effects";
import getAllTours from "./getAllTours";

export const tourSagas = function* root() {
    yield all([getAllTours()]);
  };
  