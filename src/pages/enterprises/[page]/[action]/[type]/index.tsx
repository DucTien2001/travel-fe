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
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import DetailTourOnSaleStatistic from "pages/enterprises/components/TourStatistic/components/DetailTourOnSaleStatistic";

interface PropTypes {}

const Enterprise = memo(({ ...props }: PropTypes) => {
  const router = useRouter();
  const { user } = useAuth();
  const { page, action, type } = router.query;
  const { t, i18n } = useTranslation("common");

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
      case "tourStatistic":
        if (action) {
          if (type) {
            return (
              <Col xs={10} className={classes.content}>
                <TabContent className={classes.tabContent}>
                  <DetailTourOnSaleStatistic tourOnSaleId={Number(type)} />
                </TabContent>
              </Col>
            );
          }
        }
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <DetailTourOnSaleStatistic />
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
          <span>{t("enterprise_management_navbar_dashboard")}</span>
          <NavItem
            onClick={() => gotoMenu("tours")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("tours")}>
              <AttractionsIcon />
              <span ref={toursRef}>
                {t("enterprise_management_navbar_tour")}
              </span>
            </NavLink>
          </NavItem>
          <NavItem
            onClick={() => gotoMenu("hotels")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("hotels")}>
              <ApartmentIcon />
              <span ref={hotelsRef}>
                {t("enterprise_management_navbar_hotel")}
              </span>
            </NavLink>
          </NavItem>
          <NavItem
            onClick={() => gotoMenu("vouchers")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("vouchers")}>
              <AirplaneTicketIcon />
              <span ref={vouchersRef}>
                {t("enterprise_management_navbar_voucher")}
              </span>
            </NavLink>
          </NavItem>
          {user?.role === EUserType.ENTERPRISE && (
            <NavItem
              onClick={() => gotoMenu("staffs")}
              className={classes.navItem}
            >
              <NavLink className={renderClass("staffs")}>
                <PeopleAltIcon />
                <span ref={staffsRef}>
                  {t("enterprise_management_navbar_staff")}
                </span>
              </NavLink>
            </NavItem>
          )}
          <span>{t("enterprise_management_navbar_order")}</span>
          <NavItem
            onClick={() => gotoMenu("tourBills")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("tourBills")}>
              <TourIcon />
              <span ref={vouchersRef}>
                {t("enterprise_management_navbar_tour_bill")}
              </span>
            </NavLink>
          </NavItem>
          <span>{t("enterprise_management_navbar_statistic")}</span>
          <NavItem
            onClick={() => gotoMenu("tourStatistic")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("tourStatistic")}>
              <BarChartIcon />
              <span ref={vouchersRef}>
                {t("enterprise_management_navbar_tour")}
              </span>
            </NavLink>
          </NavItem>
          <Grid
            className={classes.boxTerms}
            onClick={onTogglePopupTermsAndConditions}
          >
            <span>{t("enterprise_management_navbar_term_and_condition")}</span>
          </Grid>
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
