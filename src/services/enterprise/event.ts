import { API } from "configs/constants";
import api from "../configApi";
import { Create, FindAll, Update } from "models/enterprise/event";

export class EventService {
  static async findAll(data: FindAll): Promise<any> {
    return await api
      .get(API.ENTERPRISE.EVENT.DEFAULT, { params: data })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  
  static async findOne(id: number, language?: string): Promise<any> {
    return await api
      .get(`${API.ENTERPRISE.EVENT.DEFAULT}/${id}`, {
        params: {
          language
        }
      })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async create(data: FormData): Promise<any> {
    return await api
      .post(API.ENTERPRISE.EVENT.DEFAULT, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async update(id: number, data: FormData): Promise<any> {
    return await api
      .put(`${API.ENTERPRISE.EVENT.DEFAULT}/${id}`, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async delete(id: number): Promise<any> {
    return await api
      .delete(API.ENTERPRISE.EVENT.DELETE_EVENT.replace(":id", `${id}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
