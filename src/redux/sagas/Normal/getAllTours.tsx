import { call, put, takeLatest } from "redux-saga/effects";
import { GET_NORMAL_TOURS_REQUEST, setAllToursReducer } from "redux/reducers/Normal/actionTypes";
import { setLoading } from "redux/reducers/Status/actionTypes";
import { TourService } from "services/tour";

function* requestGetAllTours() {
    try {
      yield put(setLoading(true));
      const tours = yield call(TourService.getAllTours);
      yield put(setAllToursReducer(tours?.data));
    } catch (e: any) {
      console.log(e);
    } finally {
      yield put(setLoading(false));
    }
  }
  
  function* getAllTours() {
    yield takeLatest(GET_NORMAL_TOURS_REQUEST, requestGetAllTours);
  }
  
  export default getAllTours;