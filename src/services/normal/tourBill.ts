import { API } from "configs/constants";
import { TourBill } from "models/tourBill";
import api from "services/configApi";

export class TourBillService {
    static async create(data: TourBill): Promise<any> {
        return await api.post(API.NORMAL.TOURBILL.CREATE, data)
          .then((res) => {
            return Promise.resolve(res.data)
          })
          .catch((e) => {
            return Promise.reject(e?.response?.data);
          })
      }
}