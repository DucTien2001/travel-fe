import { API } from "configs/constants";
import { IHotelsRevenueByMonth, IHotelsRevenueByYear } from "models/roomBill";
import api from "services/configApi";

export class RoomBillService {
  static async getRevenueOfHotelsByMonth(data: IHotelsRevenueByMonth): Promise<any> {
    return await api
      .post(API.ENTERPRISE.ROOMBILL.GET_HOTELS_REVENUE_BY_MONTH, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  
  static async getRevenueOfHotelsByYear(data: IHotelsRevenueByYear): Promise<any> {
    return await api
      .post(API.ENTERPRISE.ROOMBILL.GET_HOTELS_REVENUE_BY_YEAR, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  
  static async getAllBillOfAnyRoom(roomId: number): Promise<any> {
    return await api
      .get(API.ENTERPRISE.ROOMBILL.GET_ALL_BILLS_OF_ANY_ROOM.replace(":id", `${roomId}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
