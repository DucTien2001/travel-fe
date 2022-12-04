import { API } from "configs/constants";
import { IVerifySignup, LoginForm, User, RegisterForm, ChangePassForgotForm, UpdateUserProfile, ChangePassword } from "models/user";
import api from "services/configApi";

export class UserService {
  static async getAllUserProfiles(): Promise<any> {
    return await api.get(API.ADMIN.USER.ALL_PROFILES)
      .then((res) => {
        return Promise.resolve(res.data.data)
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      })
  }
}
