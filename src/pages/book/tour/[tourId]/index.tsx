import React, {memo, useEffect, useState} from "react";
import SectionHeader from "components/Header/SectionHeader";
import {images} from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import DetailTour from "./components/DetailTour";
import DetailCustomer from "./components/DetailCustomer";
import {
  Container, 
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { TourService } from "services/normal/tour";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";

// eslint-disable-next-line react/display-name
const BookTour = memo(()=> {
  const dispatch = useDispatch();
  const router = useRouter()
  const [tour, setTour] = useState<any>();
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
  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
        <SectionHeader
        className={classes.sectionHeader}
        title="BOOK TOUR"
        src={images.pricing1.src}
        />
        <Container>
            <Row className={classes.root}>
                <Col xs={4} className={classes.boxLeft}>
                  <DetailTour tour={tour}/>
                </Col>
                <Col xs={8} className={classes.boxRight}>
                  <DetailCustomer tour={tour}/>
                </Col>
            </Row>
        </Container>    
      </div>
    </>
  );
})

export default BookTour;
