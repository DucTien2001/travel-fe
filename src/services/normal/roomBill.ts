import { API } from "configs/constants";
import { ICreateRoomBill } from "models/roomBill";
import api from "services/configApi";


export class RoomBillService {
    static async create(data: ICreateRoomBill): Promise<any> {
        return await api.post(API.NORMAL.ROOMBILL.CREATE, data)
          .then((res) => {
            return Promise.resolve(res.data)
          })
          .catch((e) => {
            return Promise.reject(e?.response?.data);
          })
      }
    static async getAllRoomBills(userId: number): Promise<any> {
        return await api.get(API.NORMAL.ROOMBILL.GET_ALL_ROOMBILL.replace(":id", `${userId}`))
            .then((res) => {
              return Promise.resolve(res.data)
            })
            .catch((e) => {
              return Promise.reject(e?.response?.data);
            })
        }
}