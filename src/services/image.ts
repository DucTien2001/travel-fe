import axios from "axios";
import { API } from "configs/constants";
import { Tour } from "models/tour";
import api from "./configApi";

export class ImageService {
  static async uploadImagesTour(data: any): Promise<any> {
    return await axios
      .post("https://api.cloudinary.com/v1_1/dpvvffyul/image/upload", data, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      })
      .then((res) => {
        // console.log
        return Promise.resolve(res?.data?.secure_url);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }
}
