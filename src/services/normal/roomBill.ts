import { API } from "configs/constants";
import { RoomBill } from "models/roomBill";
import api from "services/configApi";


export class RoomBillService {
    static async create(data: RoomBill): Promise<any> {
        return await api.post(API.NORMAL.ROOMBILL.CREATE, data)
          .then((res) => {
            return Promise.resolve(res.data)
          })
          .catch((e) => {
            return Promise.reject(e?.response?.data);
          })
      }
}