import { API } from "configs/constants";
import { LoginForm } from "models/user";
import api from "./configApi";

export class UserService {
  static async login(data: LoginForm): Promise<any> {
    return await api.post(API.AUTH.LOGIN, data)
      .then((res) => {
        return Promise.resolve(res.data.data)
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      })
  }
}