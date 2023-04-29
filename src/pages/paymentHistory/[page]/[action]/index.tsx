import React from "react";
import Link from "next/link";
// reactstrap components
import {
  Container,
  Row,
  TabPane,
  TabContent,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { NextPage } from "next";
import { images } from "configs/images";
import classes from "./styles.module.scss";
import SectionHeader from "components/Header/SectionHeader";

import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import Tour from "pages/paymentHistory/components/Tour";
import Hotel from "pages/paymentHistory/components/Hotel";
import UpdateBill from "pages/paymentHistory/components/Tour/UpdateBill";

const PaymentHistory: NextPage = () => {
  const router = useRouter();
  const { page, action } = router.query;

  const renderComponent = () => {
    switch (page) {
      case "tour":
        if (action) {
          return <UpdateBill tourBillId={Number(action)} />;
        }
      case "hotel":
        return <Hotel />;
    }
  };

  const gotoMenu = (pageName: string) => {
    router.push(`/paymentHistory/${pageName}`);
  };

  const renderClass = (pageName: string) => {
    return `${Boolean(page === pageName) && "active"}`;
  };

  return (
    <>
      <SectionHeader
        title="PAYMENT ORDER"
        src={images.bgUser.src}
        className={classes.sectionHeader}
      />
      <Grid className={classes.rootContent}>
        <Container className={classes.root}>
          <Row className={classes.headerPaymentHistory}>
            <Nav tabs className={classes.nav}>
              <span>Payment order</span>
              <NavItem
                onClick={() => gotoMenu("tour")}
                className={classes.navItem}
              >
                <NavLink className={renderClass("tour")}>Tour</NavLink>
              </NavItem>
              <NavItem
                onClick={() => gotoMenu("hotel")}
                className={classes.navItem}
              >
                <NavLink className={renderClass("hotel")}>Hotel</NavLink>
              </NavItem>
            </Nav>
          </Row>
          <Grid>{renderComponent()}</Grid>
        </Container>
      </Grid>
    </>
  );
};

export default PaymentHistory;
