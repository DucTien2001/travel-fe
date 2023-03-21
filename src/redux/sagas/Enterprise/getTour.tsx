import { put, takeLatest, call } from "redux-saga/effects";
import {
  GET_TOUR_REQUEST,
  setTourReducer,
} from "redux/reducers/Enterprise/actionTypes";
import { setLoading } from "redux/reducers/Status/actionTypes";
import { TourService } from "services/normal/tour";

function* requestGetTour(data: { type: string; id: number }) {
  try {
    yield put(setLoading(true));
    const tour = yield call(TourService.getTour, data.id);
    yield put(setTourReducer(tour.data));
  } catch (e: any) {
    console.log(e);
  } finally {
    yield put(setLoading(false));
  }
}

function* getTour() {
  yield takeLatest(GET_TOUR_REQUEST, requestGetTour);
}

export default getTour;
