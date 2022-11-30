import { API } from "configs/constants";
import {
  ICreateHotelComment,
  IGetAllTourComments,
  IReplyHotelComment,
  IReplyTourComment,
  IUpdateHotelComment,
} from "models/comment";
import api from "services/configApi";

export class CommentService {
  static async getAllTourComments(data: IGetAllTourComments): Promise<any> {
    return await api
      .post(API.ENTERPRISE.COMMENT.TOUR_COMMENT.GET_All_COMMENTS, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async replyTourComment(commentId: number, data: IReplyTourComment): Promise<any> {
    return await api
      .put(API.NORMAL.COMMENT.TOUR_COMMENT.REPLY.replace(":id", `${commentId}`), data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async getHotelComments(hotelId: number): Promise<any> {
    return await api
      .get(API.NORMAL.COMMENT.HOTEL_COMMENT.GET_COMMENT.replace(":id", `${hotelId}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async createCommentHotel(data: ICreateHotelComment): Promise<any> {
    return await api
      .post(API.NORMAL.COMMENT.HOTEL_COMMENT.CREATE, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async updateCommentHotel(commentId: number, data: IUpdateHotelComment): Promise<any> {
    return await api
      .put(API.NORMAL.COMMENT.HOTEL_COMMENT.UPDATE.replace(":id", `${commentId}`), data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async deleteCommentHotel(commentId: number): Promise<any> {
    return await api
      .put(API.NORMAL.COMMENT.HOTEL_COMMENT.DELETE.replace(":id", `${commentId}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async replyHotelComment(commentId: number, data: IReplyHotelComment): Promise<any> {
    return await api
      .put(API.NORMAL.COMMENT.HOTEL_COMMENT.REPLY.replace(":id", `${commentId}`), data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
