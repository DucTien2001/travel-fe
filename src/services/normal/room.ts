import { API } from "configs/constants";
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
}
