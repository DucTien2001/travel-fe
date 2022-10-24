import React, {useEffect, useState, useMemo} from "react";
import Link  from "next/link";
// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip, faList, faXmark, faSearch, faCalendarDays, faBed} from '@fortawesome/free-solid-svg-icons';
import { NextPage } from "next";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Social from "components/Social";
import Pagination from "components/Pagination";
import Aos from 'aos'
import 'aos/dist/aos.css';
import InputCheckbox from 'components/common/inputs/InputCheckbox';
import InputTextField from 'components/common/inputs/InputTextField';
import InputDatePicker from 'components/common/inputs/InputDatePicker';
import InputCounter from 'components/common/inputs/InputCounter';
import Button, {BtnType} from "components/common/buttons/Button";
import SectionHeader from "components/Header/SectionHeader";
import CardItemGrid from "components/CardItemGrid";
import CardItemList from "components/CardItemList";
import BoxSmallLeft from "components/BoxSmallLeft";
import * as yup from "yup"; 
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import DetailCustomer from "./components/DetailCustomer";
import DetailRoom from "./components/DetailRoom";


const Khoi : NextPage = () => {
    return (
        <div className={clsx("wrapper", classes.root)}>
        <SectionHeader
        className={classes.sectionHeader}
        title="BOOK ROOM"
        src={images.pricing2.src}
        />
        <Container>
            <Row className={classes.root}>
                <Col xs={4} className={classes.boxLeft}>
                  <DetailRoom/>
                </Col>
                <Col xs={8} className={classes.boxRight}>
                  <DetailCustomer/>
                </Col>
            </Row>
        </Container>    
      </div>
    )
}

export default Khoi;
