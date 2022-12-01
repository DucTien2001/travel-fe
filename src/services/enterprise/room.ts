import { API } from "configs/constants";
import { ICreateRoom } from "models/room";
import api from "../configApi";

export class RoomService {
  static async createRoom(data: ICreateRoom): Promise<any> {
    return await api
      .post(API.ENTERPRISE.ROOM.CREATE_ROOM, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async getAllRooms(hotelId: number): Promise<any> {
    return await api
      .get(API.ENTERPRISE.ROOM.GET_ALL_ROOM.replace(":id", `${hotelId}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async updateInformation(roomId: number): Promise<any> {
    return await api
      .get(API.ENTERPRISE.ROOM.UPDATE_INFORMATION.replace(":id", `${roomId}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async deleteRoom(roomId: number): Promise<any> {
    return await api
      .get(API.ENTERPRISE.ROOM.DELETE.replace(":id", `${roomId}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
