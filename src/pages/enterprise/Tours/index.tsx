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
import PopupCreateTour from "./components/PopupCreateTour";

// eslint-disable-next-line react/display-name
const Tour = memo(()=> {
    const [openPopupCreateTour, setOpenPopupCreateTour] = useState(false);

    const onTogglePopupCreateTour = () => setOpenPopupCreateTour(!openPopupCreateTour);
  return (
    <>
       <div className={classes.root}>
            <Row className={clsx(classes.rowHeaderBox, classes.title)}>
                 <h3>Tours</h3>
            </Row>
            <Row className={clsx(classes.rowHeaderBox, classes.boxControl)}>
                    <InputTextFieldBorder
                    placeholder="Search tours"
                    startIcon={<FontAwesomeIcon icon={faSearch}/>}
                    />
                    <Button btnType={BtnType.Primary} onClick={onTogglePopupCreateTour}><FontAwesomeIcon icon={faPlus}/>Create</Button>
            </Row>
            <div>
            <Table
              bordered
              className={classes.table}
            >
                <thead>
                    <tr>
                        <th scope="row" >
                            Id
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Created
                        </th>
                        <th className={classes.colAction}>
                           Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">
                        1
                    </th>
                    <td>
                       
                    </td>
                    <td>
                        Otto
                    </td>
                    <td>
                        da
                    </td>
                    <td className="text-center">
                    <UncontrolledDropdown>
                        <DropdownToggle
                        color="default"
                        data-toggle="dropdown"
                        href="#pablo"
                        id="navbarDropdownMenuLink1"
                        nav
                        onClick={(e) => e.preventDefault()}
                        >
                        <FontAwesomeIcon icon={faCaretDown} className={classes.iconAction}/>
                        </DropdownToggle>
                        <DropdownMenu aria-labelledby="navbarDropdownMenuLink1" className={classes.dropdownMenu}>
                        <DropdownItem className={classes.dropdownItem}>
                            <FontAwesomeIcon icon={faPen}/>
                            Add tour
                        </DropdownItem>
                        <DropdownItem className={classes.dropdownItem}>
                            <FontAwesomeIcon icon={faTrash}/>
                            Add hotel
                        </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    </td>
                    </tr>
                </tbody>
            </Table> 
            </div>
            <PopupCreateTour
            isOpen={openPopupCreateTour}
            onClose={onTogglePopupCreateTour}
            toggle={onTogglePopupCreateTour}
            />
       </div>
    </>
  );
})

export default Tour;
