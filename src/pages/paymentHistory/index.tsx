import React from "react";
import Link from "next/link";
// reactstrap components
import {
  Container,
  Row,
  Col,
  TabPane,
  TabContent,
  NavLink,
  NavItem,
  Nav, 
  Table,
  Card,
  CardHeader,
} from "reactstrap";
import {Item, userProfileRoutes} from "routes/routers";

import { NextPage } from "next";
import { images } from "configs/images";
import classes from "./styles.module.scss";
import clsx from "clsx";
import SectionHeader from "components/Header/SectionHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowsRotate, faArrowRightFromBracket, faSearch} from '@fortawesome/free-solid-svg-icons';
import Sidebar from "components/Sidebar";
import Button, {BtnType} from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import Tour from "./Tour";
import Hotel from "./Hotel";

export enum EActiveNav {
  Tour_Active= 1,
  Hotel_Active = 2,
}

const PaymentHistory : NextPage = () => {
  const [tabs, setTabs] = React.useState(EActiveNav.Tour_Active);
  
  const onChangeTab = (type: EActiveNav) => {
    switch (type) {
      case EActiveNav.Tour_Active:
        setTabs(EActiveNav.Tour_Active);
        break;
      case EActiveNav.Hotel_Active:
        setTabs(EActiveNav.Hotel_Active)
        break;
      default:
        break;
    }
  }
  return (
    <>
      <SectionHeader
      title="PAYMENT HISTORY"
      src={images.bgUser.src}
      className={classes.sectionHeader}
      />
      <Container className={classes.root}> 
      <Row className={classes.headerPaymentHistory}>
        <div className={classes.boxControl}>
        <p>Payment history</p>
        <Button btnType={tabs === EActiveNav.Tour_Active ? BtnType.Secondary : BtnType.Primary} onClick={() => onChangeTab(EActiveNav.Tour_Active)}>Tour</Button>
        <Button btnType={tabs === EActiveNav.Hotel_Active ? BtnType.Secondary : BtnType.Primary} onClick={() => onChangeTab(EActiveNav.Hotel_Active)}>Hotel</Button>
        </div>
        <InputTextFieldBorder
        startIcon={<FontAwesomeIcon icon={faSearch}/>}
        placeholder="Search invoice"
        className={classes.inputSearch}
        />
      </Row>
        <TabContent className="text-center" activeTab={"tabs" + tabs}>
                    <TabPane tabId="tabs1" className="mt-4">
                    <Tour/>
                    </TabPane>
                    <TabPane tabId="tabs2" className="mt-4">
                    <Hotel/>
                    </TabPane>
        </TabContent>

      </Container>
  </>
  );
}

export default PaymentHistory;
