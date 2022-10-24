import React, {memo, useMemo, useState} from "react";
import {images} from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Box from "components/BoxSmallLeft";
import CardItemList from "components/CardItemList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo ,faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';
import Switch from "components/common/Switch";
import {Row, Col, Table} from "reactstrap";
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



// eslint-disable-next-line react/display-name
const Tour = memo(()=> {

  return (
    <>
       <div className={classes.root}>
            <Row className={classes.title}>
                 <h3>Tours</h3>
            </Row>
            <Row className={classes.boxControl}>
                    <InputTextFieldBorder
                    placeholder="Search tours"
                    startIcon={<FontAwesomeIcon icon={faSearch}/>}
                    />
                    <Button btnType={BtnType.Primary}><FontAwesomeIcon icon={faPlus}/>Create</Button>
            </Row>
            <div>
            <Table
              responsive
              bordered
              className={classes.table}
            >
                <thead>
                    <tr>
                        <th scope="row" >
                            Id
                        </th>
                        <th className={classes.title}>
                            Name
                        </th>
                        <th className={classes.title}>
                            Price
                        </th>
                        <th className={classes.title}>
                            Created
                        </th>
                        <th className={classes.title}>
                           Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row" className={classes.col}>
                        1
                    </th>
                    <td className={classes.colImg}>
                       
                    </td>
                    <td className={classes.col}>
                        Otto
                    </td>
                    <td className={clsx(classes.colAmount, classes.col)}>

                    </td>
                    <td className={clsx(classes.colConfirm, classes.col)}>

                    </td>
                    </tr>
                </tbody>
            </Table> 
            </div>
       </div>
    </>
  );
})

export default Tour;
