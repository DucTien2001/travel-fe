import axios from "axios";
import { API } from "configs/constants";
import { Tour } from "models/tour";
import api from "./configApi";

export class ProvinceService {
  static async getProvince(): Promise<any> {
    return await axios
      .get(`https://vapi.vnappmob.com/api/province/`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }
  static async getDistrict(provinceId: number): Promise<any> {
    return await axios
      .get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }
  static async getCommune(districtId: number): Promise<any> {
    return await axios
      .get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }
}
