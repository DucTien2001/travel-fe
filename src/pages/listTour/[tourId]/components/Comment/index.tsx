import React, { memo, useEffect, useState } from "react";
// reactstrap components
import { Container } from "reactstrap";

import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import { Comment, FindAllComment } from "models/comment";

import PopupAddTourComment from "../PopupAddTourComment";
import { ReducerType } from "redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import { CommentService } from "services/normal/comment";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import {
  useMediaQuery,
  useTheme,
  Grid,
  IconButton,
  MenuItem,
  Box,
  Menu,
  Pagination,
} from "@mui/material";
import Stars from "components/Stars";
import { getRateComment } from "utils/getOption";
import { TourBill } from "models/tourBill";
import { DataPagination, EServiceType } from "models/general";
import { TourBillService } from "services/normal/tourBill";

import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import useAuth from "hooks/useAuth";
import AddCommentIcon from "@mui/icons-material/AddComment";
import InputTextfield from "components/common/inputs/InputTextfield";

interface Props {
  comments?: Comment[];
  onGetTourComments?: () => void;
}

// eslint-disable-next-line react/display-name
const Comments = memo(({ comments, onGetTourComments }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const tourId = Number(router.query.tourId.slice(1));
  const { allTourBills } = useSelector((state: ReducerType) => state.normal);

  const [itemAction, setItemAction] = useState<Comment>();
  const [openPopupAddComment, setOpenPopupAddComment] = useState(false);
  const [openPopupConfirmDelete, setOpenPopupConfirmDelete] = useState(false);
  const [isAddComment, setIsAddComment] = useState(false);
  const [actionAnchor, setActionAnchor] = useState<null | HTMLElement>(null);
  const [data, setData] = useState<DataPagination<Comment>>();
  const [lastedBill, setLastedBill] = useState<TourBill>(null);
  const [comment, setComment] = useState<Comment>(null);
  const [commentDelete, setCommentDelete] = useState<Comment>(null);
  const [reply, setReply] = useState(null);
  const [contentReply, setContentReply] = useState("");
  const [replyDelete, setReplyDelete] = useState(null);
  const [replyEdit, setReplyEdit] = useState(null);

  const sortDataByDate = (first, second) =>
    Number(Date.parse(second)) - Number(Date.parse(first));

  const onToggleAddComment = () => {
    setComment(null);
    setOpenPopupAddComment(!openPopupAddComment);
  };

  const onTogglePopupConfirmDelete = () => {
    setOpenPopupConfirmDelete(!openPopupConfirmDelete);
  };

  const handleAction = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: Comment
  ) => {
    setItemAction(item);
    setActionAnchor(event.currentTarget);
  };

  const onCloseActionMenu = () => {
    setItemAction(null);
    setActionAnchor(null);
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
    fetchData({
      page: newPage + 1,
    });
  };

  const fetchData = (value?: {
    serviceId?: number;
    serviceType?: number;
    take?: number;
    page?: number;
    keyword?: string;
  }) => {
    const params: FindAllComment = {
      serviceId: tourId,
      serviceType: EServiceType?.TOUR,
      take: value?.take || data?.meta?.take || 10,
      page: value?.page || data?.meta?.page || 1,
      keyword: "",
    };
    if (value?.keyword !== undefined) {
      params.keyword = value.keyword || undefined;
    }
    dispatch(setLoading(true));
    CommentService.findAll(params)
      .then((res) => {
        setData({
          data: res.data.sort(sortDataByDate),
          meta: res.meta,
        });
      })
      .catch((e) => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)));
  };

  const onRate = (data) => {
    dispatch(setLoading(true));
    if (comment) {
      CommentService?.updateCommentTour(comment?.id, data)
        .then(() => {
          dispatch(setSuccessMess("Update rating successfully"));
          onToggleAddComment();
          fetchData();
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    } else {
      CommentService?.createCommentTour(data)
        .then(() => {
          dispatch(setSuccessMess("Rating successfully"));
          onToggleAddComment();
          fetchData();
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };

  const onUpdateComment = () => {
    onToggleAddComment();
    onCloseActionMenu();
    setComment(itemAction);
  };

  const onDelete = () => {
    onTogglePopupConfirmDelete();
    onCloseActionMenu();
    setCommentDelete(itemAction);
  };

  const onYesDelete = () => {
    dispatch(setLoading(true));
    if (replyDelete) {
      CommentService.deleteCommentTour(replyDelete?.id)
        .then(() => {
          dispatch(setSuccessMess("Delete reply successfully"));
          onTogglePopupConfirmDelete();
          fetchData();
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    } else {
      CommentService.deleteCommentTour(commentDelete?.id)
        .then(() => {
          dispatch(setSuccessMess("Delete comment successfully"));
          onTogglePopupConfirmDelete();
          fetchData();
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };

  const onOpenReply = () => {
    setReply(itemAction);
    onCloseActionMenu();
  };

  const onDeleteReply = (e, item) => {
    setReplyDelete(item);
    onTogglePopupConfirmDelete();
    onCloseActionMenu();
  };

  const onUpdateReply = (e, reply) => {
    setReplyEdit(reply);
  };

  const onPostReply = () => {
    if (replyEdit) {
      CommentService.updateReplyTourComment(replyEdit?.id, {
        content: contentReply,
      })
        .then(() => {
          dispatch(setSuccessMess("Update reply successfully"));
          setReplyEdit(null);
          fetchData();
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    } else {
      CommentService.replyTourComment({
        commentId: reply?.id,
        content: contentReply,
      })
        .then(() => {
          dispatch(setSuccessMess("Reply successfully"));
          setReply(null);
          fetchData();
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };

  useEffect(() => {
    fetchData();
    if (user) {
      TourBillService.getLastedTourBill(tourId)
        .then((res) => {
          setLastedBill(res?.data);
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        });
    }
  }, []);

  useEffect(() => {
    if (replyEdit) {
      setContentReply(replyEdit?.content);
    }
  }, [replyEdit]);

  useEffect(() => {
    allTourBills.forEach((item) => {
      if (item.tourId === tourId && item.verifyCode === null) {
        setIsAddComment(!isAddComment);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTourBills]);
  return (
    <Grid className={classes.root}>
      <Container className={classes.container}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Grid className={classes.titleHeader}>
          <h2 className={classes.title}>CUSTOMER&lsquo;S FEEDBACKS</h2>
          {lastedBill && (
            <Button btnType={BtnType.Primary} onClick={onToggleAddComment}>
              Add Comment
            </Button>
          )}
        </Grid>
        <p className={classes.subTitle}>
          Travelix customer(s) have a lot to say about their experiences:
        </p>
        {data?.data.length ? (
          data?.data?.map((item, index) => (
            <Grid
              key={index}
              container
              sx={{ borderTop: "1px solid var(--gray-40)", padding: "16px 0" }}
            >
              <Grid xs={3} item className={classes.boxAvatar}>
                {item?.reviewer?.avatar ? (
                  <Grid>
                    <img alt="" src={item?.reviewer?.avatar} />
                  </Grid>
                ) : (
                  <Grid>
                    <img
                      alt=""
                      src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                    />
                  </Grid>
                )}
                <p>
                  {item?.reviewer?.lastName} {item?.reviewer?.firstName}
                </p>
              </Grid>
              <Grid xs={9} item>
                <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Grid className={classes.boxRate}>
                    <Stars numberOfStars={5} />
                    <p className={classes.textRate}>{getRateComment(5)}</p>
                    <p className={classes.textTime}>
                      {moment(item?.createdAt).format("DD-MM-YYYY")}
                    </p>
                  </Grid>
                  <Grid>
                    <IconButton
                      onClick={(e) => {
                        handleAction(e, item);
                      }}
                    >
                      <MoreVertIcon
                        sx={{
                          fontSize: "28px",
                          color: "var(--primary-color)",
                        }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid className={classes.boxComment}>
                  <p>{item?.content}</p>
                </Grid>
                {item?.images?.length ? (
                  <ul className={classes.boxImg}>
                    {item?.images?.map((img, index) => (
                      <li className={classes.boxItemImg} key={index}>
                        <Grid className={classes.overLay}></Grid>
                        <img alt="" src={img} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No image</p>
                )}
                {reply?.id === item?.id && (
                  <Grid>
                    <InputTextfield
                      placeholder="Your comment"
                      multiline
                      rows={3}
                      onChange={(e) => {
                        setContentReply(e?.target?.value);
                      }}
                    />
                    <Grid className={classes.btnPostReply}>
                      <Button
                        btnType={BtnType?.Secondary}
                        className="mr-2"
                        onClick={() => setReply(null)}
                      >
                        Cancel
                      </Button>
                      <Button btnType={BtnType?.Primary} onClick={onPostReply}>
                        Post
                      </Button>
                    </Grid>
                  </Grid>
                )}
                {item?.replies?.map((reply, index) => (
                  <>
                    <Grid className={classes.boxCommentReply} key={index}>
                      <Grid
                        className={classes.boxAvatar}
                        sx={{
                          display: "flex",
                          alignItems: "center !important",
                        }}
                      >
                        {reply?.reviewer?.avatar ? (
                          <Grid>
                            <img alt="" src={reply?.reviewer?.avatar} />
                          </Grid>
                        ) : (
                          <Grid>
                            <img
                              alt=""
                              src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                            />
                          </Grid>
                        )}
                        <p>
                          {reply?.reviewer?.lastName}{" "}
                          {reply?.reviewer?.firstName}
                        </p>
                      </Grid>
                      <p className={classes.dateReply}>
                        {moment(item?.createdAt).format("DD-MM-YYYY")}
                      </p>
                      {user && user?.id === reply?.userId && (
                        <Grid>
                          <IconButton onClick={(e) => onUpdateReply(e, reply)}>
                            <EditOutlined
                              sx={{
                                fontSize: "28px",
                              }}
                            />
                          </IconButton>
                        </Grid>
                      )}
                      {user && user?.id === reply?.userId && (
                        <Grid>
                          <IconButton onClick={(e) => onDeleteReply(e, reply)}>
                            <DeleteOutlineOutlined
                              fontSize="small"
                              color="error"
                            />
                          </IconButton>
                        </Grid>
                      )}
                    </Grid>
                    {replyEdit?.id === reply?.id ? (
                      <Grid>
                        <InputTextfield
                          placeholder="Your comment"
                          multiline
                          rows={3}
                          value={contentReply}
                          onChange={(e) => {
                            setContentReply(e?.target?.value);
                          }}
                        />
                        <Grid className={classes.btnPostReply}>
                          <Button
                            btnType={BtnType?.Secondary}
                            className="mr-2"
                            onClick={() => setReplyEdit(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            btnType={BtnType?.Primary}
                            onClick={onPostReply}
                          >
                            Post
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid>
                        <p className={classes.contentReply}>{reply?.content}</p>
                      </Grid>
                    )}
                  </>
                ))}
              </Grid>
            </Grid>
          ))
        ) : (
          <Grid
            container
            sx={{ borderTop: "1px solid var(--gray-40)", padding: "16px 0" }}
          >
            <Grid xs={3} item className={classes.boxAvatar}>
              <p>No comment</p>
            </Grid>
          </Grid>
        )}

        <Grid className={classes.boxViewMore}>
          {/* <Button btnType={BtnType.Primary}>See More</Button>
           */}
          <Pagination
            count={data?.meta?.itemCount || 0}
            page={data?.meta?.page ? data?.meta?.page - 1 : 0}
            shape="rounded"
            onChange={handleChangePage}
          />
        </Grid>

        <Menu
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          anchorEl={actionAnchor}
          keepMounted
          open={Boolean(actionAnchor)}
          onClose={onCloseActionMenu}
        >
          {user && user?.id === itemAction?.userId && (
            <>
              <MenuItem
                sx={{ fontSize: "0.875rem" }}
                className={classes.menuItem}
                onClick={onUpdateComment}
              >
                <Box display="flex" alignItems={"center"}>
                  <EditOutlined
                    sx={{ marginRight: "0.25rem" }}
                    fontSize="small"
                  />
                  <span>Update</span>
                </Box>
              </MenuItem>
              <MenuItem
                sx={{ fontSize: "0.875rem" }}
                className={classes.menuItem}
                onClick={onDelete}
              >
                <Box display="flex" alignItems={"center"}>
                  <DeleteOutlineOutlined
                    sx={{ marginRight: "0.25rem" }}
                    fontSize="small"
                    color="error"
                  />
                  <span>Delete</span>
                </Box>
              </MenuItem>
            </>
          )}
          {user ? (
            <MenuItem
              sx={{ fontSize: "0.875rem" }}
              className={classes.menuItem}
              onClick={onOpenReply}
            >
              <Box display="flex" alignItems={"center"}>
                <AddCommentIcon
                  sx={{ marginRight: "0.25rem" }}
                  fontSize="small"
                  color="info"
                />
                <span>Reply</span>
              </Box>
            </MenuItem>
          ) : (
            <MenuItem
              sx={{ fontSize: "0.875rem" }}
              className={classes.menuItem}
              onClick={() => {
                router?.push("/auth/login");
              }}
            >
              <Box display="flex" alignItems={"center"}>
                <AddCommentIcon
                  sx={{ marginRight: "0.25rem" }}
                  fontSize="small"
                  color="info"
                />
                <span>Reply</span>
              </Box>
            </MenuItem>
          )}
        </Menu>
        <PopupAddTourComment
          isOpen={openPopupAddComment}
          toggle={onToggleAddComment}
          tourBill={lastedBill}
          onSubmit={onRate}
          commentEdit={comment}
        />
        <PopupConfirmDelete
          title="Are you sure delete this comment?"
          isOpen={openPopupConfirmDelete}
          onClose={onTogglePopupConfirmDelete}
          toggle={onTogglePopupConfirmDelete}
          onYes={onYesDelete}
        />
      </Container>
    </Grid>
  );
});

export default Comments;
