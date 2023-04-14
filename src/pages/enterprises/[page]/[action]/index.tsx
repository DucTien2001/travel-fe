import React, {
  Fragment,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { Col, Nav, NavItem, NavLink, TabContent } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./styles.module.scss";
import { images } from "configs/images";
import Hotels from "pages/enterprises/components/Hotels";
import AddOrEditEvent from "pages/enterprises/components/Events/components/AddOrEditEvent";
import OfferStaffs from "pages/enterprises/components/Staffs/components/OfferStaffs";
import { EUserType } from "models/user";
import useAuth from "hooks/useAuth";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AttractionsIcon from "@mui/icons-material/Attractions";
import EventIcon from "@mui/icons-material/Event";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
const AddOrEditTour = dynamic(
  () => import("pages/enterprises/components/Tours/AddOrEditTour")
);

interface PropTypes {}

const Enterprise = memo(({ ...props }: PropTypes) => {
  const router = useRouter();
  const { user } = useAuth();
  const { page, action, type } = router.query;

  const toursRef = useRef<HTMLDivElement>(null);
  const hotelsRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const staffsRef = useRef<HTMLDivElement>(null);

  const renderComponent = () => {
    switch (page) {
      case "tours":
        toursRef &&
          toursRef.current &&
          toursRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        if (action === "create-tour") {
          return (
            <Col xs={10} className={classes.content}>
              <TabContent className={classes.tabContent}>
                <AddOrEditTour />
              </TabContent>
            </Col>
          );
        }
        if (action) {
          return (
            <Col xs={10} className={classes.content}>
              <TabContent className={classes.tabContent}>
                <AddOrEditTour tourId={Number(action)} />
              </TabContent>
            </Col>
          );
        }
      case "hotels":
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <Hotels />
            </TabContent>
          </Col>
        );
      case "events":
        eventsRef &&
          eventsRef.current &&
          eventsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        if (action === "create-event") {
          return (
            <Col xs={10} className={classes.content}>
              <TabContent className={classes.tabContent}>
                <AddOrEditEvent />
              </TabContent>
            </Col>
          );
        }
        if (action) {
          return (
            <Col xs={10} className={classes.content}>
              <TabContent className={classes.tabContent}>
                <AddOrEditEvent eventId={Number(action)} />
              </TabContent>
            </Col>
          );
        }
      case "staffs":
        staffsRef &&
          staffsRef.current &&
          staffsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        if (action === "list-offers") {
          return (
            <Col xs={10} className={classes.content}>
              <TabContent className={classes.tabContent}>
                <OfferStaffs />
              </TabContent>
            </Col>
          );
        }
    }
  };

  const renderClass = (pageName: string) => {
    return `${Boolean(page === pageName) && "active"}`;
  };

  const gotoMenu = (pageName: string) => {
    router.push(`/enterprises/${pageName}`);
  };

  return (
    <div className={classes.root}>
      <Col xs={2} className={classes.sideBar}>
        <div className={classes.headerSidebar}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.imgLogo.src} alt="" />
          <h4>TRAVELIX</h4>
        </div>
        <Nav tabs className={classes.nav}>
          <span>Dashboard</span>
          <NavItem
            onClick={() => gotoMenu("tours")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("tours")}>
              <AttractionsIcon />
              <span ref={toursRef}>Tours</span>
            </NavLink>
          </NavItem>
          <NavItem
            onClick={() => gotoMenu("hotels")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("hotels")}>
              <ApartmentIcon />
              <span ref={hotelsRef}>Hotels</span>
            </NavLink>
          </NavItem>
          <NavItem
            onClick={() => gotoMenu("events")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("events")}>
              <EventIcon />
              <span ref={staffsRef}>Events</span>
            </NavLink>
          </NavItem>
          {user.role === EUserType.ENTERPRISE && (
            <NavItem
              onClick={() => gotoMenu("staffs")}
              className={classes.navItem}
            >
              <NavLink className={renderClass("staffs")}>
                <PeopleAltIcon />
                <span ref={staffsRef}>Staffs</span>
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Col>
      {renderComponent()}
    </div>
  );
});

export default Enterprise;
