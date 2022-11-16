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
}
