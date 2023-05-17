import { API } from "configs/constants";
import { GetAllBillOfOneTourOnSale, StatisticByTour, StatisticByTourOnSale, StatisticByUser } from "models/admin/tourBill";
import api from "services/configApi";

export class TourBillService {
  static async statisticByUser(data: StatisticByUser): Promise<any> {
    return await api
      .get(API.ADMIN.STATISTIC.TOUR.DEFAULT, {params: data})
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async statisticByTour(enterpriseId: number, data: StatisticByTour): Promise<any>{
    return await api
      .get(API.ADMIN.STATISTIC.TOUR.GET_TOUR.replace(":id", `${enterpriseId}`), {params: data})
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async statisticByTourOnSale(tourId: number, data: StatisticByTourOnSale): Promise<any>{
    return await api
      .get(API.ADMIN.STATISTIC.TOUR.GET_TOUR_ON_SALE.replace(":id", `${tourId}`), {params: data})
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async getAllBillOfOneTourOnSale(tourOnSaleId: number, data: GetAllBillOfOneTourOnSale): Promise<any>{
    return await api
      .get(API.ADMIN.STATISTIC.TOUR.GET_TOUR_ON_SALE_BILL.replace(":id", `${tourOnSaleId}`), {params: data})
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
