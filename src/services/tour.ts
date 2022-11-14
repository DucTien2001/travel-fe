import { API } from "configs/constants";
import { Tour } from "models/tour";
import api from "./configApi";

export class TourService {
    static async getAllTours(): Promise<any> {
        return await api.get(API.TOUR.ALL_TOUR)
          .then((res) => {
            return Promise.resolve(res.data)
          })
          .catch((e) => {
            return Promise.reject(e?.response?.data);
          })
      }
}