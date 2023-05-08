import React, { memo, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Col, Nav, NavItem, NavLink, TabContent } from "reactstrap";
import classes from "./styles.module.scss";
import { images } from "configs/images";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventIcon from "@mui/icons-material/Event";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
const Users = dynamic(() => import("pages/admin/components/Users"));
const Events = dynamic(() => import("pages/admin/components/Events"));
const Commissions = dynamic(() => import("pages/admin/components/Commissions"));

interface PropTypes {}

const Admin = memo(({ ...props }: PropTypes) => {
  const router = useRouter();
  const { page } = router.query;

  const usersRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  const renderComponent = () => {
    switch (page) {
      case "users":
        usersRef &&
          usersRef.current &&
          usersRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <Users />
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
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <Events />
            </TabContent>
          </Col>
        );
      case "commissions":
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <Commissions />
            </TabContent>
          </Col>
        );
    }
  };

  const renderClass = (pageName: string) => {
    return `${Boolean(page === pageName) && "active"}`;
  };

  const gotoMenu = (pageName: string) => {
    router.push(`/admin/${pageName}`);
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
            onClick={() => gotoMenu("users")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("users")}>
              <PeopleAltIcon />
              <span ref={usersRef}>User</span>
            </NavLink>
          </NavItem>
          <NavItem
            onClick={() => gotoMenu("events")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("events")}>
              <EventIcon />
              <span ref={eventsRef}>Events</span>
            </NavLink>
          </NavItem>
          <NavItem
            onClick={() => gotoMenu("commissions")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("commissions")}>
              <MonetizationOnIcon />
              <span>Commission</span>
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
      {renderComponent()}
    </div>
  );
});

export default Admin;
