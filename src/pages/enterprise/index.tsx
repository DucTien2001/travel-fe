import type { NextPage } from "next";
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Button, { BtnType } from "components/common/buttons/Button";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faPlaneDeparture,
  faChartSimple,
  faEnvelope,
  faComments,
  faBars,
  faClose,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { images } from "configs/images";
import Tours from "./Tours";
import Hotels from "./Hotels";
import Sales from "./Sales";
import EmailTemplate from "./EmailTemplate";
import Sidebar from "components/Sidebar";
import { enterpriseRoutes } from "routes/routers";
import SectionHeader from "components/Header/SectionHeader";
import ToursRevenue from "./ToursRevenue";
import HotelsRevenue from "./HotelsRevenue";
import TourComments from "./TourComments";

export enum EActiveNav {
  Tour_Active = 1,
  Hotel_Active = 2,
  Tour_Sales_Active = 3,
  Hotel_Sales_Active = 4,
  Tour_Feedbacks_Active = 5,
  Hotel_Feedbacks_Active = 6,
  Sales_Active = 7,
  Email_Active = 8,
  Feedback_Active = 9,
}

const Enterprise: NextPage = () => {
  const [verticalTabs, setVerticalTabs] = React.useState(EActiveNav.Tour_Active);
  const [activeSideBarMobile, setActiveSideBarMobile] = useState(false);
  const onChangeTab = (type: EActiveNav) => {
    switch (type) {
      case EActiveNav.Tour_Active:
        setVerticalTabs(EActiveNav.Tour_Active);
        break;
      case EActiveNav.Hotel_Active:
        setVerticalTabs(EActiveNav.Hotel_Active);
        break;
      case EActiveNav.Tour_Sales_Active:
        setVerticalTabs(EActiveNav.Tour_Sales_Active);
        break;
      case EActiveNav.Hotel_Sales_Active:
        setVerticalTabs(EActiveNav.Hotel_Sales_Active);
        break;
        case EActiveNav.Tour_Feedbacks_Active:
          setVerticalTabs(EActiveNav.Tour_Feedbacks_Active);
          break;
        case EActiveNav.Hotel_Feedbacks_Active:
          setVerticalTabs(EActiveNav.Hotel_Feedbacks_Active);
          break;
      case EActiveNav.Sales_Active:
        setVerticalTabs(EActiveNav.Sales_Active);
        break;
      case EActiveNav.Email_Active:
        setVerticalTabs(EActiveNav.Email_Active);
        break;
      case EActiveNav.Feedback_Active:
        setVerticalTabs(EActiveNav.Feedback_Active);
        break;
      default:
        break;
    }
  };
  const handleSideBarMobile = () => {
    setActiveSideBarMobile(!activeSideBarMobile);
  };
  return (
    <>
      <div className={classes.root}>
        <Col xs={2} className={activeSideBarMobile ? classes.sideBarActive : classes.sideBar}>
          <div className={classes.menuBarsMobile} onClick={handleSideBarMobile}>
            <FontAwesomeIcon icon={activeSideBarMobile ? faCircleArrowLeft : faCircleArrowRight} />
          </div>
          <div className={classes.headerSidebar}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.imgLogo.src} alt="" />
            <h4>TRAVELIX</h4>
          </div>
          <Nav tabs className={classes.nav}>
            <span>Dashboard</span>
            <NavItem>
              <NavLink
                href="#"
                className={verticalTabs === EActiveNav.Tour_Active ? classes.active : classes.navLink}
                onClick={() => onChangeTab(EActiveNav.Tour_Active)}
              >
                <FontAwesomeIcon icon={faPlaneDeparture} />
                Tours
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                className={verticalTabs === EActiveNav.Hotel_Active ? classes.active : classes.navLink}
                onClick={() => onChangeTab(EActiveNav.Hotel_Active)}
              >
                <FontAwesomeIcon icon={faBuilding} />
                Hotels
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                className={verticalTabs === EActiveNav.Sales_Active ? classes.active : classes.navLink}
                onClick={() => onChangeTab(EActiveNav.Sales_Active)}
              >
                <FontAwesomeIcon icon={faChartSimple} />
                Sales
              </NavLink>
            </NavItem>
            <span>sales</span>
            <NavItem>
              <NavLink
                href="#"
                className={verticalTabs === EActiveNav.Tour_Sales_Active ? classes.active : classes.navLink}
                onClick={() => onChangeTab(EActiveNav.Tour_Sales_Active)}
              >
                <FontAwesomeIcon icon={faPlaneDeparture} />
                Tours
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                className={verticalTabs === EActiveNav.Hotel_Sales_Active ? classes.active : classes.navLink}
                onClick={() => onChangeTab(EActiveNav.Hotel_Sales_Active)}
              >
                <FontAwesomeIcon icon={faBuilding} />
                Hotels
              </NavLink>
            </NavItem>
            <span>Feedbacks</span>
            <NavItem>
              <NavLink
                href="#"
                className={verticalTabs === EActiveNav.Tour_Feedbacks_Active ? classes.active : classes.navLink}
                onClick={() => onChangeTab(EActiveNav.Tour_Feedbacks_Active)}
              >
                <FontAwesomeIcon icon={faPlaneDeparture} />
                Tours
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                className={verticalTabs === EActiveNav.Hotel_Feedbacks_Active ? classes.active : classes.navLink}
                onClick={() => onChangeTab(EActiveNav.Hotel_Feedbacks_Active)}
              >
                <FontAwesomeIcon icon={faBuilding} />
                Hotels
              </NavLink>
            </NavItem>
            <span>Notifications</span>
            <NavItem>
              <NavLink
                href="#"
                className={verticalTabs === EActiveNav.Email_Active ? classes.active : classes.navLink}
                onClick={() => onChangeTab(EActiveNav.Email_Active)}
              >
                <FontAwesomeIcon icon={faEnvelope} />
                Email template
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                className={verticalTabs === EActiveNav.Feedback_Active ? classes.active : classes.navLink}
                onClick={() => onChangeTab(EActiveNav.Feedback_Active)}
              >
                <FontAwesomeIcon icon={faComments} />
                Feedbacks
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col xs={10} className={classes.content}>
          <TabContent activeTab={"verticalTabs" + verticalTabs} className={classes.tabContent}>
            <TabPane tabId="verticalTabs1" className={classes.tabPane}>
              <Tours />
            </TabPane>
            <TabPane tabId="verticalTabs2" className={classes.tabPane}>
              <Hotels />
            </TabPane>
            <TabPane tabId="verticalTabs3" className={classes.tabPane}>
              <ToursRevenue />
            </TabPane>
            <TabPane tabId="verticalTabs4" className={classes.tabPane}>
              <HotelsRevenue />
            </TabPane>
            <TabPane tabId="verticalTabs5" className={classes.tabPane}>
              <TourComments />
            </TabPane>
            <TabPane tabId="verticalTabs6" className={classes.tabPane}>
              <TourComments />
            </TabPane>
            <TabPane tabId="verticalTabs7" className={classes.tabPane}>
              <Sales />
            </TabPane>
            <TabPane tabId="verticalTabs8" className={classes.tabPane}>
              <EmailTemplate />
            </TabPane>
          </TabContent>
        </Col>
      </div>
    </>
  );
};

export default Enterprise;
