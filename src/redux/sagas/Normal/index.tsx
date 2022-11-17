import { all } from "redux-saga/effects";
import getAllTours from "./getAllTours";
import getTour from "./getTour";

export const normalSagas = function* root() {
    yield all([getAllTours(), getTour()]);
  };
  