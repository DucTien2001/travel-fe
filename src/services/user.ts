import { API } from "configs/constants";
import { IVerifySignup, LoginForm, User, RegisterForm } from "models/user";
import api from "./configApi";

export class UserService {
  static async login(data: LoginForm): Promise<any> {
    return await api
      .post(API.AUTH.LOGIN, data)
      .then((res) => {
        return Promise.resolve(res.data.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async getMe(): Promise<User> {
    return await api
      .get(API.AUTH.ME)
      .then((res) => {
        return Promise.resolve(res.data.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async register(data: RegisterForm) {
    return await api
      .post(API.AUTH.REGISTER, data)
      .then((res) => {
        return Promise.resolve(res.data.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async verifySignup(data: IVerifySignup): Promise<any> {
    return await api
      .post(API.AUTH.SEND_VERIFY_SIGNUP, data)
      .then((res) => {
        return Promise.resolve(res.data.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
