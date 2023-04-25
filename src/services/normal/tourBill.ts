import { API } from "configs/constants";
import { Create, IVerifyBookTour, TourBill } from "models/tourBill";
import api from "services/configApi";

export class TourBillService {
    static async create(data: Create): Promise<any> {
        return await api.post(API.NORMAL.TOURBILL.CREATE, data)
          .then((res) => {
            return Promise.resolve(res.data)
          })
          .catch((e) => {
            return Promise.reject(e?.response?.data);
          })
      }
    static async getAllTourBills(userId: number): Promise<any> {
        return await api.get(API.NORMAL.TOURBILL.GET_ALL_TOURBILL.replace(":id", `${userId}`))
            .then((res) => {
              return Promise.resolve(res.data)
            })
            .catch((e) => {
              return Promise.reject(e?.response?.data);
            })
        }
    static async getTourBill(billId: number): Promise<any> {
        return await api.get(API.NORMAL.TOURBILL.GET_TOURBILL.replace(":id", `${billId}`))
          .then((res) => {
              return Promise.resolve(res.data)
          })
          .catch((e) => {
              return Promise.reject(e?.response?.data);
          })
    }
    static async verifyBookTour(data: IVerifyBookTour): Promise<any> {
      return await api
        .post(API.NORMAL.TOURBILL.VERIFY_BOOKTOUR, data)
        .then((res) => {
          return Promise.resolve(res.data.data);
        })
        .catch((e) => {
          return Promise.reject(e?.response?.data);
        });
    }
    static async cancelBookTour(billId: number): Promise<any> {
      return await api
        .put(API.NORMAL.TOURBILL.CANCEL_BOOK_TOUR.replace(":id", `${billId}`) )
        .then((res) => {
          return Promise.resolve(res.data.data);
        })
        .catch((e) => {
          return Promise.reject(e?.response?.data);
        });
    }
}