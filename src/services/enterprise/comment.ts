import { API } from "configs/constants";
import {
  ICreateHotelComment,
  IGetAllHotelComments,
  IGetAllTourComments,
  IReplyHotelComment,
  // IReplyTourComment,
  IRequestDeleteHotelComment,
  IRequestDeleteTourComment,
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

  static async replyTourComment(commentId: number, data: IGetAllTourComments): Promise<any> {
    return await api
      .put(API.ENTERPRISE.COMMENT.TOUR_COMMENT.REPLY.replace(":id", `${commentId}`), data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async requestDeleteTourComment(commentId: number, data: IRequestDeleteTourComment): Promise<any> {
    return await api
      .put(API.ENTERPRISE.COMMENT.TOUR_COMMENT.REQUEST_DELETE.replace(":id", `${commentId}`), data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async deleteCommentTour(commentId: number): Promise<any> {
    return await api
      .put(API.ENTERPRISE.COMMENT.TOUR_COMMENT.DELETE.replace(":id", `${commentId}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async getAllHotelComments(data: IGetAllHotelComments): Promise<any> {
    return await api
      .post(API.ENTERPRISE.COMMENT.HOTEL_COMMENT.GET_All_COMMENTS, data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async deleteCommentHotel(commentId: number): Promise<any> {
    return await api
      .put(API.ENTERPRISE.COMMENT.HOTEL_COMMENT.DELETE.replace(":id", `${commentId}`))
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async replyHotelComment(commentId: number, data: IReplyHotelComment): Promise<any> {
    return await api
      .put(API.ENTERPRISE.COMMENT.HOTEL_COMMENT.REPLY.replace(":id", `${commentId}`), data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }

  static async requestDeleteHotelComment(commentId: number, data: IRequestDeleteHotelComment): Promise<any> {
    return await api
      .put(API.ENTERPRISE.COMMENT.HOTEL_COMMENT.REQUEST_DELETE.replace(":id", `${commentId}`), data)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data);
      });
  }
}
