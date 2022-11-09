import React, {memo, useMemo, useState} from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import {Row, Col, Table, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import Button, {BtnType} from "components/common/buttons/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentForm } from "components/Popup/PopupAddComment";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import Link  from "next/link";



// eslint-disable-next-line react/display-name
const FeatureSaleInformation = memo(()=> {

   return (
    <>
       <div className={classes.root}>
       <Row>
                <Col>
                <div className={classes.featuredItem}>
                    <span className={classes.featuredTitle}>Revanue</span>
                    <div className={classes.featuredMoneyContainer}>
                    <span className={classes.featuredMoney}>$2,415</span>
                    <span className={classes.featuredMoneyRate}>
                        -11.4 <FontAwesomeIcon icon={faArrowDown} className={clsx(classes.featuredIcon, classes.negative)}/>
                    </span>
                    </div>
                    <span className={classes.featuredSub}>Compared to last month</span>
                </div>
                </Col>
                <Col>
                    <div className={classes.featuredItem}>
                        <span className={classes.featuredTitle}>Revanue</span>
                        <div className={classes.featuredMoneyContainer}>
                        <span className={classes.featuredMoney}>$2,415</span>
                        <span className={classes.featuredMoneyRate}>
                        -11.4 <FontAwesomeIcon icon={faArrowDown} className={clsx(classes.featuredIcon, classes.negative)}/>
                        </span>
                        </div>
                        <span className={classes.featuredSub}>Compared to last month</span>
                    </div>
                </Col>
                <Col>
                    <div className={classes.featuredItem}>
                        <span className={classes.featuredTitle}>Revanue</span>
                        <div className={classes.featuredMoneyContainer}>
                        <span className={classes.featuredMoney}>$2,415</span>
                        <span className={classes.featuredMoneyRate}>
                        -11.4 <FontAwesomeIcon icon={faArrowDown} className={clsx(classes.featuredIcon, classes.negative)}/>
                        </span>
                        </div>
                        <span className={classes.featuredSub}>Compared to last month</span>
                    </div>
                </Col>
            </Row>
       </div>
    </>
  );
})

export default FeatureSaleInformation;
