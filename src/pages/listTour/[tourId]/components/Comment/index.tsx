import React, { memo, useEffect, useState } from "react";
// reactstrap components
import { Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import { Comment } from "models/comment";
import CardComment from "../CardComments";
import PopupAddTourComment from "../PopupAddTourComment";
import { ReducerType } from "redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Warning from "components/common/warning";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import { CommentService } from "services/normal/comment";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { Tour } from "models/tour";
import clsx from "clsx";
import { useMediaQuery, useTheme, Grid } from "@mui/material";
import Stars from "components/Stars";
import { getRateComment } from "utils/getOption";
interface Props {
  comments?: Comment[];
  tour: Tour;
  onGetTourComments?: () => void;
}

// eslint-disable-next-line react/display-name
const Comments = memo(({ comments, tour, onGetTourComments }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const tourId = Number(router.query.tourId.slice(1));
  const { allTourBills } = useSelector((state: ReducerType) => state.normal);

  const [openPopupAddComment, setOpenPopupAddComment] = useState(false);
  const [isAddComment, setIsAddComment] = useState(false);
  const [commentAction, setCommentAction] = useState<Comment>(null);
  const [commentDelete, setCommentDelete] = useState<Comment>(null);
  const [commentEdit, setCommentEdit] = useState(null);

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
    CommentService.deleteCommentTour(commentDelete?.id)
      .then(() => {
        onGetTourComments();
      })
      .catch((e) => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)));
  };

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
        <h2 className={classes.title}>CUSTOMER'S FEEDBACKS</h2>
        <p className={classes.subTitle}>
          Travelix customer(s) have a lot to say about their experiences:
        </p>
        {/* <Swiper
          slidesPerView={isMobile ? 1 : 3}
          spaceBetween={30}
          slidesPerGroup={isMobile ? 1 : 3}
          loop={true}
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
                key={cmt.id}
                comment={cmt}
                onAction={onAction}
                onEdit={onEdit}
                onDelete={onDelete}
                tour={tour}
                onGetTourComments={onGetTourComments}
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
              {!isAddComment && <Warning content="You don't book this tour" />}
            </div>
          </div>
        </Row> */}
        <Grid
          container
          sx={{ borderTop: "1px solid var(--gray-40)", padding: "16px 0" }}
        >
          <Grid xs={3} item className={classes.boxAvatar}>
            <Grid>
              <img
                alt=""
                src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
              />
            </Grid>
            <p>Dinh Minh Khoi</p>
          </Grid>
          <Grid xs={9} item>
            <Grid className={classes.boxRate}>
              <Stars numberOfStars={5} />
              <p className={classes.textRate}>{getRateComment(5)}</p>
              <p className={classes.textTime}>21/2/2020</p>
            </Grid>
            <Grid className={classes.boxComment}>
              <p>Chuyen di that tuyet voi</p>
            </Grid>
            <ul className={classes.boxImg}>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
            </ul>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ borderTop: "1px solid var(--gray-40)", padding: "16px 0" }}
        >
          <Grid xs={3} item className={classes.boxAvatar}>
            <Grid>
              <img
                alt=""
                src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
              />
            </Grid>
            <p>Dinh Minh Khoi</p>
          </Grid>
          <Grid xs={9} item>
            <Grid className={classes.boxRate}>
              <Stars numberOfStars={5} />
              <p className={classes.textRate}>Tuyet voi</p>
              <p className={classes.textTime}>21/2/2020</p>
            </Grid>
            <Grid className={classes.boxComment}>
              <p>Chuyen di that tuyet voi</p>
            </Grid>
            <ul className={classes.boxImg}>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
              <li className={classes.boxItemImg}>
                <Grid className={classes.overLay}></Grid>
                <img
                  alt=""
                  src="https://res.cloudinary.com/dpvvffyul/image/upload/v1675930803/my-uploads/user_qcfigg.png"
                />
              </li>
            </ul>
          </Grid>
        </Grid>
        <Grid className={classes.boxViewMore}>
          <Button btnType={BtnType.Primary}>See More</Button>
        </Grid>
        <PopupAddTourComment
          isOpen={openPopupAddComment}
          commentEdit={commentEdit}
          onClose={onClosePopupAddComment}
          toggle={onClosePopupAddComment}
          onGetTourComments={onGetTourComments}
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
  );
});

export default Comments;
