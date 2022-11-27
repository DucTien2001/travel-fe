import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ROOM_BILLS_REQUEST, setAllRoomBillsReducer } from "redux/reducers/Normal/actionTypes";
import { setLoading } from "redux/reducers/Status/actionTypes";
import { RoomBillService } from "services/normal/roomBill";

function* requestGetAllRoomBills(data: {type: string, userId: number}) {
    try {
      yield put(setLoading(true));
      const roomBills = yield call(RoomBillService.getAllRoomBills, data.userId);
      yield put(setAllRoomBillsReducer(roomBills?.data));
    } catch (e: any) {
      console.log(e);
    } finally {
      yield put(setLoading(false));
    }
  }
  
  function* getAllRoomBills() {
    yield takeLatest(GET_ROOM_BILLS_REQUEST, requestGetAllRoomBills);
  }
  
  export default getAllRoomBills;