import { API } from "configs/constants";
import { IToursRevenueByMonth, IToursRevenueByYear, IVerifyBookTour, TourBill } from "models/tourBill";
import api from "services/configApi";

export class TourBillService {
  static async getRevenueOfToursByMonth(data: IToursRevenueByMonth): Promise<any> {
    return await api
      .post(API.ENTERPRISE.TOURBILL.GET_TOURS_REVENUE_BY_MONTH, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  
  static async getRevenueOfToursByYear(data: IToursRevenueByYear): Promise<any> {
    return await api
      .post(API.ENTERPRISE.TOURBILL.GET_TOURS_REVENUE_BY_YEAR, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
  static async getAllBillOfAnyTour(tourId: number): Promise<any> {
    return await api
      .get(API.ENTERPRISE.TOURBILL.GET_ALL_BILLS_OF_ANY_TOUR.replace(":id", `${tourId}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
