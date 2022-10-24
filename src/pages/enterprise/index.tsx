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
import { faHotel, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import {images} from "configs/images";
import Tour from "./Tours";

const Enterprise: NextPage = () => {
    const [iconTabs, setIconTabs] = React.useState("1");
    const [tabs, setTabs] = React.useState("1");
    const [verticalTabs, setVerticalTabs] = React.useState("1");

  return (
    <>
    <Row className={classes.root}>
        <Col xs={2} className={classes.sideBar}>
          <div className={classes.headerSidebar}>
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.imgLogo.src} alt=""/>
            <h4>TRAVELIX</h4>
          </div>
            <Nav
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
            </Nav>
            </Col>        
            <Col xs={10}>
                    <TabContent activeTab={"verticalTabs" + verticalTabs}>
                      <TabPane tabId="verticalTabs1">
                        <Tour/>
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
