import React, {memo, useMemo, useState} from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCaretDown ,faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';
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
import PopupAddOrEditHotel from "../components/PopupAddOrEditHotel";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import PopupAddOrEditRoom from "../components/PopupAddOrEditRoom";

// eslint-disable-next-line react/display-name
const Hotel = memo(()=> {
    const [openPopupCreateHotel, setOpenPopupCreateHotel] = useState(false);
    const [openPopupConfirmDelete, setOpenPopupConfirmDelete] = useState(false);
    const [openPopupCreateRoom, setOpenPopupCreateRoom] = useState(false);


    const onTogglePopupCreateHotel = () => setOpenPopupCreateHotel(!openPopupCreateHotel);
    const onTogglePopupConfirmDelete = () => setOpenPopupConfirmDelete(!openPopupConfirmDelete);
    const onTogglePopupCreateRoom = () => setOpenPopupCreateRoom(!openPopupCreateRoom);

    const onYesDelete = () => {

    }
   return (
    <>
       <div className={classes.root}>
            <Row className={clsx(classes.rowHeaderBox, classes.title)}>
                 <h3>Hotels</h3>
            </Row>
            <Row className={clsx(classes.rowHeaderBox, classes.boxControl)}>
                <div className={classes.boxInputSearch}>
                    <InputTextFieldBorder
                    placeholder="Search hotels"
                    startIcon={<FontAwesomeIcon icon={faSearch}/>}
                    className={classes.inputSearch}
                    />
                </div>
                    <Button btnType={BtnType.Primary} onClick={onTogglePopupCreateHotel}><FontAwesomeIcon icon={faPlus}/>Create</Button>
            </Row>
            <Table
              bordered
              className={classes.table}
              responsive
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
                            State
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
                        Active
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
                            Edit
                        </DropdownItem>
                        <DropdownItem className={classes.dropdownItem} onClick={onTogglePopupCreateRoom}>
                            <FontAwesomeIcon icon={faPlus}/>
                            Add room
                        </DropdownItem>
                        <DropdownItem className={classes.dropdownItem} onClick={onTogglePopupConfirmDelete}>
                            <FontAwesomeIcon icon={faTrash}/>
                            Delete
                        </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    </td>
                    </tr>
                </tbody>
            </Table> 
            <PopupAddOrEditHotel
            isOpen={openPopupCreateHotel}
            onClose={onTogglePopupCreateHotel}
            toggle={onTogglePopupCreateHotel}
            />
            <PopupConfirmDelete
            title="Are you sure delete this tour ?"
            isOpen={openPopupConfirmDelete}
            onClose={onTogglePopupConfirmDelete}
            toggle={onTogglePopupConfirmDelete}
            onYes={onYesDelete}
            />
            <PopupAddOrEditRoom
            isOpen={openPopupCreateRoom}
            onClose={onTogglePopupCreateRoom}
            toggle={onTogglePopupCreateRoom}
            />
       </div>
    </>
  );
})

export default Hotel;
