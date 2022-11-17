import { call, put, takeLatest } from "redux-saga/effects";
import { GET_NORMAL_TOURS_DETAIL_REQUEST, setTourReducer } from "redux/reducers/Normal/actionTypes";
import { setLoading } from "redux/reducers/Status/actionTypes";
import { TourService } from "services/tour";

function* requestGetTour(data: {type: string, id: number}) {
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
    yield takeLatest(GET_NORMAL_TOURS_DETAIL_REQUEST, requestGetTour);
  }
  
  export default getTour;