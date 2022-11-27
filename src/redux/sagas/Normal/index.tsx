import { all } from "redux-saga/effects";
import getAllRoomBills from "./getAllRoomBills";
import getAllHotels from "./getAllHotels";
import getAllTourBills from "./getAllTourBills";
import getAllTours from "./getAllTours";

export const normalSagas = function* root() {
    yield all([getAllTours(), getAllHotels(), getAllTourBills(), getAllRoomBills()]);
  };
  