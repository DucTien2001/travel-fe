import React, { memo, useRef } from "react";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { Col, Nav, NavItem, NavLink, TabContent } from "reactstrap";
import classes from "./styles.module.scss";
import { images } from "configs/images";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AttractionsIcon from "@mui/icons-material/Attractions";

const Tours = dynamic(() => import("pages/enterprises/components/Tours"));
const Hotels = dynamic(() => import("pages/enterprises/components/Hotels"));
const Events = dynamic(() => import("pages/enterprises/components/Events"));

interface PropTypes {}

const Enterprise = memo(({ ...props }: PropTypes) => {
  const router = useRouter();
  const { page } = router.query;

  const toursRef = useRef<HTMLDivElement>(null);
  const hotelsRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

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
      case "events":
        hotelsRef &&
          eventsRef.current &&
          eventsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <Events />
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
          <NavItem onClick={() => gotoMenu("tours")} className={classes.navItem}>
            <NavLink className={renderClass("tours")}>
              <AttractionsIcon />
              <span ref={toursRef}>Tours</span>
            </NavLink>
          </NavItem>
          <NavItem onClick={() => gotoMenu("hotels")} className={classes.navItem}>
            <NavLink className={renderClass("hotels")}>
              <ApartmentIcon />
              <span ref={hotelsRef}>Hotels</span>
            </NavLink>
          </NavItem>
          <NavItem onClick={() => gotoMenu("events")} className={classes.navItem}>
            <NavLink className={renderClass("events")}>
              <ApartmentIcon />
              <span ref={eventsRef}>Events</span>
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
      {renderComponent()}
    </div>
  );
});

export default Enterprise;
