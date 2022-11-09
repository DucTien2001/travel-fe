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
import PopupAddOrEditTour from "../components/PopupAddOrEditTour";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import FeatureSaleInformation from "../components/FeatureSaleInformation";
import Chart from "../../../components/Charts";

export const productData = [
    {
      name: "Jan",
      "Sales": 4000,
    },
    {
      name: "Feb",
      "Sales": 3000,
    },
    {
      name: "Mar",
      "Sales": 5000,
    },
  ];
// eslint-disable-next-line react/display-name
const Sales = memo(()=> {
   return (
    <>
       <div className={classes.root}>
            <Row className={clsx(classes.rowHeaderBox, classes.title)}>
                 <h3>Sales</h3>
            </Row>
            <FeatureSaleInformation/>
            <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
       </div>
    </>
  );
})

export default Sales
;
