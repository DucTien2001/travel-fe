import { all } from "redux-saga/effects";
import getAllTours from "./getAllTours";

export const normalSagas = function* root() {
    yield all([getAllTours()]);
  };
  