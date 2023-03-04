import React, { memo, useEffect, useState } from "react";
import SectionHeader from "components/Header/SectionHeader";
import { images } from "configs/images";
import SectionHotel from "./components/SectionHotel";
import CheckRoomEmpty from "./components/CheckRoomEmpty";
import Comment from "./components/Comment";
import Location from "./components/Location";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { useRouter } from "next/router";
import { HotelService } from "services/normal/hotel";
import { useDispatch } from "react-redux";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { CommentService } from "services/normal/comment";
import { Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsUpToLine,
  faArrowTurnUp,
  faArrowUp,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";
import { HOTEL_SECTION } from "models/hotel";
import { Link } from "react-scroll";
import styled from "styled-components";

export enum ENavBar {
  Overview = 1,
  Location = 2,
  Rooms = 3,
  Reviews = 4,
  Facilities = 5,
}
const NavLink = styled(Link)`
  color: blue;
  &.active {
    border-bottom: 5px solid var(--primary-color);
  }
`;
interface Props {}
// eslint-disable-next-line react/display-name
const ProductPage = memo((Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [hotel, setHotel] = useState<any>();
  const hotelId = Number(router.query.hotelId.slice(1));
  const [listComment, setListComment] = useState([]);
  const [verticalTabs, setVerticalTabs] = React.useState(ENavBar.Overview);

  const onChangeTab = (type: ENavBar, id: string) => {
    switch (type) {
      case ENavBar.Overview:
        setVerticalTabs(ENavBar.Overview);
        // var scrollDiv = document.getElementById(id)?.offsetTop;
        // window.scrollTo({ top: scrollDiv, behavior: "smooth" });
        break;
      case ENavBar.Location:
        setVerticalTabs(ENavBar.Location);
        break;
      case ENavBar.Rooms:
        setVerticalTabs(ENavBar.Rooms);
        break;
      case ENavBar.Reviews:
        setVerticalTabs(ENavBar.Reviews);
        break;
      case ENavBar.Facilities:
        setVerticalTabs(ENavBar.Facilities);
        break;
      default:
        break;
    }
  };

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

  if (typeof window !== "undefined") {
    window.onscroll = function () {
      scrollFunction();
    };
  }

  function scrollFunction() {
    if (
      document.body.scrollTop > 150 ||
      document.documentElement.scrollTop > 150
    ) {
      if (document.getElementById("navbar") !== null) {
        document.getElementById("navbar").style.top = "55px";
        document.getElementById("navbar").style.display = "block";
      }
    } else {
      if (document.getElementById("navbar") !== null) {
        document.getElementById("navbar").style.top = "0px";
        document.getElementById("navbar").style.display = "none";
      }
    }
  }

  const [changeTab, setChangeTab] = useState(false);
  const handleChangeTab = () => setChangeTab(!changeTab);
  const closeMenu = () => setChangeTab(false);

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
            <div className={classes.navbar} id="navbar">
              <Container className={classes.containerNav}>
                <div className={classes.listNav}>
                  <div className={classes.navItem}>
                    <NavLink
                      to={`${HOTEL_SECTION.section_overview}`}
                      spy={true}
                      smooth={true}
                      offset={-100}
                      duration={500}
                      activeClass="active"
                      // onClick={() =>
                      //   onChangeTab(
                      //     ENavBar.Overview,
                      //     HOTEL_SECTION.section_overview
                      //   )
                      // }
                      onClick={closeMenu}
                    >
                      Overview
                    </NavLink>
                  </div>
                  <div className={classes.navItem}>
                    <NavLink
                      to={`${HOTEL_SECTION.section_location}`}
                      spy={true}
                      smooth={true}
                      offset={-100}
                      duration={500}
                      activeClass="active"
                      // className={
                      //   verticalTabs === ENavBar.Location ? classes.active : ""
                      // }
                      // onClick={() =>
                      //   onChangeTab(
                      //     ENavBar.Location,
                      //     HOTEL_SECTION.section_location
                      //   )
                      // }
                      onClick={closeMenu}
                    >
                      Location
                    </NavLink>
                  </div>
                  <div className={classes.navItem}>
                    <NavLink
                      to={`${HOTEL_SECTION.section_rooms}`}
                      spy={true}
                      smooth={true}
                      offset={-120}
                      duration={500}
                      activeClass="active"
                      // className={!changeTab ? classes.active : classes.navbar}
                      // className={
                      //   verticalTabs === ENavBar.Rooms ? classes.active : ""
                      // }
                      // onClick={() =>
                      //   onChangeTab(ENavBar.Rooms, HOTEL_SECTION.section_rooms)
                      // }
                      onClick={closeMenu}
                    >
                      Rooms
                    </NavLink>
                  </div>
                  <div className={classes.navItem}>
                    <NavLink
                      to={`${HOTEL_SECTION.section_reviews}`}
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                      activeClass="active"
                      // className={!changeTab ? classes.active : classes.navbar}
                      // className={
                      //   verticalTabs === ENavBar.Reviews ? classes.active : ""
                      // }
                      // onClick={() =>
                      //   onChangeTab(
                      //     ENavBar.Reviews,
                      //     HOTEL_SECTION.section_reviews
                      //   )
                      // }
                      onClick={closeMenu}
                    >
                      Reviews
                    </NavLink>
                  </div>
                  <div className={classes.navItem}>
                    <NavLink
                      to={`${HOTEL_SECTION.section_facilities}`}
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                      activeClass="active"
                      // className={!changeTab ? classes.active : classes.navbar}
                      // className={
                      //   verticalTabs === ENavBar.Facilities ? classes.active : ""
                      // }
                      // onClick={() =>
                      //   onChangeTab(
                      //     ENavBar.Facilities,
                      //     HOTEL_SECTION.section_facilities
                      //   )
                      // }
                      onClick={closeMenu}
                    >
                      Facilities
                    </NavLink>
                  </div>
                </div>
                <div className={classes.backToTop}>
                  <a
                    onClick={() =>
                      onChangeTab(
                        ENavBar.Overview,
                        HOTEL_SECTION.section_overview
                      )
                    }
                  >
                    Back to top
                    <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                  </a>
                </div>
              </Container>
            </div>
            <SectionHotel hotel={hotel} />
            <Location
              comments={listComment}
              onGetHotelComments={getHotelComments}
              hotel={hotel}
            />
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
