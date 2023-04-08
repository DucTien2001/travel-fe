import { API } from "configs/constants";
import api from "../configApi";
import { FindAll, Policy } from "models/enterprise/policy";

export class PolicyService {
    static async createOrUpdatePolicy(data: Policy[]): Promise<any> {
        return await api
          .put(API.ENTERPRISE.POLICY.DEFAULT, data)
          .then((res) => {
            return Promise.resolve(res.data);
          })
          .catch((e) => {
            return Promise.reject(e?.response?.data);
          });
      }
    
      static async getAllPolicy(data: FindAll): Promise<any> {
        return await api
          .get(API.ENTERPRISE.POLICY.GET_ALL_POLICY, { params: data })
          .then((res) => {
            return Promise.resolve(res.data);
          })
          .catch((e) => {
            return Promise.reject(e?.response?.data);
          });
      }
}
