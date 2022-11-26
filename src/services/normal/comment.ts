import { API } from "configs/constants";
import { ICreateTourComment, IUpdateTourComment } from "models/comment";
import api from "services/configApi";

export class CommentService {
  static async getTourComments(tourId: number): Promise<any> {
    return await api.get(API.NORMAL.COMMENT.TOUR_COMMENT.GET_COMMENT.replace(":id", `${tourId}`))
        .then((res) => {
          return Promise.resolve(res.data)
        })
        .catch((e) => {
          return Promise.reject(e?.response?.data);
        })
    }
    static async createCommentTour(data: ICreateTourComment): Promise<any> {
        return await api.post(API.NORMAL.COMMENT.TOUR_COMMENT.CREATE, data)
          .then((res) => {
            return Promise.resolve(res.data)
          })
          .catch((e) => {
            return Promise.reject(e?.response?.data);
          })
      }
    static async updateCommentTour(commentId: number, data: IUpdateTourComment): Promise<any> {
        return await api.put(API.NORMAL.COMMENT.TOUR_COMMENT.UPDATE.replace(":id", `${commentId}`), data)
          .then((res) => {
            return Promise.resolve(res.data)
          })
          .catch((e) => {
            return Promise.reject(e?.response?.data);
          })
      }
}