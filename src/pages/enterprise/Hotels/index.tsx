import React, {memo, useMemo, useState} from "react";
import {images} from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Box from "components/BoxSmallLeft";
import CardItemList from "components/CardItemList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCaretDown ,faSearch, faPlus, faHotel, faPlane, faSquarePlus} from '@fortawesome/free-solid-svg-icons';
import Switch from "components/common/Switch";
import {Row, Col, Table, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import Button, {BtnType} from "components/common/buttons/Button";
import PopupDefault from "components/Popup/PopupConfirmSucess";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentForm } from "components/Popup/PopupAddComment";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { VALIDATION } from "configs/constants";
import {Form} from "reactstrap";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import Link  from "next/link";

// eslint-disable-next-line react/display-name
const Tour = memo(()=> {
  return (
    <>
       <div className={classes.root}>
                Hotel
       </div>
    </>
  );
})

export default Tour;
