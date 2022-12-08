import { API } from "configs/constants";
import { Tour } from "models/tour";
import api from "services/configApi";

export class TourService {
  static async getAllTours(): Promise<any> {
    return await api
      .get(API.NORMAL.TOUR.ALL_TOURS)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async getTour(id: number): Promise<any> {
    return await api
      .get(API.NORMAL.TOUR.DETAIL_TOUR.replace(":id", `${id}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async searchTours(name: string): Promise<any> {
    return await api
      .get(API.NORMAL.TOUR.SEARCH_TOURS.replace(":name", `${name}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async searchLocationTours(location: string): Promise<any> {
    return await api
      .get(API.NORMAL.TOUR.SEARCH_LOCATION_TOURS.replace(":location", `${location}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async getAllToursByPage(page: number): Promise<any> {
    return await api
      .get(API.NORMAL.TOUR.GET_ALL_TOURS_BY_PAGE.replace(":page", `${page}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
