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
import { faUser, faChartSimple, faCircleArrowRight, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {images} from "configs/images";
import Users from "./Users";
import Sales from "./Sales";


export enum EActiveNav { 
  User_Active= 1,
  Sales_Active = 2,  
}

const Enterprise: NextPage = () => {
    const [verticalTabs, setVerticalTabs] = React.useState(EActiveNav.User_Active);
    const [activeSideBarMobile, setActiveSideBarMobile] = useState(false);
    const onChangeTab = (type: EActiveNav) => {
      switch (type) {
        case EActiveNav.User_Active:
          setVerticalTabs(EActiveNav.User_Active);
          break;
        case EActiveNav.Sales_Active:
          setVerticalTabs(EActiveNav.Sales_Active)
          break;
        default:
          break;
      }
    }
    const handleSideBarMobile = () => {
      setActiveSideBarMobile(!activeSideBarMobile);
    }
  return (
    <>
    <div className={classes.root}>
        <Col xs={2} className={activeSideBarMobile ? classes.sideBarActive : classes.sideBar}>
          <div className={classes.menuBarsMobile} onClick={handleSideBarMobile}>
            <FontAwesomeIcon icon={activeSideBarMobile ? faCircleArrowLeft : faCircleArrowRight}/>
          </div>
          <div className={classes.headerSidebar}>
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.imgLogo.src} alt=""/>
            <h4>TRAVELIX</h4>
          </div>
          <Nav tabs className={classes.nav}>
            <span>Dashboard</span>
            <NavItem>
              <NavLink href="#"
              className={verticalTabs === EActiveNav.User_Active ? classes.active : classes.navLink} 
              onClick={() => onChangeTab(EActiveNav.User_Active)}
              >
                <FontAwesomeIcon icon={faUser}/>
                Users
              </NavLink>
            </NavItem>
            <NavItem>
            <NavLink href="#"
              className={verticalTabs === EActiveNav.Sales_Active ? classes.active : classes.navLink} 
              onClick={() => onChangeTab(EActiveNav.Sales_Active)}>
                <FontAwesomeIcon icon={faChartSimple} />
                Sales
              </NavLink>
            </NavItem>
        </Nav>    
        </Col>        
        <Col xs={10} className={classes.content}>
                    <TabContent activeTab={"verticalTabs" + verticalTabs} className={classes.tabContent}>
                      <TabPane tabId="verticalTabs1" className={classes.tabPane}>
                        <Users/>
                      </TabPane>
                      <TabPane tabId="verticalTabs2" className={classes.tabPane}>
                        <Sales/>
                      </TabPane>
                    </TabContent>
        </Col>    
    </div>
    </>
  );
};

export default Enterprise;
