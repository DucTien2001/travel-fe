import { call, put, takeLatest } from "redux-saga/effects";
import { GET_NORMAL_HOTELS_REQUEST, setAllHotelsReducer } from "redux/reducers/Normal/actionTypes";
import { setLoading } from "redux/reducers/Status/actionTypes";
import { HotelService } from "services/normal/hotel";

function* requestGetAllHotels() {
    try {
      yield put(setLoading(true));
      const hotels = yield call(HotelService.getAllHotels);
      yield put(setAllHotelsReducer(hotels?.data));
    } catch (e: any) {
      console.log(e);
    } finally {
      yield put(setLoading(false));
    }
  }
  
  function* getAllHotels() {
    yield takeLatest(GET_NORMAL_HOTELS_REQUEST, requestGetAllHotels);
  }
  
  export default getAllHotels;