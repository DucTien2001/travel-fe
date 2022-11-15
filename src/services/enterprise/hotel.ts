import { API } from "configs/constants";
import { ETour, EUpdateTour } from "models/enterprise";
import { ICreateHotel } from "models/hotel";
import api from "../configApi";

export class HotelService {
  static async createHotel(data: ICreateHotel): Promise<any> {
    return await api
      .post(API.ENTERPRISE.HOTEL.CREATE_HOTEL, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async updateTour(tourId: number, data: EUpdateTour): Promise<any> {
    return await api
      .put(API.ENTERPRISE.TOUR.UPDATE_TOUR.replace(":id", `${tourId}`), data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async getHotels(userId: number): Promise<any> {
    return await api
      .get(API.ENTERPRISE.HOTEL.GET_HOTELS.replace(":id", `${userId}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
