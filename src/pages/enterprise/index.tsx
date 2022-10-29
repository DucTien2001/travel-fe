import type { NextPage } from "next";
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Button, {BtnType}from "components/common/buttons/Button";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import {images} from "configs/images";
import Tours from "./Tours";
import Hotels from "./Hotels";
import Sidebar from "components/Sidebar";
import {enterpriseRoutes} from "routes/routers";

export enum EActiveNav { 
  Tour_Active= 1,
  Hotel_Active = 2
}

const Enterprise: NextPage = () => {
    const [verticalTabs, setVerticalTabs] = React.useState(EActiveNav.Tour_Active);

    const onChangeTab = (type: EActiveNav) => {
      switch (type) {
        case EActiveNav.Tour_Active:
          setVerticalTabs(EActiveNav.Tour_Active);
          break;
        case EActiveNav.Hotel_Active:
          setVerticalTabs(EActiveNav.Hotel_Active)
          break;
        default:
          break;
      }
    }
  return (
    <>
    <Row className={classes.root}>
        <Col xs={2} className={classes.sideBar}>
          <div className={classes.headerSidebar}>
            <img src={images.imgLogo.src} alt=""/>
            <h4>TRAVELIX</h4>
          </div>
            {/* <Nav
            className="nav-pills-info flex-column"
            role="tablist"
            >
            <NavItem className={classes.navItem}>
                <NavLink
                className={verticalTabs === "1" ? `${classes.active}` : classes.navLink}
                href="#pablo"
                onClick={(e) => {
                e.preventDefault();
                setVerticalTabs("1");
                }}
                >
                    <FontAwesomeIcon icon={faBagShopping}/>
                    Tours
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                className={verticalTabs === "2" ? `${classes.active}` : classes.navLink}
                href="#pablo"
                onClick={(e) => {
                e.preventDefault();
                setVerticalTabs("2");
                }}
                >
                    <FontAwesomeIcon icon={faHotel}/>
                    Hotels
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                className={verticalTabs === "3" ? `${classes.active}` : classes.navLink}
                href="#pablo"
                onClick={(e) => {
                e.preventDefault();
                setVerticalTabs("3");
                }}
                >
                Options
                </NavLink>
            </NavItem>
            </Nav> */}
          <Nav tabs className={classes.nav}>
            <span>Dashboard</span>
            <NavItem>
              <NavLink href="#"
              className={verticalTabs === EActiveNav.Tour_Active ? classes.active : classes.navLink} 
              onClick={() => onChangeTab(EActiveNav.Tour_Active)}
              >
                <FontAwesomeIcon icon={faPlaneDeparture}/>
                Tours
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#"
              className={verticalTabs === EActiveNav.Hotel_Active ? classes.active : classes.navLink} 
              onClick={() => onChangeTab(EActiveNav.Hotel_Active)}>
                <FontAwesomeIcon icon={faBuilding} />
                Hotels
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Another Link</NavLink>
            </NavItem>
            <NavItem>
              <NavLink disabled href="#">
                Disabled Link
              </NavLink>
            </NavItem>
        </Nav>
        </Col>        
        <Col xs={10}>
                    <TabContent activeTab={"verticalTabs" + verticalTabs}>
                      <TabPane tabId="verticalTabs1">
                        <Tours/>
                      </TabPane>
                      <TabPane tabId="verticalTabs2">
                        Efficiently unleash cross-media information without
                        cross-media value. Quickly maximize timely deliverables
                        for real-time schemas. <br></br>
                        <br></br>
                        Dramatically maintain clicks-and-mortar solutions
                        without functional solutions.
                      </TabPane>
                      <TabPane tabId="verticalTabs3">
                        Completely synergize resource taxing relationships via
                        premier niche markets. Professionally cultivate
                        one-to-one customer service with robust ideas. <br></br>
                        <br></br>
                        Dynamically innovate resource-leveling customer service
                        for state of the art customer service.
                      </TabPane>
                    </TabContent>

        </Col>    
    </Row>
    </>
  );
};

export default Enterprise;
