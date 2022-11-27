import { API } from "configs/constants";
import { ETour, EUpdateTour } from "models/enterprise";
import api from "../configApi";

export class TourService {
    static async createTour(data: ETour): Promise<any> {
        return await api.post(API.ENTERPRISE.TOUR.CREATE_TOUR, data)
          .then((res) => {
            return Promise.resolve(res.data)
          })
          .catch((e) => {
            return Promise.reject(e?.response?.data);
          })
      }

    static async updateTour(tourId: number, data: EUpdateTour): Promise<any> {
        return await api.put(API.ENTERPRISE.TOUR.UPDATE_TOUR.replace(":id", `${tourId}`), data)
          .then((res) => {
            return Promise.resolve(res.data)
          })
          .catch((e) => {
            return Promise.reject(e?.response?.data);
          })
    }

    static async delete(tourId: number): Promise<any> {
      return await api.put(API.ENTERPRISE.TOUR.DELETE_TOUR.replace(":id", `${tourId}`))
        .then((res) => {
          return Promise.resolve(res.data)
        })
        .catch((e) => {
          return Promise.reject(e?.response?.data);
        })
  }
    
    static async getTours(userId: number): Promise<any> {
      return await api.get(API.ENTERPRISE.TOUR.GET_TOURS.replace(":id", `${userId}`))
        .then((res) => {
          return Promise.resolve(res.data)
        })
        .catch((e) => {
          return Promise.reject(e?.response?.data);
        })
  }
}