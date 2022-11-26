import React, {memo, useEffect, useState} from "react";
import SectionHeader from "components/Header/SectionHeader";
import {images} from "configs/images";
import SectionTour from "./components/SectionTour";
import Comment from "./components/Comment";
import GoogleMapBody from "./components/GoogleMapBody";
import RelatedTour from "./components/RelatedTour";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { useRouter } from "next/router";
import { TourService } from "services/normal/tour";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "reactstrap";
import { faFaceFrown } from '@fortawesome/free-regular-svg-icons';
import { CommentService } from "services/normal/comment";

// eslint-disable-next-line react/display-name
const ProductPage = memo(()=> {
  const dispatch = useDispatch();
  const router = useRouter()
  const [tour, setTour] = useState<any>();
  const [listComment, setListComment] = useState([]);
  const tourId = Number(router.query.tourId.slice(1));
  useEffect(() => {
    if(router){
      TourService.getTour(Number(router.query.tourId.slice(1))).
      then((res) => {
        setTour(res.data);
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);


  useEffect(() => {
    dispatch(setLoading(true));
    CommentService.getTourComments(tourId)
    .then((res) => {
        setListComment(res.data);
    })
    .catch((e) => {
        dispatch(setErrorMess(e));
    })
    .finally(() => {
        dispatch(setLoading(false));
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch]);

  const getTourComments = () => {
    CommentService.getTourComments(tourId)
    .then((res) => {
        setListComment(res.data);
    })
    .catch((e) => {
        dispatch(setErrorMess(e));
    })
    .finally(() => {
        dispatch(setLoading(false));
    })
  }

  useEffect(() => {
    getTourComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])


  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
        <SectionHeader
          title="VIEW TOUR"
          src={images.bgUser.src}
          className={ tour?.isTemporarilyStopWorking ? classes.sectionHeader : ""}
          /> 
        {tour?.isTemporarilyStopWorking ? (
          <Container className={classes.boxStopWorking}>
            <h3>Sorry, our service is temporarily in active use </h3>
            <FontAwesomeIcon icon={faFaceFrown}/>
          </Container>
        ) : (
          <>
          <SectionTour tour={tour}/> 
          <div className={classes.containerComment}>
            <Comment comments={listComment} onGetTourComments={getTourComments}/>
          </div>
          {/* <GoogleMapBody/>
          <RelatedTour/>  */}
          </>
        )}
      </div>
    </>
  );
})

export default ProductPage;
