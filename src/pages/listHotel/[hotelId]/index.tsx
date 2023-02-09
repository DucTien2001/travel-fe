import React, { memo, useEffect, useState } from "react";
import SectionHeader from "components/Header/SectionHeader";
import { images } from "configs/images";
import SectionHotel from "./components/SectionHotel";
import CheckRoomEmpty from "./components/CheckRoomEmpty";
import Comment from "./components/Comment";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { useRouter } from "next/router";
import { HotelService } from "services/normal/hotel";
import { useDispatch } from "react-redux";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { CommentService } from "services/normal/comment";
import { Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";

interface Props {}
// eslint-disable-next-line react/display-name
const ProductPage = memo((Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [hotel, setHotel] = useState<any>();
  const hotelId = Number(router.query.hotelId.slice(1));
  const [listComment, setListComment] = useState([]);

  const getHotelComments = () => {
    CommentService.getHotelComments(hotelId)
      .then((res) => {
        setListComment(res.data);
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    if (router) {
      dispatch(setLoading(true));
      HotelService.getHotel(Number(router.query.hotelId.slice(1)))
        .then((res) => {
          setHotel(res.data);
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [router]);

  useEffect(() => {
    dispatch(setLoading(true));
    CommentService.getHotelComments(hotelId)
      .then((res) => {
        setListComment(res.data);
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    getHotelComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  console.log(listComment);
  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
        <SectionHeader title="VIEW HOTEL" src={images.bgUser.src} />
        {hotel?.isTemporarilyStopWorking || hotel?.isDeleted ? (
          <Container className={classes.boxStopWorking}>
            <h3>Sorry, our service is temporarily in active use </h3>
            <FontAwesomeIcon icon={faFaceFrown} />
          </Container>
        ) : (
          <>
            <SectionHotel hotel={hotel} />
            <div className={classes.container}>
              <CheckRoomEmpty hotel={hotel} />
              <Comment
                comments={listComment}
                onGetHotelComments={getHotelComments}
                hotel={hotel}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
});

export default ProductPage;
