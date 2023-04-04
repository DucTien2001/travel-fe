import { API } from "configs/constants";
import api from "../configApi";
import { findAll } from 'models/enterprise/tourSchedule';

export class TourScheduleService {
  static async findAll(data: findAll): Promise<any> {
    return await api
      .get(API.ENTERPRISE.TOUR_SCHEDULE.DEFAULT, { params: data })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
