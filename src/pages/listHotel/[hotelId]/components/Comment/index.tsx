import React, { memo, useEffect, useState } from "react";
import Link from "next/link";
// reactstrap components
import { Container, Row, Col, Input, Media } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import { Comment } from "models/comment";
import CardComment from "../CardComments";
import PopupAddComment from "components/Popup/PopupAddComment";
import { IHotel, HOTEL_SECTION } from "models/hotel";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import { CommentService } from "services/normal/comment";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ReducerType } from "redux/reducers";
import PopupAddHotelComment from "../PopupAddHotelComment";
import Warning from "components/common/warning";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import clsx from "clsx";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
interface Props {
  comments: Comment[];
  hotel: IHotel;
  onGetHotelComments: () => void;
}

// eslint-disable-next-line react/display-name
const Comments = memo(({ comments, hotel, onGetHotelComments }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(768));
  const hotelId = Number(router.query.hotelId.slice(1));
  const [openPopupAddComment, setOpenPopupAddComment] = useState(false);
  const [commentAction, setCommentAction] = useState<Comment>(null);
  const [isAddComment, setIsAddComment] = useState(false);
  const [commentDelete, setCommentDelete] = useState<Comment>(null);
  const [commentEdit, setCommentEdit] = useState(null);
  const { allRoomBills } = useSelector((state: ReducerType) => state.normal);

  const onOpenPopupAddComment = () => setOpenPopupAddComment(true);

  const onAction = (e, comment: Comment) => {
    setCommentAction(comment);
  };

  const onEdit = () => {
    if (!commentAction) return;
    setCommentEdit(commentAction);
    onOpenPopupAddComment();
  };

  const onDelete = () => {
    if (!commentAction) return;
    setCommentDelete(commentAction);
  };

  const onClosePopupConfirmDelete = () => {
    if (!commentDelete) return;
    setCommentDelete(null);
  };

  const onClosePopupAddComment = () => {
    setOpenPopupAddComment(false);
    setCommentEdit(null);
  };

  const onYesDelete = () => {
    if (!commentDelete) return;
    onClosePopupConfirmDelete();
    dispatch(setLoading(true));
    CommentService.deleteCommentHotel(commentDelete?.id)
      .then(() => {
        onGetHotelComments();
      })
      .catch((e) => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)));
  };

  useEffect(() => {
    allRoomBills?.forEach((item) => {
      if (item.hotelId === hotelId && item.verifyCode === null) {
        setIsAddComment(!isAddComment);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRoomBills]);

  return (
    <>
      <Grid
        className={classes.root}
        sx={{ backgroundColor: "#f6f2f2", paddingTop: "24px" }}
        id={HOTEL_SECTION.section_reviews}
      >
        <Container>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <h3 className="text-center">CUSTOMER'S FEEDBACKS</h3>
          <Swiper
            slidesPerView={isMobile ? 1 : 3}
            spaceBetween={30}
            slidesPerGroup={isMobile ? 1 : 3}
            loop={true}
            initialSlide={0}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={clsx("mySwiper", classes.swiper)}
          >
            {comments?.map((cmt) => (
              <SwiperSlide key={cmt.id}>
                <CardComment
                  comment={cmt}
                  onAction={onAction}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  hotel={hotel}
                  onGetHotelComments={onGetHotelComments}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Row xs={3} className={classes.rowComment}>
            {!comments?.length && (
              <p className={classes.noComment}>There are no comments yet !</p>
            )}
          </Row>
          <Row className={classes.rowControl}>
            <div className={classes.btnContainer}>
              <div>
                <Button
                  btnType={BtnType.Primary}
                  onClick={onOpenPopupAddComment}
                  disabled={!isAddComment}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-1" />
                  Add comments
                </Button>
                {!isAddComment && (
                  <Warning content="You don't book this hotel" />
                )}
              </div>
            </div>
          </Row>
          <PopupAddHotelComment
            isOpen={openPopupAddComment}
            commentEdit={commentEdit}
            onClose={onClosePopupAddComment}
            toggle={onClosePopupAddComment}
            onGetTourComments={onGetHotelComments}
          />
          <PopupConfirmDelete
            title="Are you sure delete this comment?"
            isOpen={!!commentDelete}
            onClose={onClosePopupConfirmDelete}
            toggle={onClosePopupConfirmDelete}
            onYes={onYesDelete}
          />
        </Container>
      </Grid>
    </>
  );
});

export default Comments;
