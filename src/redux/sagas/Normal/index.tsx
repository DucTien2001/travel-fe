import { all } from "redux-saga/effects";
import getAllHotels from "./getAllHotels";
import getAllTourBills from "./getAllTourBills";
import getAllTours from "./getAllTours";

export const normalSagas = function* root() {
    yield all([getAllTours(), getAllHotels(), getAllTourBills()]);
  };
  