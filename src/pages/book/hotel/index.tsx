import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import { NextPage } from "next";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import SectionHeader from "components/Header/SectionHeader";
import DetailCustomer from "./components/DetailCustomer";
import DetailRoom from "./components/DetailRoom";
import { ReducerType } from "redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { HotelService } from "services/normal/hotel";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";


const Room : NextPage = () => {
  const {roomBillConfirm} = useSelector((state: ReducerType) => state.normal);
    return (
        <div className={clsx("wrapper", classes.root)}>
        <SectionHeader
        className={classes.sectionHeader}
        title="BOOK ROOM"
        src={images.pricing2.src}
        />
        <Container>
            <Row className={classes.root}>
                <Col xs={4} className={classes.boxLeft}>
                  <DetailRoom roomBillConfirm={roomBillConfirm}/>
                </Col>
                <Col xs={8} className={classes.boxRight}>
                  <DetailCustomer roomBillConfirm={roomBillConfirm}/>
                </Col>
            </Row>
        </Container>    
      </div>
    )
}

export default Room;
