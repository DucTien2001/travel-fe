import React, { memo, useRef, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Col, Nav, NavItem, NavLink, TabContent } from "reactstrap";
import classes from "./styles.module.scss";
import { images } from "configs/images";
import Hotels from "pages/enterprises/components/Hotels";

import OfferStaffs from "pages/enterprises/components/Staffs/components/OfferStaffs";
import { EUserType } from "models/user";
import useAuth from "hooks/useAuth";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AttractionsIcon from "@mui/icons-material/Attractions";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import TourIcon from "@mui/icons-material/Tour";
import Tours from "pages/enterprises/components/Tours";
import Vouchers from "pages/enterprises/components/Vouchers";
import AddOrEditTour from "pages/enterprises/components/Tours/AddOrEditTour";
import AddOrEditVoucher from "pages/enterprises/components/Vouchers/components/AddOrEditVoucher";
import DetailTourBill from "pages/enterprises/components/TourBills/components/DetailTourBill";
import Staffs from "pages/enterprises/components/Staffs";
import TourBills from "pages/enterprises/components/TourBills";
import TourStatistic from "pages/enterprises/components/TourStatistic";
import TourOnSaleStatistic from "pages/enterprises/components/TourStatistic/components/TourOnSaleStatistic";
import PopupTermsAndConditions from "pages/enterprises/components/PopupTermsAndConditions";

interface PropTypes {}

const Enterprise = memo(({ ...props }: PropTypes) => {
  const router = useRouter();
  const { user } = useAuth();
  const { page, action, type } = router.query;

  const toursRef = useRef<HTMLDivElement>(null);
  const hotelsRef = useRef<HTMLDivElement>(null);
  const vouchersRef = useRef<HTMLDivElement>(null);
  const staffsRef = useRef<HTMLDivElement>(null);

  const [openPopupTermsAndConditions, setOpenPopupTermsAndConditions] =
    useState(false);

  const onTogglePopupTermsAndConditions = () => {
    setOpenPopupTermsAndConditions(!openPopupTermsAndConditions);
  };

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
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <Tours />
            </TabContent>
          </Col>
        );
      case "hotels":
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
        if (action === "create-voucher") {
          return (
            <Col xs={10} className={classes.content}>
              <TabContent className={classes.tabContent}>
                <AddOrEditVoucher />
              </TabContent>
            </Col>
          );
        }
        if (action) {
          return (
            <Col xs={10} className={classes.content}>
              <TabContent className={classes.tabContent}>
                <AddOrEditVoucher voucherId={Number(action)} />
              </TabContent>
            </Col>
          );
        }
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
        if (action === "list-offers") {
          return (
            <Col xs={10} className={classes.content}>
              <TabContent className={classes.tabContent}>
                <OfferStaffs />
              </TabContent>
            </Col>
          );
        }
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <Staffs />
            </TabContent>
          </Col>
        );
      case "tourBills":
        if (action) {
          return (
            <Col xs={10} className={classes.content}>
              <TabContent className={classes.tabContent}>
                <DetailTourBill tourBillId={Number(action)} />
              </TabContent>
            </Col>
          );
        }
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <TourBills />
            </TabContent>
          </Col>
        );
      case "tourStatistic":
        if (action) {
          return (
            <Col xs={10} className={classes.content}>
              <TabContent className={classes.tabContent}>
                <TourOnSaleStatistic tourId={Number(action)} />
              </TabContent>
            </Col>
          );
        }
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <TourStatistic />
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
              <span ref={staffsRef}>Vouchers</span>
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
          <span>Statistic</span>
          <NavItem
            onClick={() => gotoMenu("tourStatistic")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("tourStatistic")}>
              <TourIcon />
              <span ref={vouchersRef}>Tour</span>
            </NavLink>
          </NavItem>
        </Nav>
      </Col>

      {renderComponent()}
      <PopupTermsAndConditions
        isOpen={openPopupTermsAndConditions}
        toggle={onTogglePopupTermsAndConditions}
      />
    </div>
  );
});

export default Enterprise;
