import { API } from "configs/constants";
import { EGetRoomsAvailable } from "models/enterprise";
import { EGetPrice } from "models/room";
import api from "../configApi";

export class RoomService {
  static async getAllRoomsOfHotel(hotelId: number): Promise<any> {
    return await api
      .get(API.NORMAL.ROOM.GET_ROOMS.replace(":id", `${hotelId}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async getAllRoomsAvailable(data: EGetRoomsAvailable): Promise<any> {
    return await api
      .post(API.NORMAL.ROOM.GET_ROOMS_AVAILABLE, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async getPrice(data: EGetPrice): Promise<any> {
    return await api
      .post(API.NORMAL.ROOM.GET_PRICE, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
