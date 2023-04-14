import { API } from "configs/constants";
import api from "../configApi";
import { FindAll} from "models/enterprise/staff";

export class StaffService {
  static async findAll(data: FindAll): Promise<any> {
    return await api
      .get(API.ENTERPRISE.STAFF.DEFAULT, { params: data })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async sendOffer(email: string): Promise<any> {
    return await api
      .post(API.ENTERPRISE.STAFF.SEND_OFFER, email)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
