import React, { memo, useRef } from "react";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { Col, Nav, NavItem, NavLink, TabContent } from "reactstrap";
import classes from "./styles.module.scss";
import { images } from "configs/images";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AttractionsIcon from "@mui/icons-material/Attractions";
import EventIcon from "@mui/icons-material/Event";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { EUserType } from "models/user";
import useAuth from "hooks/useAuth";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import TourIcon from "@mui/icons-material/Tour";
const Tours = dynamic(() => import("pages/enterprises/components/Tours"));
const Hotels = dynamic(() => import("pages/enterprises/components/Hotels"));
const Vouchers = dynamic(() => import("pages/enterprises/components/Vouchers"));
const Staffs = dynamic(() => import("pages/enterprises/components/Staffs"));

interface PropTypes {}

const Enterprise = memo(({ ...props }: PropTypes) => {
  const router = useRouter();
  const { page } = router.query;
  const { user } = useAuth();

  const toursRef = useRef<HTMLDivElement>(null);
  const hotelsRef = useRef<HTMLDivElement>(null);
  const vouchersRef = useRef<HTMLDivElement>(null);
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
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <Tours />
            </TabContent>
          </Col>
        );
      case "hotels":
        hotelsRef &&
          hotelsRef.current &&
          hotelsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <Hotels />
            </TabContent>
          </Col>
        );
      case "vouchers":
        vouchersRef &&
          vouchersRef.current &&
          vouchersRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <Vouchers />
            </TabContent>
          </Col>
        );
      case "staffs":
        staffsRef &&
          staffsRef.current &&
          staffsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <Staffs />
            </TabContent>
          </Col>
        );
      case "tourBills":
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <Staffs />
            </TabContent>
          </Col>
        );
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
            onClick={() => gotoMenu("vouchers")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("vouchers")}>
              <AirplaneTicketIcon />
              <span ref={vouchersRef}>Vouchers</span>
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
          <span>Order</span>
          <NavItem
            onClick={() => gotoMenu("tourBills")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("tourBills")}>
              <TourIcon />
              <span ref={vouchersRef}>Tour Bills</span>
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
      {renderComponent()}
    </div>
  );
});

export default Enterprise;
