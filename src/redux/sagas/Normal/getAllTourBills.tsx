import { call, put, takeLatest } from "redux-saga/effects";
import { GET_TOUR_BILLS_REQUEST, setAllTourBillsReducer } from "redux/reducers/Normal/actionTypes";
import { setLoading } from "redux/reducers/Status/actionTypes";
import { TourBillService } from "services/normal/tourBill";

function* requestGetAllTourBills(data: {type: string, userId: number}) {
    try {
      yield put(setLoading(true));
      const tourBills = yield call(TourBillService.getAllTourBills, data.userId);
      yield put(setAllTourBillsReducer(tourBills?.data));
    } catch (e: any) {
      console.log(e);
    } finally {
      yield put(setLoading(false));
    }
  }
  
  function* getAllTourBills() {
    yield takeLatest(GET_TOUR_BILLS_REQUEST, requestGetAllTourBills);
  }
  
  export default getAllTourBills;