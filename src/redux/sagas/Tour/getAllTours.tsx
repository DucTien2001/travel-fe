import { call, put, takeLatest } from "redux-saga/effects";
import { setLoading } from "redux/reducers/Status/actionTypes";
import { GET_TOURS_REQUEST, setAllToursReducer } from "redux/reducers/Tour/actionTypes";
import { TourService } from "services/tour";

function* requestGetAllTours() {
    try {
      yield put(setLoading(true));
      const tours = yield call(TourService.getAllTours);
      yield put(setAllToursReducer(tours));
    } catch (e: any) {
      console.log(e);
    } finally {
      yield put(setLoading(false));
    }
  }
  
  function* getAllTours() {
    yield takeLatest(GET_TOURS_REQUEST, requestGetAllTours);
  }
  
  export default getAllTours;