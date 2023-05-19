import { API } from "configs/constants";
import api from "../configApi";
import { NormalGetStay } from "models/stay";

export class StayService {
  static async findAll(data: NormalGetStay): Promise<any> {
    return await api
      .get(API.NORMAL.STAY.DEFAULT, { params: data })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
