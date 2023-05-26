import React, { memo, useRef } from "react";
import { useRouter } from "next/router";
import { Col, Nav, NavItem, NavLink, TabContent } from "reactstrap";
import classes from "./styles.module.scss";
import { images } from "configs/images";
import useAuth from "hooks/useAuth";
import EventIcon from "@mui/icons-material/Event";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useTranslation } from "react-i18next";
import TourIcon from "@mui/icons-material/Tour";
import { EUserType } from "models/user";
import TourBillOnSale from "pages/admin/components/StatisticTourBills/components/TourBillOnSale";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import StatisticStayBills from "pages/admin/components/StatisticStayBills";
import StatisticOneRoom from "pages/admin/components/StatisticStayBills/components/StatisticOneRoom";

interface PropTypes {}

const Admin = memo(({ ...props }: PropTypes) => {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const { user } = useAuth();

  const { page, action, type, slug } = router.query;

  const usersRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  const renderComponent = () => {
    switch (page) {
      case "statisticTourBills":
        if (action) {
          if (type) {
            if (slug) {
              return (
                <Col xs={10} className={classes.content}>
                  <TabContent className={classes.tabContent}>
                    <TourBillOnSale tourOnSaleId={Number(slug)} />
                  </TabContent>
                </Col>
              );
            }
          }
        }
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <TourBillOnSale />
            </TabContent>
          </Col>
        );
      case "statisticStayBills":
        if (action) {
          if (type) {
            if (slug) {
              return (
                <Col xs={10} className={classes.content}>
                  <TabContent className={classes.tabContent}>
                    <StatisticOneRoom roomId={Number(type)} />
                  </TabContent>
                </Col>
              );
            }
          }
        }
        return (
          <Col xs={10} className={classes.content}>
            <TabContent className={classes.tabContent}>
              <StatisticStayBills />
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
          <span>{t("admin_management_navbar_dashboard")}</span>
          <NavItem
            onClick={() => gotoMenu("users")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("users")}>
              <PeopleAltIcon />
              <span ref={usersRef}>{t("admin_management_navbar_user")}</span>
            </NavLink>
          </NavItem>
          <NavItem
            onClick={() => gotoMenu("events")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("events")}>
              <EventIcon />
              <span ref={eventsRef}>{t("admin_management_navbar_event")}</span>
            </NavLink>
          </NavItem>
          <NavItem
            onClick={() => gotoMenu("commissions")}
            className={classes.navItem}
          >
            <NavLink className={renderClass("commissions")}>
              <MonetizationOnIcon />
              <span>{t("admin_management_navbar_commission")}</span>
            </NavLink>
          </NavItem>
          {user.role === EUserType.SUPER_ADMIN && (
            <>
              <span>{t("admin_management_navbar_statistic")}</span>

              <NavItem
                onClick={() => gotoMenu("statisticTourBills")}
                className={classes.navItem}
              >
                <NavLink className={renderClass("statisticTourBills")}>
                  <TourIcon />
                  <span>{t("admin_management_navbar_tour_bills")}</span>
                </NavLink>
              </NavItem>
              <NavItem
                onClick={() => gotoMenu("statisticStayBills")}
                className={classes.navItem}
              >
                <NavLink className={renderClass("statisticStayBills")}>
                  <MeetingRoomIcon />
                  <span>{t("enterprise_management_navbar_room_bill")}</span>
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Col>
      {renderComponent()}
    </div>
  );
});

export default Admin;
