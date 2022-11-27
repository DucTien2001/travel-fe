import { API } from "configs/constants";
import api from "../configApi";

export class HotelService {
  static async getAllHotels(): Promise<any> {
    return await api
      .get(API.NORMAL.HOTEL.ALL_HOTELS)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async getHotel(hotelId: number): Promise<any> {
    return await api
      .get(API.NORMAL.HOTEL.DETAIL_HOTEL.replace(":id", `${hotelId}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async searchHotels(name: string): Promise<any> {
    return await api
      .get(API.NORMAL.HOTEL.SEARCH_HOTELS.replace(":name", `${name}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
